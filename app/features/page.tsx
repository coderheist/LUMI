import type { Metadata } from "next";
import { Analytics } from "@/components/sections/Analytics";
import { DemoButton } from "@/components/sections/DemoButton";
import { Discovery } from "@/components/sections/Discovery";
import { FinalCta } from "@/components/sections/FinalCta";
import { Handoff } from "@/components/sections/Handoff";
import { Knowledge } from "@/components/sections/Knowledge";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Security } from "@/components/sections/Security";
import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How Lumi works: retrieval from your own catalogue and policies, actions in your systems, every channel your customers use, and a handoff that carries full context.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="An agent that reads your store and acts on it."
        lead="Lumi is built around four things a chatbot cannot do: retrieve from your real data, cite what it used, take an action, and know when to stop."
        actions={
          <>
            <ButtonLink href="/contact" size="lg">
              Start free
            </ButtonLink>
            <DemoButton />
          </>
        }
      />
      <LiveDemo />
      <Knowledge />
      <Discovery />
      <Handoff />
      <Analytics />
      <Security />
      <FinalCta />
    </>
  );
}
