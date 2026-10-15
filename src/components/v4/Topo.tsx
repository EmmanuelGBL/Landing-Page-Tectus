import { ArrowRight, Bot, CheckCircle2, FileText, MessageCircle, RefreshCw } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CABECALHO_V4, HERO_V4, NAV_V4 } from "@/lib/conteudo-v4";
import { BotaoContorno, BotaoWhatsApp, Container, Realce, Titulo } from "./ui";

export function CabecalhoV4() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#topo" aria-label="Tectus, voltar ao início" className="shrink-0">
          <Logo variante="escuro" />
        </a>

        <nav aria-label="Seções da página" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_V4.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.85rem] font-medium text-[#a1a6ae] transition-colors hover:text-papel"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <BotaoWhatsApp mensagem={CABECALHO_V4.mensagem} className="!px-4 !py-2 !text-[0.85rem]">
          <span className="hidden sm:inline">{CABECALHO_V4.cta}</span>
          <span className="sm:hidden">{CABECALHO_V4.ctaCurto}</span>
        </BotaoWhatsApp>
      </Container>
    </header>
  );
}

export function HeroV4() {
  return (
    <section id="topo" className="relative overflow-hidden pb-20 pt-14 lg:pb-28 lg:pt-20">
      {/* Brilho do acento no canto, no lugar do degradê esverdeado da
          referência. Círculos concêntricos atrás do painel, como lá. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_75%_30%,rgba(14,124,134,0.28),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[8%] hidden h-[640px] w-[640px] rounded-full border border-white/[0.05] lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[2%] top-[22%] hidden h-[420px] w-[420px] rounded-full border border-white/[0.05] lg:block"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-3.5 text-[0.78rem] font-medium text-[#c3c7cd]">
            <span className="flex -space-x-1.5" aria-hidden="true">
              {[MessageCircle, RefreshCw, Bot].map((Icone, indice) => (
                <span
                  key={indice}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0a0a0a] bg-[#1b2b2d] text-petroleo-claro"
                >
                  <Icone size={11} strokeWidth={2.2} />
                </span>
              ))}
            </span>
            {HERO_V4.selo}
          </p>

          <Titulo
            como="h1"
            titulo={HERO_V4.titulo}
            className="mt-6 text-[2.3rem] leading-[1.06] sm:text-[2.9rem] lg:text-[3.1rem]"
          />

          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-[#a1a6ae]">
            <Realce texto={HERO_V4.subtitulo} />
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BotaoWhatsApp mensagem={HERO_V4.mensagem}>{HERO_V4.ctaPrimario}</BotaoWhatsApp>
            <BotaoContorno href="#solucoes">
              {HERO_V4.ctaSecundario}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </BotaoContorno>
          </div>
          <p className="mt-4 text-[0.82rem] text-[#8b9099]">{HERO_V4.nota}</p>
        </div>

        <PainelHero />
      </Container>
    </section>
  );
}

/**
 * Painel ilustrativo, no lugar da foto do fundador com cartões flutuantes da
 * referência. Mostra estados (respondendo, enviado, atualizado), nunca
 * número de resultado, e a legenda diz que é ilustração.
 */
function PainelHero() {
  const linhas = [
    { Icone: MessageCircle, texto: "Pedido do WhatsApp", estado: "registrado" },
    { Icone: RefreshCw, texto: "Estoque e financeiro", estado: "atualizados" },
    { Icone: FileText, texto: "Relatório da semana", estado: "enviado" },
  ];

  return (
    <figure className="relative mx-auto w-full max-w-[480px] lg:mr-0">
      <div aria-hidden="true" className="relative pb-20 pt-28 sm:pl-10">
        <div className="rounded-2xl border border-white/10 bg-[#111214]/95 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#8b9099]">
              Operação de hoje
            </p>
            <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-petroleo-claro">
              <span className="h-1.5 w-1.5 rounded-full bg-petroleo-claro motion-safe:animate-pulse" />
              automático
            </span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {linhas.map(({ Icone, texto, estado }) => (
              <li
                key={texto}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-petroleo/20 text-petroleo-claro">
                  <Icone size={15} strokeWidth={2} />
                </span>
                <span className="flex-1 text-[0.85rem] text-papel">{texto}</span>
                <span className="inline-flex items-center gap-1 text-[0.72rem] text-[#a1a6ae]">
                  <CheckCircle2 size={13} strokeWidth={2} className="text-petroleo-claro" />
                  {estado}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cartão flutuante: agente de IA respondendo. */}
        <div className="absolute -left-2 top-0 w-[220px] rounded-xl border border-white/10 bg-[#15181a] p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:-left-6">
          <p className="flex items-center gap-2 text-[0.75rem] font-semibold text-papel">
            <Bot size={14} strokeWidth={2} className="text-petroleo-claro" />
            Agente de IA
            <span className="ml-auto text-[0.65rem] font-normal text-[#8b9099]">22:47</span>
          </p>
          <p className="mt-2.5 rounded-lg rounded-tl-sm bg-white/[0.06] px-2.5 py-1.5 text-[0.75rem] text-[#c3c7cd]">
            Vocês entregam amanhã cedo?
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[0.68rem] text-petroleo-claro">
            <span className="flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-current motion-safe:animate-pulse" />
              <span className="h-1 w-1 rounded-full bg-current motion-safe:animate-pulse [animation-delay:150ms]" />
              <span className="h-1 w-1 rounded-full bg-current motion-safe:animate-pulse [animation-delay:300ms]" />
            </span>
            respondendo
          </p>
        </div>

        {/* Cartão flutuante: painel de indicadores, barras sem valor. */}
        <div className="absolute bottom-0 right-0 w-[210px] rounded-xl border border-white/10 bg-[#15181a] p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
          <p className="text-[0.75rem] font-semibold text-papel">Painel de vendas</p>
          <p className="text-[0.65rem] text-[#8b9099]">por semana</p>
          <div className="mt-3 flex h-12 items-end gap-1.5">
            {[38, 52, 45, 64, 58, 76, 88].map((altura, indice) => (
              <span
                key={indice}
                className="flex-1 rounded-sm bg-petroleo-claro/70 last:bg-petroleo-claro"
                style={{ height: `${altura}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[0.75rem] text-[#8b9099] lg:text-right">
        {HERO_V4.legenda}
      </figcaption>
    </figure>
  );
}
