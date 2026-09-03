/**
 * Gera a foto de perfil da Tectus para redes sociais.
 *
 * Rode com: npm run avatar
 *
 * Por que este arquivo não é só o símbolo do kit exportado em quadrado:
 *
 * 1. Instagram, WhatsApp Business e LinkedIn recortam a foto em círculo. O
 *    lockup com o nome escrito não sobrevive a isso — o wordmark encosta na
 *    borda e é cortado. Aqui entra só o monograma, o que é permitido porque
 *    nesses perfis o nome "Tectus" já aparece ao lado, no @ e no campo Nome.
 * 2. Os PNG do kit têm fundo transparente, e cada app preenche esse vazio com
 *    a cor que quiser (branco no tema claro, preto no escuro). A foto de
 *    perfil precisa de fundo chapado para o resultado não mudar de aparência
 *    conforme o tema de quem olha.
 * 3. O monograma ocupa 60% do quadro. Isso mantém a diagonal da arte dentro
 *    do círculo inscrito com folga, então nada é cortado no recorte redondo.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const destino = join(raiz, "Logos", "PNG");

/**
 * Geometria do monograma. Fonte de verdade em src/lib/marca.ts.
 * Repetida aqui porque este script é Node puro e não importa TypeScript.
 * Ao mexer lá, mexer aqui também.
 */
const MONOGRAMA = {
  barra: "32.2,15.6 196,15.6 165.4,45.7 5.6,45.7",
  hasteBase: "95.8,51.5 95.8,151.2 59.9,184.4 59.9,84.7",
  hasteAcento: "103.7,72 136.4,72 136.4,146.4 103.7,175.9",
};

/** Caixa que as três peças ocupam de fato dentro do quadro de 200x200. */
const CAIXA = { x: 5.6, y: 15.6, largura: 190.4, altura: 168.8 };

/** Fração do lado do quadrado que a largura do monograma ocupa. */
const OCUPACAO = 0.6;

/**
 * As duas aplicações que fazem sentido em foto de perfil. A grafite é a
 * padrão: fundo escuro destaca em feed claro e em feed escuro, e é o que
 * sustenta o tom premium. A papel existe para onde a plataforma desenha uma
 * borda escura em volta do avatar e o fundo grafite somiria nela.
 */
const VARIANTES = {
  grafite: { fundo: "#111827", base: "#F8FAFC", acento: "#22B4BF" },
  papel: { fundo: "#F8FAFC", base: "#111827", acento: "#0E7C86" },
};

function svgAvatar(lado, variante) {
  const escala = (lado * OCUPACAO) / CAIXA.largura;
  const x = (lado - CAIXA.largura * escala) / 2 - CAIXA.x * escala;
  const y = (lado - CAIXA.altura * escala) / 2 - CAIXA.y * escala;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}" viewBox="0 0 ${lado} ${lado}">
  <rect width="${lado}" height="${lado}" fill="${variante.fundo}"/>
  <g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${escala.toFixed(5)})">
    <polygon points="${MONOGRAMA.barra}" fill="${variante.base}"/>
    <polygon points="${MONOGRAMA.hasteBase}" fill="${variante.base}"/>
    <polygon points="${MONOGRAMA.hasteAcento}" fill="${variante.acento}"/>
  </g>
</svg>`;
}

const LADO = 1080;

await mkdir(destino, { recursive: true });

for (const [nome, variante] of Object.entries(VARIANTES)) {
  const svg = svgAvatar(LADO, variante);
  const arquivo = join(destino, `tectus-avatar-${nome}-${LADO}.png`);
  await sharp(Buffer.from(svg)).png().toFile(arquivo);
  await writeFile(join(raiz, "Logos", "SVG", `tectus-avatar-${nome}.svg`), svg);
  console.log(`ok  ${arquivo}`);
}
