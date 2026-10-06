# Publicação, servidor e domínio

Como a landing sai do código e chega no ar. Última revisão: 04/09/2026.

---

## Onde paramos em 04/09/2026, e o que falta

O site **está no ar em `https://tectussolucoes.com.br`**, domínio próprio, com certificado válido
e proxy da Cloudflare ligado. DNS, certbot e Cloudflare (passos 1 a 3 da lista antiga) estão
concluídos. Verificado de fora, na sequência do dia:

* `nslookup tectussolucoes.com.br` e `nslookup www.tectussolucoes.com.br` resolvendo para
  `72.61.48.71`.
* `certbot --nginx -d tectussolucoes.com.br -d www.tectussolucoes.com.br` emitido com sucesso
  (expira em 03/12/2026, renovação automática agendada pelo próprio certbot).
* `https://tectussolucoes.com.br` responde `200`. `https://www.tectussolucoes.com.br` faz `301`
  para a versão sem `www`, como o Nginx já previa.
* Proxy da Cloudflare ligado (nuvem laranja) nos dois registros, confirmado pelo Emmanuel.

**Consequência que muda o resto da documentação:** `NEXT_PUBLIC_SITE_URL` já bate com o domínio
oficial, então `INDEXAVEL` (`src/lib/site.ts`) já está verdadeiro. O site publicado não está mais
em `noindex`, está indexável de verdade.

### O que ainda falta, na ordem

1. ~~**Search Console.**~~ Feito em 04/09/2026. Propriedade de domínio `tectussolucoes.com.br`
   adicionada na conta `emmanuelgmmonteiro@gmail.com` (a mesma do GA4 e do GTM). Verificação saiu
   pelo registro TXT no Cloudflare, adicionado manualmente pelo Emmanuel (o fluxo automático de
   "Domain Connect" do Google chegou a abrir, mas foi cancelado por ser redundante). Indexação da
   home solicitada pela Inspeção de URL logo em seguida. Relógio de duas a quatro semanas rodando
   a partir de hoje.
2. **Conversões no GA4.** Testado em 04/09/2026, falta só marcar a estrela. Clicando no botão de
   WhatsApp do header e enviando o formulário de diagnóstico (com dado de teste, claramente
   marcado como teste, sem contato real), os dois eventos apareceram no relatório em tempo real:
   `contato_whatsapp` e `lead_enviado`. Mas o GA4 só libera a estrela de conversão em
   **Admin > Eventos > Eventos recentes** depois de processar o evento na lista, o que o próprio
   painel avisa que leva até 24h, sem atalho. Lembrete agendado para 07/09/2026 para voltar e
   marcar os dois. `conversa_agendada` continua sem existir, porque depende da página de
   agendamento, que ainda não está no ar.

### "Página com redirecionamento" no Search Console é esperado, não é defeito

Em 06/09/2026 o Search Console mandou e-mail anunciando um "novo motivo que impede a indexação":
**Página com redirecionamento**. Aberto o relatório, a lista tinha **uma URL só**:
`http://tectussolucoes.com.br/`, rastreada em 04/09.

A propriedade cadastrada é de **domínio**, então ela cobre as quatro variações do endereço, e o
Google rastreia todas. Medido em 07/09/2026:

| URL | Resposta |
|---|---|
| `https://tectussolucoes.com.br/` | 200, a página real |
| `https://www.tectussolucoes.com.br/` | 301 para o domínio sem `www` |
| `http://tectussolucoes.com.br/` | 301 para HTTPS |
| `http://www.tectussolucoes.com.br/` | 301 para HTTPS, depois para sem `www` |

As três variações redirecionadas nunca deveriam virar página no índice, e é isso que o relatório
está dizendo. Seria problema o contrário: a versão HTTP ausente da lista significaria que o site
serve conteúdo sem forçar HTTPS.

**Não clicar em "Você terminou de corrigir os problemas?".** A validação revalida a URL, encontra o
mesmo 301 permanente e falha, deixando alerta no painel por um comportamento correto. O item fica
como está.

Só existe motivo para investigar se `https://tectussolucoes.com.br/` (sem `www`, com HTTPS) aparecer
nessa lista algum dia. Aí o canonical, o sitemap ou o Nginx quebraram.

### Nota: o `robots.txt` no ar não é o que o build gera

A Cloudflare injeta um bloco gerenciado por cima do arquivo servido pela VPS, com `Disallow: /`
para GPTBot, ClaudeBot, CCBot, Bytespider, meta-externalagent e Google-Extended, mais um cabeçalho
`Content-Signal: search=yes,ai-train=no,use=reference`.

Isso **não afeta a indexação**: o Googlebot de busca continua com `Allow: /`, e `Google-Extended`
governa treino de IA, não a busca. Mas é decisão tomada por padrão da plataforma, não por nós, e
significa que ler `https://tectussolucoes.com.br/robots.txt` não mostra o que `src/app/robots.ts`
produziu. Para conferir o nosso, olhar o arquivo dentro da release publicada na VPS.

O `publicar-vps.sh` continua correto ao checar o robots do build: ele valida a nossa parte, que é
a única sob nosso controle.

### Nota do dia: CNAME do `www` errado na primeira tentativa

A primeira configuração do registro `CNAME www` no Cloudflare apontava para o IP `72.61.48.71` em
vez do nome de domínio `tectussolucoes.com.br`. CNAME sempre aponta para um nome, nunca para IP; o
próprio Cloudflare recusou salvar ("Content for CNAME record is invalid"). Corrigido apontando o
CNAME para `tectussolucoes.com.br`. Vale registrar caso o padrão se repita num cliente novo.

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
