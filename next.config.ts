import type { NextConfig } from "next";

/**
 * Export estático.
 *
 * A página inteira é pré-renderizada: não há rota de API, server action nem
 * revalidação. Nesse cenário o export gera HTML puro, que a Netlify serve
 * direto do CDN, sem depender do adaptador de Next da plataforma acompanhar
 * cada versão do framework. Menos peça no caminho, menos coisa para quebrar.
 *
 * `images.unoptimized` é consequência obrigatória do export. Custa pouco aqui:
 * as únicas imagens são quatro logos de clientes já normalizadas em WebP de
 * 96px de altura por `npm run logos`, somando cerca de 65 KB.
 *
 * Quando existir serviço de e-mail e o formulário virar rota de API com
 * validação server-side, este arquivo volta a rodar sem `output: "export"` e
 * o runtime de Next da Netlify assume.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
