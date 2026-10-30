import { ImageResponse } from "next/og";

export const alt = "Elevare Tech — Software, Web & AI Development Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#050816",
          backgroundImage: "radial-gradient(circle at 20% 0%, #0c3a5c 0%, #050816 60%)",
          color: "#EEF2FF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="52" height="59" viewBox="0 0 43 49">
            <path d="M37.5 49L27 37L42.5 21V49H37.5Z" fill="#38BDF8" />
            <path d="M0 49V35.5L35.5 0V20L8 49H0Z" fill="#FFFFFF" />
          </svg>
          <div style={{ fontSize: 38, fontWeight: 700 }}>Elevare Tech</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>We build software</div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#7DD3FC" }}>that scales your business.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#9BA8C7" }}>Web · Mobile · AI Agents & Automation · E-commerce · SaaS</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9BA8C7" }}>
          <div>www.elevaretech.site</div>
          <div>Faisalabad, Pakistan · Clients in 7 countries</div>
        </div>
      </div>
    ),
    size
  );
}
