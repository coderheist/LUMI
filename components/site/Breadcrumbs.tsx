import Link from "next/link";

export type Crumb = { label: string; href?: string };

/**
 * The last item has no href — it's the page you're on, not a link to it.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[0.82rem] text-ink-soft">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden className="text-ink-faint">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors duration-200 hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
