#!/usr/bin/env bash
#
# Publica só as prévias (/v3 e /v4) por cima da versão que já está no ar,
# sem trocar a home nem nenhuma outra rota.
#
# Uso, no console web da Hostinger:
#
#   sudo -u emmanuel bash /var/www/tectus/site/deploy/publicar-previas-vps.sh
#
# Por que existe: o `publicar-vps.sh` publica o `main` inteiro, e em
# 15/10/2026 o `main` tinha a rodada de 06/10 da home, que o Emmanuel decidiu
# não colocar no ar ainda. Este script constrói o `main` numa pasta à parte,
# copia a versão no ar, acrescenta só as rotas pedidas e troca o symlink.
#
# Funciona porque o export é estático: cada rota é um HTML próprio, e os
# arquivos de `_next/static` têm hash no nome, então os do build novo entram
# ao lado dos antigos sem sobrescrever nada que a home usa.

set -euo pipefail

REPOSITORIO="/var/www/tectus/site"
BUILD="/var/www/tectus/build-previas"
DESTINO="/var/www/tectus"
ROTAS=(v3 v4)
VERSAO="$(date +%Y%m%d-%H%M%S)"
ATUAL="$(readlink -f "$DESTINO/current")"

echo "==> Versão no ar hoje: $(basename "$ATUAL")"

# Pasta própria para o build, para não mexer no checkout que o
# `publicar-vps.sh` usa. Clona do checkout local, que já tem a deploy key.
if [ ! -d "$BUILD/.git" ]; then
  echo "==> Preparando a pasta de build"
  git clone --quiet "$REPOSITORIO" "$BUILD"
  cp "$REPOSITORIO/.env.production" "$BUILD/" 2>/dev/null || true
fi

echo "==> Puxando do GitHub"
git -C "$REPOSITORIO" fetch --quiet origin main
git -C "$BUILD" fetch --quiet "$REPOSITORIO" refs/remotes/origin/main
git -C "$BUILD" reset --quiet --hard FETCH_HEAD
echo "    Código: $(git -C "$BUILD" log -1 --format='%h %s')"

cd "$BUILD"

echo "==> Instalando dependências"
npm ci

echo "==> Build"
npm run build

for rota in "${ROTAS[@]}"; do
  if [ ! -f "out/$rota.html" ]; then
    echo "ERRO: o build não gerou out/$rota.html. Nada foi publicado." >&2
    exit 1
  fi
done

echo "==> Montando a versão $VERSAO a partir da que está no ar"
NOVA="$DESTINO/releases/$VERSAO"
mkdir -p "$NOVA"
cp -a "$ATUAL/." "$NOVA/"

for rota in "${ROTAS[@]}"; do
  # O HTML da rota, o payload dela e a pasta de segmentos, quando existir.
  cp -a out/"$rota".* "$NOVA/"
  if [ -d "out/$rota" ]; then
    cp -a "out/$rota" "$NOVA/"
  fi
  echo "    + /$rota"
done

# -n: nunca sobrescreve arquivo que já existe, então a home continua
# servindo exatamente os mesmos JS, CSS e fontes de antes.
cp -an out/_next/. "$NOVA/_next/"

# As logos dos clientes e demais arquivos de public/ que a prévia usa.
cp -an out/clientes/. "$NOVA/clientes/" 2>/dev/null || true

chmod -R a+rX "$NOVA"

# Conferência: a home nova tem que ser byte a byte a home antiga.
if ! cmp -s "$ATUAL/index.html" "$NOVA/index.html"; then
  echo "ERRO: a home mudou na montagem. Nada foi publicado." >&2
  rm -rf "$NOVA"
  exit 1
fi

ln -sfn "$NOVA" "$DESTINO/current"

cd "$DESTINO/releases"
ls -1t | tail -n +4 | xargs -r rm -rf

sudo /usr/sbin/nginx -t && sudo /usr/bin/systemctl reload nginx

echo "==> Publicado: versão $VERSAO (home intacta, mais ${ROTAS[*]})"
echo "    Para voltar atrás: ln -sfn $ATUAL $DESTINO/current"
