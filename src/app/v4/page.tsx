import type { Metadata } from "next";
import { AjudaFlutuante, CtaFinalV4, FaqV4, RodapeV4 } from "@/components/v4/Fim";
import { ParaQuemV4, PraticaV4, SolucoesV4 } from "@/components/v4/Meio";
import { ClientesV4, PlanosV4, SobreV4 } from "@/components/v4/Prova";
import { CabecalhoV4, HeroV4 } from "@/components/v4/Topo";

/**
 * Prévia pedida pelo Emmanuel em 15/10/2026: a home montada do zero na
 * estrutura de conversaoextrema.com.br, sem o texto nem o formato da home no
 * ar. Ordem das seções igual à da referência; onde ela usa número, foto de
 * fundador ou depoimento, entra o equivalente com lastro.
 *
 * Texto em `src/lib/conteudo-v4.ts`, componentes em `src/components/v4/`.
 * Fora do índice, como as outras prévias.
 */
export const metadata: Metadata = {
  title: "Prévia da home (v4)",
  robots: { index: false, follow: false },
};

export default function HomeV4() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-papel [color-scheme:dark]">
      <CabecalhoV4 />

      <main id="conteudo">
        <HeroV4 />
        <PraticaV4 />
        <SolucoesV4 />
        <ParaQuemV4 />
        <ClientesV4 />
        <PlanosV4 />
        <SobreV4 />
        <FaqV4 />
        <CtaFinalV4 />
      </main>

      <RodapeV4 />
      <AjudaFlutuante />
    </div>
  );
}
