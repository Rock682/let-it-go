# Let It Go

A quiet anonymous ritual that asks one question: “What is your biggest mistake?”

The submitted text is validated, stored without identity metadata, and rendered as a temporary visible star. Mistake rows remain permanent in Supabase PostgreSQL while the universe only queries stars whose `visible_until` timestamp is still in the future.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

- `SUPABASE_URL` — Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only key used by API routes.
- `STRIPE_SECRET_KEY` — server-only Stripe key for checkout sessions.
- `NEXT_PUBLIC_SITE_URL` — canonical site URL for Stripe redirects.

## Database

Apply `supabase/migrations/001_create_mistakes.sql` to create the required table and index.

Only these fields are stored:

- `text`
- `created_at`
- `visible_until`

No IP addresses, user agents, device information, accounts, analytics, cookies, or personal identifiers are collected by the application code.
