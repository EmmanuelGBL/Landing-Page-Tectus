"use client";

import {
  CalendarClock,
  Check,
  Compass,
  Copy,
  MessagesSquare,
  Repeat,
  Search,
  Table2,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Icone } from "@/components/ui/Icone";
import { IconeWhatsApp } from "@/components/ui/Button";
import { SINTOMAS } from "@/lib/conteudo";
import { SINTOMAS_TITULO_V2 } from "@/lib/conteudo-v2";
import { PROBLEMA_V3 } from "@/lib/conteudo-v3";
import { whatsappLink } from "@/lib/site";
import { Botao, CabecalhoSecao, Container, Secao } from "./ui";

const ICONES: Record<string, LucideIcon> = {
  redigitar: Copy,
  fechamento: CalendarClock,
  "tarefa-manual": Repeat,
  planilhas: Table2,
  atendimento: MessagesSquare,
  presenca: Search,
  "por-onde-comecar": Compass,
};

/**
 * Sintomas na grade de cartões da referência ("O lead chega fora do
 * horário..."), mantendo o que a home tem e a referência não: dá para marcar,
 * e o botão leva ao WhatsApp o que foi marcado.
 *
 * Grade de cartões clicáveis já falhou uma vez nesta página (24/08/2026):
 * ninguém entendia que podia marcar. Por isso cada cartão traz a caixa de
 * marcação desenhada à direita, que é um formato que todo mundo reconhece, e a
 * instrução fica logo acima da grade.
 *
 * O último sintoma ("não sei por onde começar") ocupa a linha inteira: é a
 * ponte para o diagnóstico, e com sete itens numa grade de dois ele sobraria
 * sozinho de qualquer jeito.
 */
export function SintomasV3() {
  const [marcados, setMarcados] = useState<readonly string[]>([]);
  const titulo = SINTOMAS_TITULO_V2;

  function alternar(id: string) {
    setMarcados((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id],
    );
  }

  const total = marcados.length;
  const fecho = total === 1 ? titulo.fechoUm : titulo.fecho;

  const mensagem = [
    "Olá! Vim pelo site da Tectus.",
    "",
    "No diagnóstico rápido, marquei o que acontece na minha empresa:",
    ...SINTOMAS.filter((sintoma) => marcados.includes(sintoma.id)).map(
      (sintoma) => `- ${sintoma.naPrimeiraPessoa} (${sintoma.resolvePor})`,
    ),
    "",
    "Queria entender como resolver isso.",
  ].join("\n");

  return (
    <Secao id="sintomas">
      <Container>
        <CabecalhoSecao
          eyebrow={titulo.eyebrow}
          titulo={PROBLEMA_V3.titulo}
          subtitulo={titulo.subtitulo}
        />

        <p className="mt-10 text-center text-[0.85rem] font-medium text-petroleo-claro">
          {titulo.instrucao}
        </p>

        <ul className="mx-auto mt-5 grid max-w-4xl gap-3 sm:grid-cols-2">
          {SINTOMAS.map((sintoma, indice) => {
            const marcado = marcados.includes(sintoma.id);
            const ultimo = indice === SINTOMAS.length - 1;

            return (
              <li key={sintoma.id} className={ultimo ? "sm:col-span-2" : undefined}>
                <button
                  type="button"
                  onClick={() => alternar(sintoma.id)}
                  aria-pressed={marcado}
                  className={`flex h-full w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleo-claro ${
                    marcado
                      ? "border-petroleo-claro/50 bg-petroleo-claro/[0.08]"
                      : "border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
                  }`}
                >
                  <Icone icone={ICONES[sintoma.id] ?? Compass} variante="escuro" tamanho="sm" />
                  <span className="min-w-0 flex-1 text-[0.95rem] leading-snug text-papel/90">
                    {sintoma.texto}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                      marcado
                        ? "border-petroleo-claro bg-petroleo-claro text-grafite-alto"
                        : "border-white/25 text-transparent"
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Nasce vazio. Sem marcação não há resultado para mostrar. */}
        <div aria-live="polite" className="mx-auto mt-10 max-w-2xl text-center">
          {total > 0 ? (
            <>
              <p className="text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-papel">
                {fecho}
              </p>
              <Botao
                href={whatsappLink(mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6"
              >
                <IconeWhatsApp className="h-[18px] w-[18px]" />
                {titulo.ctaMarcados}
              </Botao>
            </>
          ) : null}
        </div>
      </Container>
    </Secao>
  );
}
