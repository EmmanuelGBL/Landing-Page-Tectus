import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Clock,
  Copy,
  FileSpreadsheet,
  Gauge,
  Globe,
  HeartPulse,
  LayoutDashboard,
  Link2,
  PawPrint,
  Scale,
  Scissors,
  ShieldCheck,
  Users,
  UtensilsCrossed,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PARA_QUEM_V4, PRATICA_V4, SOLUCOES_V4, type FrenteV4 } from "@/lib/conteudo-v4";
import {
  BotaoContorno,
  BotaoWhatsApp,
  CabecalhoSecao,
  Cartao,
  Container,
  Eyebrow,
  Realce,
  Secao,
  Titulo,
} from "./ui";

/* ------------------------------------------------------------------ */
/* Na prática                                                          */
/* ------------------------------------------------------------------ */

const ICONES_DOR: readonly LucideIcon[] = [Clock, Copy, FileSpreadsheet, Gauge];

export function PraticaV4() {
  return (
    <Secao id="na-pratica">
      <Container>
        <CabecalhoSecao
          eyebrow={PRATICA_V4.eyebrow}
          titulo={PRATICA_V4.titulo}
          subtitulo={PRATICA_V4.subtitulo}
        />

        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {PRATICA_V4.dores.map((dor, indice) => {
            const Icone = ICONES_DOR[indice];
            return (
              <li key={dor}>
                <Reveal delay={indice * 70} className="h-full">
                  <Cartao className="flex h-full gap-4 p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#a1a6ae]">
                      <Icone size={16} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <p className="text-[0.93rem] leading-relaxed text-[#c3c7cd]">{dor}</p>
                  </Cartao>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 text-center">
          <Titulo
            como="h3"
            titulo={PRATICA_V4.fecho}
            className="text-[1.6rem] leading-[1.15] sm:text-[2rem]"
          />
          <p className="mt-4 text-[0.98rem] text-[#a1a6ae]">{PRATICA_V4.fechoApoio}</p>
        </div>
      </Container>
    </Secao>
  );
}

/* ------------------------------------------------------------------ */
/* Como funciona: quatro frentes em linhas alternadas                  */
/* ------------------------------------------------------------------ */

export function SolucoesV4() {
  return (
    <Secao id="solucoes" className="overflow-x-clip">
      <Container>
        <CabecalhoSecao
          eyebrow={SOLUCOES_V4.eyebrow}
          titulo={SOLUCOES_V4.titulo}
          subtitulo={SOLUCOES_V4.subtitulo}
        />

        <div className="mt-20 space-y-24 lg:space-y-32">
          {SOLUCOES_V4.frentes.map((frente, indice) => (
            <Reveal key={frente.id}>
              <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={indice % 2 === 1 ? "lg:order-2" : undefined}>
                  <Eyebrow>{frente.eyebrow}</Eyebrow>
                  <Titulo
                    como="h3"
                    titulo={frente.titulo}
                    className="mt-4 text-[1.75rem] leading-[1.12] sm:text-[2.1rem]"
                  />
                  <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-[#a1a6ae]">
                    <Realce texto={frente.texto} />
                  </p>
                  <div className="mt-8">
                    {frente.id === "diagnostico" ? (
                      <BotaoWhatsApp mensagem={SOLUCOES_V4.mensagem}>
                        {SOLUCOES_V4.ctaWhatsapp}
                      </BotaoWhatsApp>
                    ) : "link" in frente && frente.link ? (
                      <BotaoContorno href={frente.link.href}>
                        {frente.link.rotulo}
                        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                      </BotaoContorno>
                    ) : null}
                  </div>
                </div>
                <div aria-hidden="true">
                  <TelaFrente id={frente.id} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Secao>
  );
}

/** Telas ilustrativas de cada frente. Estados, nunca números de resultado. */
function TelaFrente({ id }: { id: FrenteV4["id"] }) {
  if (id === "diagnostico") {
    const itens = [
      { texto: "Atendimento no WhatsApp", gargalo: true },
      { texto: "Pedidos digitados duas vezes", gargalo: true },
      { texto: "Financeiro", gargalo: false },
      { texto: "Relatório do mês", gargalo: true },
    ];
    return (
      <Moldura rotulo="Diagnóstico da operação">
        <ul className="space-y-2.5">
          {itens.map((item) => (
            <li
              key={item.texto}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <span className="text-[0.88rem] text-papel">{item.texto}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${
                  item.gargalo
                    ? "border border-petroleo-claro/40 text-petroleo-claro"
                    : "border border-white/10 text-[#8b9099]"
                }`}
              >
                {item.gargalo ? "gargalo" : "em ordem"}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-petroleo/15 px-4 py-3 text-[0.82rem] text-papel">
          Começar por: <span className="font-semibold">ligar o WhatsApp ao sistema de pedidos</span>
        </p>
      </Moldura>
    );
  }

  if (id === "construcao") {
    const blocos: { nome: string; Icone: LucideIcon; indicado?: boolean }[] = [
      { nome: "Sistema de gestão", Icone: LayoutDashboard },
      { nome: "Agente de IA", Icone: Bot },
      { nome: "Automação", Icone: Workflow, indicado: true },
      { nome: "Integração", Icone: Link2, indicado: true },
      { nome: "Painel de dados", Icone: BarChart3 },
      { nome: "Site", Icone: Globe },
    ];
    return (
      <Moldura rotulo="O que entra no projeto">
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {blocos.map(({ nome, Icone, indicado }) => (
            <li
              key={nome}
              className={`relative rounded-xl border px-3.5 py-4 ${
                indicado
                  ? "border-petroleo-claro/50 bg-petroleo/15"
                  : "border-white/[0.06] bg-white/[0.02] opacity-60"
              }`}
            >
              <Icone
                size={17}
                strokeWidth={1.9}
                className={indicado ? "text-petroleo-claro" : "text-[#8b9099]"}
              />
              <p className="mt-3 text-[0.82rem] font-medium text-papel">{nome}</p>
              {indicado ? (
                <Check
                  size={14}
                  strokeWidth={2.4}
                  className="absolute right-3 top-3 text-petroleo-claro"
                />
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.78rem] text-[#8b9099]">Só o que o diagnóstico indicou.</p>
      </Moldura>
    );
  }

  if (id === "entrega") {
    const etapas = [
      { nome: "Proposta assinada", estado: "concluída", feito: true },
      { nome: "Entrega 1 · cadastro", estado: "concluída", feito: true },
      { nome: "Entrega 2 · pedidos", estado: "em teste", feito: false },
      { nome: "Entrega 3 · painel", estado: "próxima", feito: false },
      { nome: "Treinamento da equipe", estado: "na entrega", feito: false },
    ];
    return (
      <Moldura rotulo="Andamento do projeto">
        <ol className="relative space-y-4 pl-6 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-white/10">
          {etapas.map((etapa) => (
            <li key={etapa.nome} className="relative flex items-center justify-between gap-3">
              <span
                className={`absolute -left-6 top-1/2 h-[15px] w-[15px] -translate-y-1/2 rounded-full border-2 ${
                  etapa.feito
                    ? "border-petroleo-claro bg-petroleo-claro"
                    : "border-white/20 bg-[#111214]"
                }`}
              />
              <span className={`text-[0.88rem] ${etapa.feito ? "text-papel" : "text-[#c3c7cd]"}`}>
                {etapa.nome}
              </span>
              <span
                className={`text-[0.72rem] ${etapa.feito ? "text-petroleo-claro" : "text-[#8b9099]"}`}
              >
                {etapa.estado}
              </span>
            </li>
          ))}
        </ol>
      </Moldura>
    );
  }

  return (
    <Moldura rotulo="Suporte Tectus">
      <div className="space-y-3">
        <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[0.86rem] text-papel">
          Dá para incluir um campo novo no cadastro de clientes?
        </p>
        <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-petroleo/25 px-4 py-2.5 text-[0.86rem] text-papel">
          Dá, sim. Entra na próxima atualização e avisamos quando estiver no ar.
        </p>
        <div className="flex items-center gap-2 pt-1 text-[0.75rem] text-[#8b9099]">
          <Wrench size={13} strokeWidth={2} className="text-petroleo-claro" />
          Melhoria registrada no plano Evolução
        </div>
      </div>
    </Moldura>
  );
}

function Moldura({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(14,124,134,0.18),transparent_70%)]" />
      <Cartao className="relative p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#8b9099]">
            {rotulo}
          </span>
        </div>
        {children}
      </Cartao>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Para quem é                                                         */
/* ------------------------------------------------------------------ */

const ICONES_SEGMENTO: readonly LucideIcon[] = [
  PawPrint,
  UtensilsCrossed,
  ShieldCheck,
  Scale,
  Scissors,
  HeartPulse,
  Wrench,
  Users,
];

export function ParaQuemV4() {
  return (
    <Secao id="para-quem">
      <Container>
        <CabecalhoSecao
          eyebrow={PARA_QUEM_V4.eyebrow}
          titulo={PARA_QUEM_V4.titulo}
          subtitulo={PARA_QUEM_V4.subtitulo}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARA_QUEM_V4.segmentos.map((segmento, indice) => {
            const Icone = ICONES_SEGMENTO[indice];
            return (
              <li key={segmento.nome}>
                <Reveal delay={(indice % 4) * 60} className="h-full">
                  <Cartao className="h-full p-6 transition-colors hover:border-white/[0.16]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-petroleo/20 text-petroleo-claro">
                      <Icone size={17} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <h3 className="mt-8 text-[1rem] font-semibold tracking-[-0.01em] text-papel">
                      {segmento.nome}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-[#a1a6ae]">
                      {segmento.texto}
                    </p>
                  </Cartao>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Secao>
  );
}
