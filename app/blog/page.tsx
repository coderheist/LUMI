import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { BlogList } from "@/components/site/BlogList";
import { Section } from "@/components/ui/Section";
import { POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on support automation for ecommerce brands — returns, sizing, escalation design and keeping context across channels.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Notes from the support desk."
        lead="Short pieces on what actually happens when you put an agent in front of customers."
      />

      <Section space="normal">
        <div className="shell">
          <BlogList posts={POSTS} />
        </div>
      </Section>
    </>
  );
}
