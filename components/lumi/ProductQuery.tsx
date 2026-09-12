"use client";

import { useState } from "react";
import { LumiMark } from "@/components/lumi/Chat";
import { productById } from "@/lib/data";

/**
 * "Ask Lumi about this product." Each question is answered from a real field
 * on the product record, and the answer names the field it came from — the
 * same citation behaviour as the policy answers.
 */
export function ProductQuery({ id }: { id: string }) {
  const product = productById(id);

  const questions = [
    { label: "What is it made of?", answer: product.material, field: "Material" },
    { label: "How does it fit?", answer: product.fit, field: "Fit" },
    { label: "How do I wash it?", answer: product.care, field: "Care" },
    { label: "Is it in stock?", answer: `Available in ${product.sizes.join(", ")}.`, field: "Stock" },
  ];

  const [active, setActive] = useState(0);
  const current = questions[active];

  return (
    <div className="rounded-panel border border-line bg-paper-raised p-5 md:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="t-micro">NOVA</p>
          <h3 className="t-h3 mt-0.5">{product.name}</h3>
        </div>
        <p data-numeric className="text-[1.05rem]">
          ${product.price}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {questions.map((question, index) => (
          <button
            key={question.label}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
            className={`rounded-chip border px-3 py-1.5 text-[0.8rem] font-medium transition-colors duration-200 ${
              index === active
                ? "border-indigo bg-indigo text-white"
                : "border-line-strong text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            {question.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <LumiMark />
        <div className="min-w-0 flex-1">
          <p className="rounded-[16px] rounded-bl-[5px] border border-line border-l-2 border-l-indigo bg-white px-3.5 py-2.5 text-[0.92rem] leading-relaxed">
            {current.answer}
          </p>
          <p className="t-micro mt-2">
            Source: Product catalogue · {product.name} · {current.field}
          </p>
        </div>
      </div>
    </div>
  );
}
