/**
 * Proposta da skill `copywriter-b2b-pro` para a home (14/10/2026), em prévia
 * na rota `/v2`. Estratégia em `docs/estrategia-copy-home.md`.
 *
 * Fica em arquivo próprio para a home no ar não mudar uma vírgula enquanto a
 * proposta não for aprovada. Só está aqui o que muda; o resto a `/v2` lê de
 * `conteudo.ts`. Se aprovado, cada constante daqui substitui a equivalente
 * de lá, e este arquivo e a rota `/v2` são apagados.
 *
 * Três motivos de mudança, e nenhum fato novo:
 * 1. O hero passa a dizer o que a Tectus faz.
 * 2. O título do Método repetia o H1 novo, e a ideia da "solução menor"
 *    aparecia cinco vezes. Ficou no hero e no fecho do Método.
 * 3. Antítese didática ("é X, não Y"), regra 4 da marca, reescrita onde
 *    aparecia.
 */

import {
  FAQ,
  HERO,
  METODO,
  PILARES,
  PILARES_TITULO,
  SINTOMAS_TITULO,
  type ConteudoHero,
  type ConteudoMetodo,
  type ConteudoSintomasTitulo,
  type FaqItem,
  type Pilar,
  type TituloDeSecao,
} from "@/lib/conteudo";

/**
 * Quem chega na home já conhece o nome (marca, indicação, Instagram): os
 * anúncios vão para as rotas de oferta. Então o H1 responde o que a Tectus
 * faz, e o subtítulo carrega a ideia central, a solução do tamanho do
 * problema. CTA e nota não mudam.
 */
export const HERO_V2: ConteudoHero = {
  titulo: {
    linha1: "Encontramos onde sua operação trava.",
    linha2: "Construímos o que resolve.",
  },
  subtitulo:
    "Sistemas, automações, integrações e sites para empresas que cresceram na planilha e no WhatsApp. Cada solução tem o tamanho que o problema pede, e às vezes é menor do que você imaginava.",
  ctaPrimario: HERO.ctaPrimario,
  ctaNota: HERO.ctaNota,
  ctaSecundario: HERO.ctaSecundario,
};

/**
 * Subtítulo e fecho eram antítese ("Nenhuma é sinal de equipe ruim. São
 * sinais de..." e "não é caso isolado. É a soma"). O argumento é o mesmo:
 * a culpa é do processo, e a equipe fica absolvida sem a construção em
 * negativo.
 */
export const SINTOMAS_TITULO_V2: ConteudoSintomasTitulo = {
  ...SINTOMAS_TITULO,
  subtitulo:
    "Elas aparecem quando a operação cresce mais rápido que o processo, mesmo com uma equipe boa.",
  fecho:
    "Com duas ou mais, o problema já está no processo. É a soma delas que costuma segurar o crescimento.",
};

/**
 * O título antigo ("Primeiro entendemos. Depois construímos.") dizia o mesmo
 * que o H1 novo, no mesmo ritmo, e é o "X antes de Y" que já derrubou o selo
 * do hero. O título passa a nomear o risco que o Método resolve, que era a
 * primeira frase do parágrafo, e o parágrafo ganha a cena desse risco.
 *
 * No cartão, o terceiro compromisso repetia o fecho ao lado. Saiu, e entrou
 * o pagamento por etapas, que estava na faixa de Compromissos cortada da
 * `/v2`. Assim nenhum compromisso some da página. O primeiro perdeu o
 * "nunca por hora trabalhada", que era antítese.
 */
export const METODO_V2: ConteudoMetodo = {
  ...METODO,
  titulo: ["Dinheiro perdido em tecnologia", "costuma ir para o problema errado."],
  paragrafos: [
    "É o sistema que funciona, que a equipe aprendeu a usar, e que deixou o gargalo onde estava. Ele foi orçado a partir do pedido, e o pedido apontava para o lugar errado.",
    "Por isso todo projeto da Tectus começa pelo diagnóstico. Olhamos onde a operação emperra e quanto isso custa.",
  ],
  compromissos: [
    "O preço é do problema resolvido e não muda com as horas trabalhadas.",
    "Escopo, valor e prazo ficam escritos na proposta.",
    "O pagamento acompanha as entregas, com uma parte na entrada.",
  ],
};

/** "Menor do que você imaginava" já está no hero. Aqui ficou repetição. */
export const PILARES_TITULO_V2: TituloDeSecao = {
  ...PILARES_TITULO,
  subtitulo: "Você não precisa chegar sabendo qual escolher. Pode ser uma frente só.",
};

/** Três descrições em antítese. Chave: número do pilar. */
const DESCRICOES_V2: Record<string, string> = {
  "01": "Site que explica o que você faz, passa confiança a quem pesquisa sua empresa e transforma visitante em contato.",
  "03": "Segue as regras do seu negócio, e a equipe para de contornar ferramenta feita para outra empresa. Cresce em etapas, junto com a operação.",
  "05": "Dashboard que mostra como a operação está hoje, sem esperar o relatório que alguém monta à mão no fim do mês.",
};

export const PILARES_V2: readonly Pilar[] = PILARES.map((pilar) => ({
  ...pilar,
  descricao: DESCRICOES_V2[pilar.numero] ?? pilar.descricao,
}));

/**
 * Três respostas em antítese. A da empresa pequena também repetia a ideia da
 * solução menor; agora responde pelo dimensionamento, que é o mecanismo.
 * Chave: a pergunta, igual à de `FAQ`.
 */
const RESPOSTAS_V2: Record<string, string> = {
  "E se eu não souber o que preciso?":
    "É o ponto de partida mais comum. Descobrir o que precisa ser feito é justamente o trabalho do diagnóstico, e para começar basta contar o que incomoda na operação.",
  "Minha empresa é pequena demais para isso?":
    "Pequena costuma ser o melhor tamanho para começar. Em operação enxuta cada hora perdida pesa mais, e é justamente aí que organizar o processo se nota. O projeto é dimensionado pelo problema, então ele chega do tamanho da sua empresa.",
  "Eu fico dependente da Tectus depois da entrega?":
    "Não. O que é construído é seu, com documentação e a equipe treinada para operar. Acompanhamento contínuo existe para quem quiser, e é uma escolha sua depois da entrega.",
};

export const FAQ_V2: readonly FaqItem[] = FAQ.map((item) => ({
  ...item,
  resposta: RESPOSTAS_V2[item.pergunta] ?? item.resposta,
}));
