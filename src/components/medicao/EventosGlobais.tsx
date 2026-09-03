"use client";

import { useEffect } from "react";
import { enviarEvento } from "@/lib/medicao";

/**
 * Instrumentação por delegação, num componente só.
 *
 * O caminho óbvio seria pôr `onClick` em cada botão de WhatsApp. Ele não serve
 * aqui: os sete links estão espalhados por seções que hoje são server
 * components puros, e cada `onClick` obrigaria a marcar a seção inteira como
 * client, arrastando JavaScript para o navegador em troca de uma chamada de
 * medição. A página já pagou esse preço uma vez com o spotlight que seguia o
 * cursor, e a lição ficou registrada em `CLAUDE.md`.
 *
 * Um listener na raiz resolve os sete de uma vez, não muda o tipo de nenhuma
 * seção, e continua funcionando sozinho nos links que as rotas de oferta
 * ainda vão criar.
 */
export function EventosGlobais() {
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;

      const link = alvo.closest<HTMLAnchorElement>('a[href*="wa.me/"]');
      if (!link) return;

      /**
       * A origem sai da seção que contém o link, e não de um `data-` escrito
       * à mão em cada botão. Assim ninguém precisa lembrar de marcar o
       * próximo CTA: o `id` da seção já existe para a navegação do header e
       * passa a servir também de rótulo no relatório. Header e rodapé ficam
       * fora de `<section>`, e caem no fallback.
       */
      const secao = link.closest("section[id]")?.id;
      enviarEvento("contato_whatsapp", { origem: secao ?? "fora-de-secao" });
    }

    // Captura, para registrar o clique antes de qualquer handler que chame
    // stopPropagation no caminho de subida.
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  /**
   * Não há listener de rolagem aqui, e a ausência é decisão. A métrica
   * otimizada do fluxo de dados do GA4 mede rolagem a 90% sozinha, do lado do
   * Google, sem custar bundle. Ver a nota em `@/lib/medicao`.
   */

  return null;
}
