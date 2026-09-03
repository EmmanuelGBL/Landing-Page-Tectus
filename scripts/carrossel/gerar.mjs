/**
 * Gerador de carrossel da Tectus.
 *
 * Uma passada produz, por post:
 *   instagram/slide-NN.png   os arquivos que vão para o Instagram
 *   previa.html              folha de contato para revisar antes de publicar
 *
 * A prévia embute os PNGs em base64 de propósito: vira arquivo único, abre com
 * duplo clique em qualquer lugar e não depende de caminho relativo continuar
 * válido depois que a pasta for movida.
 *
 * Rode com `npm run carrossel` na raiz de `landing-page/`.
 */
import { ImageResponse } from "next/og.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { LAYOUTS, TAMANHO } from "./layouts.mjs";
import { POSTS } from "./slides.mjs";
import { COR } from "./marca.mjs";

const DESTINO = new URL("../../../Marketing/Instagram/Conteudo/", import.meta.url);

/**
 * O `next/og` não usa fonte do sistema: sem a opção `fonts` ele renderiza na
 * fonte embutida dele, e a regra de tracking da marca não produz efeito
 * nenhum. A Inter também não está instalada nesta máquina. Os arquivos vêm do
 * repositório, com a licença SIL OFL junto.
 */
const carregarFonte = (arquivo) =>
  readFile(new URL(`../../assets/fontes/${arquivo}`, import.meta.url));

const [medium, bold, extrabold, black] = await Promise.all([
  carregarFonte("Inter-Medium.ttf"),
  carregarFonte("Inter-Bold.ttf"),
  carregarFonte("Inter-ExtraBold.ttf"),
  carregarFonte("Inter-Black.ttf"),
]);

const FONTES = [
  { name: "Inter", data: medium, weight: 500, style: "normal" },
  { name: "Inter", data: bold, weight: 700, style: "normal" },
  { name: "Inter", data: extrabold, weight: 800, style: "normal" },
  { name: "Inter", data: black, weight: 900, style: "normal" },
];

const renderizar = async (slide) => {
  const construir = LAYOUTS[slide.layout];
  if (!construir) throw new Error(`Layout desconhecido: ${slide.layout}`);
  const resposta = new ImageResponse(construir(slide), { ...TAMANHO, fonts: FONTES });
  return Buffer.from(await resposta.arrayBuffer());
};

const previa = (pasta, pngs) => {
  const cartoes = pngs
    .map(
      (png, i) => `      <figure>
        <img src="data:image/png;base64,${png.toString("base64")}" alt="Slide ${i + 1}" />
        <figcaption>slide-${String(i + 1).padStart(2, "0")}.png</figcaption>
      </figure>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Prévia — ${pasta}</title>
  <style>
    body { margin: 0; padding: 48px; background: ${COR.cinzaLinha}; font-family: system-ui, sans-serif; color: ${COR.grafite}; }
    h1 { font-size: 18px; letter-spacing: 0.14em; text-transform: uppercase; margin: 0 0 8px; }
    p { margin: 0 0 40px; color: ${COR.cinzaTexto}; font-size: 14px; }
    .folha { display: flex; flex-wrap: wrap; gap: 32px; }
    figure { margin: 0; }
    img { display: block; width: 420px; height: auto; box-shadow: 0 12px 32px rgba(17, 24, 39, 0.18); }
    figcaption { margin-top: 10px; font-size: 12px; color: ${COR.cinzaTexto}; letter-spacing: 0.06em; }
  </style>
</head>
<body>
  <h1>${pasta}</h1>
  <p>${pngs.length} ${pngs.length === 1 ? "slide" : "slides"} em 1080x1350. Cada imagem aqui é o PNG final, reduzido só para caber na tela.</p>
  <div class="folha">
${cartoes}
  </div>
</body>
</html>
`;
};

for (const post of POSTS) {
  const pasta = new URL(`${post.pasta}/`, DESTINO);
  const saida = new URL("instagram/", pasta);
  await mkdir(saida, { recursive: true });

  const pngs = [];
  for (const [i, slide] of post.slides.entries()) {
    const png = await renderizar(slide);
    const nome = `slide-${String(i + 1).padStart(2, "0")}.png`;
    await writeFile(new URL(nome, saida), png);
    pngs.push(png);
    console.log(`  ${post.pasta}/instagram/${nome}  ${(png.length / 1024).toFixed(0)} KB`);
  }

  await writeFile(new URL("previa.html", pasta), previa(post.pasta, pngs));
  console.log(`  ${post.pasta}/previa.html`);

  // Os props de cada slide ficam junto do post, para reeditar sem redigitar.
  // Gerado daqui, e não escrito à mão, para não divergir de `slides.mjs`.
  await writeFile(
    new URL("slides.json", pasta),
    `${JSON.stringify(post.slides, null, 2)}\n`,
  );
  console.log(`  ${post.pasta}/slides.json`);
}
