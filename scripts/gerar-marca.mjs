/**
 * Gera o kit de marca da Tectus em ../Logos.
 *
 * Rode com: npm run marca
 *
 * O problema que este script resolve: as artes de origem em ../Logos/Originais
 * saíram de geração por IA, com fundo chapado, ruído de compressão e nenhuma
 * camada. Recortar o fundo no olho devolveria um PNG com franja e cor
 * aproximada. Em vez disso a arte é reconstruída:
 *
 * 1. Cada pixel é lido como mistura entre o fundo e uma das duas cores da
 *    marca. Isso devolve, ao mesmo tempo, a transparência correta na borda
 *    (o antisserrilhado vira alfa, não vira franja cinza) e a cor exata da
 *    paleta no miolo (o ruído da geração é descartado).
 * 2. O símbolo é jogado fora e redesenhado a partir da geometria de
 *    src/lib/marca.ts, que é vetor de verdade.
 * 3. O wordmark, que só existe como pixel, é traçado em polígono por
 *    scripts/tracar-contorno.mjs.
 *
 * O resultado é SVG, e os PNG saem de rasterizar esse SVG. Então PNG e vetor
 * nunca divergem, e qualquer tamanho novo é só mudar um número aqui.
 */

import { writeFile, mkdir, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { tracarLacos, simplificar, afinarMascara } from "./tracar-contorno.mjs";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const origens = join(raiz, "Logos", "Originais");
const destinoSvg = join(raiz, "Logos", "SVG");
const destinoPng = join(raiz, "Logos", "PNG");

/**
 * Geometria do monograma. Fonte de verdade em landing-page/src/lib/marca.ts.
 * Repetida aqui porque este script é Node puro e não importa TypeScript.
 * Mesma situação de scripts/gerar-icones.mjs. Ao mexer lá, mexer aqui.
 */
const MONOGRAMA = {
  barra: "32.2,15.6 196,15.6 165.4,45.7 5.6,45.7",
  hasteBase: "95.8,51.5 95.8,151.2 59.9,184.4 59.9,84.7",
  hasteAcento: "103.7,72 136.4,72 136.4,146.4 103.7,175.9",
};
/** Caixa que as três peças ocupam de fato dentro do quadro de 200x200. */
const SIMBOLO_CAIXA = { x: 5.6, y: 15.6, largura: 190.4, altura: 168.8 };

const GRAFITE = [17, 24, 39]; // #111827
const PETROLEO = [14, 124, 134]; // #0E7C86

/**
 * As quatro aplicações previstas. "fundo-claro" e "fundo-escuro" são a mesma
 * marca, com a inversão que o manual de qualquer identidade exige. As duas
 * monocromáticas existem para onde não cabe segunda cor: carimbo, gravação,
 * bordado, impressão em uma tinta só.
 */
const VARIANTES = {
  "fundo-claro": { base: "#111827", acento: "#0E7C86" },
  "fundo-escuro": { base: "#F8FAFC", acento: "#22B4BF" },
  "mono-grafite": { base: "#111827", acento: "#111827" },
  "mono-branco": { base: "#FFFFFF", acento: "#FFFFFF" },
};

const LOCKUPS = {
  horizontal: {
    arquivo: "Logo_Horizontal.png",
    /** Símbolo e wordmark se separam ao longo do eixo x. */
    eixo: "x",
    tamanhosPng: [2400, 1200],
  },
  vertical: {
    arquivo: "Logo Vertical.png",
    eixo: "y",
    tamanhosPng: [1600, 800],
  },
};

/**
 * Traçado do wordmark. O fator diz em quantas vezes a grade é refinada antes
 * de cortar a máscara, e a tolerância é o desvio máximo aceito na
 * simplificação, medido em pixels da arte de origem.
 *
 * 0.15px de desvio numa arte de ~1900px vira menos de 0.2px no PNG de 2400px
 * de largura, ou seja, abaixo do que o olho pega. Barato: o wordmark inteiro
 * ainda cabe em poucos KB de path.
 */
const FATOR_FINO = 4;
const TOLERANCIA = 0.15;

// ------------------------------------------------------------------ //
// Leitura e classificação                                            //
// ------------------------------------------------------------------ //

/**
 * Reduz a imagem a um mapa de cobertura: quanto de arte existe em cada pixel,
 * de 0 a 1.
 *
 * Para cada pixel, testa a hipótese "isto é o fundo misturado com X" para
 * cada cor da marca, e fica com a que explica melhor o pixel. A fração da
 * mistura vira a cobertura; o resíduo diz o quanto a hipótese errou e serve
 * para descartar textura de fundo.
 *
 * Qual das duas cores ganhou não é devolvido, de propósito. Ela importa para
 * medir a cobertura certa na borda do acento, mas não para o desenho: o
 * símbolo é redesenhado pela geometria, e o wordmark é todo grafite. Fazer o
 * traçado depender dessa decisão só criaria entalhe onde o ruído da geração
 * empurrasse um pixel de borda para o lado errado.
 */
async function classificar(caminho) {
  const { data, info } = await sharp(caminho)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: largura, height: altura, channels: canais } = info;

  // O fundo sai da mediana da moldura de 1px. Mediana e não média porque
  // basta um respingo da arte encostar na borda para puxar a média.
  const amostras = [[], [], []];
  for (let x = 0; x < largura; x++) {
    for (const y of [0, altura - 1]) {
      const i = (y * largura + x) * canais;
      for (let c = 0; c < 3; c++) amostras[c].push(data[i + c]);
    }
  }
  const fundo = amostras.map((lista) => {
    lista.sort((a, b) => a - b);
    return lista[lista.length >> 1];
  });

  const cobertura = new Float32Array(largura * altura);

  for (let p = 0; p < largura * altura; p++) {
    const i = p * canais;
    const px = [data[i], data[i + 1], data[i + 2]];
    let melhor = null;
    for (const alvo of [GRAFITE, PETROLEO]) {
      const d = alvo.map((v, c) => v - fundo[c]);
      const v = px.map((valor, c) => valor - fundo[c]);
      const dd = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
      const a = Math.max(0, Math.min(1, (v[0] * d[0] + v[1] * d[1] + v[2] * d[2]) / dd));
      const resto = Math.hypot(v[0] - a * d[0], v[1] - a * d[1], v[2] - a * d[2]);
      if (!melhor || resto < melhor.resto) melhor = { a, resto };
    }
    // Abaixo de 6% de cobertura é textura de parede da imagem gerada, não
    // arte. Resíduo alto é a mesma coisa por outro caminho: nenhuma das duas
    // cores explica o pixel.
    if (melhor.a < 0.06 || melhor.resto > 60) continue;
    cobertura[p] = melhor.a;
  }

  return { cobertura, largura, altura };
}

/** Caixa que a arte ocupa, ignorando o que for cobertura fraca. */
function caixa(cobertura, largura, altura, filtro = () => true) {
  let x0 = largura;
  let y0 = altura;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      const p = y * largura + x;
      if (cobertura[p] < 0.5 || !filtro(p)) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  return { x0, y0, x1: x1 + 1, y1: y1 + 1, largura: x1 + 1 - x0, altura: y1 + 1 - y0 };
}

/**
 * Acha onde o símbolo termina e o wordmark começa: o maior vão vazio ao longo
 * do eixo do lockup. Vale para os dois arranjos: no horizontal é uma coluna
 * de folga, no vertical é uma linha.
 */
function acharVao(cobertura, largura, altura, eixo, limite) {
  const n = eixo === "x" ? largura : altura;
  const outro = eixo === "x" ? altura : largura;
  const vazio = new Array(n).fill(true);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < outro; j++) {
      const p = eixo === "x" ? j * largura + i : i * largura + j;
      if (cobertura[p] >= 0.5) {
        vazio[i] = false;
        break;
      }
    }
  }
  // Só interessa vão que fique dentro da arte, então a busca começa depois
  // do primeiro traço e para antes do último.
  const inicio = vazio.indexOf(false);
  const fim = vazio.lastIndexOf(false);
  let melhor = { corte: -1, tamanho: 0 };
  let i = inicio;
  while (i <= fim) {
    if (!vazio[i]) {
      i++;
      continue;
    }
    let j = i;
    while (j <= fim && vazio[j]) j++;
    if (j - i > melhor.tamanho) melhor = { corte: Math.floor((i + j) / 2), tamanho: j - i };
    i = j;
  }
  if (melhor.tamanho < limite) {
    throw new Error(`Não achei vão entre símbolo e wordmark (maior: ${melhor.tamanho}px)`);
  }
  return melhor.corte;
}

// ------------------------------------------------------------------ //
// Montagem do SVG                                                    //
// ------------------------------------------------------------------ //

const numero = (v) => Number(v.toFixed(2)).toString();

function lacosParaPath(lacos, escala, deslocamentoX, deslocamentoY) {
  return lacos
    .map((laco) => {
      const pontos = laco.map(([x, y]) => [
        numero(x * escala + deslocamentoX),
        numero(y * escala + deslocamentoY),
      ]);
      return `M${pontos.map((p) => p.join(" ")).join("L")}Z`;
    })
    .join("");
}

function polygonDeslocado(pontos, deslocamentoX, deslocamentoY) {
  return pontos
    .split(" ")
    .map((par) => {
      const [x, y] = par.split(",").map(Number);
      return `${numero(x + deslocamentoX)},${numero(y + deslocamentoY)}`;
    })
    .join(" ");
}

async function montarLockup(nome, config) {
  const { cobertura, largura, altura } = await classificar(
    join(origens, config.arquivo),
  );

  const total = caixa(cobertura, largura, altura);
  const corte = acharVao(cobertura, largura, altura, config.eixo, 20);

  const noSimbolo = (p) => {
    const x = p % largura;
    const y = (p / largura) | 0;
    return config.eixo === "x" ? x < corte : y < corte;
  };
  const caixaSimbolo = caixa(cobertura, largura, altura, noSimbolo);

  // A escala amarra tudo ao sistema de coordenadas de marca.ts: o símbolo
  // reconstruído tem 168.8 unidades de altura, então um pixel da arte de
  // origem vale essa fração. Escala vinda da altura e não da largura porque
  // a altura do símbolo é a medida que o lockup inteiro respeita.
  const escala = SIMBOLO_CAIXA.altura / caixaSimbolo.altura;

  // Confere se a arte de origem bate com a geometria em vez de assumir.
  const larguraEsperada = (SIMBOLO_CAIXA.largura / SIMBOLO_CAIXA.altura) * caixaSimbolo.altura;
  const desvio = Math.abs(larguraEsperada - caixaSimbolo.largura) / caixaSimbolo.largura;
  console.log(
    `  ${nome}: símbolo ${caixaSimbolo.largura}x${caixaSimbolo.altura}px, ` +
      `desvio de proporção ${(desvio * 100).toFixed(1)}%`,
  );
  if (desvio > 0.06) {
    console.warn("  ! proporção do símbolo destoa da geometria de marca.ts");
  }

  // Tudo passa a ser medido a partir do canto da arte, em unidades de marca.
  const simboloX =
    (caixaSimbolo.x0 - total.x0) * escala +
    (caixaSimbolo.largura * escala - SIMBOLO_CAIXA.largura) / 2;
  const simboloY = (caixaSimbolo.y0 - total.y0) * escala;
  const peca = (pontos) =>
    polygonDeslocado(pontos, simboloX - SIMBOLO_CAIXA.x, simboloY - SIMBOLO_CAIXA.y);

  // Wordmark: traçado do pixel, restrito ao lado de lá do vão. Recortado
  // antes de refinar a grade. Refinar a imagem inteira em 4x seria dezenas de
  // milhões de células para achar seis letras.
  const caixaTexto = caixa(cobertura, largura, altura, (p) => !noSimbolo(p));
  const margem = 2;
  const tx = caixaTexto.x0 - margem;
  const ty = caixaTexto.y0 - margem;
  const tl = caixaTexto.largura + margem * 2;
  const ta = caixaTexto.altura + margem * 2;
  const campo = new Float32Array(tl * ta);
  for (let y = 0; y < ta; y++) {
    for (let x = 0; x < tl; x++) {
      const p = (y + ty) * largura + (x + tx);
      if (!noSimbolo(p)) campo[y * tl + x] = cobertura[p];
    }
  }

  const fina = afinarMascara(campo, tl, ta, FATOR_FINO);
  const lacos = tracarLacos(fina.mascara, fina.largura, fina.altura).map((l) =>
    simplificar(l, TOLERANCIA * FATOR_FINO),
  );
  const pontosTotal = lacos.reduce((s, l) => s + l.length, 0);
  console.log(`  ${nome}: wordmark em ${lacos.length} contornos, ${pontosTotal} pontos`);
  const wordmark = lacosParaPath(
    lacos,
    escala / FATOR_FINO,
    (tx - total.x0) * escala,
    (ty - total.y0) * escala,
  );

  return {
    largura: total.largura * escala,
    altura: total.altura * escala,
    peca,
    wordmark,
  };
}

function svgLockup(lockup, variante) {
  const { base, acento } = VARIANTES[variante];
  const l = numero(lockup.largura);
  const a = numero(lockup.altura);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${l} ${a}" width="${l}" height="${a}" role="img" aria-label="Tectus">
  <title>Tectus</title>
  <g id="simbolo">
    <polygon points="${lockup.peca(MONOGRAMA.barra)}" fill="${base}"/>
    <polygon points="${lockup.peca(MONOGRAMA.hasteBase)}" fill="${base}"/>
    <polygon points="${lockup.peca(MONOGRAMA.hasteAcento)}" fill="${acento}"/>
  </g>
  <path id="wordmark" d="${lockup.wordmark}" fill="${base}"/>
</svg>
`;
}

function svgSimbolo(variante) {
  const { base, acento } = VARIANTES[variante];
  const { x, y, largura, altura } = SIMBOLO_CAIXA;
  // viewBox justa na arte: quem aplica escolhe o próprio respiro, em vez de
  // herdar a margem que o quadro de 200x200 do site carrega.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${largura} ${altura}" width="${largura}" height="${altura}" role="img" aria-label="Símbolo da Tectus">
  <title>Tectus</title>
  <polygon points="${MONOGRAMA.barra}" fill="${base}"/>
  <polygon points="${MONOGRAMA.hasteBase}" fill="${base}"/>
  <polygon points="${MONOGRAMA.hasteAcento}" fill="${acento}"/>
</svg>
`;
}

// ------------------------------------------------------------------ //

async function png(svg, largura) {
  return sharp(Buffer.from(svg), { density: 600 })
    .resize({ width: largura })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
}

async function main() {
  const existentes = await readdir(origens).catch(() => []);
  if (existentes.length === 0) {
    throw new Error(`Nada em ${origens}. As artes de origem precisam estar lá.`);
  }
  await mkdir(destinoSvg, { recursive: true });
  await mkdir(destinoPng, { recursive: true });

  const escritos = [];

  for (const [nome, config] of Object.entries(LOCKUPS)) {
    const lockup = await montarLockup(nome, config);
    for (const variante of Object.keys(VARIANTES)) {
      const svg = svgLockup(lockup, variante);
      const arquivo = `tectus-${nome}-${variante}`;
      await writeFile(join(destinoSvg, `${arquivo}.svg`), svg);
      escritos.push(`SVG/${arquivo}.svg`);
      // A mono-grafite fica só em vetor: ela existe para processo gráfico de
      // uma tinta, que pede vetor de qualquer jeito. As outras três viram
      // PNG porque caem em campo de upload (rede social, assinatura de e-mail,
      // apresentação), onde SVG costuma ser recusado.
      if (variante !== "mono-grafite") {
        for (const t of config.tamanhosPng) {
          await writeFile(join(destinoPng, `${arquivo}-${t}.png`), await png(svg, t));
          escritos.push(`PNG/${arquivo}-${t}.png`);
        }
      }
    }
  }

  for (const variante of Object.keys(VARIANTES)) {
    const svg = svgSimbolo(variante);
    const arquivo = `tectus-simbolo-${variante}`;
    await writeFile(join(destinoSvg, `${arquivo}.svg`), svg);
    escritos.push(`SVG/${arquivo}.svg`);
    if (variante !== "mono-grafite") {
      for (const t of [1024, 512]) {
        await writeFile(join(destinoPng, `${arquivo}-${t}.png`), await png(svg, t));
        escritos.push(`PNG/${arquivo}-${t}.png`);
      }
    }
  }

  console.log(`\n${escritos.length} arquivos gerados em Logos/:`);
  for (const e of escritos) console.log(`  ${e}`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
