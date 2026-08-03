# Ippo Loan Finserv

A loan aggregator site. *Ippo* (一歩) means "one step" — the product promise is that
you see the whole repayment schedule, down to the last line, before you sign.

Next.js 14 (App Router) · TypeScript · Prisma · PostgreSQL · NextAuth · Resend.

---

## What's in here

**Public site**

| Route | What it is |
| --- | --- |
| `/` | Landing page. Hero carries a live amortising schedule. |
| `/services` | The facilities we arrange, grouped by category. |
| `/services/[slug]` | One facility: rates, eligibility, documents, timeline. |
| `/about` | Who we are. |
| `/partners` | The lender panel. |
| `/enquiry` | The enquiry form — the only conversion point on the site. |
| `/thank-you` | Confirmation, shows the reference ID. |
| `/privacy`, `/terms` | Legal. |

**Portal** — `/ippo-portal`, credentials login, IP-allowlisted at the edge.
Lead list with search, status filter and pagination; status and notes are
editable inline; soft-delete is gated behind a passphrase; export to `.xlsx`.

**API**

| Route | Method | Notes |
| --- | --- | --- |
| `/api/enquiry` | `POST` | Public. Rate-limited to 5/min per IP. Writes the lead, then fires both emails. |
| `/api/admin/leads` | `GET`, `PATCH` | Session-guarded. |
| `/api/admin/leads/export` | `GET` | Session-guarded. Streams an Excel workbook. |
| `/api/auth/[...nextauth]` | — | NextAuth credentials provider. |

---

## Running it

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run db:push              # create the tables
npm run db:seed-admin        # create the first portal login
npm run dev                  # http://localhost:5040
```

Every variable is documented in `.env.example`. Nothing has a default that
works in production — the app is meant to fail loudly rather than run
half-configured.

The site renders and navigates without `DATABASE_URL`, because the marketing
pages read from `src/lib/data/`. Anything that touches a lead — submitting the
enquiry form, the portal, the export — needs the database.

---

## Design

The design language is deliberate and documented in one place: the token block
at the top of `src/app/globals.css`. Four colours, taken from a fixed palette:

```
#222831   #393e46   #948979   #dfd3b8
```

Components only ever reference tokens, never raw hex, so retheming is a single
block. Both light and dark are first-class — dark is not an inversion, it's a
second set of token values.

Type is a transitional serif for display, a humanist sans for body, and a
monospace for every figure on the site. Figures use `tabular-nums` everywhere
they line up in a column, which is most places.

House rules, if you're extending it:

- Hairlines, not cards. No shadows, no gradients, no glassmorphism.
- Motion is one settle on load and hover states. Nothing scroll-triggered.
- Money is formatted through `src/lib/loan.ts`. Don't hand-roll it.
- Structural devices encode something true. Don't number things that aren't a
  sequence.

---

## The schedule

`src/lib/loan.ts` is the only place amortisation is calculated. It's a standard
annuity: `pmt = P · r / (1 − (1 + r)^−n)`, interest accrued monthly on the
outstanding balance, with the final instalment adjusted to absorb rounding so
the closing balance lands on exactly zero.

That last property is load-bearing. The whole page is built on the claim that
the last line is zero, so if you change this file, keep it true.

Rates shown across the site are a representative example and are labelled as
such. Replace them with real figures before this goes near the public — lending
disclosures are regulated copy.
