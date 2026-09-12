/**
 * Route loading state. Every page here is statically prerendered so this
 * rarely appears, but a template should not leave the slot empty.
 */
export default function Loading() {
  return (
    <div className="shell pt-32 pb-24 md:pt-40" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>

      <div className="h-3 w-28 rounded-full bg-line" />
      <div className="mt-7 flex flex-col gap-3">
        <div className="h-10 w-[min(34rem,90%)] rounded-chip bg-line md:h-14" />
        <div className="h-10 w-[min(26rem,75%)] rounded-chip bg-line md:h-14" />
      </div>
      <div className="mt-8 flex flex-col gap-2.5">
        <div className="h-3.5 w-[min(30rem,85%)] rounded-full bg-line" />
        <div className="h-3.5 w-[min(24rem,70%)] rounded-full bg-line" />
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="rounded-panel border border-line p-5">
            <div className="aspect-[4/3] w-full rounded-card bg-line" />
            <div className="mt-4 h-3.5 w-3/4 rounded-full bg-line" />
            <div className="mt-2.5 h-3.5 w-1/2 rounded-full bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
