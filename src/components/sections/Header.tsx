"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { BotaoLink, IconeWhatsApp } from "@/components/ui/Button";
import { NAV_LINKS, WHATSAPP_MESSAGES, whatsappLink, type LinkNavegacao } from "@/lib/site";

/**
 * O header ganhou um indicador de seção ativa: ele diz onde a pessoa está
 * sem ela precisar lembrar, e mantém o mapa da página visível o tempo todo.
 *
 * Teve também uma barra de progresso de leitura na borda inferior, que
 * cresceu conforme a rolagem. Saiu em 24/08/2026 a pedido do Emmanuel. O
 * argumento original era responder à pergunta "quanto falta disso aqui",
 * mas isso vale para artigo longo, não para página de venda: aqui a barra
 * anunciava o tamanho do texto, que é exatamente o que não se quer destacar,
 * e ainda colocava um elemento em movimento permanente no topo da tela.
 */

type HeaderProps = {
  /**
   * Navegação do topo. As rotas de oferta passam lista vazia: quem chegou por
   * anúncio tem uma ação só a tomar, e menu com seis destinos é seis saídas.
   * Sem links, somem o menu, o botão de abrir menu e o indicador de seção.
   */
  links?: readonly LinkNavegacao[];
  mensagemWhatsapp?: string;
};

export function Header({
  links = NAV_LINKS,
  mensagemWhatsapp = WHATSAPP_MESSAGES.header,
}: HeaderProps) {
  const [encolhido, setEncolhido] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [ativa, setAtiva] = useState<string | null>(null);

  useEffect(() => {
    const aoRolar = () => setEncolhido(window.scrollY > 16);

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  /**
   * Seção ativa. rootMargin recorta a janela numa faixa central: assim a
   * seção só é considerada ativa quando ocupa de fato o meio da tela, e não
   * no instante em que encosta na borda de baixo.
   */
  useEffect(() => {
    const secoes = links
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((elemento): elemento is HTMLElement => elemento !== null);
    if (secoes.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtiva(visivel.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    secoes.forEach((secao) => observador.observe(secao));
    return () => observador.disconnect();
  }, [links]);

  const temNavegacao = links.length > 0;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        encolhido
          ? "border-cinza-linha bg-papel/80 backdrop-blur-xl elevacao-1"
          : "border-transparent bg-papel"
      }`}
    >
      {/* Respiro menor no mobile: com gap-6 e px-6 a linha de logo, botão e
          menu estourava 26px a 375px de largura, e a página inteira ganhava
          rolagem horizontal. */}
      <div className="mx-auto flex w-full max-w-[75rem] items-center gap-3 px-4 py-3.5 sm:gap-6 sm:px-6">
        <a href="#topo" aria-label="Tectus, ir para o topo" className="shrink-0">
          <Logo />
        </a>

        {temNavegacao ? (
          <nav aria-label="Navegação principal" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const estaAtiva = ativa === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={estaAtiva ? "true" : undefined}
                      className={`relative block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        estaAtiva ? "text-grafite" : "text-chumbo hover:text-grafite"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-petroleo transition-transform duration-300 ease-out ${
                          estaAtiva ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <BotaoLink
          href={whatsappLink(mensagemWhatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar agora no WhatsApp"
          className="sheen ml-auto shrink-0 px-3 sm:px-5 lg:ml-3"
        >
          <IconeWhatsApp className="h-4 w-4" />
          {/* O rótulo encolhe em dois passos e some por completo abaixo de
              360px, onde só o ícone cabe. O aria-label acima garante que o
              botão continue tendo nome para leitor de tela. */}
          <span className="hidden sm:inline">Falar agora</span>
          <span className="hidden min-[360px]:inline sm:hidden">WhatsApp</span>
        </BotaoLink>

        {temNavegacao ? (
          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            className="rounded-md p-1.5 text-grafite lg:hidden"
          >
            <span className="sr-only">{menuAberto ? "Fechar menu" : "Abrir menu"}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuAberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        ) : null}
      </div>

      {temNavegacao && menuAberto ? (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal"
          className="border-t border-cinza-linha bg-papel lg:hidden"
          style={{ animation: "surgir 260ms ease-out forwards" }}
        >
          <ul className="mx-auto flex w-full max-w-[75rem] flex-col px-6 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  className="block border-b border-cinza-linha py-3 text-sm font-medium text-chumbo last:border-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
