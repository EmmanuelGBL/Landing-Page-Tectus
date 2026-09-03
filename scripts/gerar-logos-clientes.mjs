/**
 * Normaliza as logos de clientes para a faixa abaixo do hero.
 *
 * Rode com: npm run logos
 *
 * Por que existe um passo de build aqui em vez de apontar direto para os
 * arquivos originais:
 *
 * 1. **Nome de arquivo.** Os originais têm espaço e "&" no nome, e o
 *    otimizador de imagem do Next devolve erro para eles. Slug limpo resolve
 *    a classe inteira do problema, em vez de remendar a URL.
 * 2. **Moldura transparente.** Cada arte vem com uma quantidade diferente de
 *    espaço vazio em volta. Sem aparar, a logo com mais moldura aparece
 *    menor que as vizinhas mesmo com a mesma altura de caixa, e a faixa fica
 *    torta. `trim` remove o vazio e deixa o dimensionamento ser óptico.
 * 3. **Peso.** Os originais somam mais de 250 KB para quatro imagens que
 *    aparecem com 48px de altura. Em WebP na altura de exibição, a faixa
 *    inteira cabe numa fração disso.
 *
 * A altura de saída é 2x a de exibição, para não borrar em tela retina.
 */

import { readdir, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const origem = join(raiz, "assets", "logos-parceiras");
const destino = join(raiz, "public", "clientes");

/** 48px de exibição, dobrado para tela de alta densidade. */
const ALTURA = 96;

/** Nome do arquivo de origem para o slug usado na URL. */
const SLUGS = {
  "Logo Priorize.png": "priorize",
  "Logo - Mariah.png": "mariah-seguros",
  "Logo - Pontes & Rocha - Advogados Associados.png": "pontes-e-rocha",
  "Logo - Patinhas de Ouro COM Fundo.png": "patinhas-de-ouro",
};

await mkdir(destino, { recursive: true });

const arquivos = await readdir(origem);
const resultado = [];

for (const arquivo of arquivos) {
  const slug = SLUGS[arquivo];
  if (!slug) {
    console.warn(`ignorado (sem slug definido): ${arquivo}`);
    continue;
  }

  const buffer = await sharp(join(origem, arquivo))
    // O limiar alto evita que um halo quase transparente conte como conteúdo.
    .trim({ threshold: 20 })
    .resize({ height: ALTURA, fit: "inside", withoutEnlargement: false })
    .webp({ quality: 92, effort: 6 })
    .toBuffer();

  const { width, height } = await sharp(buffer).metadata();
  await writeFile(join(destino, `${slug}.webp`), buffer);

  resultado.push({ slug, width, height, kb: (buffer.length / 1024).toFixed(1) });
  console.log(`${slug}.webp  ${width}x${height}  ${(buffer.length / 1024).toFixed(1)} KB`);
}

console.log(`\n${resultado.length} logos geradas em public/clientes/`);
