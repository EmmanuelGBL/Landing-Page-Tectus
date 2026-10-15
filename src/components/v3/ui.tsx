import type { ComponentProps, ReactNode } from "react";
import type { TituloDuplo } from "@/lib/conteudo-v3";

/**
 * Peças comuns da prévia `/v3`, toda em fundo escuro, no desenho da
 * referência (conversaoextrema.com.br): título em duas cores, eyebrow
 * espaçado, cartões de vidro com borda fina e brilho do acento no topo de
 * cada seção.
 *
 * Fica separado de `components/ui` porque a home continua clara. Se a v3 for
 * aprovada, estas peças substituem as de lá.
 */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}

/**
 * Seção escura. A malha de pontos e o brilho no topo vêm da referência: são o
 * que impede o fundo escuro de virar chapa lisa, sem somar objeto de leitura.
 */
export function Secao({
  id,
  children,
  brilho = true,
  className,
}: {
  id?: string;
  children: ReactNode;
  brilho?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 border-t border-white/[0.06] py-20 lg:py-28 ${className ?? ""}`}
    >
      {brilho ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(34,180,191,0.13),transparent)]"
        />
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cinza ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/**
 * Título em duas partes, a segunda no acento. O espaço entre elas é texto de
 * verdade: leitor de tela e extrator de snippet leem "parte um parte dois",
 * e não as duas coladas.
 */
export function TituloDuas({
  partes,
  como: Tag = "h2",
  className,
  quebra = true,
}: {
  partes: TituloDuplo;
  como?: "h1" | "h2" | "h3";
  className?: string;
  /** Força a segunda parte para a linha de baixo. */
  quebra?: boolean;
}) {
  return (
    <Tag className={`font-extrabold tracking-[-0.04em] text-papel ${className ?? ""}`}>
      {partes[0]}{" "}
      <span className={`text-petroleo-claro ${quebra ? "block" : ""}`}>{partes[1]}</span>
    </Tag>
  );
}

/** Cabeçalho centralizado de seção. */
export function CabecalhoSecao({
  eyebrow,
  titulo,
  subtitulo,
}: {
  eyebrow: string;
  titulo: TituloDuplo;
  subtitulo?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <TituloDuas
        partes={titulo}
        className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.6rem] lg:text-[2.9rem]"
      />
      {subtitulo ? (
        <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-cinza">
          {subtitulo}
        </p>
      ) : null}
    </div>
  );
}

type VarianteBotao = "solido" | "contorno";

/**
 * Botão em pílula. O sólido é exclusivo do WhatsApp, como na home: onde ele
 * aparece, é o único com peso cheio.
 */
export function Botao({
  variante = "solido",
  className,
  children,
  ...props
}: { variante?: VarianteBotao; children: ReactNode } & ComponentProps<"a">) {
  const estilo =
    variante === "solido"
      ? "bg-petroleo-claro text-grafite-alto shadow-[0_0_0_1px_rgba(34,180,191,0.4),0_8px_30px_-8px_rgba(34,180,191,0.55)] hover:bg-white"
      : "border border-white/15 bg-white/[0.03] text-papel hover:border-white/35 hover:bg-white/[0.06]";

  return (
    <a
      className={`inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleo-claro ${estilo} ${className ?? ""}`}
      {...props}
    >
      {children}
    </a>
  );
}

/** Moldura das telas ilustrativas: cartão de vidro com rótulo no topo. */
export function Janela({
  rotulo,
  children,
  className,
}: {
  rotulo: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-5 ${className ?? ""}`}
    >
      <p className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-cinza">
        <span className="h-1.5 w-1.5 rounded-full bg-petroleo-claro" />
        {rotulo}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Três pontos de "está escrevendo", parados para quem desliga animação. */
export function Digitando() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 150, 300].map((atraso) => (
        <span
          key={atraso}
          className="h-1.5 w-1.5 rounded-full bg-petroleo-claro motion-safe:animate-pulse"
          style={{ animationDelay: `${atraso}ms` }}
        />
      ))}
    </span>
  );
}
