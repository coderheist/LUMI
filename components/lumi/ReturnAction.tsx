"use client";

import { useState } from "react";
import { RETURN_CASE } from "@/lib/data";

/**
 * Eligibility, then a real action. The point of this component is the second
 * state: Lumi does not just answer the returns question, it creates the
 * return. The button is user-triggered, so the motion answers an action.
 */
export function ReturnAction({ dark = false, shown = true }: { dark?: boolean; shown?: boolean }) {
  const [created, setCreated] = useState(false);

  const rowClass = dark ? "border-indigo-line" : "border-line";
  const mutedClass = dark ? "text-paper/45" : "text-ink-faint";

  return (
    <div className="turn-in" data-shown={shown ? "true" : "false"}>
      <div className={`flex items-baseline justify-between gap-3 border-b pb-3 ${rowClass}`}>
        <p data-numeric className={`text-[0.88rem] font-medium ${dark ? "text-paper" : ""}`}>
          Order {RETURN_CASE.order}
        </p>
        <p className={`text-[0.75rem] ${mutedClass}`}>{RETURN_CASE.item}</p>
      </div>

      <dl className="mt-3.5 flex flex-col gap-2.5">
        {[
          { term: "Purchased", value: RETURN_CASE.purchased },
          { term: "Return window", value: `${RETURN_CASE.windowDays} days` },
          { term: "Size", value: RETURN_CASE.size },
        ].map((row) => (
          <div key={row.term} className="flex items-baseline justify-between gap-4">
            <dt className={`text-[0.82rem] ${mutedClass}`}>{row.term}</dt>
            <dd data-numeric className={`text-[0.82rem] ${dark ? "text-paper" : "text-ink"}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className={`mt-4 flex items-center gap-2 rounded-card border px-3.5 py-2.5 ${
          dark ? "border-sage-dark-tint-line bg-sage-dark-tint" : "border-sage/20 bg-sage-tint"
        }`}
      >
        <svg
          viewBox="0 0 12 12"
          className={`h-3.5 w-3.5 ${dark ? "text-sage-dark" : "text-sage"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M2.5 6.3 4.7 8.5 9.5 3.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className={`text-[0.82rem] font-medium ${dark ? "text-sage-dark" : "text-sage"}`}>
          Eligible for return
        </p>
      </div>

      {created ? (
        <div
          className={`mt-3 rounded-card border px-3.5 py-3 ${
            dark ? "border-indigo-line bg-indigo-ink-raised" : "border-line bg-paper-sunken"
          }`}
        >
          <p className={`text-[0.84rem] font-medium ${dark ? "text-paper" : "text-ink"}`}>
            Return created
          </p>
          <p className={`mt-1 text-[0.78rem] ${mutedClass}`}>Refund to {RETURN_CASE.refundTo}</p>
          <p className={`text-[0.78rem] ${mutedClass}`}>
            Processing · {RETURN_CASE.processing}
          </p>
          <p className={`mt-2 text-[0.72rem] ${mutedClass}`}>
            Written to the audit log as an agent action.
          </p>
        </div>
      ) : (
        <button
          onClick={() => setCreated(true)}
          className={`mt-3 w-full rounded-[10px] px-3 py-2.5 text-[0.85rem] font-medium transition-colors duration-200 ${
            dark
              ? "bg-paper text-ink hover:bg-white"
              : "bg-ink text-paper hover:bg-ink-hover"
          }`}
        >
          Start return
        </button>
      )}
    </div>
  );
}
