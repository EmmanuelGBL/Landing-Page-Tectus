#!/usr/bin/env bash
#
# Publica a landing a partir da própria VPS.
#
# Uso, no console web da Hostinger, como o usuário emmanuel:
#
#   bash /var/www/tectus/site/deploy/publicar-vps.sh
#
# Puxa o código do GitHub, constrói, valida e troca a versão no ar. O build
# acontece aqui, então nada precisa subir do computador.

set -euo pipefail

PROJETO="/var/www/tectus/site"
DESTINO="/var/www/tectus"
VERSAO="$(date +%Y%m%d-%H%M%S)"

cd "$PROJETO"

echo "==> Puxando do GitHub"
# --ff-only para a publicação falhar em vez de criar merge automático se
# alguém tiver mexido no código direto no servidor. Servidor não é lugar de
# editar código, e se isso acontecer é melhor descobrir aqui.
git pull --ff-only

echo "==> Instalando dependências"
# npm ci e não npm install: instala exatamente o que está no package-lock,
# sem atualizar nada por conta própria. Build de produção não é hora de
# descobrir que uma dependência mudou de versão sozinha.
npm ci

echo "==> Build"
npm run build

echo "==> Conferindo o resultado"
if [ ! -f out/index.html ]; then
  echo "ERRO: o build não gerou out/index.html. Nada foi publicado." >&2
  exit 1
fi

# A checagem que mais importa: site no ar com noindex funciona perfeitamente
# para quem visita e é invisível para o Google. Sem isso, a falha só apareceria
# semanas depois, quando o Search Console não mostrasse nada.
if grep -q "Disallow: /" out/robots.txt; then
  echo "ERRO: o build saiu bloqueado para robôs. Confira o .env.production." >&2
  exit 1
fi

if ! grep -q "GTM-" out/index.html; then
  echo "AVISO: o HTML saiu sem o container do GTM. A medição não vai funcionar."
fi

echo "==> Instalando a versão $VERSAO"
mkdir -p "$DESTINO/releases/$VERSAO"
cp -r out/. "$DESTINO/releases/$VERSAO/"

# O Nginx lê como www-data, que não é dono de nada aqui.
chmod -R a+rX "$DESTINO/releases/$VERSAO"

# ln -sfn em vez de rm seguido de ln: a troca é uma operação só, e não existe
# o instante em que o symlink aponta para lugar nenhum. O visitante nunca vê
# meia publicação, mesmo se o build demorar.
ln -sfn "$DESTINO/releases/$VERSAO" "$DESTINO/current"

# Mantém as três últimas. Voltar atrás é reapontar o symlink, o que importa
# numa fase em que a página muda toda semana.
cd "$DESTINO/releases"
ls -1t | tail -n +4 | xargs -r rm -rf

# Os dois únicos comandos com privilégio. O reload só acontece se o teste
# passar, então configuração inválida nunca derruba os outros sites que moram
# neste mesmo Nginx.
sudo /usr/sbin/nginx -t && sudo /usr/bin/systemctl reload nginx

echo "==> Publicado: versão $VERSAO"
echo "    Versões disponíveis para voltar atrás:"
ls -1t "$DESTINO/releases"
