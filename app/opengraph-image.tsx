import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";
import { HERO_COPY } from "@/lib/data";

export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview, generated at build time so the template ships without a
 * binary asset to keep in sync. Flexbox only — next/og does not lay out grid.
 *
 * Colours below are literal hex, not the CSS tokens the rest of the site
 * uses — this renders at the edge as a plain image, with no access to
 * app/globals.css. If you retheme the accent, update `#d9401a` here too.
 */
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
          backgroundColor: "#fff9ef",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#d9401a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fffdf7",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {BRAND.name[0]}
          </div>
          <div
            style={{
              marginLeft: 18,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#1d1a17",
            }}
          >
            {BRAND.name}
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 20,
              color: "#5c534a",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {BRAND.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 82,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            fontWeight: 600,
            color: "#1d1a17",
            maxWidth: 880,
          }}
        >
          {HERO_COPY.headline}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 560,
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#fffdf7",
                border: "1px solid #f0e3d2",
                borderLeft: "4px solid #d9401a",
                borderRadius: 16,
                padding: "18px 22px",
                fontSize: 24,
                color: "#1d1a17",
              }}
            >
              Your order is out for delivery — arriving today.
            </div>
            <div style={{ display: "flex", marginTop: 14 }}>
              {["Order data", "Shipping policy", "Customer profile"].map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    marginRight: 10,
                    padding: "8px 14px",
                    borderRadius: 9,
                    backgroundColor: "#fff2e2",
                    color: "#b83413",
                    fontSize: 19,
                    fontWeight: 600,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 21, color: "#5c534a" }}>
            Answers · Recommends · Resolves
          </div>
        </div>
      </div>
    ),
    size,
  );
}
