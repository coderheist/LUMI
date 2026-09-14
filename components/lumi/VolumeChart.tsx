"use client";

import { useState } from "react";
import { VOLUME_SERIES } from "@/lib/data";
import { useInView } from "@/lib/hooks";

/**
 * Conversation volume by week, split by who resolved it.
 *
 * Two series, one y-axis, stacked because the parts genuinely sum to the total
 * volume. Palette validated for dark surfaces: CVD ΔE 24.1 (protan) / 22.5
 * (tritan), both inside the lightness band and above the chroma floor.
 *
 * This panel is always dark chrome, independent of the site's own light/dark
 * toggle, so it reaches for --color-chrome-paper/-ink rather than the
 * themable --color-paper/-ink — see the comment above that pair in
 * globals.css.
 */
const SERIES = {
  automated: { label: "Resolved by Lumi", colour: "var(--color-chart-automated)" },
  escalated: { label: "Escalated to a person", colour: "var(--color-chart-escalated)" },
} as const;

const RANGES = [
  { weeks: 4, label: "4 weeks" },
  { weeks: 8, label: "8 weeks" },
  { weeks: 12, label: "12 weeks" },
] as const;

export function VolumeChart() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [weeks, setWeeks] = useState(12);
  const [hovered, setHovered] = useState<number | null>(null);

  const rows = VOLUME_SERIES.slice(-weeks);
  const peak = Math.max(...rows.map((row) => row.automated + row.escalated));
  const axisMax = Math.ceil(peak / 250) * 250;
  const ticks = Array.from({ length: axisMax / 250 + 1 }, (_, index) => index * 250).reverse();

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-[1rem] font-medium text-chrome-paper">Conversations by week</h3>
          <p className="mt-1 text-[0.78rem] text-chrome-paper/45">
            Total volume, split by who resolved it
          </p>
        </div>

        <div
          role="group"
          aria-label="Date range"
          className="inline-flex gap-1 rounded-chip border border-indigo-line bg-indigo-ink p-1"
        >
          {RANGES.map((range) => (
            <button
              key={range.weeks}
              onClick={() => setWeeks(range.weeks)}
              aria-pressed={weeks === range.weeks}
              className={`rounded-[7px] px-2.5 py-1.5 text-[0.78rem] font-medium transition-colors duration-200 ${
                weeks === range.weeks ? "bg-chrome-paper text-chrome-ink" : "text-chrome-paper/55 hover:text-chrome-paper"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 flex gap-3">
        {/* Y axis */}
        <div className="flex h-[15rem] w-9 shrink-0 flex-col justify-between">
          {ticks.map((tick) => (
            <span key={tick} data-numeric className="text-[0.68rem] leading-none text-chrome-paper/35">
              {tick}
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          {/* Recessive grid */}
          <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
            {ticks.map((tick) => (
              <span key={tick} className="h-px w-full bg-chrome-paper/[0.08]" />
            ))}
          </div>

          <div className="relative flex h-[15rem] items-end gap-[3px] sm:gap-1.5">
            {rows.map((row, index) => {
              const total = row.automated + row.escalated;
              const isHovered = hovered === index;

              return (
                <div
                  key={row.week}
                  className="group relative flex h-full flex-1 cursor-default flex-col justify-end"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  aria-label={`${row.week}: ${row.automated} resolved by Lumi, ${row.escalated} escalated, ${total} total`}
                >
                  {/* Escalated sits on top of automated; 2px surface gap between.
                      Both grow from zero on first view, staggered per column. */}
                  <div
                    className="w-full rounded-t-[4px] transition-[height,opacity] duration-[620ms] ease-[var(--ease-out-quint)]"
                    style={{
                      height: inView ? `${(row.escalated / axisMax) * 100}%` : "0%",
                      backgroundColor: SERIES.escalated.colour,
                      opacity: hovered === null || isHovered ? 1 : 0.45,
                      transitionDelay: `${index * 46}ms`,
                    }}
                  />
                  <div
                    className="w-full transition-[height,opacity] duration-[620ms] ease-[var(--ease-out-quint)]"
                    style={{
                      height: inView ? `${(row.automated / axisMax) * 100}%` : "0%",
                      backgroundColor: SERIES.automated.colour,
                      marginTop: 2,
                      opacity: hovered === null || isHovered ? 1 : 0.45,
                      transitionDelay: `${index * 46}ms`,
                    }}
                  />

                  {isHovered ? (
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-[11rem] -translate-x-1/2 rounded-card border border-indigo-line bg-indigo-ink p-3 shadow-float">
                      <p data-numeric className="text-[0.76rem] font-medium text-chrome-paper">
                        {row.week}
                      </p>
                      <dl className="mt-2 flex flex-col gap-1.5">
                        {(["automated", "escalated"] as const).map((key) => (
                          <div key={key} className="flex items-center gap-2">
                            <span
                              aria-hidden
                              className="h-2 w-2 shrink-0 rounded-[2px]"
                              style={{ backgroundColor: SERIES[key].colour }}
                            />
                            <dt className="flex-1 text-[0.72rem] text-chrome-paper/55">
                              {SERIES[key].label}
                            </dt>
                            <dd data-numeric className="text-[0.72rem] text-chrome-paper">
                              {row[key]}
                            </dd>
                          </div>
                        ))}
                        <div className="mt-0.5 flex items-center gap-2 border-t border-indigo-line pt-1.5">
                          <dt className="flex-1 text-[0.72rem] text-chrome-paper/55">Total</dt>
                          <dd data-numeric className="text-[0.72rem] text-chrome-paper">
                            {total}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-2.5 flex gap-[3px] sm:gap-1.5">
            {rows.map((row) => (
              <span
                key={row.week}
                data-numeric
                className="flex-1 text-center text-[0.66rem] text-chrome-paper/35"
              >
                {row.week}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        {(["automated", "escalated"] as const).map((key) => (
          <span key={key} className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{ backgroundColor: SERIES[key].colour }}
            />
            <span className="text-[0.8rem] text-chrome-paper/65">{SERIES[key].label}</span>
          </span>
        ))}
      </div>

      <details className="mt-5">
        <summary className="cursor-pointer text-[0.78rem] text-chrome-paper/45 transition-colors duration-200 hover:text-chrome-paper/75">
          View as table
        </summary>
        <table className="mt-3 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-indigo-line">
              {["Week", "Resolved by Lumi", "Escalated", "Total"].map((heading) => (
                <th key={heading} className="py-2 text-[0.74rem] font-medium text-chrome-paper/55">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.week} className="border-b border-indigo-line/60">
                <td data-numeric className="py-2 text-[0.76rem] text-chrome-paper/75">{row.week}</td>
                <td data-numeric className="py-2 text-[0.76rem] text-chrome-paper/75">{row.automated}</td>
                <td data-numeric className="py-2 text-[0.76rem] text-chrome-paper/75">{row.escalated}</td>
                <td data-numeric className="py-2 text-[0.76rem] text-chrome-paper">
                  {row.automated + row.escalated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
