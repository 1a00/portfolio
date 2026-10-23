import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
};

/** Arte das imagens de compartilhamento, nas cores do tema escuro do DESIGN.md. */
export function ogImage({ eyebrow, title, subtitle, footer }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0e1012",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#8b96aa",
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 36,
              color: "#a0aaba",
              maxWidth: 960,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a0aaba",
          }}
        >
          <div style={{ display: "flex" }}>{footer}</div>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 8,
              borderRadius: 100,
              background: "#007afc",
            }}
          />
        </div>
      </div>
    ),
    ogSize,
  );
}
