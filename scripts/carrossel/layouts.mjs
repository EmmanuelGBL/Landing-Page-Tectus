/**
 * Layouts de slide 1080x1350, conforme
 * `.claude/skills/carrossel/references/sistema-visual.md`.
 *
 * Os elementos são objetos `{ type, props }` em vez de JSX porque este é um
 * script Node puro, sem etapa de compilação. O satori aceita os dois: JSX é
 * só açúcar para essa mesma forma.
 *
 * Limites do satori que valem aqui: só flexbox, sem grid, sem filtro, e todo
 * elemento com mais de um filho precisa de `display: flex` explícito.
 */
import { MONOGRAMA, TEMA } from "./marca.mjs";

export const TAMANHO = { width: 1080, height: 1350 };
const PADDING = 88;

const caixa = (style, children) => ({
  type: "div",
  props: { style, children },
});
const texto = (style, conteudo) => ({
  type: "div",
  props: { style, children: conteudo },
});

/**
 * Monograma na geometria de `src/lib/marca.ts`. As três peças não se encostam,
 * e o vão entre elas é característica do desenho: não preencher.
 */
const monograma = (tamanho, cores) => ({
  type: "svg",
  props: {
    width: tamanho,
    height: tamanho,
    viewBox: MONOGRAMA.viewBox,
    children: [
      { type: "polygon", props: { points: MONOGRAMA.barra, fill: cores[0] } },
      {
        type: "polygon",
        props: { points: MONOGRAMA.hasteBase, fill: cores[1] },
      },
      {
        type: "polygon",
        props: { points: MONOGRAMA.hasteAcento, fill: cores[2] },
      },
    ],
  },
});

const regua = (cor, largura = 76) =>
  caixa({ width: largura, height: 4, backgroundColor: cor, marginBottom: 30 });

const eyebrow = (conteudo, cor) =>
  texto(
    {
      fontSize: 15,
      fontWeight: 800,
      letterSpacing: "0.28em",
      color: cor,
      marginBottom: 26,
    },
    conteudo.toUpperCase(),
  );

const contador = (n, total, cor) =>
  texto(
    { fontSize: 15, fontWeight: 500, letterSpacing: "0.18em", color: cor },
    `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  );

/**
 * Faixa do acento cortada pela borda. É o "vazamento": ela sai pela direita de
 * um slide e entra pela esquerda do seguinte, o que cria o impulso de arrastar.
 */
const sangria = (lado, cor) =>
  caixa({
    position: "absolute",
    top: 0,
    [lado]: 0,
    width: 22,
    height: 780,
    backgroundColor: cor,
  });

const raiz = (tema, children) =>
  caixa(
    {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: tema.fundo,
      padding: PADDING,
      fontFamily: "Inter",
    },
    children,
  );

/** Topo dos slides internos: monograma à esquerda, contador à direita. */
const topo = (tema, pagina, total) =>
  caixa(
    { display: "flex", alignItems: "center", justifyContent: "space-between" },
    [monograma(52, tema.monograma), contador(pagina, total, tema.corpo)],
  );

/**
 * Empurra o bloco de texto para o terço inferior do slide.
 *
 * Centralizado, o texto ficava boiando com vazio igual em cima e embaixo, e
 * slide de três linhas lia como arte inacabada. Ancorado embaixo, o vazio vira
 * respiro de capa de revista: um lugar só, e proposital.
 */
const ancorado = (children, respiro = 60) =>
  caixa(
    {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "flex-end",
      paddingBottom: respiro,
    },
    children,
  );

/**
 * Bloco no eixo vertical do slide.
 *
 * Serve ao layout que não tem rodapé para segurar a base. Ancorar embaixo sem
 * rodapé deixa dois terços de vazio no topo, que é desequilíbrio, não respiro.
 */
const centrado = (children) =>
  caixa(
    {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "center",
    },
    children,
  );

const rodape = (tema, direita) =>
  caixa(
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: `1px solid ${tema.linha}`,
      paddingTop: 28,
    },
    [
      texto(
        {
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: tema.titulo,
        },
        "TECTUS",
      ),
      texto({ fontSize: 21, fontWeight: 500, color: tema.acento }, direita),
    ],
  );

/* ---------------------------------------------------------------------- */

/** CAPA — eyebrow, título grande, régua, apoio, rodapé. */
const capa = ({ fundo, kicker, titulo, apoio, rodapeDireita, sangra }) => {
  const tema = TEMA[fundo];
  const linhas = titulo.map((linha, i) =>
    texto(
      {
        fontSize: 96,
        fontWeight: 900,
        letterSpacing: "-0.04em",
        lineHeight: 0.98,
        color: tema.titulo,
        marginTop: i === 0 ? 0 : 6,
      },
      linha,
    ),
  );

  return raiz(tema, [
    ...(sangra ? [sangria(sangra, tema.acento)] : []),
    monograma(64, tema.monograma),
    ancorado([
      ...(kicker ? [eyebrow(kicker, tema.acento)] : []),
      caixa(
        { display: "flex", flexDirection: "column", marginBottom: 34 },
        linhas,
      ),
      regua(tema.acento),
      texto(
        {
          fontSize: 26,
          fontWeight: 500,
          lineHeight: 1.5,
          color: tema.corpo,
          maxWidth: 760,
        },
        apoio,
      ),
    ]),
    rodape(tema, rodapeDireita),
  ]);
};

/**
 * PILARES — pilha tipográfica numerada, uma linha por frente de trabalho.
 * Não é card nem bullet: é lista vertical com divisória fina, que é o formato
 * que o sistema visual autoriza.
 */
const pilares = ({ fundo, kicker, pagina, total, itens, fecho, sangra }) => {
  const tema = TEMA[fundo];
  const linhas = itens.map((item, i) =>
    caixa(
      {
        display: "flex",
        alignItems: "center",
        paddingBottom: 17,
        marginBottom: 17,
        borderBottom:
          i === itens.length - 1 ? "none" : `1px solid ${tema.linha}`,
      },
      [
        texto(
          {
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: "0.18em",
            color: tema.acento,
            width: 74,
          },
          String(i + 1).padStart(2, "0"),
        ),
        texto(
          {
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            color: tema.titulo,
          },
          item,
        ),
      ],
    ),
  );

  return raiz(tema, [
    ...(sangra ? [sangria(sangra, tema.acento)] : []),
    topo(tema, pagina, total),
    caixa({ display: "flex", flexDirection: "column" }, [
      eyebrow(kicker, tema.acento),
      regua(tema.acento),
      caixa({ display: "flex", flexDirection: "column" }, linhas),
    ]),
    texto(
      {
        fontSize: 25,
        fontWeight: 500,
        lineHeight: 1.5,
        color: tema.corpo,
        maxWidth: 780,
      },
      fecho,
    ),
  ]);
};

/** DECLARAÇÃO — kicker, h2 âncora, régua, parágrafo de apoio. */
const declaracao = ({ fundo, kicker, pagina, total, titulo, corpo }) => {
  const tema = TEMA[fundo];
  return raiz(tema, [
    topo(tema, pagina, total),
    centrado([
      eyebrow(kicker, tema.acento),
      texto(
        {
          fontSize: 88,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
          color: tema.titulo,
          marginBottom: 34,
          maxWidth: 880,
        },
        titulo,
      ),
      regua(tema.acento),
      texto(
        {
          fontSize: 28,
          fontWeight: 500,
          lineHeight: 1.5,
          color: tema.corpo,
          maxWidth: 800,
        },
        corpo,
      ),
    ]),
  ]);
};

/** CTA FINAL — monograma centralizado, chamada curta e o destino do clique. */
const cta = ({ fundo, titulo, destino }) => {
  const tema = TEMA[fundo];
  return caixa(
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tema.fundo,
      padding: PADDING,
      fontFamily: "Inter",
    },
    [
      monograma(128, tema.monograma),
      texto(
        {
          fontSize: 58,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.14,
          color: tema.titulo,
          textAlign: "center",
          marginTop: 64,
          marginBottom: 40,
          maxWidth: 800,
        },
        titulo,
      ),
      caixa({
        width: 76,
        height: 4,
        backgroundColor: tema.acento,
        marginBottom: 40,
      }),
      texto(
        {
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: tema.corpo,
        },
        destino,
      ),
    ],
  );
};

export const LAYOUTS = { capa, pilares, declaracao, cta };
