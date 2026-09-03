import Image from "next/image";
import { Check, Globe, Minus, Search, Server, type LucideIcon } from "lucide-react";
import { BotaoLink, IconeWhatsApp } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { CASE_ANCORA, LOGOS } from "@/lib/conteudo";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";

/**
 * A prova mais forte disponível, e a única história contada por inteiro.
 * Não porque é o maior projeto, mas porque é o único que percorre a escada
 * completa. O case não prova que a Tectus programa: prova que o método
 * funciona, que é a tese da página.
 *
 * Restrição: sem aspas que o cliente não disse, sem percentual que ninguém
 * mediu. A sequência dos fatos é o argumento.
 *
 * Terceira versão, e ela é a primeira com a cor certa. A primeira foi grafite
 * com malha, halo e cards de vidro: conteúdo importante lido como bloco
 * pesado, e um segundo momento escuro disputando com o Método. A segunda
 * trocou os três cards por linha do tempo vertical, e o Emmanuel preferiu o
 * formato original. Ele está de volta, em fundo claro, que era o pedido.
 *
 * O que a versão vertical tinha de certo e ficou: a marca real da Priorize
 * no topo, em vez do nome escrito.
 *
 * O que entrou de novo: a etiqueta de estado em cada fase (concluído, no ar,
 * em planejamento). É dado documentado, não enfeite, e é o que faz a seção
 * ler como história em curso em vez de portfólio parado. Sem ela, três cards
 * descrevem três coisas prontas; com ela, o visitante vê uma escada sendo
 * subida, e é aí que ele entende onde ele mesmo entraria.
 */
/** Um ícone por fase da história, na ordem de `CASE_ANCORA.etapas`. */
const ICONES: readonly LucideIcon[] = [Search, Globe, Server];

export function CaseAncora() {
  return (
    <Section id="case">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Case</Eyebrow>

          {/* A marca real pesa mais que o nome escrito, e é a única prova
              social que esta página pode exibir sem inventar número. */}
          <Image
            src={LOGOS.priorize.arquivo}
            alt={LOGOS.priorize.nome}
            width={LOGOS.priorize.largura}
            height={LOGOS.priorize.altura}
            className="h-9 w-auto object-contain"
          />

          <h2 className="mt-6 text-[2rem] font-bold leading-[1.14] tracking-[-0.022em] text-grafite lg:text-[2.5rem]">
            {CASE_ANCORA.chamada}
          </h2>

          <p className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.11em] text-cinza-texto">
            {CASE_ANCORA.segmento}
          </p>

          <p className="mt-6 text-[1.05rem] leading-relaxed text-chumbo">
            {CASE_ANCORA.contexto}
          </p>
        </div>

        {/*
          O antes e depois. É a única prova de resultado da página, e só
          existe desde 25/08/2026, quando o estado anterior da Priorize foi
          confirmado. Duas colunas em vez de lista corrida porque a mudança
          é o argumento: lado a lado o leitor compara sozinho, sem que o
          texto precise dizer "melhorou".

          A coluna "Antes" é cinza e sem elevação, a de "Hoje" é branca com
          anel do acento. A hierarquia de cor faz o trabalho que um adjetivo
          faria, e sem afirmar nada que não foi medido.
        */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-cinza-linha bg-cinza-fundo p-7">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.11em] text-cinza-texto">
              {CASE_ANCORA.antesDepois.rotuloAntes}
            </p>
            <ul className="mt-5 space-y-3.5">
              {CASE_ANCORA.antesDepois.antes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-cinza-texto"
                >
                  <Minus size={16} strokeWidth={2.2} aria-hidden="true" className="mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-petroleo/30 bg-white p-7 elevacao-1">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.11em] text-petroleo-escuro">
              {CASE_ANCORA.antesDepois.rotuloDepois}
            </p>
            <ul className="mt-5 space-y-3.5">
              {CASE_ANCORA.antesDepois.depois.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-grafite">
                  <Check
                    size={16}
                    strokeWidth={2.4}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-petroleo"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {/* Até 25/08/2026 o último card vinha tracejado, porque o sistema
              estava em planejamento. O Emmanuel confirmou que ele entrou em
              operação, então as três fases estão no mesmo estado e o traço
              diferente virou ruído. A etiqueta de estado continua, porque
              "Concluído", "No ar" e "Em operação" não são a mesma coisa. */}
          {CASE_ANCORA.etapas.map((etapa, indice) => {
            return (
              <li key={etapa.fase}>
                <Reveal delay={indice * 90} className="h-full">
                  <article
                    className="flex h-full flex-col rounded-2xl border border-cinza-linha bg-white p-7 transition-colors duration-200 hover:border-cinza"
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <Icone icone={ICONES[indice]} />
                      <span className="rounded-full bg-petroleo/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-petroleo-escuro">
                        {etapa.estado}
                      </span>
                    </div>

                    <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em] text-grafite">
                      {etapa.fase}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-chumbo">
                      {etapa.texto}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-6 border-t border-cinza-linha pt-9 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-[1.05rem] leading-relaxed text-grafite">
            {CASE_ANCORA.fecho}
          </p>
          <BotaoLink
            href={whatsappLink(WHATSAPP_MESSAGES.cases)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <IconeWhatsApp className="h-4 w-4" />
            Quero esse tipo de conversa
          </BotaoLink>
        </div>
      </Container>
    </Section>
  );
}
