import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/20 px-4 py-10 text-sm">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
        <p>© {new Date().getFullYear()} RupeeOrbit India. Affiliate links may earn commissions.</p>
        <div className="flex flex-wrap gap-3 sm:justify-end">
          <Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/disclaimer">Disclaimer</Link>
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link><Link href="/editorial-policy">Editorial Policy</Link>
        </div>
      </div>
    </footer>
  );
}
