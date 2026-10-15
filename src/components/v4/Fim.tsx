"use client";

import { MessageCircle, Plus, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { IconeWhatsApp } from "@/components/ui/Button";
import { AJUDA_V4, CTA_FINAL_V4, FAQ_V4, HERO_V4, NAV_V4 } from "@/lib/conteudo-v4";
import { enviarEvento } from "@/lib/medicao";
import { COMPANY, CONTACT, whatsappLink } from "@/lib/site";
import { BotaoWhatsApp, CabecalhoSecao, Container, Secao } from "./ui";

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function FaqV4() {
  return (
    <Secao id="faq">
      <Container>
        <CabecalhoSecao eyebrow={FAQ_V4.eyebrow} titulo={FAQ_V4.titulo} />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ_V4.itens.map((item) => (
            <details
              key={item.pergunta}
              className="group rounded-2xl border border-white/[0.08] bg-[#111214] transition-colors open:border-white/[0.14]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[0.98rem] font-medium text-papel [&::-webkit-details-marker]:hidden">
                {item.pergunta}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#a1a6ae] transition-transform duration-200 group-open:rotate-45">
                  <Plus size={15} strokeWidth={2} aria-hidden="true" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-[0.93rem] leading-relaxed text-[#a1a6ae]">
                {item.resposta}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Secao>
  );
}

/* ------------------------------------------------------------------ */
/* Fechamento com formulário                                           */
/* ------------------------------------------------------------------ */

/**
 * Fechamento centralizado, como na referência, com o formulário logo
 * abaixo e com peso menor. O formulário continua sendo o CTA secundário da
 * landing: monta a mensagem e abre o WhatsApp já preenchido, igual à home.
 */
export function CtaFinalV4() {
  const { formulario } = CTA_FINAL_V4;
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [gargalo, setGargalo] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (gargalo.trim().length < 10) {
      setErro(formulario.erro);
      return;
    }
    setErro(null);

    const mensagem = [
      formulario.origem,
      "",
      nome.trim() ? `Nome: ${nome.trim()}` : null,
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
    "w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-[0.93rem] text-papel placeholder:text-[#6b7079] transition-colors hover:border-white/20 focus:border-petroleo-claro focus:outline-none focus:ring-4 focus:ring-petroleo-claro/15";
  const rotulo = "mb-2 block text-[0.83rem] font-medium text-[#c3c7cd]";

  return (
    <Secao id="contato" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_55%_80%_at_50%_0%,rgba(14,124,134,0.25),transparent)]"
      />
      <Container className="relative">
        <CabecalhoSecao
          eyebrow={CTA_FINAL_V4.eyebrow}
          titulo={CTA_FINAL_V4.titulo}
          subtitulo={CTA_FINAL_V4.subtitulo}
        />

        <div className="mt-9 flex flex-col items-center">
          <BotaoWhatsApp mensagem={HERO_V4.mensagem}>{CTA_FINAL_V4.cta}</BotaoWhatsApp>
        </div>

        <form
          onSubmit={aoEnviar}
          noValidate
          className="mx-auto mt-16 max-w-xl rounded-2xl border border-white/[0.08] bg-[#111214] p-6 sm:p-7"
        >
          <p className="text-[1rem] font-semibold text-papel">{formulario.titulo}</p>
          <p className="mt-1 text-[0.85rem] text-[#a1a6ae]">{formulario.apoio}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="v4-nome" className={rotulo}>
                {formulario.nome.rotulo}
              </label>
              <input
                id="v4-nome"
                name="nome"
                type="text"
                autoComplete="name"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder={formulario.nome.exemplo}
                className={campo}
              />
            </div>
            <div>
              <label htmlFor="v4-empresa" className={rotulo}>
                {formulario.empresa.rotulo}
              </label>
              <input
                id="v4-empresa"
                name="empresa"
                type="text"
                autoComplete="organization"
                value={empresa}
                onChange={(evento) => setEmpresa(evento.target.value)}
                placeholder={formulario.empresa.exemplo}
                className={campo}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="v4-gargalo" className={rotulo}>
              {formulario.gargalo.rotulo}
            </label>
            <textarea
              id="v4-gargalo"
              name="gargalo"
              rows={3}
              required
              value={gargalo}
              onChange={(evento) => setGargalo(evento.target.value)}
              placeholder={formulario.gargalo.exemplo}
              aria-invalid={erro ? true : undefined}
              aria-describedby={erro ? "v4-erro" : undefined}
              className={`${campo} resize-y`}
            />
            {erro ? (
              <p id="v4-erro" role="alert" className="mt-2 text-[0.83rem] text-[#fca5a5]">
                {erro}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/15 px-6 py-3 text-[0.92rem] font-semibold text-papel transition-colors hover:border-white/35 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleo-claro"
          >
            {formulario.botao}
          </button>
        </form>
      </Container>
    </Secao>
  );
}

/* ------------------------------------------------------------------ */
/* Rodapé                                                              */
/* ------------------------------------------------------------------ */

export function RodapeV4() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo variante="escuro" />
          <p className="mt-4 max-w-sm text-[0.8rem] leading-relaxed text-[#8b9099]">
            {COMPANY.legalName}
            <br />
            CNPJ {COMPANY.cnpj}
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_V4.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[0.85rem] text-[#a1a6ae] hover:text-papel">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-[0.85rem] text-[#a1a6ae]">
          <p>WhatsApp {CONTACT.whatsappDisplay}</p>
          {CONTACT.email ? (
            <a href={`mailto:${CONTACT.email}`} className="mt-1 block hover:text-papel">
              {CONTACT.email}
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Botão flutuante com escolha de caminho                              */
/* ------------------------------------------------------------------ */

/**
 * Na referência, o botão do canto abre um cartão com dois caminhos. Aqui os
 * dois levam ao WhatsApp com mensagens diferentes, o que já separa quem quer
 * começar projeto de quem já é cliente antes da primeira resposta.
 */
export function AjudaFlutuante() {
  const [aberto, setAberto] = useState(false);
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") setAberto(false);
    }
    window.addEventListener("keydown", aoTeclar);
    painel.current?.querySelector("a")?.focus();
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {aberto ? (
        <div
          ref={painel}
          id="v4-ajuda"
          role="dialog"
          aria-label={AJUDA_V4.titulo}
          className="w-[280px] rounded-2xl border border-white/10 bg-[#15181a] p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.95rem] font-semibold text-papel">{AJUDA_V4.titulo}</p>
              <p className="mt-1 text-[0.8rem] text-[#a1a6ae]">{AJUDA_V4.apoio}</p>
            </div>
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label={AJUDA_V4.fechar}
              className="rounded-full p-1 text-[#8b9099] hover:text-papel"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-4 space-y-2">
            {AJUDA_V4.opcoes.map((opcao, indice) => (
              <li key={opcao.rotulo}>
                <a
                  href={whatsappLink(opcao.mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-[0.88rem] font-semibold transition-colors ${
                    indice === 0
                      ? "bg-petroleo text-white hover:bg-[#0c6d76]"
                      : "border border-white/10 text-papel hover:border-white/25"
                  }`}
                >
                  <IconeWhatsApp className="h-4 w-4" />
                  {opcao.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        aria-controls="v4-ajuda"
        className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#15181a]/95 p-2.5 text-[0.85rem] font-semibold text-papel shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:border-petroleo-claro/50 sm:pr-4"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-petroleo text-white">
          {aberto ? (
            <X size={16} strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <MessageCircle size={16} strokeWidth={2.2} aria-hidden="true" />
          )}
        </span>
        <span className="hidden sm:inline">{AJUDA_V4.botao}</span>
        <span className="sr-only sm:hidden">{AJUDA_V4.botao}</span>
      </button>
    </div>
  );
}
