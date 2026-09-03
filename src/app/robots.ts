import type { MetadataRoute } from "next";
import { INDEXAVEL, SITE_URL } from "@/lib/site";

// Rota de metadados gerada em build: exigência do `output: "export"`.
export const dynamic = "force-static";


/**
 * Enquanto o site não estiver no domínio oficial, o robots bloqueia tudo.
 * Ver o comentário de `INDEXAVEL` em `src/lib/site.ts`.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXAVEL) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
