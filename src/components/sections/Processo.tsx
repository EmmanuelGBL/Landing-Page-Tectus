import { FileCheck2, Hammer, Rocket, Search, type LucideIcon } from "lucide-react";
import { BotaoLink, IconeWhatsApp } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, TituloSecao } from "@/components/ui/Section";
import { TracoConector } from "@/components/ui/TracoConector";
import { PROCESSO, PROCESSO_FECHO, PROCESSO_TITULO } from "@/lib/conteudo";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";

/**
 * A escada de valor. Aqui entra a resposta à objeção de preço sem citar preço:
 * o diagnóstico é a entrada acessível e o valor é creditado no projeto, o que
 * remove o risco de "pagar só para ouvir um orçamento".
 *
 * Numeração é informação neste caso: a ordem das etapas importa de verdade.
 *
 * Revisão de design: a seção deixou de ser mais uma grade de cards e virou
 * linha do tempo, com marcadores sobre um traço que se desenha quando a
 * seção aparece. Duas razões. A primeira é de conteúdo: sequência precisa
 * parecer sequência, e quatro cards soltos lado a lado parecem quatro opções.
 * A segunda é de ritmo: cinco seções seguidas com o mesmo layout de grade
 * fazem o olho desligar antes do fim da página.
 */
/** Um ícone por etapa, na ordem de `PROCESSO`. */
const ICONES: readonly LucideIcon[] = [Search, FileCheck2, Hammer, Rocket];

export function Processo() {
  return (
    <Section id="processo" fundo="cinza">
      <Container>
        <TituloSecao
          eyebrow={PROCESSO_TITULO.eyebrow}
          titulo={PROCESSO_TITULO.titulo}
          subtitulo={PROCESSO_TITULO.subtitulo}
        />

        <div className="relative mt-14">
          {/* O traço liga o centro do primeiro marcador ao do último. Some
              abaixo de lg, onde as etapas empilham e a linha não faria
              sentido geométrico. */}
          <TracoConector className="absolute inset-x-[12.5%] top-[13px] hidden lg:block" />

          {/* O marcador fica centralizado na coluna, mas o texto do card
              continua alinhado à esquerda: são 25 a 30 palavras por etapa, e
              bloco de corpo centralizado nesse tamanho derruba a
              legibilidade. */}
          <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESSO.map((etapa, indice) => (
              <li key={etapa.numero} className="flex flex-col items-center">
                <Reveal delay={indice * 110} className="flex h-full w-full flex-col items-center">
                  <span
                    aria-hidden="true"
                    className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 border-petroleo bg-cinza-fundo text-[0.68rem] font-bold text-petroleo-escuro"
                  >
                    {indice + 1}
                  </span>

                  <article className="mt-7 flex h-full w-full flex-col rounded-2xl border border-cinza-linha bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:elevacao-1">
                    <Icone icone={ICONES[indice]} />
                    <h3 className="mt-5 text-[1.1rem] font-semibold tracking-[-0.01em] text-grafite">
                      {etapa.titulo}
                    </h3>
                    <p className="mt-3 text-[0.93rem] leading-relaxed text-chumbo">
                      {etapa.descricao}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-petroleo/25 bg-petroleo/[0.05] p-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-grafite">
            <strong className="font-semibold">{PROCESSO_FECHO.destaque}</strong>{" "}
            {PROCESSO_FECHO.texto}
          </p>
          <BotaoLink
            href={whatsappLink(WHATSAPP_MESSAGES.processo)}
            target="_blank"
            rel="noopener noreferrer"
            className="sheen shrink-0"
          >
            <IconeWhatsApp className="h-4 w-4" />
            {PROCESSO_FECHO.cta}
          </BotaoLink>
        </div>
      </Container>
    </Section>
  );
}
