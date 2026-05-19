import Link from "next/link";

const links = ["blog", "calculators", "comparisons", "reviews", "about", "contact"];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/20 bg-white/80 backdrop-blur dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">RupeeOrbit India</Link>
        <nav className="flex gap-4 text-sm capitalize">
          {links.map((link) => (
            <Link key={link} href={`/${link}`}>{link}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
