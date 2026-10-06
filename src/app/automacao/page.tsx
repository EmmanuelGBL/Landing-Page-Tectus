import type { Metadata } from "next";
import { PaginaOferta } from "@/components/PaginaOferta";
import { OFERTA_AUTOMACAO as OFERTA } from "@/lib/ofertas";
import { COMPANY } from "@/lib/site";
import { alt, contentType, size } from "../opengraph-image";

/**
 * A imagem gerada em `app/opengraph-image.tsx` só entra sozinha onde o
 * `openGraph` não é redeclarado. Aqui ele é, então a imagem vai explícita,
 * senão o link compartilhado no WhatsApp sai sem preview.
 */
const IMAGEM = { url: "/opengraph-image", alt, type: contentType, ...size };

/**
 * Destino do grupo de anúncios "Automação" no Google Ads.
 *
 * Uma pasta por rota em vez de `[oferta]` dinâmico: com export estático e
 * uma oferta no ar, a rota fixa é mais simples de ler e cada página declara
 * os próprios metadados. A próxima oferta é este arquivo copiado com outra
 * constante de `ofertas.ts`.
 *
 * `openGraph` é redeclarado inteiro porque o Next substitui o objeto do
 * layout em vez de mesclar: sem `siteName` e `locale` aqui, eles sumiriam.
 */
export const metadata: Metadata = {
  title: OFERTA.metaTitulo,
  description: OFERTA.metaDescricao,
  alternates: { canonical: `/${OFERTA.slug}` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `/${OFERTA.slug}`,
    siteName: COMPANY.brand,
    title: `${OFERTA.metaTitulo} | ${COMPANY.brand}`,
    description: OFERTA.metaDescricao,
    images: [IMAGEM],
  },
  twitter: {
    card: "summary_large_image",
    title: `${OFERTA.metaTitulo} | ${COMPANY.brand}`,
    description: OFERTA.metaDescricao,
    images: [IMAGEM],
  },
};

export default function Automacao() {
  return <PaginaOferta oferta={OFERTA} />;
}
