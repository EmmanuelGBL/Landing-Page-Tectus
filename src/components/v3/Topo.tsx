import { Bell, MessageCircle, Workflow } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { IconeWhatsApp } from "@/components/ui/Button";
import { HERO_V2 } from "@/lib/conteudo-v2";
import { HERO_V3 } from "@/lib/conteudo-v3";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";
import { Botao, Container, Digitando, Janela } from "./ui";

export const LINKS_V3 = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#clientes", label: "Clientes" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
] as const;

export function CabecalhoV3() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-grafite-alto/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#topo" aria-label="Tectus, voltar ao início">
          <Logo variante="escuro" />
        </a>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {LINKS_V3.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.88rem] font-medium text-papel/75 transition-colors hover:text-papel"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={whatsappLink(WHATSAPP_MESSAGES.header)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-petroleo-claro px-4 py-2 text-[0.85rem] font-semibold text-grafite-alto transition-colors hover:bg-white"
        >
          <IconeWhatsApp className="h-4 w-4" />
          <span className="hidden sm:inline">Marcar conversa</span>
          <span className="sm:hidden">Conversar</span>
        </a>
      </Container>
    </header>
  );
}

/**
 * Hero. Mesma copy da `/v2`, no desenho da referência: texto à esquerda,
 * objeto visual à direita. Onde a referência tem a foto do fundador e
 * cartões com métrica, aqui ficam três cartões de entrega sem número
 * nenhum, com legenda dizendo que são exemplos.
 */
export function HeroV3() {
  return (
    <section id="topo" className="relative overflow-hidden pb-20 pt-14 lg:pb-28 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[520px] w-[620px] rounded-full bg-petroleo/25 blur-[120px]"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.78rem] font-medium text-papel/85">
            <span className="h-1.5 w-1.5 rounded-full bg-petroleo-claro" />
            {HERO_V3.selo}
          </p>

          <h1 className="mt-6 text-[2.35rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-papel sm:text-[3rem] lg:text-[3.5rem]">
            {HERO_V2.titulo.linha1}{" "}
            <span className="block text-petroleo-claro">{HERO_V2.titulo.linha2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-cinza">
            {HERO_V2.subtitulo}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Botao
              href={whatsappLink(WHATSAPP_MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconeWhatsApp className="h-[18px] w-[18px]" />
              {HERO_V2.ctaPrimario}
            </Botao>
            <Botao href="#como-funciona" variante="contorno">
              {HERO_V3.ctaSecundario}
            </Botao>
          </div>
          <p className="mt-4 text-[0.85rem] text-cinza">{HERO_V2.ctaNota}</p>
        </div>

        <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden="true" className="relative space-y-4">
            <Janela rotulo="Atendimento no WhatsApp" className="lg:mr-14">
              <div className="space-y-2.5">
                <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-white/[0.08] px-3.5 py-2 text-[0.85rem] text-papel">
                  Vocês atendem amanhã cedo?
                </p>
                <p className="flex w-fit items-center gap-2 rounded-2xl rounded-bl-md border border-petroleo-claro/25 bg-petroleo-claro/10 px-3.5 py-2.5 text-[0.8rem] text-petroleo-claro">
                  <MessageCircle size={14} strokeWidth={2} />
                  respondendo
                  <Digitando />
                </p>
              </div>
            </Janela>

            <Janela rotulo="Pós-venda" className="lg:ml-14">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 text-[0.88rem] text-papel">
                  <Bell size={16} strokeWidth={1.9} className="text-petroleo-claro" />
                  Lembrete enviado no dia certo
                </span>
                <span className="rounded-full bg-petroleo-claro/15 px-2.5 py-1 text-[0.7rem] font-semibold text-petroleo-claro">
                  09:00
                </span>
              </div>
            </Janela>

            <Janela rotulo="Integração" className="lg:mr-8">
              <div className="flex items-center gap-3 text-[0.85rem] text-papel">
                <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5">
                  WhatsApp
                </span>
                <Workflow size={16} strokeWidth={1.9} className="text-petroleo-claro" />
                <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5">
                  Sistema
                </span>
                <span className="ml-auto text-[0.72rem] font-semibold text-petroleo-claro">
                  sem redigitar
                </span>
              </div>
            </Janela>
          </div>
          <figcaption className="mt-5 text-center text-[0.78rem] text-cinza">
            {HERO_V3.legendaVisual}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
