import {
  BarChart3,
  Compass,
  Globe,
  Link2,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Icone } from "@/components/ui/Icone";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, TituloSecao } from "@/components/ui/Section";
import { PILARES, PILARES_TITULO } from "@/lib/conteudo";

/**
 * Cada card abre pelo problema, não pelo nome do pilar.
 * Sem valor em reais: o modelo é consultivo e faixa de preço mata o funil.
 * O pilar 06 recebe destaque visual porque é a porta de entrada, não um
 * serviço equivalente aos demais.
 */
/**
 * Um ícone por pilar, pela chave `numero`. Fica no componente, e não em
 * `conteudo.ts`, porque ícone é apresentação: as skills de texto precisam
 * poder reescrever a lista sem esbarrar em componente.
 */
const ICONES: Record<string, LucideIcon> = {
  "01": Globe,
  "02": Workflow,
  "03": Sparkles,
  "04": Link2,
  "05": BarChart3,
  "06": Compass,
};

export function Pilares() {
  return (
    <Section id="solucoes">
      <Container>
        <TituloSecao
          eyebrow={PILARES_TITULO.eyebrow}
          titulo={PILARES_TITULO.titulo}
          subtitulo={PILARES_TITULO.subtitulo}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILARES.map((pilar, indice) => (
            <Reveal key={pilar.numero} delay={indice * 55} className="h-full">
              <article
                className={`flex h-full flex-col rounded-2xl border p-7 transition-all duration-200 hover:-translate-y-0.5 hover:elevacao-2 ${
                  pilar.destaque
                    ? "border-petroleo/35 bg-petroleo/[0.05] hover:border-petroleo/60"
                    : "border-cinza-linha bg-white hover:border-cinza"
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <Icone icone={ICONES[pilar.numero]} />
                  {pilar.destaque ? (
                    <span className="rounded-full bg-petroleo px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.09em] text-white">
                      Comece por aqui
                    </span>
                  ) : null}
                </div>

                <h3 className="text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-grafite">
                  {pilar.problema}
                </h3>

                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-chumbo">
                  {pilar.descricao}
                </p>

                <footer className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-cinza-linha pt-4 text-[0.78rem]">
                  <span className="font-semibold text-grafite">{pilar.nome}</span>
                  <span aria-hidden="true" className="h-3 w-px shrink-0 bg-cinza-linha" />
                  <span className="text-cinza-texto">{pilar.contratacao}</span>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
