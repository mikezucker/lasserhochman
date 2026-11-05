import { ImageResponse } from "next/og";
export const alt = "Lasser Hochman — Attorneys at Law. Established 1954.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#10243a",
        color: "#fafaf8",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "75px 85px",
      }}
    >
      <div style={{ fontSize: 24, letterSpacing: "5px", display: "flex" }}>
        LASSER HOCHMAN
      </div>
      <div
        style={{
          fontFamily: "serif",
          fontSize: 78,
          lineHeight: 1.08,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Sophisticated Counsel.</span>
        <span style={{ fontStyle: "italic" }}>Personal Attention.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 17,
          letterSpacing: "3px",
          color: "#c5b084",
        }}
      >
        NEW JERSEY · ESTABLISHED 1954
      </div>
    </div>,
    size,
  );
}
