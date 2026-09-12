import Link from "next/link";
import { ChatShell, LumiMark, Turn } from "@/components/lumi/Chat";
import { ButtonLink } from "@/components/ui/Button";

const SUGGESTIONS = [
  { label: "Product", href: "/features" },
  { label: "Use cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

/** The 404 is answered the way Lumi answers anything else it cannot find. */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div aria-hidden className="paper-field absolute inset-0 opacity-50" />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p data-numeric className="text-[4rem] font-medium leading-none tracking-[-0.05em]">
            404
          </p>
          <h1 className="t-h2 mt-5 max-w-[16ch]">This page is not in the catalogue.</h1>
          <p className="t-lead mt-5">
            The link may be old, or the page may have moved. Here is where most people were heading.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {SUGGESTIONS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-chip border border-line-strong px-3.5 py-2 text-[0.88rem] font-medium transition-colors duration-200 hover:border-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink href="/" size="lg">
              Back to the homepage
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="mx-auto max-w-[30rem]">
            <ChatShell channel="Website · lumi.example.com">
              <Turn actor="customer" name="You">
                Where did this page go?
              </Turn>
              <Turn actor="lumi">
                I checked — that address is not in the sitemap. It may have been renamed. Try the
                product pages, or tell me what you were looking for and I will point you at it.
              </Turn>
              <div className="flex items-center gap-2 pt-1">
                <LumiMark />
                <p className="text-[0.78rem] text-ink-faint">
                  This is what Lumi does when it cannot find something: says so, then offers the
                  next useful step.
                </p>
              </div>
            </ChatShell>
          </div>
        </div>
      </div>
    </section>
  );
}
