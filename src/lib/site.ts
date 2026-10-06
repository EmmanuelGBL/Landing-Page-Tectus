/**
 * Fonte única de verdade sobre a marca e o contato.
 * Nenhum componente escreve número, e-mail ou URL direto no JSX.
 */

/** Domínio final da marca. Registrado no registro.br em 31/08/2026. */
export const DOMINIO_OFICIAL = "https://tectussolucoes.com.br";

/**
 * URL usada em metadata, canonical, sitemap e robots.
 *
 * Na Netlify o build injeta `NEXT_PUBLIC_SITE_URL` a partir de `$URL`, que é
 * a URL principal do site: hoje o subdomínio `.netlify.app`, e o domínio
 * próprio no instante em que ele for apontado. Fora da Netlify (build local)
 * cai no domínio oficial, que é o destino real da página.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || DOMINIO_OFICIAL;

/**
 * Só liberamos indexação no domínio definitivo.
 *
 * Publicar indexável no subdomínio da Netlify criaria um endereço concorrente
 * da marca no Google, com canonical apontando para um domínio que ainda não
 * resolve. Depois, migrar autoridade de um endereço temporário custa mais do
 * que esperar. A trava se desfaz sozinha quando o domínio virar o principal
 * do site na Netlify.
 */
export const INDEXAVEL = SITE_URL === DOMINIO_OFICIAL;

export const COMPANY = {
  brand: "Tectus",
  /**
   * Razão social fechada com o contador em 31/08/2026, na abertura do CNPJ.
   *
   * A versão anterior usava "Soluções", termo que a Junta Comercial veda em nome
   * empresarial. A substituição aceita foi "Serviços". O registro ainda aguarda
   * a análise de viabilidade, então o nome pode voltar a mudar.
   *
   * Aparece em rodapé, no author/creator/publisher do metadata e no legalName do
   * structured data. Em peça de marketing, nunca. Lá é sempre Tectus.
   */
  legalName: "Tectus Serviços Digitais e Consultoria em TI Ltda",
  /** CNPJ, confirmado pelo Emmanuel em 02/09/2026 após o registro sair. Aparece em rodapé e structured data. */
  cnpj: "68.926.012/0001-85",
  slogan: "Tecnologia que impulsiona. Automação que transforma.",
  positioning:
    "Soluções digitais que eliminam gargalos operacionais, automatizam processos e impulsionam o crescimento das empresas.",
  /** Atuação nacional e remota. Sem cidade na comunicação, por decisão de marca. */
  areaServed: "BR",
} as const;

export const CONTACT = {
  /** Chip profissional, confirmado em 20/08/2026. Formato E.164 sem sinal. */
  whatsappNumber: "5592991837630",
  whatsappDisplay: "(92) 99183-7630",
  /**
   * E-mail comercial, definido pelo Emmanuel em 21/08/2026.
   *
   * O formulário da seção final continua entregando via WhatsApp, e isso é
   * decisão, não pendência: enviar de verdade exige rota de API com servidor
   * de e-mail configurado, que ainda não existe. Abrir o WhatsApp com o texto
   * pronto entrega a mensagem de fato. Um formulário que finge enviar perde
   * o lead em silêncio.
   *
   * O endereço aparece como canal alternativo (rodapé, seção de contato e
   * structured data), para quem prefere e-mail a WhatsApp.
   */
  email: "contato@tectussolucoes.com.br" as string | null,
} as const;

/**
 * Monta o link do WhatsApp com mensagem pré-preenchida.
 * A mensagem identifica a seção de origem, o que qualifica o lead
 * antes mesmo da primeira resposta.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensagens por ponto de saída da página. */
export const WHATSAPP_MESSAGES = {
  header: "Olá! Vim pelo site da Tectus e queria entender melhor como funciona.",
  hero: "Olá! Vim pelo site da Tectus. Minha empresa tem um processo travando e queria marcar uma conversa sobre isso.",
  metodo:
    "Olá! Li sobre o diagnóstico no site da Tectus e queria entender como funciona na prática.",
  // Pedia o diagnóstico, que é a etapa paga. O botão agora oferece a
  // conversa gratuita, e a mensagem precisa pedir a mesma coisa.
  processo: "Olá! Vim pelo site da Tectus e queria marcar a primeira conversa. Como funciona?",
  cases: "Olá! Vi o caso da Priorize no site da Tectus e queria conversar sobre a minha operação.",
  formularioFallback: "Olá! Vim pelo site da Tectus.",
} as const;

export type LinkNavegacao = { href: string; label: string };

export const NAV_LINKS: readonly LinkNavegacao[] = [
  { href: "#sintomas", label: "Sintomas" },
  { href: "#metodo", label: "Método" },
  { href: "#processo", label: "Como funciona" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#projetos", label: "Clientes" },
  { href: "#faq", label: "Dúvidas" },
] as const;
