import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lumi builds a support agent for ecommerce brands that cites its sources, takes real actions, and hands over to a person when it should.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    title: "An answer without a source is a guess",
    detail:
      "Every policy answer names the document and page it came from. If we cannot show the passage, we do not ship the answer.",
  },
  {
    title: "Escalation is a feature, not a failure",
    detail:
      "The measure of an agent is not how much it handles, but whether it recognises the moment it should stop. That number goes in the dashboard.",
  },
  {
    title: "Support data is product data",
    detail:
      "The questions arriving in your inbox describe what your product pages fail to say. We treat that as research, not as a cost centre.",
  },
  {
    title: "Your data is not our training set",
    detail:
      "Catalogues and conversations are used to answer your customers. They never enter a shared model.",
  },
] as const;

const ROLES = [
  { title: "Retrieval engineer", place: "Amsterdam / remote", team: "Engineering" },
  { title: "Product designer", place: "Amsterdam", team: "Design" },
  { title: "Solutions engineer, commerce", place: "London / remote", team: "Go to market" },
  { title: "Support operations lead", place: "Remote, EU", team: "Operations" },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="We build the agent we wanted when we ran a support desk."
        lead="Lumi started because four of us spent a year answering the same six questions for a fashion brand, and could see exactly which of them never needed a person."
      />

      <Section space="normal">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-6">
              <p className="t-body text-[1.05rem]">
                The brand was growing quickly and the inbox was growing faster. Most mornings opened
                with a hundred and forty conversations, and most of those were a customer asking
                where a parcel was, whether something came in a medium, or how long they had to send
                it back. The answers already existed — in the order record, in the catalogue, in a
                policy document nobody had opened in months.
              </p>
              <p className="t-body text-[1.05rem]">
                What was missing was something that could look all three up in the same breath and
                then actually do the thing at the end: create the return, hold the restock, correct
                the address. Answering is the easy half. Acting, safely, inside someone else&rsquo;s
                store, is the part that takes the work.
              </p>
              <p className="t-body text-[1.05rem]">
                So that is what Lumi is. It reads your catalogue and your policies, it shows what it
                used, it takes the actions you allow, and when a conversation moves past what it
                should decide on its own, it hands a person the whole thread and gets out of the way.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-[26rem] overflow-hidden rounded-panel lg:h-[32rem]">
              <Media name="editorial-beige-jacket" fill sizes="(max-width: 1024px) 100vw, 38vw" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sunken" space="loose">
        <div className="shell">
          <SectionHead title="What we hold to." />

          <ul className="mt-12 border-t border-line">
            {PRINCIPLES.map((principle, index) => (
              <Reveal
                as="li"
                key={principle.title}
                delay={index * 70}
                className="flex flex-col gap-3 border-b border-line py-7 md:flex-row md:gap-12"
              >
                <h3 className="t-h3 md:w-[22rem] md:shrink-0">{principle.title}</h3>
                <p className="t-body md:flex-1">{principle.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="careers" space="loose">
        <div className="shell">
          <SectionHead
            title="Open roles."
            lead="We are a small team in Amsterdam and across Europe. If you have run a support desk yourself, tell us about it."
            aside={
              <ButtonLink href="/contact" variant="outline" travel>
                Get in touch
              </ButtonLink>
            }
            align="wide"
          />

          <ul className="mt-12 border-t border-line">
            {ROLES.map((role, index) => (
              <Reveal
                as="li"
                key={role.title}
                delay={index * 60}
                className="group border-b border-line"
              >
                <a
                  href="/contact"
                  className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="text-[1.15rem] font-medium tracking-[-0.025em]">{role.title}</span>
                  <span className="flex items-baseline gap-6 text-[0.88rem] text-ink-soft">
                    <span>{role.team}</span>
                    <span>{role.place}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <p className="t-micro mt-6">
            Roles listed here are template placeholder content.
          </p>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
