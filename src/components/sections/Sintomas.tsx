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
import { BotaoLink, IconeWhatsApp } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { Container, Section, TituloSecao } from "@/components/ui/Section";
import { SINTOMAS, SINTOMAS_TITULO } from "@/lib/conteudo";
import { whatsappLink } from "@/lib/site";

/**
 * A seção que resolve a objeção principal: o leitor sente o sintoma mas não
 * sabe nomear a solução, e por isso não busca por "automação". Ele precisa
 * se reconhecer antes de qualquer nome de produto.
 *
 * Segunda versão do formato interativo. A primeira espalhou seis cartões
 * clicáveis numa grade de três colunas, cada um com sombra, borda, caixa de
 * marcação e etiqueta. Seis objetos disputando atenção não parecem uma
 * lista: parecem uma tela de configuração. Ninguém entende que deve marcar.
 *
 * Agora é um objeto só: uma lista vertical com divisórias finas, do jeito
 * que qualquer pessoa já viu num formulário. A linha inteira é o alvo de
 * clique, o ícone dá âncora visual para leitura rápida, e o estado marcado
 * muda a linha inteira em vez de só a caixinha.
 *
 * O que não mudou, porque é o motivo de a seção existir: quem marca duas ou
 * mais concorda com o diagnóstico sozinho, e o CTA sai daqui com os sintomas
 * marcados escritos na mensagem do WhatsApp. O lead chega qualificado.
 *
 * Terceira versão, do corte de 24/08/2026. O Emmanuel usou as palavras
 * "poluição" e "frescura", e as duas tinham endereço:
 *
 * 1. Cada linha exibia o nome do pilar que resolve o sintoma ("INTEGRAÇÕES",
 *    "DASHBOARD") em caixa alta. Isso é vocabulário nosso, não dele. No
 *    instante de se reconhecer numa cena, o nome da frente que resolve não
 *    ajuda: atrapalha, porque duplica o texto de cada linha. O dado não
 *    morreu, mudou de lugar. Entra na mensagem do WhatsApp, onde qualifica
 *    o lead sem custar um pixel na tela.
 * 2. O contador "0 de 6 marcadas" e o texto do estado zero ocupavam o rodapé
 *    antes de a pessoa fazer qualquer coisa. Rodapé de resultado só faz
 *    sentido quando existe resultado. Agora ele nasce vazio e aparece
 *    depois do primeiro clique.
 *
 * Estado local. Nada sai do navegador sem a pessoa clicar no botão.
 */

/**
 * Um ícone por sintoma, pela chave `id` de `SINTOMAS`.
 * Fica aqui, e não em `conteudo.ts`, porque ícone é apresentação: as skills
 * de texto precisam poder reescrever a lista sem esbarrar em componente.
 */
const ICONES: Record<string, LucideIcon> = {
  redigitar: Copy,
  fechamento: CalendarClock,
  "tarefa-manual": Repeat,
  planilhas: Table2,
  atendimento: MessagesSquare,
  presenca: Search,
  "por-onde-comecar": Compass,
};

type SintomasProps = {
  /**
   * Quais sintomas mostrar, pela chave. Sem a lista, a home mostra todos.
   * As rotas de oferta filtram pela dor daquele anúncio (ver `ofertas.ts`).
   */
  ids?: readonly string[];
  /** Primeira linha da mensagem do WhatsApp: diz de qual página o lead veio. */
  origem?: string;
};

export function Sintomas({ ids, origem = "Olá! Vim pelo site da Tectus." }: SintomasProps) {
  const [marcados, setMarcados] = useState<readonly string[]>([]);

  const lista = ids ? SINTOMAS.filter((sintoma) => ids.includes(sintoma.id)) : SINTOMAS;

  function alternar(texto: string) {
    setMarcados((atual) =>
      atual.includes(texto) ? atual.filter((item) => item !== texto) : [...atual, texto],
    );
  }

  const total = marcados.length;

  const fecho = total === 1 ? SINTOMAS_TITULO.fechoUm : SINTOMAS_TITULO.fecho;

  const mensagem = [
    origem,
    "",
    "No diagnóstico rápido, marquei o que acontece na minha empresa:",
    // O nome da frente que resolve cada sintoma saiu da tela e vive aqui:
    // qualifica o lead antes da primeira resposta e não custa uma linha de
    // leitura para quem só quer se reconhecer nas cenas.
    ...lista.filter((sintoma) => marcados.includes(sintoma.texto)).map(
      (sintoma) => `- ${sintoma.naPrimeiraPessoa} (${sintoma.resolvePor})`,
    ),
    "",
    "Queria entender como resolver isso.",
  ].join("\n");

  return (
    <Section id="sintomas" fundo="papel">
      <Container>
        <TituloSecao
          eyebrow={SINTOMAS_TITULO.eyebrow}
          titulo={SINTOMAS_TITULO.titulo}
          subtitulo={SINTOMAS_TITULO.subtitulo}
        />

        <p className="mt-8 text-[0.85rem] font-medium text-cinza-texto">
          {SINTOMAS_TITULO.instrucao}
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-cinza-linha bg-white elevacao-1">
          <ul>
            {lista.map((sintoma) => {
              const marcado = marcados.includes(sintoma.texto);

              return (
                <li key={sintoma.texto} className="border-b border-cinza-linha last:border-none">
                  <button
                    type="button"
                    onClick={() => alternar(sintoma.texto)}
                    aria-pressed={marcado}
                    className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-200 sm:px-6 ${
                      marcado ? "bg-petroleo/[0.045]" : "hover:bg-cinza-fundo/60"
                    }`}
                  >
                    <Icone icone={ICONES[sintoma.id] ?? Compass} tamanho="sm" />

                    <span className="min-w-0 flex-1 text-[1rem] font-medium leading-snug text-grafite">
                      {sintoma.texto}
                    </span>

                    {/* Marcador à direita, onde o olho termina a linha.
                        aria-pressed no botão já comunica o estado, então o
                        desenho é decorativo. */}
                    <span
                      aria-hidden="true"
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        marcado
                          ? "border-petroleo bg-petroleo text-white"
                          : "border-cinza-linha bg-white text-transparent"
                      }`}
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Rodapé de resultado. Nasce vazio: sem marcação não há resultado,
              e ocupar o espaço antes disso é só ruído. aria-live faz o leitor
              de tela anunciar a mudança sem precisar navegar até aqui. */}
          <div aria-live="polite">
            {total > 0 ? (
              <div className="flex flex-col gap-5 border-t border-cinza-linha bg-cinza-fundo px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <p className="max-w-2xl text-[1.02rem] leading-relaxed text-grafite">{fecho}</p>

                <BotaoLink
                  href={whatsappLink(mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <IconeWhatsApp className="h-4 w-4" />
                  {SINTOMAS_TITULO.ctaMarcados}
                </BotaoLink>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
