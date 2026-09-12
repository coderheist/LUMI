import { ImageResponse } from "next/og";

export const alt = "Lumi — AI customer support for commerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview, generated at build time so the template ships without a
 * binary asset to keep in sync. Flexbox only — next/og does not lay out grid.
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
          backgroundColor: "#f7f5f2",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#243b66",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fdfcfb",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            L
          </div>
          <div
            style={{
              marginLeft: 18,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#171513",
            }}
          >
            Lumi
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 20,
              color: "#6a655d",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            AI support for commerce
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 82,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            fontWeight: 600,
            color: "#171513",
            maxWidth: 880,
          }}
        >
          Turn every customer conversation into a sale.
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
                backgroundColor: "#ffffff",
                border: "1px solid #e3ded6",
                borderLeft: "4px solid #243b66",
                borderRadius: 16,
                padding: "18px 22px",
                fontSize: 24,
                color: "#171513",
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
                    backgroundColor: "#e8ebf2",
                    color: "#243b66",
                    fontSize: 19,
                    fontWeight: 600,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 21, color: "#6a655d" }}>
            Answers · Recommends · Resolves
          </div>
        </div>
      </div>
    ),
    size,
  );
}
