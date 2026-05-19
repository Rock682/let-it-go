import Link from "next/link";
import { topOffers, samplePosts } from "@/lib/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/seo/schema";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <JsonLd data={organizationSchema} />
      <section className="rounded-3xl border border-white/20 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 p-8">
        <p className="text-xs uppercase tracking-wide">India-first finance comparisons</p>
        <h1 className="mt-2 text-4xl font-bold">Compare smarter. Save more. Grow wealth with confidence.</h1>
        <p className="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">RupeeOrbit helps students, salaried users and business owners discover top credit cards, loans, insurance and investing tools.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Trending Finance Offers</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {topOffers.map((offer) => (
            <article key={offer.id} className="rounded-2xl border p-4 shadow-sm">
              <p className="text-xs text-emerald-600">{offer.badge}</p>
              <h3 className="mt-1 text-lg font-semibold">{offer.name}</h3>
              <p className="text-sm">Rating: {offer.rating}/5</p>
              <Link href={offer.cta} className="mt-3 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white">Check Offer</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold">Top Calculators</h2>
          <ul className="mt-3 list-disc pl-6 text-sm"><li>EMI</li><li>SIP</li><li>FD</li><li>Tax</li></ul>
          <Link href="/calculators" className="mt-4 inline-block text-blue-600">Explore calculators →</Link>
        </div>
        <div className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold">Latest Guides</h2>
          <ul className="mt-3 space-y-2">
            {samplePosts.map((post) => <li key={post.slug}><Link href={`/blog/${post.slug}`}>{post.title}</Link></li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
