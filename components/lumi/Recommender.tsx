"use client";

import { ChatShell, SourceChips, Turn, Typing } from "@/components/lumi/Chat";
import { ProductCardCompact } from "@/components/lumi/ProductCard";
import { DISCOVERY_SCRIPT } from "@/lib/data";
import { useConversation, useInView } from "@/lib/hooks";

const TYPING_BEFORE = [false, true] as const;

export function Recommender() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const { shown, typing } = useConversation(2, {
    active: inView,
    typingBefore: TYPING_BEFORE,
    typingMs: 1000,
    readMs: 700,
  });

  const answered = shown >= 2;

  return (
    <div ref={ref}>
      <ChatShell channel="Website · nova.com" bodyClassName="min-h-[19rem]" typing={typing}>
        <Turn actor="customer" shown={shown >= 1} name="Alex Morgan">
          {DISCOVERY_SCRIPT.question}
        </Turn>

        <Turn actor="lumi" shown={answered}>
          {DISCOVERY_SCRIPT.answer}
        </Turn>

        {answered ? (
          <>
            <SourceChips sources={["Catalogue", "Style profile", "Stock"]} shown={answered} />
            <div className="grid gap-2">
              {DISCOVERY_SCRIPT.picks.map((pick, index) => (
                <ProductCardCompact
                  key={pick.product}
                  id={pick.product}
                  match={pick.match}
                  shown={answered}
                  delay={140 * (index + 1)}
                />
              ))}
            </div>
          </>
        ) : null}

        <Typing shown={typing} />
      </ChatShell>
    </div>
  );
}
