import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/site/LegalDoc";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Lumi handles customer data, conversation records and retention.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What we process",
    paragraphs: [
      "To answer a customer's question, Lumi reads the data you connect: your product catalogue, order records, the policy documents you upload, and the conversation itself. Where you enable it, Lumi also reads a customer profile so it can recognise a returning shopper.",
      "We process this on your instruction, as a processor acting for you. You remain the controller of your customers' personal data.",
    ],
    list: [
      "Conversation content across every channel you connect",
      "Order and fulfilment records needed to answer a status question",
      "Catalogue, stock and pricing data",
      "Policy and knowledge documents you upload or sync",
    ],
  },
  {
    heading: "What we do not do",
    paragraphs: [
      "Your catalogue and your conversations are not added to a shared training set, and are not used to improve models offered to anyone else. They exist to answer your customers' questions.",
      "We do not sell data, and we do not share it with advertising networks.",
    ],
  },
  {
    heading: "Where it is processed",
    paragraphs: [
      "Workspaces can be pinned to an EU or US processing region. Once set, conversation content and derived indexes stay in that region.",
      "Sub-processors are listed in your workspace, and we give notice before adding one.",
    ],
  },
  {
    heading: "Retention",
    paragraphs: [
      "You choose how long conversations and customer records are kept, from thirty days upward. When a record expires it is removed from the live store and from the search index.",
      "Audit log entries are retained for the period you configure, so that an action taken by the agent can still be explained after the conversation itself has been deleted.",
    ],
  },
  {
    heading: "Your customers' rights",
    paragraphs: [
      "Requests for access, correction or erasure can be fulfilled from your workspace, including the conversation history and anything Lumi derived from it.",
      "If a request reaches us directly, we refer it to you as the controller rather than acting on it ourselves.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about this policy, or a data processing agreement, can be sent to privacy@lumi.example.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy"
        lead="What Lumi reads, what it never does with it, and how long anything is kept."
      />
      <LegalDoc sections={SECTIONS} updated="2 March 2026" />
    </>
  );
}
