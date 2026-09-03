/**
 * Camada de medição da página.
 *
 * O único script de terceiro que entra no HTML é o Google Tag Manager. O GA4,
 * a tag de conversão do Google Ads e qualquer pixel futuro são configurados
 * dentro do container, sem tocar em código. O motivo é operacional: marcar uma
 * conversão nova no meio de uma campanha vira tarefa de painel, não deploy.
 *
 * A página empurra evento no `dataLayer` e para por aí. Quem decide o que
 * fazer com cada evento é o GTM.
 *
 * Nomes e definição de cada evento em `Marketing/_padrao/03-Medicao.md`. Não
 * inventar evento fora daquela lista: nome que existe só no código nunca vira
 * conversão no GA4, porque ninguém sabe que ele existe para configurar.
 */

/**
 * Vem do ambiente porque o container é diferente entre teste e produção, e
 * porque medir a própria navegação de desenvolvimento suja o relatório do
 * primeiro mês, que é justamente o mês em que cada sessão pesa.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";

/**
 * Sem ID válido nada é injetado e nenhum evento sai. É esse comportamento que
 * permite escrever a instrumentação antes de a conta existir: o código entra
 * no ar hoje, dorme, e acorda quando a variável for preenchida no build.
 */
export const MEDICAO_ATIVA = /^GTM-[A-Z0-9]+$/.test(GTM_ID);

/**
 * Os eventos que a página dispara por conta própria. Três viram conversão no
 * GA4 (`conversa_agendada` como principal, `lead_enviado` e
 * `contato_whatsapp`), e `clique_portfolio` é sinal de engajamento.
 *
 * `scroll_90` saiu desta lista em 03/09/2026. A métrica otimizada do fluxo de
 * dados do GA4 já mede rolagem a 90% sozinha, com o nome `scroll`, sem custar
 * JavaScript na página. Manter os dois seria medir a mesma coisa duas vezes
 * com nomes diferentes, que é pior do que não medir: o relatório passa a ter
 * duas respostas para a mesma pergunta.
 *
 * `conversa_agendada` ainda não tem ponto de disparo, porque a página de
 * agendamento não existe. Quando ela existir, o disparo é uma chamada só, no
 * retorno de confirmação de horário.
 *
 * `clique_portfolio` também está sem ponto de disparo: os cards da seção de
 * empresas atendidas são `<article>`, não links, então não há clique para
 * medir. Fica declarado para o dia em que algum card virar link.
 *
 * Acrescentar nome aqui não basta: o acionador "Eventos da Tectus", no
 * container GTM-W2NBK5XF, casa os nomes por regex, e o que não estiver nela é
 * empurrado para o dataLayer e ignorado em silêncio.
 */
export type EventoMedicao =
  | "contato_whatsapp"
  | "lead_enviado"
  | "conversa_agendada"
  | "clique_portfolio";

type Parametros = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Empurra o evento no dataLayer.
 *
 * `rota` entra em todo evento porque as rotas de oferta vão dividir o mesmo
 * conjunto de eventos entre páginas diferentes, e sem esse parâmetro o
 * relatório soma tudo e a conversão por oferta deixa de existir. Ver
 * `docs/plano-rotas-de-oferta.md`.
 */
export function enviarEvento(evento: EventoMedicao, parametros: Parametros = {}): void {
  if (typeof window === "undefined" || !MEDICAO_ATIVA) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: evento,
    rota: window.location.pathname,
    ...parametros,
  });
}
