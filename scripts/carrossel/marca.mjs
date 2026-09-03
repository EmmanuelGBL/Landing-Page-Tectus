/**
 * Paleta e monograma para o gerador de carrossel.
 *
 * A geometria NÃO é redigitada: é lida de `src/lib/marca.ts`, que é a fonte
 * única. Este script é Node puro e não importa TypeScript, mas ler o arquivo
 * e extrair os polígonos evita a terceira cópia das coordenadas. O
 * `scripts/gerar-icones.mjs` repete os valores à mão, e o comentário em
 * `marca.ts` avisa que os dois precisam andar juntos. Aqui não precisa.
 */
import { readFile } from "node:fs/promises";

const fonte = await readFile(new URL("../../src/lib/marca.ts", import.meta.url), "utf8");

/** Lê `chave: "valor"` sem regex, para não depender de escape em heredoc. */
const extrair = (chave) => {
  const inicio = fonte.indexOf(`${chave}:`);
  if (inicio === -1) throw new Error(`marca.ts não expõe ${chave}.`);
  const abre = fonte.indexOf('"', inicio);
  const fecha = fonte.indexOf('"', abre + 1);
  if (abre === -1 || fecha === -1) throw new Error(`marca.ts tem ${chave} sem valor entre aspas.`);
  return fonte.slice(abre + 1, fecha);
};

export const MONOGRAMA = {
  viewBox: extrair("viewBox"),
  barra: extrair("barra"),
  hasteBase: extrair("hasteBase"),
  hasteAcento: extrair("hasteAcento"),
};

/** Hex de `src/app/globals.css`. Não redigitar em outro lugar. */
export const COR = {
  grafite: "#111827",
  papel: "#F8FAFC",
  petroleo: "#0E7C86",
  petroleoClaro: "#22B4BF",
  cinza: "#9CA3AF",
  cinzaTexto: "#5F6B7D",
  cinzaLinha: "#E2E8F0",
};

/**
 * Combinação de cor por fundo, conforme a tabela do sistema visual do
 * carrossel. O petróleo puro não tem contraste sobre grafite, por isso o
 * fundo escuro usa `petroleoClaro` como acento, e o fundo claro usa o cinza
 * de texto em vez do cinza de traço.
 */
export const TEMA = {
  grafite: {
    fundo: COR.grafite,
    titulo: COR.papel,
    corpo: COR.cinza,
    acento: COR.petroleoClaro,
    linha: "rgba(248,250,252,0.12)",
    monograma: [COR.papel, COR.papel, COR.petroleoClaro],
  },
  papel: {
    fundo: COR.papel,
    titulo: COR.grafite,
    corpo: COR.cinzaTexto,
    acento: COR.petroleo,
    linha: COR.cinzaLinha,
    monograma: [COR.grafite, COR.grafite, COR.petroleo],
  },
  petroleo: {
    fundo: COR.petroleo,
    titulo: COR.papel,
    // O sistema visual documenta 0.82, que dá 3,72:1 sobre petróleo. Passa
    // como texto grande e só como texto grande. Em 0.92 sobe para 4,26:1 sem
    // perder a hierarquia contra o título, que é branco puro. O fundo petróleo
    // é o teto de contraste desta paleta: nem branco sólido passa de 4,73:1.
    corpo: "rgba(248,250,252,0.92)",
    acento: COR.papel,
    linha: "rgba(248,250,252,0.28)",
    monograma: [COR.papel, COR.papel, COR.papel],
  },
};
