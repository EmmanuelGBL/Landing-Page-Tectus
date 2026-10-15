import { Check, CircleDashed, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { IconeWhatsApp } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESSO_V3 } from "@/lib/conteudo-v3";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";
import { Botao, CabecalhoSecao, Container, Digitando, Eyebrow, Janela, Secao, TituloDuas } from "./ui";

/**
 * "Como funciona" no desenho da referência: linhas alternando texto e uma
 * tela ilustrativa. Lá as telas mostram o produto (agenda de mentorias,
 * soluções prontas); aqui cada uma mostra o que o cliente recebe na etapa.
 *
 * Nenhuma tela tem número de resultado. As barras da proposta são cinza de
 * propósito: valor e prazo saem do diagnóstico, e qualquer número ali seria
 * lido como preço.
 */

function Linha({ ativo, children }: { ativo?: boolean; children: ReactNode }) {
  return (
    <li
      className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[0.85rem] ${
        ativo
          ? "border-petroleo-claro/30 bg-petroleo-claro/[0.07] text-papel"
          : "border-white/[0.07] bg-white/[0.03] text-papel/80"
      }`}
    >
      {children}
    </li>
  );
}

function Feito() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-petroleo-claro text-grafite-alto">
      <Check size={12} strokeWidth={3} />
    </span>
  );
}

function Pendente() {
  return <CircleDashed size={20} strokeWidth={1.8} className="shrink-0 text-cinza" />;
}

const TELAS: Record<string, ReactNode> = {
  "01": (
    <Janela rotulo="WhatsApp · Tectus">
      <div className="space-y-2.5">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.08] px-3.5 py-2.5 text-[0.85rem] leading-snug text-papel">
          Olá! Os pedidos ficam espalhados entre o WhatsApp e uma planilha. Dá para resolver?
        </p>
        <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-petroleo-claro/25 bg-petroleo-claro/10 px-3.5 py-2.5 text-[0.85rem] leading-snug text-papel">
          Dá para conversar sobre isso. Qual horário fica bom para você?
        </p>
        <p className="flex items-center gap-2 pl-1 text-[0.75rem] text-cinza">
          <Digitando /> escrevendo
        </p>
      </div>
    </Janela>
  ),
  "02": (
    <Janela rotulo="Diagnóstico">
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/[0.04] px-3.5 py-3">
        <FileText size={18} strokeWidth={1.8} className="text-petroleo-claro" />
        <span className="text-[0.88rem] font-semibold text-papel">Onde a operação trava</span>
      </div>
      <ul className="space-y-2">
        <Linha>
          <Feito /> Como o processo funciona hoje
        </Linha>
        <Linha>
          <Feito /> Onde o tempo e o dinheiro vazam
        </Linha>
        <Linha ativo>
          <Pendente /> O que resolver primeiro
        </Linha>
      </ul>
    </Janela>
  ),
  "03": (
    <Janela rotulo="Proposta">
      <ul className="space-y-2">
        {["Escopo", "Valor", "Prazo"].map((item, indice) => (
          <Linha key={item}>
            <span className="w-14 shrink-0 text-cinza">{item}</span>
            <span
              className="h-2 flex-1 rounded-full bg-white/10"
              style={{ maxWidth: `${[85, 55, 70][indice]}%` }}
            />
            <span className="ml-auto rounded-full bg-petroleo-claro/15 px-2.5 py-0.5 text-[0.68rem] font-semibold text-petroleo-claro">
              fechado
            </span>
          </Linha>
        ))}
      </ul>
    </Janela>
  ),
  "04": (
    <Janela rotulo="Entregas">
      <ul className="space-y-2">
        <Linha>
          <Feito /> Primeira entrega
        </Linha>
        <Linha>
          <Feito /> Segunda entrega
        </Linha>
        <Linha ativo>
          <Pendente /> Entrega final
        </Linha>
        <Linha>
          <Pendente /> Documentação e treinamento da equipe
        </Linha>
      </ul>
    </Janela>
  ),
};

export function ProcessoV3() {
  return (
    <Secao id="como-funciona">
      <Container>
        <CabecalhoSecao
          eyebrow={PROCESSO_V3.eyebrow}
          titulo={PROCESSO_V3.titulo}
          subtitulo={PROCESSO_V3.subtitulo}
        />

        <ol className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {PROCESSO_V3.etapas.map((etapa, indice) => {
            const invertido = indice % 2 === 1;

            return (
              <li key={etapa.numero}>
                <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={invertido ? "lg:order-2" : undefined}>
                    <Eyebrow>
                      Etapa {etapa.numero} · {etapa.nome}
                    </Eyebrow>
                    <TituloDuas
                      como="h3"
                      partes={etapa.titulo}
                      className="mt-4 text-[1.75rem] leading-[1.12] lg:text-[2.25rem]"
                    />
                    <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-cinza">
                      {etapa.texto}
                    </p>
                    {"cta" in etapa ? (
                      <Botao
                        href={whatsappLink(WHATSAPP_MESSAGES.processo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7"
                      >
                        <IconeWhatsApp className="h-4 w-4" />
                        {etapa.cta}
                      </Botao>
                    ) : null}
                  </div>
                  <div aria-hidden="true" className={invertido ? "lg:order-1" : undefined}>
                    {TELAS[etapa.numero]}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Secao>
  );
}
