import Link from "next/link";
import { LumiMark } from "@/components/lumi/Chat";
import { BRAND } from "@/lib/brand";
import { CUSTOMER_BRANDS } from "@/lib/data";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/features#security" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Help centre", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/features#security" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-sunken">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label={`${BRAND.name} — home`}
            >
              <LumiMark />
              <span className="text-[1.05rem] font-semibold tracking-[-0.035em]">{BRAND.name}</span>
            </Link>
            <p className="t-small mt-4 max-w-[30ch]">
              The AI support and shopping agent for ecommerce brands. Answers, recommends and
              resolves — then hands over when it should.
            </p>
            <div className="mt-6 flex gap-2">
              {BRAND.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="inline-flex h-9 items-center rounded-[8px] border border-line-strong px-3 text-[0.82rem] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <h3 className="text-[0.84rem] font-medium tracking-[-0.005em]">{column.heading}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.875rem] text-ink-soft transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 md:flex-row md:items-center md:justify-between">
          <p className="t-micro">
            © {new Date().getFullYear()} {BRAND.name}. A template demonstration.
          </p>
          <p className="t-micro max-w-[62ch]">
            {CUSTOMER_BRANDS.join(", ")} are fictional brands. All metrics, conversations and orders
            shown are illustrative demo data.
          </p>
        </div>
      </div>
    </footer>
  );
}
