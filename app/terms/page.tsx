import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/site/LegalDoc";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms covering use of Lumi, including agent actions, billing and availability.",
  alternates: { canonical: "/terms" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "The service",
    paragraphs: [
      "Lumi provides an automated support agent that reads data you connect and, where you permit it, takes actions in your systems on your behalf.",
      "You decide which actions are permitted. Actions taken within those permissions are taken as your agent, and you remain responsible for them as you would for an employee acting within their remit.",
    ],
  },
  {
    heading: "What an agent may do",
    paragraphs: [
      "By default Lumi may read connected data and may create returns, create exchanges, correct addresses and cancel orders before dispatch. Anything outside the defaults must be enabled explicitly.",
      "Every action is recorded in the audit log with the conversation that produced it. We recommend reviewing that log during your first weeks of use.",
    ],
  },
  {
    heading: "Accuracy",
    paragraphs: [
      "Lumi answers from the documents and records you connect. If those are out of date or contradict each other, its answers will reflect that — which is why every policy answer cites its source.",
      "We do not warrant that automated answers will be correct in every case. You should keep escalation rules in place for conversations where an incorrect answer would be costly.",
    ],
  },
  {
    heading: "Billing",
    paragraphs: [
      "Plans are billed monthly in advance, and metered on conversations. A conversation is one customer thread within a rolling 24-hour window, regardless of message count or channel.",
      "Exceeding your plan's included volume does not interrupt service; the overage appears on the following invoice at the rate shown in your workspace.",
    ],
  },
  {
    heading: "Availability",
    paragraphs: [
      "We aim for 99.9% monthly availability. Where an incident prevents Lumi from answering, conversations queue for your team rather than being dropped.",
      "Scheduled maintenance is announced in your workspace in advance.",
    ],
  },
  {
    heading: "Ending the agreement",
    paragraphs: [
      "You can cancel at any time, effective at the end of the current period. On cancellation you can export your conversation history and audit log for thirty days, after which it is deleted.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms"
        lead="What the service does, what the agent is permitted to do on your behalf, and how it is billed."
      />
      <LegalDoc sections={SECTIONS} updated="2 March 2026" />
    </>
  );
}
