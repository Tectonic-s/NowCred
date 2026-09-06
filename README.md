# NowCred

A loan advisory and facilitation platform. NowCred helps customers find the right financial solution from leading banks and NBFCs — based on their profile, not a catalogue.

Next.js 14 (App Router) · TypeScript · Prisma · PostgreSQL · NextAuth · Resend.

---

## What's in here

**Public site**

| Route | What it is |
| --- | --- |
| `/` | Landing page. Full-bleed hero, product quick-access strip, trust indicators, video section, why-not-one-bank, journey, solutions, fees, CTA. |
| `/services` | All facilities grouped by category, with a video section and image placeholders. |
| `/services/[slug]` | One facility: plain-English summary, eligibility, documents, worked amortisation schedule. |
| `/about` | Founding story, beliefs, fees disclosure, process, offices. |
| `/partners` | The lender panel — banks and NBFCs listed by name. |
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

## Assets

Stock images and videos go in `public/images/` and `public/videos/`. Each
subfolder has a `README.md` listing which placeholder it maps to and the
suggested filename.

| Folder | Used on |
| --- | --- |
| `public/images/home/` | Home page sections |
| `public/images/about/` | About page (also used in hero) |
| `public/images/services/` | Services pages |
| `public/images/partners/` | Partners page |
| `public/videos/` | Video band sections |

The favicon (`src/app/icon.png`) is the NC monogram mark.

---

## Design

The design language is documented in the token block at the top of
`src/app/globals.css`. Brand palette: navy `#00226D`, red `#F9002D`.

Components only ever reference tokens, never raw hex, so retheming is a single
block. Both light and dark modes are first-class.

Type is a transitional serif for display, a humanist sans for body, and a
monospace for every figure. Figures use `tabular-nums` everywhere they line up
in a column.

House rules, if you're extending it:

- Hairlines, not cards. No shadows, no gradients, no glassmorphism.
- Motion is one settle on load and hover states. Nothing scroll-triggered.
- Money is formatted through `src/lib/loan.ts`. Don't hand-roll it.
- Structural devices encode something true. Don't number things that aren't a sequence.

---

## The schedule

`src/lib/loan.ts` is the only place amortisation is calculated. Standard
annuity: `pmt = P · r / (1 − (1 + r)^−n)`, interest accrued monthly on the
outstanding balance, final instalment adjusted so the closing balance lands on
exactly zero.

Rates shown on service pages are representative examples, labelled as such.
Replace with real figures before going live — lending disclosures are regulated copy.
