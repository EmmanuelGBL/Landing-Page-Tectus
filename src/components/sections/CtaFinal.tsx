"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { IconeWhatsApp } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { CTA_FINAL } from "@/lib/conteudo";
import { enviarEvento } from "@/lib/medicao";
import { CONTACT, whatsappLink } from "@/lib/site";

/**
 * CTA secundário: território do formulário.
 *
 * Enquanto CONTACT.email for null, o formulário não envia mensagem para
 * lugar nenhum. Ele monta o texto com o que a pessoa escreveu e entrega no
 * WhatsApp já preenchido. Isso mantém a função da seção (capturar o lead que
 * descreve o problema por escrito) sem depender de backend e sem simular um
 * envio que não tem destino.
 *
 * Quando o e-mail existir, trocar por rota de API com validação server-side.
 *
 * Todo o texto desta seção mudou de lugar em 24/08/2026: estava chumbado no
 * JSX e foi para `CTA_FINAL`, em `conteudo.ts`, junto com o resto da copy da
 * página. As skills de texto precisam alcançar o último pedido da página sem
 * abrir componente.
 */
export function CtaFinal() {
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
      "Olá! Vim pelo site da Tectus.",
      "",
      `Nome: ${nome.trim()}`,
      empresa.trim() ? `Empresa: ${empresa.trim()}` : null,
      "",
      "O que está travando hoje:",
      gargalo.trim(),
    ]
      .filter((linha) => linha !== null)
      .join("\n");

    /**
     * `lead_enviado`, e não `contato_whatsapp`, apesar de o destino ser o
     * mesmo aplicativo. Os dois eventos medem intenções diferentes: um clique
     * de botão é impulso, um formulário preenchido com a descrição do gargalo
     * é lead qualificado, e somar os dois esconderia justamente a diferença
     * que interessa ao relatório.
     *
     * Não há disparo duplicado: o listener global escuta clique em link, e
     * aqui a conversa abre por `window.open`.
     */
    enviarEvento("lead_enviado", { empresa_informada: empresa.trim().length > 0 });

    window.open(whatsappLink(mensagem), "_blank", "noopener,noreferrer");
  }

  const campo =
    "w-full rounded-md border border-cinza-linha bg-white px-4 py-3 text-[0.95rem] text-grafite placeholder:text-cinza transition-all hover:border-cinza focus:border-petroleo focus:outline-none focus:ring-4 focus:ring-petroleo/10";

  return (
    <Section id="contato" fundo="cinza">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>{CTA_FINAL.eyebrow}</Eyebrow>
            <h2 className="text-[2rem] font-bold leading-[1.14] tracking-[-0.022em] text-grafite lg:text-[2.5rem]">
              {CTA_FINAL.titulo}
            </h2>
            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-chumbo">
              {CTA_FINAL.subtitulo}
            </p>

            {/* Fundo branco, e não cinza: a seção inteira passou a ser cinza
                para o formulário branco ganhar destaque, e um bloco cinza
                sobre cinza sumiria. */}
            <div className="mt-8 rounded-2xl border border-cinza-linha bg-white p-6">
              <p className="text-[0.95rem] leading-relaxed text-chumbo">{CTA_FINAL.atalho}</p>
              <a
                href={whatsappLink("Olá! Vim pelo site da Tectus.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2.5 text-[1.05rem] font-semibold text-grafite transition-colors hover:text-petroleo-escuro"
              >
                <IconeWhatsApp className="h-5 w-5 text-petroleo" />
                {CONTACT.whatsappDisplay}
              </a>

              {/* E-mail como canal alternativo, com peso visual menor: o
                  WhatsApp é o CTA primário da página por decisão fechada. */}
              {CONTACT.email ? (
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-3 flex items-center gap-2.5 text-[0.95rem] text-chumbo transition-colors hover:text-petroleo-escuro"
                >
                  <Mail size={18} strokeWidth={1.9} className="text-petroleo" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              ) : null}
            </div>
          </div>

          <form
            onSubmit={aoEnviar}
            noValidate
            className="rounded-2xl border border-cinza-linha bg-white p-7 elevacao-2 lg:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="nome" className="mb-2 block text-[0.85rem] font-medium text-grafite">
                  {CTA_FINAL.campos.nome.rotulo}
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  autoComplete="name"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  className={campo}
                  placeholder={CTA_FINAL.campos.nome.exemplo}
                />
              </div>

              <div>
                <label htmlFor="empresa" className="mb-2 block text-[0.85rem] font-medium text-grafite">
                  {CTA_FINAL.campos.empresa.rotulo}{" "}
                  <span className="font-normal text-cinza-texto">(opcional)</span>
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  value={empresa}
                  onChange={(evento) => setEmpresa(evento.target.value)}
                  className={campo}
                  placeholder={CTA_FINAL.campos.empresa.exemplo}
                />
              </div>

              <div>
                <label htmlFor="gargalo" className="mb-2 block text-[0.85rem] font-medium text-grafite">
                  {CTA_FINAL.campos.gargalo.rotulo}
                </label>
                <textarea
                  id="gargalo"
                  name="gargalo"
                  required
                  rows={4}
                  value={gargalo}
                  onChange={(evento) => setGargalo(evento.target.value)}
                  aria-describedby={erro ? "erro-gargalo" : undefined}
                  aria-invalid={erro ? true : undefined}
                  className={`${campo} resize-y`}
                  placeholder={CTA_FINAL.campos.gargalo.exemplo}
                />
                {erro ? (
                  <p id="erro-gargalo" role="alert" className="mt-2 text-[0.85rem] text-petroleo-escuro">
                    {erro}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-petroleo px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-px hover:bg-petroleo-escuro active:translate-y-0"
            >
              <IconeWhatsApp className="h-[18px] w-[18px]" />
              {CTA_FINAL.botao}
            </button>

            <p className="mt-3.5 text-center text-[0.8rem] leading-relaxed text-cinza-texto">
              {CTA_FINAL.aviso}
            </p>
          </form>
        </div>
      </Container>
    </Section>
  );
}
