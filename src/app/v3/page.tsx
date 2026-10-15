import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { CtaFinalV3, FaqV3, WhatsAppFlutuante } from "@/components/v3/Fim";
import { ClientesV3, MetodoV3, PlanosV3, SolucoesV3 } from "@/components/v3/Meio";
import { ProcessoV3 } from "@/components/v3/ProcessoV3";
import { SintomasV3 } from "@/components/v3/SintomasV3";
import { CabecalhoV3, HeroV3, LINKS_V3 } from "@/components/v3/Topo";

/**
 * Prévia da home no desenho de conversaoextrema.com.br, pedida pelo Emmanuel
 * em 14/10/2026. Copy da `/v2`, layout novo. Texto que só existe aqui em
 * `src/lib/conteudo-v3.ts`; componentes em `src/components/v3/`.
 *
 * A página inteira é escura, o que contraria a regra de 24/08/2026 ("um
 * bloco escuro por página"). É a referência pedida por ele, e a decisão de
 * trocar a regra é dele: por isso fica em rota de prévia, fora do índice.
 */
export const metadata: Metadata = {
  title: "Prévia da home (v3)",
  robots: { index: false, follow: false },
};

export default function HomeV3() {
  return (
    <div className="bg-grafite-alto text-papel [color-scheme:dark]">
      <CabecalhoV3 />

      <main id="conteudo">
        <HeroV3 />
        <SintomasV3 />
        <ProcessoV3 />
        <SolucoesV3 />
        <ClientesV3 />
        <PlanosV3 />
        <MetodoV3 />
        <FaqV3 />
        <CtaFinalV3 />
      </main>

      <Footer links={LINKS_V3} />
      <WhatsAppFlutuante />
    </div>
  );
}
