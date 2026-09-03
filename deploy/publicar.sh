#!/usr/bin/env bash
#
# Publica a landing na VPS. Rodar do Git Bash, na pasta landing-page:
#
#   bash deploy/publicar.sh
#
# Faz o build, empacota, envia e troca o symlink. A troca é a última coisa
# que acontece, e é atômica: o visitante nunca vê meia publicação, porque em
# nenhum instante o diretório servido está incompleto.
#
# Guarda as três últimas versões. Voltar atrás é reapontar o symlink, o que
# importa numa fase em que a página muda toda semana e alguma mudança vai
# sair errada.

set -euo pipefail

# Usuário comum, não root. A VPS serve produção de cinco clientes, e o deploy
# da Tectus não precisa de poder administrativo para nada além de recarregar o
# Nginx. O diretório /var/www/tectus pertence ao emmanuel, e só os dois
# comandos do fim da lista passam por sudo.
SERVIDOR="${SERVIDOR:-emmanuel@72.61.48.71}"
DESTINO="/var/www/tectus"
VERSAO="$(date +%Y%m%d-%H%M%S)"

cd "$(dirname "$0")/.."

echo "==> Build"
# As variáveis de ambiente vêm do .env.local. Sem NEXT_PUBLIC_SITE_URL o site
# sobe com noindex e ninguém percebe até semanas depois, então o build para
# aqui se ela estiver faltando.
if ! grep -q "NEXT_PUBLIC_SITE_URL=https://tectussolucoes.com.br" .env.local 2>/dev/null; then
  echo "ERRO: .env.local sem NEXT_PUBLIC_SITE_URL. O site sairia com noindex." >&2
  exit 1
fi

npm run build

if grep -q "Disallow: /" out/robots.txt; then
  echo "ERRO: o build saiu bloqueado para robôs. Confira INDEXAVEL em src/lib/site.ts." >&2
  exit 1
fi

echo "==> Empacotando"
tar -czf out.tar.gz -C out .

echo "==> Enviando para $SERVIDOR"
scp out.tar.gz "$SERVIDOR:/tmp/tectus-$VERSAO.tar.gz"
rm out.tar.gz

echo "==> Instalando a versão $VERSAO"
ssh "$SERVIDOR" bash -s <<EOF
set -euo pipefail

mkdir -p "$DESTINO/releases/$VERSAO"
tar -xzf "/tmp/tectus-$VERSAO.tar.gz" -C "$DESTINO/releases/$VERSAO"
rm "/tmp/tectus-$VERSAO.tar.gz"

# O Nginx lê como www-data, que não é dono de nada aqui. Leitura para todos
# resolve, e é o suficiente: são arquivos que já vão ser servidos ao público.
chmod -R a+rX "$DESTINO/releases/$VERSAO"

# ln -sfn em vez de rm seguido de ln: a troca vira uma operação só e não
# existe o instante em que o symlink não aponta para lugar nenhum.
ln -sfn "$DESTINO/releases/$VERSAO" "$DESTINO/current"

# Mantém as três últimas e apaga o resto.
cd "$DESTINO/releases"
ls -1t | tail -n +4 | xargs -r rm -rf

# Os dois únicos comandos que pedem privilégio. O reload só acontece se o
# teste passar, então configuração inválida nunca chega a derrubar os outros
# sites que moram neste mesmo Nginx.
sudo /usr/sbin/nginx -t && sudo /usr/bin/systemctl reload nginx
EOF

echo "==> Publicado: https://tectussolucoes.com.br (versão $VERSAO)"
