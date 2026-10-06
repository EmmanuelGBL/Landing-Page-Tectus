/**
 * Rotas de oferta: uma página por dor, para o anúncio cair numa página que
 * fala exatamente do que a pessoa buscou.
 *
 * Plano e motivo em `docs/plano-rotas-de-oferta.md`. Em resumo: anúncio que
 * promete uma coisa e cai numa home que fala de seis frentes derruba o índice
 * de qualidade e paga mais caro pelo mesmo lugar no leilão.
 *
 * Cada oferta troca só o que precisa trocar (hero, sintomas, perguntas
 * próprias e a origem escrita na mensagem do WhatsApp). Método, processo,
 * case e clientes são os mesmos da home, por isso a oferta é dado e não
 * página nova. A seção de pilares fica fora: ela é o que dilui a mensagem.
 *
 * Este arquivo é texto editorial, como `conteudo.ts`, e as skills de texto
 * trabalham nele. Valem as mesmas regras: nenhum número, prazo ou depoimento
 * sem lastro, e nenhum preço além do funil de entrada.
 */

import { FAQ, type ConteudoHero, type FaqItem } from "@/lib/conteudo";

export type Oferta = {
  /** Caminho da rota, sem barra. */
  slug: string;
  /** Vira "<titulo> | Tectus" pelo template do layout. */
  metaTitulo: string;
  /** Até ~155 caracteres, para não ser truncada no resultado de busca. */
  metaDescricao: string;
  hero: ConteudoHero;
  /** Chaves de `SINTOMAS` que esta dor mostra, na ordem da lista original. */
  sintomas: readonly string[];
  /** Perguntas próprias da oferta. Entram antes das compartilhadas. */
  faq: readonly FaqItem[];
  mensagens: {
    header: string;
    hero: string;
    /** Primeira linha das mensagens montadas (sintomas e formulário). */
    origem: string;
  };
};

/**
 * Grupo de anúncios "Automação". A pessoa digitou algo como "automatizar
 * processo da empresa" ou "automação de tarefa manual".
 */
export const OFERTA_AUTOMACAO: Oferta = {
  slug: "automacao",
  metaTitulo: "Automação de processos para empresas",
  metaDescricao:
    "Automação para a tarefa que a equipe repete toda semana, como relatórios, redigitação entre sistemas e atendimento no WhatsApp. Primeira conversa grátis.",
  hero: {
    /**
     * O rótulo repete o termo buscado, e o H1 também ("automatizada"). É a
     * correspondência entre busca, anúncio e página que barateia o clique.
     */
    eyebrow: "Automação de processos",
    /**
     * Mesma estrutura do H1 da home: a cena primeiro, a saída depois. "Pode
     * ser" e não "vai ser", porque nem toda tarefa compensa automatizar, e
     * descobrir isso é o trabalho da conversa.
     */
    titulo: {
      linha1: "A mesma tarefa à mão, toda semana.",
      linha2: "Ela pode ser automatizada.",
    },
    /**
     * Custo e motivo de ser a Tectus, em 40 palavras. "Deixar uma pessoa onde
     * o caso pede" responde, já na primeira dobra, ao medo de automação que
     * erra sozinha. É o mesmo compromisso escrito no pilar 02 da home.
     */
    subtitulo:
      "Cada hora gasta copiando, conferindo e redigitando sai da sua margem e volta na semana seguinte. A Tectus mapeia o processo antes de automatizar, para tirar do caminho só o que é repetição e deixar uma pessoa onde o caso pede.",
    ctaPrimario: "Quero saber o que dá para automatizar",
    ctaNota: "Pelo WhatsApp. A primeira conversa leva de 30 a 40 minutos e não tem custo.",
    ctaSecundario: "Entender o método",
  },
  /**
   * "tarefa-manual" fica fora de propósito: ela é o próprio H1 desta página,
   * e repeti-la na lista seguinte faria a segunda seção chegar sem novidade.
   * "planilhas" e "presenca" são dores de outras rotas.
   */
  sintomas: ["redigitar", "fechamento", "atendimento", "por-onde-comecar"],
  /**
   * Lastro das três respostas: os tipos de entrega publicados em
   * `PROJETOS_OUTROS` (relatórios recorrentes, integração, atendimento por IA
   * no WhatsApp) e o compromisso do pilar 02 de devolver a uma pessoa o caso
   * que foge do previsto. Nenhum número, nenhum prazo.
   */
  faq: [
    {
      pergunta: "Que tipo de tarefa dá para automatizar?",
      resposta:
        "Relatório que alguém monta à mão toda semana, informação passada de uma ferramenta para outra, a mesma resposta dada no WhatsApp o dia inteiro. São tipos de projeto que a Tectus já entregou. Se a tarefa segue sempre os mesmos passos, ela é candidata.",
    },
    {
      pergunta: "Funciona com as ferramentas que eu já uso?",
      resposta:
        "É uma das primeiras coisas que a conversa verifica. Quando a ferramenta permite, a automação trabalha em cima dela e ninguém precisa trocar de sistema. Quando não permite, você fica sabendo antes de qualquer proposta.",
    },
    {
      pergunta: "A automação vai substituir alguém da equipe?",
      resposta:
        "Ela tira da mesa a parte que se repete, como copiar, conferir e montar o mesmo relatório. O que fazer com o tempo que sobra é decisão sua. E a automação é desenhada para devolver a uma pessoa o caso que foge do previsto.",
    },
  ],
  mensagens: {
    header: "Olá! Vim pela página de automação da Tectus e queria entender como funciona.",
    hero: "Olá! Vim pela página de automação da Tectus. Tenho uma tarefa que a equipe repete toda semana e queria marcar uma conversa sobre isso.",
    origem: "Olá! Vim pela página de automação da Tectus.",
  },
};

/** Perguntas da oferta primeiro, depois as da home. */
export function faqDaOferta(oferta: Oferta): readonly FaqItem[] {
  return [...oferta.faq, ...FAQ];
}
