import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, UtensilsCrossed, X } from "lucide-react";
import { Monograma } from "@/components/brand/Logo";
import { IconeWhatsApp } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LOGOS } from "@/lib/conteudo";
import { CLIENTES_V4, PLANOS_V4, SOBRE_V4 } from "@/lib/conteudo-v4";
import { whatsappLink } from "@/lib/site";
import {
  BotaoContorno,
  BotaoWhatsApp,
  CabecalhoSecao,
  Cartao,
  Container,
  Eyebrow,
  Realce,
  Secao,
} from "./ui";

/** Só o caminho e as dimensões das logos vêm da home; o texto é da v4. */
const LOGO_POR_CLIENTE: Record<string, (typeof LOGOS)[keyof typeof LOGOS] | undefined> = {
  Priorize: LOGOS.priorize,
  "Patinhas de Ouro": LOGOS.patinhas,
  "Mariah Seguros": LOGOS.mariah,
  "Pontes & Rocha Advogados Associados": LOGOS.pontesRocha,
};

function PlacaLogo({ cliente, grande = false }: { cliente: string; grande?: boolean }) {
  const logo = LOGO_POR_CLIENTE[cliente];
  const altura = grande ? "h-16 px-5" : "h-14 px-4";

  if (!logo) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] ${altura} text-[0.85rem] font-semibold text-papel`}
      >
        <UtensilsCrossed size={16} strokeWidth={1.9} className="text-petroleo-claro" aria-hidden="true" />
        {cliente}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-xl bg-white ${altura}`}>
      <Image
        src={logo.arquivo}
        alt={logo.nome}
        width={logo.largura}
        height={logo.altura}
        className={`${grande ? "h-12" : "h-10"} w-auto max-w-[200px] object-contain`}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Clientes                                                            */
/* ------------------------------------------------------------------ */

/**
 * No lugar dos depoimentos em vídeo da referência. Mesmo peso visual de
 * cartão grande no topo e grade embaixo, sem aspas, estrela nem número.
 */
export function ClientesV4() {
  const { destaque } = CLIENTES_V4;

  return (
    <Secao id="clientes">
      <Container>
        <CabecalhoSecao
          eyebrow={CLIENTES_V4.eyebrow}
          titulo={CLIENTES_V4.titulo}
          subtitulo={CLIENTES_V4.subtitulo}
        />

        <Reveal className="mt-14">
          <Cartao className="overflow-hidden">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-white/[0.06] p-7 sm:p-9 lg:border-b-0 lg:border-r">
                <PlacaLogo cliente={destaque.cliente} grande />
                <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#8b9099]">
                  {destaque.segmento}
                </p>
                <h3 className="mt-3 text-[1.45rem] font-semibold leading-snug tracking-[-0.02em] text-papel">
                  {destaque.resumo}
                </h3>
                <ol className="mt-7 flex flex-wrap items-center gap-2">
                  {destaque.fases.map((fase, indice) => (
                    <li key={fase} className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-petroleo-claro/35 bg-petroleo/15 px-3 py-1 text-[0.78rem] font-medium text-papel">
                        <Check size={12} strokeWidth={2.6} className="text-petroleo-claro" aria-hidden="true" />
                        {fase}
                      </span>
                      {indice < destaque.fases.length - 1 ? (
                        <ArrowRight size={14} className="text-[#8b9099]" aria-hidden="true" />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid sm:grid-cols-2">
                <div className="p-7 sm:p-9">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#8b9099]">
                    {destaque.rotuloAntes}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {destaque.antes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-[#a1a6ae]">
                        <X size={15} strokeWidth={2} className="mt-1 shrink-0 text-[#6b7079]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-white/[0.06] bg-petroleo/[0.08] p-7 sm:border-l sm:border-t-0 sm:p-9">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-petroleo-claro">
                    {destaque.rotuloDepois}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {destaque.depois.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-papel">
                        <CheckCircle2 size={15} strokeWidth={2} className="mt-1 shrink-0 text-petroleo-claro" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Cartao>
        </Reveal>

        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {CLIENTES_V4.outros.map((cliente, indice) => (
            <li key={cliente.cliente}>
              <Reveal delay={indice * 60} className="h-full">
                <Cartao className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <PlacaLogo cliente={cliente.cliente} />
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] text-[#a1a6ae]">
                      {cliente.tipo}
                    </span>
                  </div>
                  <h3 className="sr-only">{cliente.cliente}</h3>
                  <dl className="mt-6 space-y-3 text-[0.9rem] leading-relaxed">
                    <div className="flex gap-3">
                      <dt className="w-14 shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8b9099] leading-[1.6rem]">
                        {CLIENTES_V4.rotuloAntes}
                      </dt>
                      <dd className="text-[#a1a6ae]">{cliente.antes}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-14 shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-petroleo-claro leading-[1.6rem]">
                        {CLIENTES_V4.rotuloDepois}
                      </dt>
                      <dd className="text-papel">{cliente.depois}</dd>
                    </div>
                  </dl>
                </Cartao>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#8b9099]">
            {CLIENTES_V4.outrosProjetosLegenda}
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {CLIENTES_V4.outrosProjetos.map((projeto) => (
              <li
                key={projeto}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.8rem] text-[#c3c7cd]"
              >
                {projeto}
              </li>
            ))}
          </ul>
          <BotaoWhatsApp mensagem={CLIENTES_V4.mensagem} className="mt-6">
            {CLIENTES_V4.cta}
          </BotaoWhatsApp>
        </div>
      </Container>
    </Secao>
  );
}

/* ------------------------------------------------------------------ */
/* Planos                                                              */
/* ------------------------------------------------------------------ */

export function PlanosV4() {
  return (
    <Secao id="planos">
      <Container>
        <CabecalhoSecao
          eyebrow={PLANOS_V4.eyebrow}
          titulo={PLANOS_V4.titulo}
          subtitulo={PLANOS_V4.subtitulo}
        />

        <ul className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {PLANOS_V4.planos.map((plano, indice) => {
            const destaque = "selo" in plano;
            return (
              <li key={plano.nome} className="relative">
                <Reveal delay={indice * 70} className="h-full">
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                      destaque
                        ? "border-petroleo-claro/60 bg-[#0f1a1c] shadow-[0_0_60px_-20px_rgba(34,180,191,0.45)]"
                        : "border-white/[0.08] bg-[#111214]"
                    }`}
                  >
                    {destaque ? (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-petroleo px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
                        {plano.selo}
                      </span>
                    ) : null}

                    <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] text-papel">
                      {plano.nome}
                    </h3>
                    <p className="mt-2 min-h-[3rem] text-[0.88rem] leading-relaxed text-[#a1a6ae]">
                      {plano.descricao}
                    </p>

                    {/* Valor em branco, a pedido do Emmanuel. A caixa tracejada
                        marca o lugar sem sugerir número nenhum. */}
                    <div className="mt-6 flex items-end gap-2">
                      <span className="pb-1 text-[0.95rem] font-medium text-[#a1a6ae]">R$</span>
                      <span
                        aria-hidden="true"
                        className="inline-block h-11 w-32 rounded-lg border border-dashed border-white/20"
                      />
                      <span className="pb-1 text-[0.85rem] text-[#8b9099]">{PLANOS_V4.periodo}</span>
                    </div>
                    <p className="mt-2 text-[0.78rem] text-[#8b9099]">{PLANOS_V4.rotuloValor}</p>

                    <ul className="mt-7 flex-1 space-y-3 border-t border-white/[0.07] pt-6">
                      {PLANOS_V4.recursos.map((recurso, posicao) => {
                        const incluso = posicao < plano.inclui;
                        return (
                          <li
                            key={recurso}
                            className={`flex items-start gap-2.5 text-[0.88rem] ${
                              incluso ? "text-papel" : "text-[#6b7079] line-through decoration-white/20"
                            }`}
                          >
                            {incluso ? (
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-petroleo-claro text-[#0a0a0a]">
                                <Check size={10} strokeWidth={3.2} aria-hidden="true" />
                              </span>
                            ) : (
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#6b7079]">
                                <X size={9} strokeWidth={3} aria-hidden="true" />
                              </span>
                            )}
                            <span className="sr-only">{incluso ? "Incluso: " : "Não incluso: "}</span>
                            {recurso}
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-8">
                      {destaque ? (
                        <BotaoWhatsApp mensagem={plano.mensagem} className="w-full">
                          {plano.cta}
                        </BotaoWhatsApp>
                      ) : (
                        <BotaoContorno
                          href={whatsappLink(plano.mensagem)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <IconeWhatsApp className="h-[18px] w-[18px]" />
                          {plano.cta}
                        </BotaoContorno>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Secao>
  );
}

/* ------------------------------------------------------------------ */
/* Sobre                                                               */
/* ------------------------------------------------------------------ */

/**
 * No lugar dos sócios. A foto vira o monograma sobre uma placa com os
 * mesmos círculos do hero. Sem nome de pessoa, pela diretriz de marca.
 */
export function SobreV4() {
  return (
    <Secao id="sobre">
      <Container>
        <CabecalhoSecao eyebrow={SOBRE_V4.eyebrow} titulo={SOBRE_V4.titulo} />

        <Reveal className="mt-14">
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div
              aria-hidden="true"
              className="relative mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(circle_at_50%_40%,rgba(14,124,134,0.35),#0d0f10_70%)]"
            >
              <span className="absolute h-[85%] w-[85%] rounded-full border border-white/[0.06]" />
              <span className="absolute h-[60%] w-[60%] rounded-full border border-white/[0.08]" />
              <Monograma
                className="relative h-28 w-28 text-papel"
                corAcento="var(--color-petroleo-claro)"
              />
            </div>

            <div>
              <Eyebrow>{SOBRE_V4.rotulo}</Eyebrow>
              <h3 className="mt-3 text-[2rem] font-semibold tracking-[-0.03em] text-petroleo-claro">
                {SOBRE_V4.nome}
              </h3>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-[#a1a6ae]">
                <Realce texto={SOBRE_V4.texto} />
              </p>
              <ul className="mt-9 grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
                {SOBRE_V4.destaques.map((item) => (
                  <li key={item.valor}>
                    <p className="text-[1.5rem] font-semibold tracking-[-0.02em] text-petroleo-claro">
                      {item.valor}
                    </p>
                    <p className="mt-1 text-[0.85rem] text-[#a1a6ae]">{item.rotulo}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Secao>
  );
}
