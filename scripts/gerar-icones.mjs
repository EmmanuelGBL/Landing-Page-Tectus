/**
 * Gera os ícones do site a partir do monograma Tectus.
 *
 * Rode com: npm run icones
 *
 * Por que dois arquivos e não um: o Google busca /favicon.ico direto na raiz
 * do domínio, independente da tag <link rel="icon"> que o Next gera para o
 * icon.png. Sem o .ico nesse caminho exato, o ícone pode não aparecer no
 * resultado de busca mesmo com o site servindo um ícone válido em outro lugar.
 *
 * Por que a arte aqui não é igual à do logo principal: no lockup, a barra
 * superior e a perna esquerda são claras sobre fundo claro, com contraste
 * sutil. Isso some em 16x16, que é o tamanho real na aba do navegador e na
 * busca. Então o ícone usa a versão de maior contraste: fundo azul-petróleo
 * sólido e o T inteiro em branco, sem variação de opacidade.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const destinoApp = join(raiz, "src", "app");

const PETROLEO = "#0E7C86";
const BRANCO = "#FFFFFF";

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

/**
 * O monograma ocupa 60% do quadro, centralizado, com respiro nas bordas.
 * Raio de canto proporcional para o ícone não brigar com a máscara que o
 * sistema operacional aplica.
 */
/**
 * Abaixo de 48px as duas hastes se fundem e o vão entre elas some, o que
 * deixa a base do T empastada. Nesses tamanhos o ícone usa uma haste só,
 * levemente alargada. Simplificar a arte em tamanho pequeno é prática
 * padrão de favicon: o que importa ali é a silhueta ser reconhecível, não
 * o desenho ser completo.
 */
const HASTE_UNICA = "99,51.5 99,151.2 59.9,184.4 59.9,84.7";

function svgIcone(tamanho) {
  const simplificado = tamanho < 48;

  const hastes = simplificado
    ? `<polygon points="${HASTE_UNICA}" fill="${BRANCO}"/>`
    : `<polygon points="${MONOGRAMA.hasteBase}" fill="${BRANCO}"/>
    <polygon points="${MONOGRAMA.hasteAcento}" fill="${BRANCO}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="40" fill="${PETROLEO}"/>
  <g transform="translate(100 104) scale(0.72) translate(-100 -100)">
    <polygon points="${MONOGRAMA.barra}" fill="${BRANCO}"/>
    ${hastes}
  </g>
</svg>`;
}

async function png(tamanho) {
  return (
    sharp(Buffer.from(svgIcone(tamanho)))
      .resize(tamanho, tamanho)
      // A arte tem duas cores chapadas. Paleta indexada de 8 bits reproduz
      // isso sem perda visível e derruba o peso do .ico de centenas de KB
      // para poucos KB, o que importa porque o favicon é baixado em toda
      // primeira visita.
      .png({ palette: true, colors: 16, compressionLevel: 9, effort: 10 })
      .toBuffer()
  );
}

async function main() {
  await mkdir(destinoApp, { recursive: true });

  // 1. icon.png para navegadores modernos e PWA.
  await writeFile(join(destinoApp, "icon.png"), await png(512));
  console.log("icon.png (512x512) gerado");

  // 2. apple-icon.png. O iOS não aplica transparência, então o fundo sólido
  //    do nosso ícone já é o comportamento correto.
  await writeFile(join(destinoApp, "apple-icon.png"), await png(180));
  console.log("apple-icon.png (180x180) gerado");

  // 3. favicon.ico multi-resolução, a partir do mesmo PNG mestre.
  //
  //    Por que para em 64 e não vai até 256: o formato ICO guarda cada quadro
  //    como bitmap não comprimido. Um quadro de 256x256 sozinho ocupa 262KB,
  //    e o arquivo inteiro passava de 360KB. Como o favicon é baixado em toda
  //    primeira visita, isso é peso puro sem retorno: navegador moderno usa o
  //    icon.png de 512, iOS usa o apple-icon, e o .ico existe para o fetch que
  //    o Google faz em /favicon.ico e para navegador antigo, que consomem os
  //    tamanhos pequenos. Assim o arquivo fica na casa das dezenas de KB.
  const tamanhosIco = [16, 32, 48, 64];
  const buffers = await Promise.all(tamanhosIco.map((t) => png(t)));
  await writeFile(join(destinoApp, "favicon.ico"), await pngToIco(buffers));
  console.log(`favicon.ico (${tamanhosIco.join(", ")}) gerado`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
