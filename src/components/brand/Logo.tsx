import { MONOGRAMA, WORDMARK_TRACKING } from "@/lib/marca";

/**
 * Monograma Tectus. Geometria em @/lib/marca.
 *
 * A haste da direita carrega o acento azul-petróleo. A barra e a haste
 * esquerda herdam a cor do contexto, o que faz o símbolo funcionar tanto
 * sobre papel quanto sobre grafite sem duplicar o componente.
 */

type MonogramaProps = {
  className?: string;
  /** Cor das planchas neutras. Aceita qualquer valor CSS. */
  corBase?: string;
  corAcento?: string;
};

export function Monograma({
  className,
  corBase = "currentColor",
  corAcento = "var(--color-petroleo)",
}: MonogramaProps) {
  return (
    <svg
      viewBox={MONOGRAMA.viewBox}
      className={className}
      role="img"
      aria-label="Símbolo da Tectus"
      focusable="false"
    >
      {/* Barra e haste base em cor cheia. No desenho original as duas são
          da mesma cor: quem diferencia é só a peça do acento. */}
      <polygon points={MONOGRAMA.barra} fill={corBase} />
      <polygon points={MONOGRAMA.hasteBase} fill={corBase} />
      <polygon points={MONOGRAMA.hasteAcento} fill={corAcento} />
    </svg>
  );
}

type LogoProps = {
  /** Sobre fundo grafite as cores invertem. */
  variante?: "claro" | "escuro";
  className?: string;
};

export function Logo({ variante = "claro", className }: LogoProps) {
  const escuro = variante === "escuro";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Monograma
        className={`h-7 w-7 shrink-0 ${escuro ? "text-papel" : "text-grafite"}`}
        corAcento={escuro ? "var(--color-petroleo-claro)" : "var(--color-petroleo)"}
      />
      {/* O tracking aberto vem do arquivo de referência. Sem ele o wordmark
          fica compacto demais e perde o ar de consultoria.
          O padding-right compensa o espaço que o tracking adiciona depois
          do "S", senão o logo parece deslocado para a esquerda. */}
      {/* Abaixo de 360px de tela o wordmark é escondido e sobra o símbolo,
          que é justamente para isso que a marca tem versão de símbolo. Com o
          wordmark, a linha do header estourava a largura em aparelho pequeno.
          O nome da empresa continua legível pelo texto alternativo do link. */}
      <span
        className={`hidden pr-[0.22em] text-[1.3rem] font-bold min-[360px]:inline ${
          escuro ? "text-papel" : "text-grafite"
        }`}
        style={{ letterSpacing: WORDMARK_TRACKING }}
      >
        TECTUS
      </span>
    </span>
  );
}
