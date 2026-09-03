import { ImageResponse } from "next/og";
import { MONOGRAMA } from "@/lib/marca";
import { COMPANY } from "@/lib/site";

// Imagem gerada em build: exigência do `output: "export"`.
export const dynamic = "force-static";


/**
 * Imagem de compartilhamento gerada por código, não por arquivo de design.
 * É o que aparece quando o link é enviado por WhatsApp, que neste projeto é
 * o canal principal. Um card quebrado ali custa credibilidade na hora exata
 * em que ela mais importa.
 *
 * ImageResponse suporta apenas flexbox e um subconjunto de CSS. Sem grid.
 */
export const alt = "Tectus. Tecnologia que impulsiona. Automação que transforma.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111827",
          padding: "72px 80px",
        }}
      >
        {/* Monograma em escala grande, com a mesma geometria do logo. */}
        <svg width="96" height="96" viewBox={MONOGRAMA.viewBox}>
          <polygon points={MONOGRAMA.barra} fill="#F8FAFC" />
          <polygon points={MONOGRAMA.hasteBase} fill="#F8FAFC" />
          <polygon points={MONOGRAMA.hasteAcento} fill="#22B4BF" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Sua empresa cresceu. Seus processos continuaram os mesmos.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 27,
              color: "#9CA3AF",
              letterSpacing: "-0.01em",
            }}
          >
            {COMPANY.slogan}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 26,
          }}
        >
          <div
            style={{
              fontSize: 25,
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "0.22em",
            }}
          >
            TECTUS
          </div>
          <div style={{ fontSize: 21, color: "#22B4BF", letterSpacing: "0.02em" }}>
            Consultoria antes de desenvolvimento
          </div>
        </div>
      </div>
    ),
    size,
  );
}
