"use client";

import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { IconeWhatsApp } from "@/components/ui/Button";
import { CTA_FINAL, FAQ_TITULO, HERO } from "@/lib/conteudo";
import { FAQ_V2 } from "@/lib/conteudo-v2";
import { CTA_FINAL_V3, FAQ_V3, WHATSAPP_FLUTUANTE } from "@/lib/conteudo-v3";
import { enviarEvento } from "@/lib/medicao";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";
import { Botao, CabecalhoSecao, Container, Secao } from "./ui";

export function FaqV3() {
  return (
    <Secao id="faq">
      <Container>
        <CabecalhoSecao
          eyebrow={FAQ_TITULO.eyebrow}
          titulo={FAQ_V3.titulo}
          subtitulo={FAQ_TITULO.subtitulo}
        />

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          {FAQ_V2.map((item) => (
            <details
              key={item.pergunta}
              className="group border-b border-white/[0.07] last:border-none"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[0.98rem] font-semibold text-papel transition-colors hover:bg-white/[0.03] [&::-webkit-details-marker]:hidden">
                {item.pergunta}
                <Plus
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="shrink-0 text-cinza transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-cinza">{item.resposta}</p>
            </details>
          ))}
        </div>
      </Container>
    </Secao>
  );
}

/**
 * Fechamento no desenho da referência (título centralizado e um botão), com o
 * formulário logo abaixo. O formulário continua sendo o CTA secundário: só
 * aparece aqui, e com peso menor que o WhatsApp. A lógica é a mesma da home,
 * que monta a mensagem e abre o WhatsApp já preenchido.
 */
export function CtaFinalV3() {
  const origem = "Olá! Vim pelo site da Tectus.";
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [gargalo, setGargalo] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (gargalo.trim().length < 10) {
      setErro(CTA_FINAL.erroGargalo);
      return;
    }

    setErro(null);

    const mensagem = [
      origem,
      "",
      `Nome: ${nome.trim()}`,
      empresa.trim() ? `Empresa: ${empresa.trim()}` : null,
      "",
      "O que está travando hoje:",
      gargalo.trim(),
    ]
      .filter((linha) => linha !== null)
      .join("\n");

    enviarEvento("lead_enviado", { empresa_informada: empresa.trim().length > 0 });
    window.open(whatsappLink(mensagem), "_blank", "noopener,noreferrer");
  }

  const campo =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.95rem] text-papel placeholder:text-cinza/70 transition-colors hover:border-white/20 focus:border-petroleo-claro focus:outline-none focus:ring-4 focus:ring-petroleo-claro/15";
  const rotulo = "mb-2 block text-[0.85rem] font-medium text-papel/90";

  return (
    <Secao id="contato">
      <Container>
        <CabecalhoSecao
          eyebrow={CTA_FINAL.eyebrow}
          titulo={CTA_FINAL_V3.titulo}
          subtitulo={CTA_FINAL.subtitulo}
        />

        <div className="mt-9 flex flex-col items-center">
          <Botao
            href={whatsappLink(WHATSAPP_MESSAGES.hero)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconeWhatsApp className="h-[18px] w-[18px]" />
            {HERO.ctaPrimario}
          </Botao>
          <p className="mt-4 text-center text-[0.85rem] text-cinza">{HERO.ctaNota}</p>
        </div>

        <form
          onSubmit={aoEnviar}
          noValidate
          className="mx-auto mt-14 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-[1.1rem] font-bold tracking-[-0.01em] text-papel">
            {CTA_FINAL_V3.formularioTitulo}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="v3-nome" className={rotulo}>
                {CTA_FINAL.campos.nome.rotulo}
              </label>
              <input
                id="v3-nome"
                name="nome"
                type="text"
                autoComplete="name"
                required
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder={CTA_FINAL.campos.nome.exemplo}
                className={campo}
              />
            </div>
            <div>
              <label htmlFor="v3-empresa" className={rotulo}>
                {CTA_FINAL.campos.empresa.rotulo}
              </label>
              <input
                id="v3-empresa"
                name="empresa"
                type="text"
                autoComplete="organization"
                value={empresa}
                onChange={(evento) => setEmpresa(evento.target.value)}
                placeholder={CTA_FINAL.campos.empresa.exemplo}
                className={campo}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="v3-gargalo" className={rotulo}>
              {CTA_FINAL.campos.gargalo.rotulo}
            </label>
            <textarea
              id="v3-gargalo"
              name="gargalo"
              rows={4}
              required
              value={gargalo}
              onChange={(evento) => setGargalo(evento.target.value)}
              placeholder={CTA_FINAL.campos.gargalo.exemplo}
              aria-invalid={erro ? true : undefined}
              aria-describedby={erro ? "v3-erro" : undefined}
              className={`${campo} resize-y`}
            />
            {erro ? (
              <p id="v3-erro" role="alert" className="mt-2 text-[0.85rem] text-[#fca5a5]">
                {erro}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3.5 text-[0.95rem] font-semibold text-papel transition-colors hover:border-white/35 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleo-claro"
          >
            {CTA_FINAL.botao}
          </button>
          <p className="mt-3 text-center text-[0.8rem] text-cinza">{CTA_FINAL.aviso}</p>
        </form>
      </Container>
    </Secao>
  );
}

/** Botão fixo no canto, como na referência. */
export function WhatsAppFlutuante() {
  return (
    <a
      href={whatsappLink(WHATSAPP_MESSAGES.header)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WHATSAPP_FLUTUANTE}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-grafite-alto/90 p-3 text-[0.88rem] font-semibold text-papel shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:border-petroleo-claro/50 sm:py-2.5 sm:pl-2.5 sm:pr-4"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-petroleo-claro text-grafite-alto">
        <IconeWhatsApp className="h-[18px] w-[18px]" />
      </span>
      <span className="hidden sm:inline">{WHATSAPP_FLUTUANTE}</span>
    </a>
  );
}
