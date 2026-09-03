"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Linha que se desenha da esquerda para a direita quando a seção entra na
 * tela, ligando as etapas do processo.
 *
 * É movimento com função: a linha sendo traçada comunica sequência, que é
 * exatamente o que a seção afirma (quatro etapas, nesta ordem). Uma linha
 * estática comunicaria só "estes cards estão alinhados".
 *
 * Decorativa para a acessibilidade: a ordem já está no <ol> e na numeração
 * de cada card, então o SVG fica escondido do leitor de tela.
 */
export function TracoConector({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [desenhado, setDesenhado] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setDesenhado(true);
          observador.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <svg viewBox="0 0 1000 2" preserveAspectRatio="none" className="h-[2px] w-full">
        <line x1="0" y1="1" x2="1000" y2="1" stroke="var(--color-cinza-linha)" strokeWidth="2" />
        <line
          x1="0"
          y1="1"
          x2="1000"
          y2="1"
          stroke="var(--color-petroleo)"
          strokeWidth="2"
          className={`traco-desenha ${desenhado ? "traco-desenhado" : ""}`}
          style={{ "--tamanho": 1000 } as React.CSSProperties}
        />
      </svg>
    </div>
  );
}
