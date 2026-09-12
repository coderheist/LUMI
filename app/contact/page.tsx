import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a free Lumi workspace or talk to the team about volume pricing, data residency and custom actions.",
  alternates: { canonical: "/contact" },
};

const ROUTES = [
  {
    title: "Start free",
    detail:
      "Connect a store, point Lumi at your policies, and have a working agent in about twenty minutes. No card.",
  },
  {
    title: "Talk to sales",
    detail:
      "For volume pricing, data residency, SSO, or custom actions inside your own systems.",
  },
  {
    title: "Support",
    detail:
      "Already running Lumi? Reach the team from inside your workspace and the thread arrives with your logs attached.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Tell us what your inbox looks like."
        lead="The useful first conversation is about your actual support volume — which questions repeat, and which ones you would never let an agent answer."
      />

      <Section space="normal">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ul className="border-t border-line">
              {ROUTES.map((route) => (
                <li key={route.title} className="border-b border-line py-6">
                  <h2 className="t-h3">{route.title}</h2>
                  <p className="t-small mt-2">{route.detail}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="t-small text-ink">{BRAND.name}</p>
              <p className="t-small mt-1">
                {BRAND.address.line1}, {BRAND.address.city}
              </p>
              <p className="t-small">{BRAND.supportEmail}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
