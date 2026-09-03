# Publicação, servidor e domínio

Como a landing sai do código e chega no ar. Última revisão: 03/09/2026.

---

## Onde paramos em 03/09/2026, e o que falta

O site **está no ar e respondendo** em `72.61.48.71`, verificado de fora: `200`, HTML de 190 KB,
`robots.txt` liberando, imagem de Open Graph com `image/png`, container do GTM presente e nenhum
`noindex`. Falta só o endereço apontar para lá.

### Pendências, na ordem

1. **DNS.** Os nameservers da Cloudflare (`clark.ns.cloudflare.com`, `tess.ns.cloudflare.com`)
   foram apontados no registro.br em 03/09/2026, à noite. Confirmar que assumiram, e que existem
   os dois registros: `A` no nome `@` para `72.61.48.71`, e `CNAME www` para
   `tectussolucoes.com.br`. **Os dois em Somente DNS**, nuvem cinza.
2. **Certificado.** Quando `nslookup tectussolucoes.com.br` responder `72.61.48.71`, rodar na VPS:
   ```bash
   certbot --nginx -d tectussolucoes.com.br -d www.tectussolucoes.com.br
   ```
   Ele emite, insere os blocos 443 e liga a renovação. Rodar antes do DNS resolver queima
   tentativa no limite da Let's Encrypt.
3. **Proxy da Cloudflare.** Só depois do HTTPS funcionando direto da VPS. Ligar a nuvem laranja
   nos dois registros e pôr SSL/TLS em **Full (strict)**. Ligar antes dá laço de redirecionamento.
   Este passo é opcional: o site é HTML estático leve, então CDN aqui é conforto.
4. **Search Console.** Conectar e pedir indexação. É o relógio de duas a quatro semanas que
   precisa correr antes da primeira campanha, e ele só começa aqui.
5. **Conversões no GA4.** Abrir o site, clicar num botão de WhatsApp, esperar alguns minutos e
   marcar a estrela em `contato_whatsapp`, `lead_enviado` e `conversa_agendada`. O GA4 não deixa
   criar evento principal pelo nome: ele só oferece a estrela depois de receber o evento uma vez.
   Sem esses três marcados, o Google Ads não tem o que otimizar.

### Coisa pequena que ficou pendente

O `default_server` do Nginx foi removido durante o setup. Requisição que chega sem bater em
nenhum `server_name` conhecido, como acessar pelo IP puro, cai hoje no primeiro bloco em ordem
alfabética, que é o `api.paladardogaucho.com.br`. Não quebra domínio nenhum, mas é sujeira. O
certo é um bloco `default_server` que devolve 444 e fecha a conexão.

---

## Como o site é publicado

**Repositório:** `https://github.com/EmmanuelGBL/Landing-Page-Tectus` (privado).
A VPS clona por SSH usando uma deploy key só de leitura, cadastrada nas Deploy keys do repositório.

**O build acontece na VPS**, não no computador. O caminho por SSH a partir do Windows chegou a
existir em `deploy/publicar.sh` e foi abandonado: fazer tudo no servidor deixa a publicação a um
comando colado no console web da Hostinger, sem chave no computador e sem senha.

### Publicar uma mudança

Editar o código, dar push, e colar isto no console web da VPS:

```bash
sudo -u emmanuel bash /var/www/tectus/site/deploy/publicar-vps.sh
```

O script puxa do GitHub, roda `npm ci`, constrói, **recusa publicar** se o resultado sair com
`Disallow: /` no robots, copia para `releases/<data-hora>`, troca o symlink `current` e recarrega
o Nginx. Guarda as três últimas versões.

**A troca é a última operação e é atômica.** O visitante nunca vê meia publicação, mesmo com o
build demorando dois minutos.

### Voltar atrás

```bash
ls -1t /var/www/tectus/releases
sudo -u emmanuel ln -sfn /var/www/tectus/releases/<versao> /var/www/tectus/current
sudo /usr/bin/systemctl reload nginx
```

---

## O servidor

**VPS Hostinger, `72.61.48.71`, host `srv1121242`, Ubuntu 22.04.**

**Ela não é só da Tectus.** Serve produção de cinco clientes: Paladar Gaúcho em três
subdomínios, Mariah Seguros, Patinhas, PDV, Priorize em site e sistema, mais o evento de
Curitiba. A Priorize roda em Docker com Postgres 16 atrás do Nginx.

**Consequência:** nada de comando de Nginx colado em lote. Antes de mexer, listar
`/etc/nginx/sites-enabled/` e rodar `nginx -t`. Recarregar sempre com
`nginx -t && systemctl reload nginx`, nunca `restart`, que derrubaria os dez sites de uma vez.

### Estrutura em disco

```
/var/www/tectus/site/                 o repositório clonado, onde o build roda
/var/www/tectus/releases/<data-hora>/ cada versão publicada
/var/www/tectus/current               symlink para a versão no ar, é o root do Nginx
```

Tudo pertence ao usuário `emmanuel`, não ao root. A publicação inteira roda sem privilégio, e o
`sudo` está liberado sem senha para **exatamente dois comandos**, em
`/etc/sudoers.d/tectus-deploy`: `nginx -t` e `systemctl reload nginx`.

### Configuração do Nginx

Vive em `/etc/nginx/sites-available/tectussolucoes.com.br`, com cópia versionada em
`deploy/nginx-tectussolucoes.conf`. **Ao mudar uma, mudar a outra**, senão a próxima máquina
recebe uma configuração que não é a que está rodando.

Três pontos dela que não são enfeite:

- `try_files $uri $uri.html` é o que fará as rotas de oferta funcionarem. Sem essa linha,
  `/automacao` daria 404 no dia em que a rota nascer.
- `location = /opengraph-image` força `image/png`. O export grava o arquivo sem extensão no nome,
  e sem esse bloco o preview de link quebra no WhatsApp e no LinkedIn. Era o que o `netlify.toml`
  fazia antes.
- O `www` redireciona para o domínio sem www, porque é o que o canonical e o sitemap declaram.
  Servir as duas versões partiria o sinal de SEO entre dois endereços.

**Sem Content-Security-Policy, de propósito.** A página carrega o GTM, que injeta script de
terceiro em tempo de execução, e uma CSP escrita no escuro quebraria a medição em silêncio. Ela
entra quando estiver fechado o que o container carrega de fato.

---

## Variáveis de ambiente

`.env.production` **está no repositório**, e a exceção é deliberada: os dois valores aparecem no
HTML de toda página publicada, então esconder não esconderia nada de ninguém. O que se ganharia
é zero e o que se perderia é concreto, porque sem eles o site sobe com `noindex` e sem medição,
funcionando para quem visita e invisível para o Google.

| Variável | Valor | O que quebra sem ela |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://tectussolucoes.com.br` | `INDEXAVEL` vira falso, sai `noindex` e `Disallow: /` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-W2NBK5XF` | Nenhum script de medição é injetado |

O `publicar-vps.sh` para o deploy se o robots sair bloqueado, justamente porque essa falha é
invisível e só apareceria semanas depois, quando o Search Console não mostrasse nada.
