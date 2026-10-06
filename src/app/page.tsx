import { CaseAncora } from "@/components/sections/CaseAncora";
import { Compromissos } from "@/components/sections/Compromissos";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Metodo } from "@/components/sections/Metodo";
import { Pilares } from "@/components/sections/Pilares";
import { Processo } from "@/components/sections/Processo";
import { Projetos } from "@/components/sections/Projetos";
import { Sintomas } from "@/components/sections/Sintomas";
import { FAQ } from "@/lib/conteudo";

/** FAQPage a partir do mesmo conteúdo exibido, sem duplicar texto. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-grafite focus:px-4 focus:py-2 focus:text-sm focus:text-papel"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Compromissos />
        <Sintomas />
        <Metodo />
        {/* Ordem revista em 06/10/2026. O case subiu para logo depois do
            Método: é a prova de que o método existe, e antes ela chegava só na
            oitava seção. Os pilares desceram para depois do "Como funciona",
            onde leem como o que pode sair do diagnóstico e não como vitrine.
            Os fundos continuam alternando: grafite, papel, cinza, papel, cinza. */}
        <CaseAncora />
        <Processo />
        <Pilares />
        <Projetos />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
