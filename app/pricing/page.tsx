import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { Faq, PlanMatrix, PricingPlans } from "@/components/sections/Pricing";
import { Roi } from "@/components/sections/Roi";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Lumi is priced per conversation, not per seat. Starter at $49, Growth at $149, and custom volume pricing for larger brands.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Priced per conversation, not per seat."
        lead="A conversation is one customer thread in a 24-hour window, however many messages it contains and whichever channel it moves through. Human handoff is on every plan."
      />
      <PricingPlans heading={false} />
      <PlanMatrix />
      <Roi />
      <Faq />
      <FinalCta />
    </>
  );
}
