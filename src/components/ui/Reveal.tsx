"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Entrada de seção com fade e deslocamento de 12px, disparada uma única vez.
 * IntersectionObserver em vez de Framer Motion: para um fade simples, a
 * biblioteca não se paga em bytes.
 *
 * O CSS respeita prefers-reduced-motion, então quem desativa animação vê o
 * conteúdo direto no estado final.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Atraso em ms, para escalonar itens de uma grade. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visivel ? "reveal-visivel" : ""} ${className ?? ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
