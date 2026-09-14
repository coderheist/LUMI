import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { DocsContent } from "@/components/site/DocsContent";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "How this template is put together: design tokens, the image manifest, content files, components and the pages.",
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  return (
    <>
      <PageHeader
        meta={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Docs" }]} />}
        title="How this template is put together."
        lead="Content in one file, tokens in another, images behind a manifest. Everything you need to rebrand it without hunting through components."
      />

      <DocsContent />
    </>
  );
}
