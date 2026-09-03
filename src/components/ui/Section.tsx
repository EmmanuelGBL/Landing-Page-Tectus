import type { ReactNode } from "react";

/** Container padrão. 1200px com respiro lateral de 24px no mobile. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[75rem] px-6 ${className ?? ""}`}>{children}</div>
  );
}

/**
 * Eyebrow: rótulo curto acima do título da seção.
 *
 * A variante clara usa petróleo escuro, não o acento puro: em texto de
 * 0,75rem sobre `cinza-fundo` o acento puro fica em 4,40:1, abaixo do
 * mínimo de 4,5:1 da WCAG AA. Medido, não estimado.
 */
export function Eyebrow({
  children,
  variante = "claro",
}: {
  children: ReactNode;
  variante?: "claro" | "escuro";
}) {
  return (
    <p
      className={`mb-4 text-xs font-semibold uppercase tracking-[0.14em] ${
        variante === "escuro" ? "text-petroleo-claro" : "text-petroleo-escuro"
      }`}
    >
      {children}
    </p>
  );
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** Fundo grafite inverte o esquema de cor da seção inteira. */
  fundo?: "papel" | "cinza" | "grafite";
  className?: string;
};

export function Section({ id, children, fundo = "papel", className }: SectionProps) {
  const fundos = {
    papel: "bg-papel text-grafite",
    cinza: "bg-cinza-fundo text-grafite",
    grafite: "fundo-escuro bg-grafite text-papel",
  } as const;

  const escuro = fundo === "grafite";

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-secao lg:py-secao-lg ${fundos[fundo]} ${className ?? ""}`}
    >
      {/*
        As seções grafite eram uma chapa lisa de cor, o que fazia o texto
        flutuar num vazio. Duas camadas resolvem sem competir com o conteúdo:
        a malha de desenho técnico, que amarra com a origem do nome da marca,
        e um halo do acento no canto, que dá profundidade.
        Ambas decorativas, com máscara, e sem custo de imagem.
      */}
      {escuro ? (
        <>
          <span
            aria-hidden="true"
            className="malha-tecnica-escura pointer-events-none absolute inset-0"
            style={{
              maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, #000 10%, transparent 70%)",
            }}
          />
          <span
            aria-hidden="true"
            className="halo-petroleo pointer-events-none absolute -right-24 top-1/4 h-[34rem] w-[34rem] blur-3xl"
          />
          {/* Fio do acento na emenda com a seção anterior. Marca a troca de
              fundo em vez de deixar o corte seco. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petroleo to-transparent opacity-60"
          />
        </>
      ) : null}

      <div className="relative">{children}</div>
    </section>
  );
}

/** Título de seção com eyebrow e subtítulo opcional. */
export function TituloSecao({
  eyebrow,
  titulo,
  subtitulo,
  variante = "claro",
  centralizado = false,
}: {
  eyebrow?: string;
  titulo: string;
  subtitulo?: string;
  variante?: "claro" | "escuro";
  centralizado?: boolean;
}) {
  return (
    <div className={centralizado ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <Eyebrow variante={variante}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`text-[2rem] font-bold leading-[1.15] tracking-[-0.022em] lg:text-[2.5rem] ${
          variante === "escuro" ? "text-papel" : "text-grafite"
        }`}
      >
        {titulo}
      </h2>
      {subtitulo ? (
        <p
          className={`mt-5 text-[1.05rem] leading-relaxed ${
            variante === "escuro" ? "text-cinza" : "text-chumbo"
          }`}
        >
          {subtitulo}
        </p>
      ) : null}
    </div>
  );
}
