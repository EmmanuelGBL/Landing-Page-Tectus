/**
 * Build de publicação.
 *
 * Existe por um motivo específico: a Netlify executa o `build.command` no shell
 * do sistema, e o deploy pela CLI roda na máquina de quem publica. No Windows,
 * `VAR=valor comando` não é sintaxe válida, então a variável precisa ser
 * definida em código, não na linha de comando.
 *
 * A URL vem do ambiente da Netlify: `URL` é o endereço principal do projeto
 * (hoje o subdomínio .netlify.app, e o domínio próprio assim que ele for
 * apontado), `DEPLOY_PRIME_URL` é o endereço de um deploy de preview. O
 * fallback nunca é o domínio oficial de propósito: variável faltando precisa
 * produzir uma página com noindex, nunca uma indexação acidental fora do
 * domínio definitivo. Ver INDEXAVEL em src/lib/site.ts.
 */
import { spawnSync } from "node:child_process";

const url =
  process.env.URL || process.env.DEPLOY_PRIME_URL || "https://sem-dominio.netlify.app";

console.log(`[tectus] build com NEXT_PUBLIC_SITE_URL=${url}`);

const resultado = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_PUBLIC_SITE_URL: url },
});

process.exit(resultado.status ?? 1);
