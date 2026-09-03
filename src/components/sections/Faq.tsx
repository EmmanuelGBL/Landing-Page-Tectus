import { Plus } from "lucide-react";
import { Container, Section, TituloSecao } from "@/components/ui/Section";
import { FAQ, FAQ_TITULO } from "@/lib/conteudo";

/**
 * Último filtro de objeção antes do pedido.
 * Usa <details> nativo: acessível por teclado e por leitor de tela sem uma
 * linha de JavaScript, e funciona mesmo se o JS falhar.
 */
export function Faq() {
  return (
    <Section id="faq">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <TituloSecao
            eyebrow={FAQ_TITULO.eyebrow}
            titulo={FAQ_TITULO.titulo}
            subtitulo={FAQ_TITULO.subtitulo}
          />

          <div className="divide-y divide-cinza-linha border-y border-cinza-linha">
            {FAQ.map((item) => (
              <details key={item.pergunta} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-[1.02rem] font-medium leading-snug text-grafite transition-colors marker:content-none hover:text-petroleo-escuro group-open:text-petroleo-escuro">
                  {item.pergunta}
                  <Plus
                    size={17}
                    strokeWidth={2.1}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-cinza-texto transition-all duration-300 group-hover:text-petroleo-escuro group-open:rotate-45 group-open:text-petroleo-escuro"
                  />
                </summary>
                <p className="mt-3 max-w-[62ch] pr-9 text-[0.95rem] leading-relaxed text-chumbo">
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
