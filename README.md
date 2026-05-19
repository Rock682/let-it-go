# RupeeOrbit India (Next.js 15 Finance Affiliate Platform)

SEO-first, AdSense-friendly, India-focused finance affiliate website scaffold.

## Stack
- Next.js 15 + TypeScript + Tailwind CSS
- Supabase-ready backend structure
- Vercel deployment compatible

## Core modules delivered
- Homepage with offers, calculators, blog links
- Comparison-ready routing and legal pages
- Affiliate redirection endpoint with UTM-ready targets
- SEO setup: metadata, OpenGraph, robots, sitemap, JSON-LD
- Calculator engine sample (EMI)
- Admin API overview starter
- Newsletter subscription API starter

## Database schema (Supabase suggestion)
Use a migration like below for production:

```sql
create table affiliate_offers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  network text not null,
  destination_url text not null,
  category text not null,
  rating numeric(2,1),
  created_at timestamptz default now()
);

create table affiliate_clicks (
  id bigserial primary key,
  offer_slug text not null,
  utm_source text,
  utm_medium text,
  created_at timestamptz default now()
);
```

## Environment variables
- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Deployment
1. Push to GitHub.
2. Import to Vercel.
3. Set environment variables.
4. Run Supabase migrations.
5. Add affiliate destinations and content via admin modules.
