import type { MetadataRoute } from "next";
import { OFERTA_AUTOMACAO } from "@/lib/ofertas";
import { SITE_URL } from "@/lib/site";

// Rota de metadados gerada em build: exigência do `output: "export"`.
export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Rotas de oferta: indexáveis, abaixo da home, que continua sendo o
    // destino da busca de marca. Ver `docs/plano-rotas-de-oferta.md`.
    {
      url: `${SITE_URL}/${OFERTA_AUTOMACAO.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
