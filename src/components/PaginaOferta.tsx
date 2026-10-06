import { CaseAncora } from "@/components/sections/CaseAncora";
import { Compromissos } from "@/components/sections/Compromissos";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Metodo } from "@/components/sections/Metodo";
import { Processo } from "@/components/sections/Processo";
import { Projetos } from "@/components/sections/Projetos";
import { Sintomas } from "@/components/sections/Sintomas";
import { faqDaOferta, type Oferta } from "@/lib/ofertas";
import { NAV_LINKS } from "@/lib/site";

/**
 * Página de uma rota de oferta. Mesmas seções da home, menos os pilares, com
 * o conteúdo da dor trocado. Ver `src/lib/ofertas.ts`.
 *
 * O header vem sem menu: quem chegou por anúncio tem uma ação só a tomar. O
 * rodapé mantém a navegação, apontando para a home, para quem quiser
 * conhecer a Tectus antes de decidir.
 */
const LINKS_DA_HOME = NAV_LINKS.map((link) => ({ ...link, href: `/${link.href}` }));

export function PaginaOferta({ oferta }: { oferta: Oferta }) {
  const faq = faqDaOferta(oferta);

  /** FAQPage a partir das perguntas exibidas nesta rota, sem duplicar texto. */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-grafite focus:px-4 focus:py-2 focus:text-sm focus:text-papel"
      >
        Pular para o conteúdo
      </a>

      <Header links={[]} mensagemWhatsapp={oferta.mensagens.header} />

      <main id="conteudo">
        <Hero conteudo={oferta.hero} mensagemWhatsapp={oferta.mensagens.hero} />
        <Compromissos />
        <Sintomas ids={oferta.sintomas} origem={oferta.mensagens.origem} />
        <Metodo />
        <Processo />
        <CaseAncora />
        <Projetos />
        <Faq itens={faq} />
        <CtaFinal origem={oferta.mensagens.origem} />
      </main>

      <Footer links={LINKS_DA_HOME} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
