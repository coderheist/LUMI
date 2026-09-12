import { ChannelRelay } from "@/components/lumi/ChannelRelay";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { CHANNELS } from "@/lib/data";

const CARRIED = ["Conversation history", "Order NOVA-4832", "Customer profile", "Return eligibility"];

export function Channels() {
  return (
    <Section id="channels" space="loose" ruled>
      <div className="shell">
        <SectionHead
          title="One AI. Every conversation."
          lead="Customers do not care which system you are using. The thread follows them from your product page to WhatsApp to a human, and nothing has to be repeated."
        />

        <ul className="mt-12 flex flex-wrap gap-2">
          {CHANNELS.map((channel, index) => (
            <Reveal as="li" key={channel.name} delay={index * 50}>
              <span className="inline-flex items-baseline gap-2 rounded-chip border border-line-strong px-3.5 py-2">
                <span className="text-[0.9rem] font-medium">{channel.name}</span>
                <span className="text-[0.75rem] text-ink-faint">{channel.note}</span>
              </span>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ChannelRelay />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-panel border border-line bg-paper-raised p-5 md:p-6">
                <p className="text-[0.88rem] font-medium">Carried across every hop</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {CARRIED.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3.5 w-3.5 shrink-0 text-sage"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden
                      >
                        <path d="M2.5 6.3 4.7 8.5 9.5 3.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span data-numeric className="text-[0.9rem]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="t-small mt-5 border-t border-line pt-4">
                  When Priya picked this conversation up, she did not have to ask Alex to repeat
                  anything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
