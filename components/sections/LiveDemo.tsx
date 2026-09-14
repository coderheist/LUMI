import { AgentConsole } from "@/components/lumi/AgentConsole";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function LiveDemo() {
  return (
    <Section id="demo" tone="dark" space="loose" className="overflow-hidden">
      <div aria-hidden className="grid-field absolute inset-0 opacity-40" />

      <div className="shell relative">
        <div className="max-w-[42rem]">
          <Reveal>
            <h2 className="t-h1">Watch Lumi work.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-lead mt-5">
              Not another chatbot. An agent that reads your store, checks the same systems your team
              would, and takes the action at the end.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-12 md:mt-14">
            <AgentConsole />
          </div>
        </Reveal>

        <p className="t-micro mt-6">
          Order NOVA-4832 and its carrier status are demo records created for this template.
        </p>
      </div>
    </Section>
  );
}
