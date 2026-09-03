/**
 * Geometria do monograma Tectus.
 *
 * Fonte única para todo lugar que desenha o símbolo: componente Logo,
 * imagem de Open Graph e o gerador de ícones em scripts/gerar-icones.mjs.
 * Esse script é Node puro e não consegue importar TypeScript, então ele
 * repete os valores. Ao mexer aqui, mexer lá também.
 *
 * As coordenadas não foram desenhadas no olho: saíram da leitura de pixel
 * de `../Logos/Originais/Logo_Horizontal.png`, classificando cada ponto entre
 * fundo, grafite e petróleo e extraindo as arestas de cada peça. Por isso
 * batem com o arquivo do ChatGPT em vez de apenas lembrar dele.
 *
 * Três peças, e nenhuma encosta na outra. O vão branco entre a barra e as
 * hastes é característica do desenho, não descuido: é o que faz o símbolo
 * ler como peças montadas em vez de letra desenhada.
 *
 * - `barra`: paralelogramo de topo e base horizontais, lados inclinados a
 *   cerca de 45 graus para a direita.
 * - `hasteBase`: paralelogramo de lados verticais, com topo e base cortados
 *   na mesma diagonal da barra. Termina em ponta embaixo à esquerda.
 * - `hasteAcento`: fita de topo reto e lados verticais, com a base cortada
 *   em diagonal. É mais curta que a haste grafite do lado direito, o que
 *   cria o escalonamento das duas pontas.
 */

export const MONOGRAMA = {
  viewBox: "0 0 200 200",
  barra: "32.2,15.6 196,15.6 165.4,45.7 5.6,45.7",
  hasteBase: "95.8,51.5 95.8,151.2 59.9,184.4 59.9,84.7",
  hasteAcento: "103.7,72 136.4,72 136.4,146.4 103.7,175.9",
} as const;

/**
 * Espaçamento entre letras do wordmark, medido na mesma imagem de
 * referência. O desenho usa tracking bem aberto, que é o que dá o ar de
 * consultoria em vez de startup.
 */
export const WORDMARK_TRACKING = "0.22em";
