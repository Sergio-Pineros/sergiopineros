import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f5",
          color: "#2a0134",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: 0.48,
            }}
          >
            {site.masthead.label}
          </div>
          <div
            style={{
              height: 1,
              width: "100%",
              background: "rgba(42, 1, 52, 0.18)",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1.05,
            letterSpacing: -2,
            fontFamily: "Georgia, serif",
          }}
        >
          I make things.
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.4,
            maxWidth: 820,
            opacity: 0.72,
            fontFamily: "Georgia, serif",
          }}
        >
          Sometimes brands, sometimes products, and lately these words.
        </div>
      </div>
    ),
    { ...size },
  );
}
