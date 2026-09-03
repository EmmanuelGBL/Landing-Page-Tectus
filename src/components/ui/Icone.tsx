import type { LucideIcon } from "lucide-react";

/**
 * Chip de ícone. Um formato só para a página inteira.
 *
 * Ícone solto no meio do texto vira ruído: some no fundo claro e não cria
 * âncora visual. Dentro de um chip com fundo tingido e anel, ele vira um
 * objeto, dá ponto de descanso para o olho e marca o começo de cada card
 * sem precisar de mais uma linha de texto.
 *
 * Sempre decorativo do ponto de vista da acessibilidade: o título do card
 * ao lado já diz o que o ícone ilustra, e ícone anunciado duas vezes atrapalha
 * quem usa leitor de tela.
 */
export function Icone({
  icone: Glifo,
  variante = "claro",
  tamanho = "md",
}: {
  icone: LucideIcon;
  /** Sobre fundo grafite o acento vira a versão clara. */
  variante?: "claro" | "escuro";
  tamanho?: "sm" | "md";
}) {
  const caixa = tamanho === "sm" ? "h-9 w-9 rounded-lg" : "h-11 w-11 rounded-xl";
  const glifo = tamanho === "sm" ? 17 : 20;

  const cores =
    variante === "escuro"
      ? "bg-petroleo-claro/12 text-petroleo-claro ring-petroleo-claro/25"
      : "bg-petroleo/10 text-petroleo-escuro ring-petroleo/20";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ring-1 ring-inset ${caixa} ${cores}`}
    >
      <Glifo size={glifo} strokeWidth={1.9} />
    </span>
  );
}
