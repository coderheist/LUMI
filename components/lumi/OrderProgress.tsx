import { DEMO_ORDER } from "@/lib/data";

/**
 * Order status, shown the way a carrier timeline actually reads: completed
 * steps, the one in progress, and what is still ahead. Numbering is real
 * sequence here, so the steps are numbered.
 */
export function OrderProgress({ dark = false, shown = true }: { dark?: boolean; shown?: boolean }) {
  return (
    <div
      className="turn-in"
      data-shown={shown ? "true" : "false"}
    >
      <div
        className={`flex items-baseline justify-between gap-3 border-b pb-3 ${
          dark ? "border-indigo-line" : "border-line"
        }`}
      >
        <p data-numeric className={`text-[0.88rem] font-medium ${dark ? "text-paper" : ""}`}>
          Order {DEMO_ORDER.reference}
        </p>
        <p className={`text-[0.75rem] ${dark ? "text-paper/45" : "text-ink-faint"}`}>
          {DEMO_ORDER.carrier}
        </p>
      </div>

      <ol className="mt-4 flex flex-col gap-0">
        {DEMO_ORDER.steps.map((step, index) => {
          const done = step.state === "done";
          const active = step.state === "active";
          const last = index === DEMO_ORDER.steps.length - 1;

          return (
            <li key={step.label} className="relative flex gap-3 pb-4 last:pb-0">
              {!last ? (
                <span
                  aria-hidden
                  style={{ "--draw-delay": `${index * 140}ms` } as React.CSSProperties}
                  className={`draw-line absolute left-[7px] top-4 h-full w-px ${
                    done ? (dark ? "bg-sage-dark-line" : "bg-sage/40") : dark ? "bg-indigo-line" : "bg-line"
                  }`}
                />
              ) : null}

              <span
                aria-hidden
                className={`relative mt-1 grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full border ${
                  done
                    ? dark
                      ? "border-sage-dark-line bg-sage-dark-line"
                      : "border-sage bg-sage"
                    : active
                      ? dark
                        ? "border-indigo-dark-active bg-indigo-dark-active"
                        : "border-indigo bg-indigo"
                      : dark
                        ? "border-indigo-line bg-transparent"
                        : "border-line-strong bg-transparent"
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="#fff" strokeWidth="1.8">
                    <path d="M2 5.2 4 7.2 8 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
                {active ? (
                  <span className="absolute inset-[-5px] rounded-full border border-current opacity-30" />
                ) : null}
              </span>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-[0.88rem] leading-tight ${
                    active ? "font-medium" : ""
                  } ${dark ? (step.state === "pending" ? "text-paper/40" : "text-paper") : step.state === "pending" ? "text-ink-faint" : "text-ink"}`}
                >
                  {step.label}
                </p>
                <p
                  data-numeric
                  className={`mt-0.5 text-[0.75rem] ${dark ? "text-paper/40" : "text-ink-faint"}`}
                >
                  {step.at}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div
        className={`mt-2 flex items-center justify-between gap-3 rounded-card border px-3.5 py-3 ${
          dark ? "border-sage-dark-tint-line bg-sage-dark-tint" : "border-sage/20 bg-sage-tint"
        }`}
      >
        <div>
          <p className={`text-[0.8rem] font-medium ${dark ? "text-sage-dark" : "text-sage"}`}>
            Arriving today
          </p>
          <p data-numeric className={`text-[0.75rem] ${dark ? "text-sage-dark/70" : "text-sage/75"}`}>
            {DEMO_ORDER.window}
          </p>
        </div>
        <button
          className={`rounded-[8px] border px-2.5 py-1.5 text-[0.75rem] font-medium transition-colors duration-200 ${
            dark
              ? "border-sage-dark-line text-sage-dark hover:bg-sage-dark-tint-hover"
              : "border-sage/30 text-sage hover:bg-sage/10"
          }`}
        >
          Track package
        </button>
      </div>
    </div>
  );
}
