import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EventosGlobais } from "@/components/medicao/EventosGlobais";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/medicao/GoogleTagManager";
import { COMPANY, CONTACT, INDEXAVEL, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Title mantém a marca em destaque porque busca por marca é a única
 * disputa vencível hoje. Ver .claude/skills/seo/SKILL.md.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tectus | Automação e sistemas sob medida para empresas",
    template: "%s | Tectus",
  },
  /**
   * 154 caracteres. A versão anterior tinha 165 e vinha sendo truncada no
   * resultado de busca, perdendo justamente o fecho que nomeia a dor.
   *
   * A marca saiu da primeira palavra de propósito: o `title` logo acima do
   * snippet já mostra "Tectus" em destaque, então repeti-la aqui gastava
   * caractere para dizer o que o usuário acabou de ler. O espaço foi para
   * "empresas travadas na operação manual", que é onde a pessoa se reconhece,
   * e para o atendimento com IA, que a página passou a nomear em 31/08/2026.
   */
  description:
    "Diagnóstico antes de desenvolver. Automação de processos, atendimento com IA, sistemas sob medida e integrações para empresas travadas na operação manual.",
  applicationName: COMPANY.brand,
  // `keywords` tem peso quase nulo no ranqueamento há anos. Fica porque custa
  // zero e ainda é lido por agregadores e por alguns buscadores menores.
  keywords: [
    "automação de processos",
    "atendimento com IA",
    "chatbot com IA para empresas",
    "sistema sob medida",
    "integração de sistemas",
    "consultoria em tecnologia",
    "Tectus",
    "Tectus Soluções Digitais",
  ],
  authors: [{ name: COMPANY.legalName }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: COMPANY.brand,
    title: "Tectus | Tecnologia que impulsiona. Automação que transforma.",
    description:
      "Primeiro entendemos onde sua operação trava. Depois construímos a solução certa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tectus | Tecnologia que impulsiona. Automação que transforma.",
    description:
      "Primeiro entendemos onde sua operação trava. Depois construímos a solução certa.",
  },
  // Fora do domínio oficial a página sai com noindex. Ver `INDEXAVEL` em site.ts.
  robots: {
    index: INDEXAVEL,
    follow: INDEXAVEL,
    googleBot: { index: INDEXAVEL, follow: INDEXAVEL, "max-image-preview": "large" },
  },
};

/**
 * Structured data da organização.
 * Sem aggregateRating e sem review: não existe avaliação real, e inventar
 * uma viola as diretrizes do Google. Sem founder: diretriz de exposição
 * pessoal já fechada.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: COMPANY.brand,
  legalName: COMPANY.legalName,
  taxID: COMPANY.cnpj,
  url: SITE_URL,
  slogan: COMPANY.slogan,
  description: COMPANY.positioning,
  /**
   * O Google usa `logo` para o painel de conhecimento da entidade, que é a
   * disputa de busca por marca. Aponta para `/icon.png`, o mesmo 512x512 de
   * fundo sólido que `npm run icones` gera a partir do monograma. URL
   * absoluta porque structured data não resolve caminho relativo.
   */
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/icon.png`,
  telephone: `+${CONTACT.whatsappNumber}`,
  ...(CONTACT.email ? { email: CONTACT.email } : {}),
  areaServed: { "@type": "Country", name: "Brasil" },
  /**
   * Nenhum dado novo aqui: é o telefone e o e-mail que já existem acima,
   * declarados no formato que o Google entende como canal comercial. Sem
   * `address`, porque a atuação é nacional e remota e a decisão de marca é
   * não expor cidade.
   */
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+${CONTACT.whatsappNumber}`,
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
  serviceType: [
    "Automação de processos",
    // Acrescentado em 31/08/2026, junto com a entrada de IA na copy da página.
    // Lastro: `Marca/04-Cases.md` registra ERP com CRM e IA no WhatsApp.
    "Atendimento com IA",
    "Desenvolvimento de sistemas sob medida",
    "Integração de sistemas",
    "Consultoria tecnológica",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">
        <GoogleTagManagerNoScript />
        <script
          type="application/ld+json"
          // O conteúdo é constante e definido em build, não vem de entrada externa.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <GoogleTagManager />
        {children}
        {/* Sem marcação própria: só instala os listeners de medição. */}
        <EventosGlobais />
      </body>
    </html>
  );
}
