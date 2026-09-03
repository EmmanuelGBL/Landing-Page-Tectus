/**
 * Conteúdo dos posts. É o único arquivo que muda para editar um slide: o
 * layout fica em `layouts.mjs` e a marca em `marca.mjs`.
 *
 * Regra de ritmo do sistema visual: nunca dois slides seguidos com o mesmo
 * fundo, nunca dois seguidos com o mesmo layout. A alternância abaixo é
 * grafite, papel, grafite, petróleo.
 */
export const POSTS = [
  {
    pasta: "post-apresentacao-2026-08-25",
    slides: [
      {
        layout: "capa",
        fundo: "petroleo",
        // Quatro linhas explícitas: em 96px a frase não cabe em duas, e quebra
        // por acaso do layout é quebra que muda sozinha na próxima edição.
        titulo: ["Primeiro", "entendemos.", "Depois", "construímos."],
        apoio: "Consultoria em tecnologia para empresas.",
        rodapeDireita: "@tectussolucoes",
      },
    ],
  },
  {
    pasta: "carrossel-quem-e-a-tectus-2026-08-25",
    slides: [
      {
        layout: "capa",
        fundo: "grafite",
        kicker: "Apresentação",
        titulo: ["Quem é", "a Tectus"],
        apoio: "Entendemos o gargalo antes de propor qualquer sistema.",
        rodapeDireita: "Arraste",
        sangra: "right",
      },
      {
        layout: "pilares",
        fundo: "papel",
        kicker: "O que fazemos",
        pagina: 2,
        total: 4,
        sangra: "left",
        itens: [
          "Presença digital",
          "Automação de processos",
          "Sistemas sob medida",
          "Integrações",
          "Dados e inteligência",
          "Consultoria em tecnologia",
        ],
        fecho: "Qual desses você precisa é o diagnóstico que responde.",
      },
      {
        layout: "declaracao",
        fundo: "grafite",
        kicker: "Quem atendemos",
        pagina: 3,
        total: 4,
        titulo: "O ramo não importa.",
        corpo: "O que importa é quanto do seu dia é gasto refazendo trabalho que já foi feito.",
      },
      {
        layout: "cta",
        fundo: "petroleo",
        titulo: "Manda no direct onde sua operação trava hoje.",
        destino: "@tectussolucoes",
      },
    ],
  },
];
