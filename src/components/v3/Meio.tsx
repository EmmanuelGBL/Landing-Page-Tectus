import Image from "next/image";
import {
  BarChart3,
  Check,
  ClipboardList,
  Compass,
  Globe,
  Link2,
  MonitorSmartphone,
  ShoppingBag,
  Sparkles,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { IconeWhatsApp } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { Reveal } from "@/components/ui/Reveal";
import { LOGOS, PROJETOS, PROJETOS_OUTROS } from "@/lib/conteudo";
import { METODO_V2, PILARES_TITULO_V2, PILARES_V2 } from "@/lib/conteudo-v2";
import { PLANOS_V3, PROVA_V3, SOLUCOES_V3 } from "@/lib/conteudo-v3";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";
import { Botao, CabecalhoSecao, Container, Eyebrow, Secao, TituloDuas } from "./ui";

/* ------------------------------------------------------------------ */
/* Soluções: a grade "Para quem é" da referência                       */
/* ------------------------------------------------------------------ */

const ICONES_PILAR: Record<string, LucideIcon> = {
  "01": Globe,
  "02": Workflow,
  "03": Sparkles,
  "04": Link2,
  "05": BarChart3,
  "06": Compass,
};

export function SolucoesV3() {
  return (
    <Secao id="solucoes">
      <Container>
        <CabecalhoSecao
          eyebrow={PILARES_TITULO_V2.eyebrow}
          titulo={SOLUCOES_V3.titulo}
          subtitulo={PILARES_TITULO_V2.subtitulo}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILARES_V2.map((pilar, indice) => (
            <Reveal key={pilar.numero} delay={indice * 50} className="h-full">
              <article
                className={`flex h-full flex-col rounded-2xl border p-6 transition-colors duration-200 ${
                  pilar.destaque
                    ? "border-petroleo-claro/40 bg-petroleo-claro/[0.06]"
                    : "border-white/[0.08] bg-white/[0.025] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <Icone icone={ICONES_PILAR[pilar.numero]} variante="escuro" />
                  {pilar.destaque ? (
                    <span className="rounded-full bg-petroleo-claro px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-grafite-alto">
                      Comece por aqui
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-[1.1rem] font-bold tracking-[-0.015em] text-papel">
                  {pilar.nome}
                </h3>
                <p className="mt-2 text-[0.92rem] font-medium leading-snug text-papel/85">
                  {pilar.problema}
                </p>
                <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-cinza">
                  {pilar.descricao}
                </p>
                <p className="mt-5 border-t border-white/[0.07] pt-4 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-petroleo-claro">
                  {pilar.contratacao}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Secao>
  );
}

/* ------------------------------------------------------------------ */
/* Clientes: no lugar dos depoimentos em vídeo da referência           */
/* ------------------------------------------------------------------ */

const ICONES_PROJETO: Record<string, LucideIcon> = {
  "Marketplace com painel": ShoppingBag,
  "Sistema de pedidos": ClipboardList,
  "Landing page": MonitorSmartphone,
};

/**
 * A referência prova com vídeo, estrela e faturamento. A Tectus não tem
 * depoimento autorizado, então nada disso entra, nem estrela (que é nota
 * dada pelo cliente). Fica o que é fato confirmado: o antes e depois de cada
 * cliente autorizado, com a Priorize em destaque por ser a história completa.
 *
 * As logos têm fundo próprio pensado para papel, por isso vão numa placa
 * clara em vez de direto sobre o escuro.
 */
function PlacaLogo({ logo }: { logo: (typeof LOGOS)[keyof typeof LOGOS] }) {
  return (
    <span className="inline-flex h-14 items-center rounded-xl bg-papel px-4">
      <Image
        src={logo.arquivo}
        alt={logo.nome}
        width={logo.largura}
        height={logo.altura}
        className="h-9 w-auto object-contain"
      />
    </span>
  );
}

export function ClientesV3() {
  const caso = PROVA_V3.destaque;

  return (
    <Secao id="clientes">
      <Container>
        <CabecalhoSecao
          eyebrow={PROVA_V3.eyebrow}
          titulo={PROVA_V3.titulo}
          subtitulo={PROVA_V3.subtitulo}
        />

        <Reveal className="mt-14">
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-4">
              <PlacaLogo logo={LOGOS.priorize} />
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-cinza">
                {caso.segmento}
              </p>
            </div>
            <h3 className="mt-6 max-w-2xl text-[1.6rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-papel lg:text-[2rem]">
              {caso.chamada}
            </h3>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-cinza">{caso.contexto}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cinza">
                  {caso.antesDepois.rotuloAntes}
                </p>
                <ul className="mt-4 space-y-3">
                  {caso.antesDepois.antes.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-cinza">
                      <X size={16} strokeWidth={2} className="mt-1 shrink-0 text-cinza/70" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-petroleo-claro/30 bg-petroleo-claro/[0.06] p-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-petroleo-claro">
                  {caso.antesDepois.rotuloDepois}
                </p>
                <ul className="mt-4 space-y-3">
                  {caso.antesDepois.depois.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-papel">
                      <Check size={16} strokeWidth={2.4} className="mt-1 shrink-0 text-petroleo-claro" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ol className="mt-6 flex flex-wrap gap-2.5">
              {caso.etapas.map((etapa) => (
                <li
                  key={etapa.fase}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.82rem] text-papel/85"
                >
                  {etapa.fase} · <span className="text-petroleo-claro">{etapa.estado}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-5 border-t border-white/[0.07] pt-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-xl text-[0.95rem] leading-relaxed text-papel/85">{caso.fecho}</p>
              <Botao
                href={whatsappLink(WHATSAPP_MESSAGES.cases)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <IconeWhatsApp className="h-4 w-4" />
                {caso.cta}
              </Botao>
            </div>
          </article>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {PROJETOS.map((projeto, indice) => {
            const IconeTipo = ICONES_PROJETO[projeto.tipo] ?? MonitorSmartphone;

            return (
              <Reveal key={projeto.cliente} delay={indice * 60} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
                  <div className="flex h-14 items-center">
                    {projeto.logo ? (
                      <PlacaLogo logo={projeto.logo} />
                    ) : (
                      <Icone icone={IconeTipo} variante="escuro" />
                    )}
                  </div>
                  <h3 className="mt-5 text-[1.05rem] font-bold tracking-[-0.015em] text-papel">
                    {projeto.cliente}
                  </h3>
                  <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-cinza">
                    {projeto.tipo}
                  </p>
                  <dl className="mt-5 space-y-4 text-[0.92rem] leading-relaxed">
                    <div>
                      <dt className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cinza">
                        Antes
                      </dt>
                      <dd className="mt-1 text-cinza">{projeto.antes}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-petroleo-claro">
                        Depois
                      </dt>
                      <dd className="mt-1 text-papel">{projeto.resolveu}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[0.9rem] text-cinza">{PROJETOS_OUTROS.legenda}</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
            {PROJETOS_OUTROS.itens.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.84rem] text-papel/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Secao>
  );
}

/* ------------------------------------------------------------------ */
/* Planos: preço em branco, a pedido                                   */
/* ------------------------------------------------------------------ */

export function PlanosV3() {
  return (
    <Secao id="planos">
      <Container>
        <CabecalhoSecao
          eyebrow={PLANOS_V3.eyebrow}
          titulo={PLANOS_V3.titulo}
          subtitulo={PLANOS_V3.subtitulo}
        />

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {PLANOS_V3.planos.map((plano) => {
            const destaque = "selo" in plano;

            return (
              <article
                key={plano.nome}
                className={`relative flex flex-col rounded-3xl border p-7 ${
                  destaque
                    ? "border-petroleo-claro/60 bg-petroleo-claro/[0.06] shadow-[0_0_60px_-20px_rgba(34,180,191,0.45)] lg:-my-3 lg:py-10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {destaque ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-petroleo-claro px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-grafite-alto">
                    {plano.selo}
                  </span>
                ) : null}

                <h3 className="text-[1.3rem] font-extrabold tracking-[-0.02em] text-papel">
                  {plano.nome}
                </h3>
                <p className="mt-2 min-h-[3rem] text-[0.92rem] leading-relaxed text-cinza">
                  {plano.resumo}
                </p>

                {/* Preço em branco, a pedido do Emmanuel. O espaço fica
                    visível e rotulado para não ser confundido com valor. */}
                <div className="mt-6 flex items-end gap-2">
                  <span className="pb-1.5 text-[0.85rem] font-semibold text-cinza">R$</span>
                  <span
                    aria-hidden="true"
                    className="h-11 w-36 rounded-lg border border-dashed border-white/25 bg-white/[0.02]"
                  />
                  <span className="pb-1.5 text-[0.85rem] text-cinza">/mês</span>
                </div>
                <p className="mt-2 text-[0.75rem] text-cinza">{PLANOS_V3.rotuloValor}</p>

                <ul className="mt-7 flex-1 space-y-3">
                  {PLANOS_V3.recursos.map((recurso, indice) => {
                    const incluso = indice < plano.inclui;

                    return (
                      <li
                        key={recurso}
                        className={`flex items-start gap-3 text-[0.9rem] leading-snug ${
                          incluso ? "text-papel/90" : "text-cinza/60 line-through"
                        }`}
                      >
                        {incluso ? (
                          <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-petroleo-claro text-grafite-alto">
                            <Check size={12} strokeWidth={3} aria-hidden="true" />
                          </span>
                        ) : (
                          <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 text-cinza/60">
                            <X size={11} strokeWidth={2.5} aria-hidden="true" />
                          </span>
                        )}
                        <span>
                          <span className="sr-only">{incluso ? "Incluso: " : "Não incluso: "}</span>
                          {recurso}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <Botao
                  href={whatsappLink(plano.mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variante={destaque ? "solido" : "contorno"}
                  className="mt-8 w-full"
                >
                  {plano.cta}
                </Botao>
              </article>
            );
          })}
        </div>
      </Container>
    </Secao>
  );
}

/* ------------------------------------------------------------------ */
/* Método: no lugar da seção dos sócios                                */
/* ------------------------------------------------------------------ */

/**
 * A referência apresenta os dois fundadores com foto e seguidores. A Tectus
 * não expõe o fundador, então o espaço vai para o que sustenta a confiança
 * nela: o método e o que fica combinado antes de começar.
 */
export function MetodoV3() {
  return (
    <Secao id="metodo">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Eyebrow>{METODO_V2.eyebrow}</Eyebrow>
          <TituloDuas
            partes={METODO_V2.titulo}
            className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.5rem] lg:text-[2.75rem]"
          />
          <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-cinza">
            {METODO_V2.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
          <p className="mt-6 border-l-2 border-petroleo-claro pl-5 text-[1.08rem] font-medium leading-relaxed text-papel">
            {METODO_V2.fecho}
          </p>
          <Botao
            href={whatsappLink(WHATSAPP_MESSAGES.metodo)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8"
          >
            <IconeWhatsApp className="h-4 w-4" />
            {METODO_V2.cta}
          </Botao>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 lg:p-8">
          <p className="text-[1.15rem] font-bold leading-snug tracking-[-0.01em] text-papel">
            {METODO_V2.compromissosTitulo}
          </p>
          <ul className="mt-6 space-y-4">
            {METODO_V2.compromissos.map((item) => (
              <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-papel/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-petroleo-claro text-grafite-alto">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </Secao>
  );
}
