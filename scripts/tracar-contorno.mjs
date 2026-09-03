/**
 * Traçador de contorno: converte máscara de pixels em polígonos fechados.
 *
 * Existe porque o wordmark "TECTUS" só existe como pixel nas artes geradas
 * por IA, diferente do símbolo, que tem geometria exata em src/lib/marca.ts.
 * Sem isso o kit de marca ficaria sem vetor de verdade e a papelaria impressa
 * em tamanho grande continuaria dependendo de PNG.
 *
 * O caminho normal seria potrace, mas trazer uma dependência nova para rodar
 * uma vez só não se paga. O desenho aqui é a favor: letra chapada, contraste
 * alto, sem meio-tom. Um traçador de fenda ("crack following") resolve.
 *
 * Duas etapas:
 *
 * 1. Seguir a fenda. Cada pixel aceso que faz fronteira com um apagado
 *    contribui com a aresta correspondente do seu quadrado. Percorrendo as
 *    arestas sempre com o interior à direita, elas encadeiam sozinhas em
 *    laços fechados, e buracos saem com sentido invertido. É isso que deixa o
 *    fill-rule "nonzero" do SVG recortar o miolo sem trabalho extra.
 *
 * 2. Simplificar. O laço bruto é uma escadinha de segmentos de 1px. O
 *    Douglas-Peucker derruba isso: aresta reta vira dois pontos, diagonal de
 *    45 graus vira uma reta só, e curva de "C"/"S"/"U" sobra com pontos
 *    suficientes para não facetar. A tolerância é em pixels da arte de
 *    origem, que tem cerca de 1900px de largura.
 */

/**
 * Reamostra um campo de cobertura contínuo para uma máscara binária mais
 * fina, cortando em 50% de cobertura.
 *
 * Traçar direto no pixel de origem trava a borda na grade inteira: uma curva
 * de "C" ou "U" vira escada de degrau inteiro, e o Douglas-Peucker depois
 * transforma a escada em chanfro visível. Interpolando a cobertura antes de
 * cortar, a borda passa a cair em fração de pixel, e a curva volta a ser
 * curva. Cortar em 50% mantém o peso aparente da letra igual ao da arte de
 * origem: é o mesmo critério que o olho usa ao ler o antisserrilhado.
 *
 * @param {Float32Array} campo cobertura de 0 a 1, linha por linha.
 */
export function afinarMascara(campo, largura, altura, fator) {
  const l = largura * fator;
  const a = altura * fator;
  const mascara = new Uint8Array(l * a);
  const em = (x, y) =>
    x < 0 || y < 0 || x >= largura || y >= altura ? 0 : campo[y * largura + x];

  for (let yy = 0; yy < a; yy++) {
    // Menos 0.5 porque a amostra cai no centro do pixel de origem, não na
    // quina: sem isso a arte inteira escorrega meio pixel.
    const sy = (yy + 0.5) / fator - 0.5;
    const y0 = Math.floor(sy);
    const fy = sy - y0;
    for (let xx = 0; xx < l; xx++) {
      const sx = (xx + 0.5) / fator - 0.5;
      const x0 = Math.floor(sx);
      const fx = sx - x0;
      const v =
        em(x0, y0) * (1 - fx) * (1 - fy) +
        em(x0 + 1, y0) * fx * (1 - fy) +
        em(x0, y0 + 1) * (1 - fx) * fy +
        em(x0 + 1, y0 + 1) * fx * fy;
      if (v >= 0.5) mascara[yy * l + xx] = 1;
    }
  }
  return { mascara, largura: l, altura: a };
}

/**
 * @param {Uint8Array} mascara 1 = aceso, 0 = apagado. Linha por linha.
 * @returns {Array<Array<[number, number]>>} laços fechados, sem repetir o
 *   primeiro ponto no fim.
 */
export function tracarLacos(mascara, largura, altura) {
  const aceso = (x, y) =>
    x >= 0 && y >= 0 && x < largura && y < altura && mascara[y * largura + x] === 1;

  // Aresta dirigida guardada como "x,y" de origem -> lista de destinos.
  // Lista, e não valor único, porque quatro arestas podem se encontrar no
  // mesmo vértice quando dois blocos se tocam só pela quina.
  const saidas = new Map();
  const empurra = (ax, ay, bx, by) => {
    const chave = `${ax},${ay}`;
    const lista = saidas.get(chave);
    if (lista) lista.push([bx, by]);
    else saidas.set(chave, [[bx, by]]);
  };

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      if (!aceso(x, y)) continue;
      // O pixel (x,y) ocupa o quadrado [x,x+1] x [y,y+1], com y crescendo
      // para baixo. Em cada caso o interior fica à direita de quem anda.
      if (!aceso(x, y - 1)) empurra(x, y, x + 1, y);
      if (!aceso(x + 1, y)) empurra(x + 1, y, x + 1, y + 1);
      if (!aceso(x, y + 1)) empurra(x + 1, y + 1, x, y + 1);
      if (!aceso(x - 1, y)) empurra(x, y + 1, x, y);
    }
  }

  const lacos = [];
  for (const [inicio] of saidas) {
    while (saidas.get(inicio)?.length) {
      const laco = [];
      let atual = inicio;
      // Anda até voltar ao começo, consumindo cada aresta uma única vez.
      for (;;) {
        const lista = saidas.get(atual);
        if (!lista?.length) break;
        const [px, py] = lista.pop();
        if (lista.length === 0) saidas.delete(atual);
        laco.push([px, py]);
        atual = `${px},${py}`;
        if (atual === inicio) break;
      }
      if (laco.length > 3) lacos.push(laco);
    }
  }
  return lacos;
}

/** Douglas-Peucker em laço fechado. */
export function simplificar(laco, tolerancia) {
  if (laco.length < 4) return laco;

  // O laço é fechado, então não há ponta natural para ancorar a divisão. O
  // ponto mais distante do primeiro serve: garante que os dois extremos
  // caiam em quinas de verdade, e não no meio de uma reta.
  let oposto = 0;
  let maior = -1;
  for (let i = 1; i < laco.length; i++) {
    const d = (laco[i][0] - laco[0][0]) ** 2 + (laco[i][1] - laco[0][1]) ** 2;
    if (d > maior) {
      maior = d;
      oposto = i;
    }
  }

  const a = laco.slice(0, oposto + 1);
  const b = laco.slice(oposto).concat([laco[0]]);
  return dp(a, tolerancia).concat(dp(b, tolerancia).slice(1, -1));
}

/**
 * Douglas-Peucker iterativo.
 *
 * Iterativo, e não recursivo, porque o laço bruto de uma letra traçada em
 * 4x tem milhares de pontos: na versão recursiva o pior caso é uma pilha de
 * profundidade igual ao número de pontos, e estourar a pilha aqui seria uma
 * falha silenciosa e intermitente, dependente da arte de entrada.
 */
function dp(pontos, tolerancia) {
  if (pontos.length < 3) return pontos;
  const manter = new Uint8Array(pontos.length);
  manter[0] = 1;
  manter[pontos.length - 1] = 1;

  const pilha = [[0, pontos.length - 1]];
  while (pilha.length) {
    const [inicio, fim] = pilha.pop();
    if (fim - inicio < 2) continue;
    const [ax, ay] = pontos[inicio];
    const [bx, by] = pontos[fim];
    const dx = bx - ax;
    const dy = by - ay;
    const comprimento = Math.hypot(dx, dy);

    let indice = -1;
    let maior = tolerancia;
    for (let i = inicio + 1; i < fim; i++) {
      const [px, py] = pontos[i];
      const d =
        comprimento === 0
          ? Math.hypot(px - ax, py - ay)
          : Math.abs(dy * px - dx * py + bx * ay - by * ax) / comprimento;
      if (d > maior) {
        maior = d;
        indice = i;
      }
    }

    if (indice === -1) continue;
    manter[indice] = 1;
    pilha.push([inicio, indice], [indice, fim]);
  }

  return pontos.filter((_, i) => manter[i]);
}
