/**
 * Texto próprio da prévia `/v3` (14/10/2026): a home com a estrutura visual de
 * conversaoextrema.com.br, pedida pelo Emmanuel como referência.
 *
 * A copy de base é a da `/v2` (`conteudo-v2.ts`). Aqui fica só o que o layout
 * novo exige e não existia: títulos em duas partes (branco e acento), as
 * quatro linhas de "Como funciona" e a seção de planos.
 *
 * O que a referência tem e a Tectus não tem foi trocado, nunca imitado:
 * - "+40 mil empresas" e números em cards: sem número na página.
 * - Depoimentos em vídeo com faturamento: entra o antes e depois dos clientes
 *   autorizados, sem estrela e sem aspas.
 * - Seção dos sócios com foto: a voz é da empresa, entra o Método.
 * - Preço dos planos: em branco, a pedido dele. O valor documentado em
 *   `Marca/03-Portfolio-e-Precos.md` não foi usado.
 */

import { CASE_ANCORA, PROJETOS_TITULO } from "@/lib/conteudo";

/** Título de seção em duas partes: a primeira em branco, a segunda no acento. */
export type TituloDuplo = readonly [string, string];

export const HERO_V3 = {
  /** Selo acima do H1, no lugar do "+40 mil empresas" da referência. */
  selo: "Atendimento remoto para empresas de todo o Brasil",
  ctaSecundario: "Ver como funciona",
  /**
   * Legenda dos cartões ao lado do título. Sem ela, os cartões seriam lidos
   * como tela de um produto pronto ou como resultado de cliente.
   */
  legendaVisual: "Exemplos do que pode sair do diagnóstico",
} as const;

export const PROBLEMA_V3 = {
  titulo: ["Quantas dessas acontecem", "na sua empresa?"] as TituloDuplo,
} as const;

export const PROCESSO_V3 = {
  eyebrow: "Como funciona",
  titulo: ["Quatro etapas,", "nenhuma surpresa no meio."] as TituloDuplo,
  subtitulo: "Você sabe onde está, o que vem depois e quanto custa em cada uma delas.",
  etapas: [
    {
      numero: "01",
      nome: "Conversa",
      titulo: ["Você conta o que trava.", "Dizemos se dá para ajudar."] as TituloDuplo,
      texto:
        "Começa pelo WhatsApp, leva de 30 a 40 minutos e não tem custo. Basta descrever a situação, sem termo técnico.",
      cta: "Marcar a primeira conversa",
    },
    {
      numero: "02",
      nome: "Diagnóstico",
      titulo: ["Mapeamos a operação", "e mostramos o que resolver primeiro."] as TituloDuplo,
      texto:
        "Você recebe um documento com o processo mapeado, os pontos onde tempo e dinheiro vazam, e a recomendação com o escopo. Custa R$ 500, abatidos do projeto e devolvidos se você achar que não valeu.",
    },
    {
      numero: "03",
      nome: "Proposta",
      titulo: ["Escopo, valor e prazo", "fechados por escrito."] as TituloDuplo,
      texto:
        "A proposta sai do diagnóstico e diz o que será construído, quanto custa e quando fica pronto. O valor é por entrega e não muda com as horas trabalhadas.",
    },
    {
      numero: "04",
      nome: "Construção e entrega",
      titulo: ["Você acompanha cada entrega.", "No fim, tudo é seu."] as TituloDuplo,
      texto:
        "O desenvolvimento acontece em entregas parciais, com o pagamento acompanhando as etapas. Na entrega final vêm a documentação e o treinamento da equipe que vai operar.",
    },
  ],
} as const;

export const SOLUCOES_V3 = {
  titulo: ["Seis caminhos possíveis.", "O diagnóstico aponta o seu."] as TituloDuplo,
} as const;

export const PROVA_V3 = {
  eyebrow: PROJETOS_TITULO.eyebrow,
  titulo: ["Segmentos diferentes,", "o mesmo ponto de partida."] as TituloDuplo,
  subtitulo: PROJETOS_TITULO.subtitulo,
  destaque: CASE_ANCORA,
} as const;

/**
 * Os três planos de recorrência de `Marca/03-Portfolio-e-Precos.md`, com o
 * que cada um entrega. O preço fica em branco, a pedido do Emmanuel.
 *
 * O documento diz que a recorrência é oferecida depois da entrega, nunca
 * embutida na proposta. Por isso a seção se apresenta como "depois da
 * entrega" e afirma que o plano é opcional.
 */
export const PLANOS_V3 = {
  eyebrow: "Depois da entrega",
  titulo: ["Escolha como seguir", "depois que o projeto termina."] as TituloDuplo,
  subtitulo:
    "O acompanhamento é opcional. O que foi construído continua sendo seu, com ou sem plano.",
  rotuloValor: "Valor em definição",
  recursos: [
    "Sistema mantido no ar",
    "Correção de erros",
    "Dúvidas da equipe respondidas",
    "Melhorias contínuas",
    "Participação nas decisões de tecnologia",
  ],
  planos: [
    {
      nome: "Suporte",
      resumo: "Para manter funcionando no dia a dia o que foi construído.",
      inclui: 3,
      cta: "Conversar sobre o Suporte",
      mensagem: "Olá! Vi o plano de Suporte no site da Tectus e queria entender como funciona.",
    },
    {
      nome: "Evolução",
      resumo: "Suporte e melhorias contínuas, para o sistema acompanhar a operação.",
      inclui: 4,
      /**
       * O selo tem lastro: o documento de portfólio diz que automação e
       * atendimento com IA pedem ajuste contínuo, que é o que este plano
       * entrega. Não é "mais vendido", que seria número inventado.
       */
      selo: "Indicado para automações",
      cta: "Conversar sobre a Evolução",
      mensagem: "Olá! Vi o plano de Evolução no site da Tectus e queria entender como funciona.",
    },
    {
      nome: "Parceria estratégica",
      resumo: "Evolução e a Tectus junto nas decisões de tecnologia da empresa.",
      inclui: 5,
      cta: "Conversar sobre a Parceria",
      mensagem:
        "Olá! Vi o plano de Parceria estratégica no site da Tectus e queria entender como funciona.",
    },
  ],
} as const;

export const FAQ_V3 = {
  titulo: ["O que costuma", "travar a decisão."] as TituloDuplo,
} as const;

export const CTA_FINAL_V3 = {
  titulo: ["Conte onde a sua operação", "está travando."] as TituloDuplo,
  formularioTitulo: "Prefere descrever por escrito?",
} as const;

export const WHATSAPP_FLUTUANTE = "Falar no WhatsApp";
