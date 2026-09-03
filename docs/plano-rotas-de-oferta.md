# Plano: rotas de oferta

Decidido em 03/09/2026, **não construído.** O Emmanuel pediu para anotar sem executar.

Decisão e motivo em `Marca/05-Historico-e-Decisoes.md`, seção "Rotas de oferta na landing".

---

## O problema que isto resolve

Anúncio que promete "atendimento no WhatsApp que responde de madrugada" e cai numa home que fala
dos seis pilares perde correspondência. O Google cobra mais caro pela mesma posição quando o termo
buscado, o título do anúncio e o conteúdo da página não falam da mesma coisa.

## As três rotas

| Rota | Grupo de anúncios | Verba na rodada 1 |
|---|---|---|
| `/agente-whatsapp` | Agente no WhatsApp | Sim |
| `/automacao` | Automação | Sim |
| `/sistemas` | Sistemas Sob Medida | Não. Existe para SEO e para quem chegar por outro caminho |

**Três é teto.** Rota sem verba e sem tráfego orgânico é página que envelhece sozinha.

`/agente-whatsapp` só vai ao ar depois de o agente estar rodando na própria Tectus. Ver
`Marketing/_padrao/04-Preparo-Comercial.md`.

---

## Arquitetura

Mesmo domínio, mesmo projeto Next, mesmas seções. Sites separados partiriam a autoridade de SEO,
triplicariam a manutenção e quebrariam a leitura no GA4.

O conteúdo da landing já é dirigido por dados em `src/lib/conteudo.ts`, então a rota de oferta é
uma troca de dados, não uma página nova escrita do zero.

### Estrutura sugerida

```
src/app/(ofertas)/[oferta]/page.tsx     rota dinâmica, generateStaticParams com os 3 slugs
src/lib/ofertas.ts                       o mapa de ofertas por slug
```

### O que muda por oferta e o que é compartilhado

| Seção | Comportamento |
|---|---|
| `Hero` | **Muda.** Eyebrow, H1, subtítulo e CTA vêm da oferta |
| `Sintomas` | **Muda.** Filtrado pelos sintomas daquela dor |
| `Metodo` · `Processo` · `Compromissos` | Compartilhado, sem alteração |
| `CaseAncora` · `Projetos` | Compartilhado. Filtrar por pilar quando houver case suficiente |
| `Faq` | Compartilhado mais 2 ou 3 perguntas específicas da oferta |
| `CtaFinal` · `Header` · `Footer` | Compartilhado |
| `Pilares` | **Sai da rota de oferta.** É o que dilui a mensagem. Fica só na home |

### O CTA das três rotas é o mesmo

**Conversa de descoberta gratuita, de 30 a 40 minutos**, levando à página de agendamento. O preço
do diagnóstico não aparece na rota de oferta, ele aparece na seção de preço da home e na conversa.
Regra fechada em `Marca/06-Funil-de-Entrada.md`.

O H1 precisa repetir o termo que a pessoa buscou. É a correspondência que sustenta o índice de
qualidade, e é o item que mais barateia o clique.

---

## Medição

Cada rota precisa dos eventos de `Marketing/_padrao/03-Medicao.md` disparando com a rota
identificada, senão a conversão por oferta não existe no relatório.

Ler conversão por rota como **direção, não como prova.** Com ~120 cliques na rodada 1 divididos em
duas rotas, não há significância estatística para teste A/B. Ver
`Marketing/Google-Ads/Expectativa-Verba-1200.md`.

---

## SEO

- Rota de oferta indexável, com `title` e `description` próprios
- Entra no `sitemap.ts`
- Sem link cruzado entre as três no corpo da página, para não dispersar quem chegou pela dor
- A home continua sendo o destino da busca de marca

---

## Regras de escrita que valem nas três

`CLAUDE.md` na raiz do projeto, seção "Regras de escrita". Uma vale mais que as outras aqui:
**a rota `/agente-whatsapp` não vende "IA".** Ela fala da mensagem que chegou às 22h e ficou sem
resposta. A palavra é comprada como palavra-chave porque é o que a pessoa digita, e não vira o
argumento da página.
