import { GraduationCap, Layers, Search, type LucideIcon } from "lucide-react";
import { Icone } from "@/components/ui/Icone";
import { Container } from "@/components/ui/Section";
import { COMPROMISSOS } from "@/lib/conteudo";

/**
 * Faixa fina entre o hero e o diagnóstico.
 *
 * Substitui duas coisas que estavam aqui antes e saíram em 24/08/2026: a
 * faixa de logos de clientes, que repetia marcas já presentes na seção de
 * empresas atendidas, e a barra de três promessas que morava dentro do hero
 * e ajudava a lotar a primeira dobra.
 *
 * O conteúdo é o mesmo daquelas três promessas. O que mudou é o lugar: aqui
 * ela é uma batida de leitura própria, curta, sem título de seção e sem CTA,
 * logo depois de o visitante ter decidido continuar. Responde à pergunta que
 * vem em seguida ao "isso é comigo": e como é trabalhar com vocês.
 *
 * Sem número, sem depoimento. As três afirmações têm lastro documentado.
 */
const ICONES: readonly LucideIcon[] = [Search, Layers, GraduationCap];

export function Compromissos() {
  return (
    <section
      aria-label="Como trabalhamos"
      className="border-y border-cinza-linha bg-cinza-fundo py-8 lg:py-10"
    >
      <Container>
        <ul className="grid gap-7 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-cinza-linha">
          {COMPROMISSOS.itens.map((item, indice) => (
            <li key={item.titulo} className="flex gap-4 sm:px-7 sm:first:pl-0 sm:last:pr-0">
              <Icone icone={ICONES[indice]} tamanho="sm" />
              <div className="min-w-0">
                <p className="text-[0.95rem] font-semibold leading-snug text-grafite">
                  {item.titulo}
                </p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-chumbo">{item.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
