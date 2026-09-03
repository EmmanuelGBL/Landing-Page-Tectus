import { MONOGRAMA } from "@/lib/marca";

/**
 * O objeto visual do hero.
 *
 * Segunda versão. A primeira era bonita e ilegível: cinco caminhos
 * emaranhados, cinco trilhos, pontos pulsando, linha divisória tracejada e
 * dois rótulos minúsculos em caixa alta. Quem desenhou entendia; quem chega
 * pela primeira vez via um enfeite abstrato, e enfeite abstrato no lugar mais
 * caro da página é desperdício.
 *
 * O que mudou: menos linhas (quatro em vez de cinco), nenhum movimento além
 * do fluxo correndo nos trilhos, e as legendas saíram de dentro do SVG para
 * virar texto de verdade, em português claro, do tamanho de quem quer ser
 * lido. A legenda não é acessório do desenho. É ela que faz o desenho
 * significar alguma coisa.
 *
 * Terceira versão, e o corte foi na própria legenda. Cada lado tinha um
 * rótulo e uma frase de apoio embaixo. O rótulo é a chave de leitura: sem
 * ele o desenho volta a ser enfeite. A frase de apoio era elaboração, e
 * dizia em vinte e duas palavras o que o desenho já diz sozinho depois de
 * nomeado. Vinte e duas palavras é caro no lugar mais caro da página.
 *
 * Continua abstrato quanto a números e ferramentas: rótulo de ferramenta ou
 * percentual aqui viraria afirmação sem lastro, o que a regra de veracidade
 * do projeto proíbe.
 */

/** Alturas dos quatro canais. Compartilhadas pelos dois lados. */
const TRILHAS = [60, 130, 200, 270];

/**
 * Caminhos emaranhados. Cada um sai de uma altura e chega em outra, cruzando
 * os vizinhos. O que comunica bagunça é o cruzamento, não a curva.
 */
const EMARANHADO = [
  "M40,60 C 100,60 85,180 145,190 C 180,196 200,200 230,200",
  "M40,130 C 110,134 92,50 160,52 C 196,54 205,58 230,60",
  "M40,200 C 95,204 120,255 165,262 C 198,268 205,270 230,270",
  "M40,270 C 112,274 80,128 158,126 C 200,124 208,128 230,130",
];

export function DiagramaFluxo({ className }: { className?: string }) {
  return (
    <figure className={`m-0 ${className ?? ""}`}>
      <svg
        viewBox="0 0 500 330"
        className="w-full"
        role="img"
        aria-label="Esquema com quatro caminhos que se cruzam à esquerda, representando a operação de hoje, e os mesmos quatro caminhos paralelos e organizados à direita, representando a operação depois do diagnóstico."
      >
        {/* ---------------- Lado embolado ---------------- */}
        <g fill="none" stroke="var(--color-cinza)" strokeWidth="1.6" strokeLinecap="round">
          {EMARANHADO.map((d, indice) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: `desenhar-caminho 1100ms cubic-bezier(0.22,1,0.36,1) ${
                  200 + indice * 120
                }ms forwards`,
              }}
            />
          ))}
        </g>

        <g fill="var(--color-chumbo)">
          {TRILHAS.map((y, indice) => (
            <circle
              key={y}
              cx="40"
              cy={y}
              r="4.5"
              style={{ opacity: 0, animation: `aparecer 400ms ease-out ${indice * 100}ms forwards` }}
            />
          ))}
        </g>

        {/* ---------------- Eixo de virada ---------------- */}
        <g style={{ opacity: 0, animation: "surgir 620ms ease-out 700ms forwards" }}>
          <circle cx="265" cy="165" r="27" fill="var(--color-papel)" />
          <circle
            cx="265"
            cy="165"
            r="27"
            fill="none"
            stroke="var(--color-petroleo)"
            strokeWidth="1.4"
          />
          {/* Monograma pela geometria de @/lib/marca, escalado de 200 para 32
              unidades. Polígono nativo, sem foreignObject. */}
          <g transform="translate(249 149) scale(0.16)">
            <polygon points={MONOGRAMA.barra} fill="var(--color-grafite)" />
            <polygon points={MONOGRAMA.hasteBase} fill="var(--color-grafite)" />
            <polygon points={MONOGRAMA.hasteAcento} fill="var(--color-petroleo)" />
          </g>
        </g>

        {/* ---------------- Lado organizado ---------------- */}
        <g stroke="var(--color-cinza-linha)" strokeWidth="1.4" strokeLinecap="round">
          {TRILHAS.map((y) => (
            <line key={y} x1="300" y1={y} x2="466" y2={y} />
          ))}
        </g>

        <g
          stroke="var(--color-petroleo)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ opacity: 0, animation: "aparecer 700ms ease-out 1000ms forwards" }}
        >
          {TRILHAS.map((y, indice) => (
            <line
              key={y}
              x1="300"
              y1={y}
              x2="466"
              y2={y}
              className="fluxo-trilho"
              style={{ animationDelay: `${indice * -0.25}s` }}
            />
          ))}
        </g>

        <g fill="var(--color-petroleo)" style={{ opacity: 0, animation: "aparecer 500ms ease-out 1300ms forwards" }}>
          {TRILHAS.map((y) => (
            <circle key={y} cx="466" cy={y} r="4.5" />
          ))}
        </g>
      </svg>

      {/*
        A legenda é metade do objeto: sem ela o desenho é decoração. Mas
        metade é o rótulo, não o parágrafo. Dois rótulos nomeiam os dois
        lados e o desenho passa a se explicar sozinho.
      */}
      <figcaption className="mt-1 grid grid-cols-2 gap-8 text-[0.9rem] font-semibold">
        <p className="text-cinza-texto">Sua operação hoje</p>
        <p className="text-petroleo-escuro">Depois do diagnóstico</p>
      </figcaption>
    </figure>
  );
}
