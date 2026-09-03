import Script from "next/script";
import { GTM_ID, MEDICAO_ATIVA } from "@/lib/medicao";

/**
 * Snippet oficial do GTM, em duas peças porque o Google exige as duas em
 * lugares diferentes do documento.
 *
 * `afterInteractive` é a estratégia certa aqui: o container não desenha nada
 * na tela, então carregá-lo antes da hidratação só atrasaria o LCP, que é o
 * indicador que a página inteira foi construída para proteger.
 *
 * Sem `NEXT_PUBLIC_GTM_ID` os dois componentes somem do HTML. Nada de script
 * vazio apontando para container inexistente.
 */
export function GoogleTagManager() {
  if (!MEDICAO_ATIVA) return null;

  return (
    <Script
      id="gtm"
      strategy="afterInteractive"
      // Conteúdo constante, montado em build a partir de variável de ambiente.
      // Nada aqui vem de entrada do usuário.
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  );
}

/**
 * Vai logo depois da abertura do `<body>`, por exigência do snippet.
 * Cobre visita com JavaScript desligado, que aqui é pouca gente e mede só
 * a visualização de página. Fica porque é o padrão do Google e custa uma tag.
 */
export function GoogleTagManagerNoScript() {
  if (!MEDICAO_ATIVA) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
