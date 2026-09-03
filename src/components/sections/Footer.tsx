import { Logo } from "@/components/brand/Logo";
import { IconeWhatsApp } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { COMPANY, CONTACT, NAV_LINKS, whatsappLink } from "@/lib/site";

/** Sem nome do fundador, conforme a diretriz de exposição pessoal. */
export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="fundo-escuro bg-grafite py-14 text-papel">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variante="escuro" />
            <p className="mt-4 max-w-xs text-[0.92rem] leading-relaxed text-cinza">
              {COMPANY.slogan}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cinza">
              Navegação
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.92rem] text-papel/85 transition-colors hover:text-petroleo-claro"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cinza">
              Contato
            </h2>
            <a
              href={whatsappLink("Olá! Vim pelo site da Tectus.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-papel transition-colors hover:text-petroleo-claro"
            >
              <IconeWhatsApp className="h-4 w-4 text-petroleo-claro" />
              {CONTACT.whatsappDisplay}
            </a>
            {CONTACT.email ? (
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-3 block text-[0.92rem] text-papel/85 transition-colors hover:text-petroleo-claro"
              >
                {CONTACT.email}
              </a>
            ) : null}
            <p className="mt-4 text-[0.92rem] leading-relaxed text-cinza">
              Atendimento remoto para todo o Brasil.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-7 text-[0.83rem] text-cinza sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {COMPANY.legalName} · CNPJ {COMPANY.cnpj}
          </p>
          <p>Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
