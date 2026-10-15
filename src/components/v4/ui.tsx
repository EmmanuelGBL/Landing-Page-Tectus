import type { ComponentProps, ReactNode } from "react";
import { IconeWhatsApp } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";
import type { TituloDuplo } from "@/lib/conteudo-v4";

/**
 * Peças da prévia `/v4`. Seguem o desenho de conversaoextrema.com.br: fundo
 * preto neutro, título semibold em duas cores, eyebrow monoespaçado, cartões
 * com borda fina e grifo branco dentro do parágrafo. Nada aqui é importado
 * pela home nem pela `/v3`.
 */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function Secao({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-16 py-20 lg:py-28 ${className ?? ""}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#8b9099] ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/**
 * Converte os trechos entre `**` do texto em destaque branco. Mantém a copy
 * inteira em `conteudo-v4.ts`, sem JSX misturado ao texto.
 */
export function Realce({ texto }: { texto: string }) {
  const partes = texto.split("**");
  return (
    <>
      {partes.map((parte, indice) =>
        indice % 2 === 1 ? (
          <strong key={indice} className="font-semibold text-papel">
            {parte}
          </strong>
        ) : (
          <span key={indice}>{parte}</span>
        ),
      )}
    </>
  );
}

/**
 * Título em duas cores. O `{" "}` explícito evita que o texto acessível saia
 * colado ("empresa,construída") quando a segunda parte quebra de linha.
 */
export function Titulo({
  titulo,
  como: Tag = "h2",
  quebra = true,
  className,
}: {
  titulo: TituloDuplo;
  como?: "h1" | "h2" | "h3";
  quebra?: boolean;
  className?: string;
}) {
  return (
    <Tag className={`font-semibold tracking-[-0.03em] text-papel ${className ?? ""}`}>
      {titulo[0]}{" "}
      <span className={`text-petroleo-claro ${quebra ? "sm:block" : ""}`}>{titulo[1]}</span>
    </Tag>
  );
}

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
    <div className="mx-auto max-w-3xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Titulo
        titulo={titulo}
        className="mt-4 text-[2rem] leading-[1.1] sm:text-[2.5rem]"
      />
      {subtitulo ? (
        <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-relaxed text-[#a1a6ae]">
          <Realce texto={subtitulo} />
        </p>
      ) : null}
    </div>
  );
}

const baseBotao =
  "inline-flex items-center justify-center gap-2.5 text-center sm:whitespace-nowrap rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleo-claro";

/**
 * Botão de WhatsApp. Sempre sólido, pela hierarquia de CTA da landing: onde
 * o WhatsApp aparece, ele é o botão de maior peso.
 */
export function BotaoWhatsApp({
  mensagem,
  children,
  className,
}: {
  mensagem: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseBotao} bg-petroleo text-white shadow-[0_0_0_1px_rgba(34,180,191,0.35),0_10px_36px_-10px_rgba(34,180,191,0.6)] hover:bg-[#0c6d76] ${className ?? ""}`}
    >
      <IconeWhatsApp className="h-[18px] w-[18px] shrink-0" />
      {children}
    </a>
  );
}

/** Botão de contorno, para âncora dentro da página ou CTA de menor peso. */
export function BotaoContorno({ className, children, ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={`${baseBotao} border border-white/15 text-papel hover:border-white/35 hover:bg-white/[0.04] ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

/** Cartão com borda fina sobre o preto, o formato-base da referência. */
export function Cartao({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#111214] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
