import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { LumiWidget } from "@/components/lumi/LumiWidget";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const DESCRIPTION =
  "Lumi is the AI support and shopping agent for ecommerce brands. It answers product and policy " +
  "questions, recommends products, tracks orders and starts returns — then hands over to a person " +
  "with full context when it should.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumi.example.com"),
  title: {
    default: "Lumi — AI customer support for commerce",
    template: "%s · Lumi",
  },
  description: DESCRIPTION,
  keywords: [
    "AI customer support",
    "ecommerce support automation",
    "AI shopping agent",
    "order tracking AI",
    "returns automation",
    "Shopify AI agent",
  ],
  authors: [{ name: "Lumi" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Lumi",
    title: "Lumi — AI customer support for commerce",
    description: DESCRIPTION,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumi — AI customer support for commerce",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1426" },
  ],
  colorScheme: "light",
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lumi",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Customer support automation",
  operatingSystem: "Web",
  description: DESCRIPTION,
  offers: [
    { "@type": "Offer", name: "Starter", price: "49", priceCurrency: "USD" },
    { "@type": "Offer", name: "Growth", price: "149", priceCurrency: "USD" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={archivo.variable}>
      <body>
        {/* Scroll reveals are a progressive enhancement: without JS the
            content is simply present. */}
        <noscript>
          <style>{`.reveal,.turn-in,.enter,.enter-slide,.enter-scale{opacity:1 !important;filter:none !important;transform:none !important;animation:none !important}.enter-mask>*{transform:none !important;animation:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-chip focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <LumiWidget />
        <script
          type="application/ld+json"
          // Static, author-controlled payload — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </body>
    </html>
  );
}
