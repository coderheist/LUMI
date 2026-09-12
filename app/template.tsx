/**
 * Remounts on every navigation, which gives each route a short entrance
 * without reaching for an experimental router flag.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
