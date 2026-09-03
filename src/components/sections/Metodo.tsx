import { Check } from "lucide-react";
import { BotaoLink, IconeWhatsApp } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { METODO } from "@/lib/conteudo";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";

/**
 * O coração da página. É aqui que a confiança é construída sem prova social.
 * Inclui o argumento contraintuitivo que derruba a objeção do porte: às vezes
 * a resposta certa é menor do que o cliente imaginava.
 *
 * Teste que esta seção precisa passar: trocar "Tectus" por qualquer software
 * house. Se a frase continuar verdadeira, ela é genérica.
 *
 * O cartão lateral abria com a etimologia da marca ("Tectus vem do latim:
 * construído, estruturado"), mais o monograma grande em cima. Saiu em
 * 24/08/2026 a pedido do Emmanuel, e ele estava certo: era o único trecho da
 * página que falava da Tectus para a Tectus. Ninguém contrata software por
 * origem de nome. O cartão passou a abrir direto pelo que o leitor ganha,
 * que já estava ali embaixo e merecia o topo.
 */
export function Metodo() {
  return (
    <Section id="metodo" fundo="grafite">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Eyebrow variante="escuro">{METODO.eyebrow}</Eyebrow>
            <h2 className="text-[2rem] font-bold leading-[1.12] tracking-[-0.022em] text-papel lg:text-[2.75rem]">
              {METODO.titulo[0]}{" "}
              <br />
              {METODO.titulo[1]}
            </h2>

            <div className="mt-7 space-y-5 text-[1.05rem] leading-relaxed text-cinza">
              {METODO.paragrafos.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
              <p className="text-papel">{METODO.fecho}</p>
            </div>

            <div className="mt-9">
              <BotaoLink
                href={whatsappLink(WHATSAPP_MESSAGES.metodo)}
                target="_blank"
                rel="noopener noreferrer"
                variante="primario-claro"
                tamanho="lg"
                className="sheen elevacao-2"
              >
                <IconeWhatsApp className="h-[18px] w-[18px]" />
                {METODO.cta}
              </BotaoLink>
            </div>
          </div>

          <aside className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 backdrop-blur-sm elevacao-3">
              <p className="text-[1.15rem] font-semibold leading-snug text-papel">
                {METODO.compromissosTitulo}
              </p>

              <ul className="mt-7 space-y-4">
                {METODO.compromissos.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-cinza">
                    <Check
                      size={16}
                      strokeWidth={2.4}
                      className="mt-0.5 shrink-0 text-petroleo-claro"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
