import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { Integrations } from "@/components/sections/Integrations";
import { Knowledge } from "@/components/sections/Knowledge";
import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect your catalogue, orders, helpdesk and policy documents. Lumi reads what it needs and writes back only the actions you allow.",
  alternates: { canonical: "/integrations" },
};

const PERMISSIONS = [
  {
    scope: "Read",
    items: ["Product catalogue and stock", "Orders and fulfilment status", "Customer profile", "Policy documents"],
  },
  {
    scope: "Write, with permission",
    items: ["Create a return", "Create an exchange", "Correct a delivery address", "Cancel before dispatch"],
  },
  {
    scope: "Never",
    items: ["Issue a refund outside policy", "Change a price", "Delete customer records", "Message a customer unprompted"],
  },
] as const;

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        title="Connect the systems, set the permissions."
        lead="Lumi is only as good as what it can read, and only as safe as what it is allowed to write. Both are explicit."
        actions={
          <ButtonLink href="/contact" size="lg">
            Start free
          </ButtonLink>
        }
      />

      <Integrations />

      <Section tone="sunken" space="loose">
        <div className="shell">
          <SectionHead
            title="What an agent is allowed to do."
            lead="Permissions are a design decision, not a settings page you discover later. These are the defaults Lumi ships with."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-panel border border-line bg-line lg:grid-cols-3">
            {PERMISSIONS.map((group, index) => (
              <Reveal key={group.scope} delay={index * 80} className="bg-paper-raised p-6 md:p-7">
                <span
                  aria-hidden
                  className={`mb-5 block h-[3px] w-12 rounded-full ${
                    index === 0 ? "bg-line-strong" : index === 1 ? "bg-indigo" : "bg-ochre"
                  }`}
                />
                <h3 className="t-h3">{group.scope}</h3>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[0.92rem] leading-snug text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <p className="t-micro mt-5">
            Every write is recorded in the audit log with the conversation that produced it.
          </p>
        </div>
      </Section>

      <Knowledge />
      <FinalCta />
    </>
  );
}
