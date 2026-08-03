/* ─────────────────────────────────────────────────────────────────────────────
   Company facts.

   PLACEHOLDER — every value marked TODO below is invented. Replace with the
   real registration, addresses, and contact details before this site goes
   anywhere near the public. The regulatory strings in particular (CIN, the
   representative APR, the "at least 51%" line) are governed copy: they must
   match what you are actually registered to say.
   ───────────────────────────────────────────────────────────────────────────── */

export const SITE = {
  /* Two names, used in different places on purpose.

     `brand` is what the company is called out loud — it goes in the wordmark,
     the headings, and the body copy. `legalName` is the registered entity and
     belongs only where it legally must: the regulatory footnote, the terms,
     the privacy policy, and anything a regulator or a court would read.
     Mixing them up makes marketing copy read like a contract. */
  brand: 'Ippo Loan',
  legalName: 'Ippo Loan Finserv',
  /* Shortest form, for conversational copy: "happy for Ippo to call me". */
  shortName: 'Ippo',

  /* The lockup: "Ippo" in the display serif, "Loan" set small in mono caps
     beside it. */
  wordmark: { primary: 'Ippo', secondary: 'Loan' },
  tagline: 'One step at a time',

  /* "Ippo" (一歩) means "one step". The whole brand hangs off this: one step,
     one schedule, one number you can see the end of. */
  meaning: 'Ippo means one step.',

  phone: '+91 00000 00000',            // TODO
  whatsapp: '+91 00000 00000',         // TODO
  email: 'hello@ippofinserv.in',       // TODO
  hours: 'Mon – Sat · 9 AM – 7 PM',
  responseTime: '2 business hours',

  cin: 'TODO-CIN-NUMBER',              // TODO
  founded: '2026',

  offices: [
    { city: 'Chennai', area: 'TODO — area', pincode: 'TODO', hq: true },   // TODO
    { city: 'Coimbatore', area: 'TODO — area', pincode: 'TODO', hq: false }, // TODO
  ],

  /* Shown on the home page. Keep these honest — they are the easiest thing on
     a lending site to get into trouble over. */
  facts: [
    { figure: '11.9%', label: 'Representative APR', note: 'Fixed for the full term on a ₹9,00,000 loan over 36 months. Your rate depends on your profile.' },
    { figure: '₹0', label: 'To settle early', note: 'In part or in full, on any day of the term. No exit fee and no interest penalty.' },
    { figure: '2 min', label: 'To see your real rate', note: 'A soft search that other lenders cannot see on your credit file.' },
  ],

  /* The full fee schedule. Every charge the customer can incur belongs here —
     the site claims this is the complete list, so it has to be. */
  fees: [
    { what: 'Arranging the loan', note: 'No fee to you. We are paid by the lender on completion, and we tell you which lender and how much.', cost: '₹0' },
    { what: 'Settling early', note: 'In part or in full, on any day — you pay interest only up to that day.', cost: '₹0' },
    { what: 'Moving your payment date', note: 'Once in any twelve months, to any date that suits your salary or billing cycle.', cost: '₹0' },
    { what: 'Statements by post', note: 'Sent every quarter if you would rather not read them on a screen.', cost: '₹0' },
    { what: 'A missed payment', note: 'Charged once, not daily. Call us before the date and we will usually waive it.', cost: '₹500' },
    { what: 'The interest rate, mid-term', note: 'Fixed on the day you sign, for every month of the term.', cost: 'Unchanged' },
  ],

  /* Lender panel. Names are placeholders until the tie-ups are signed —
     naming a lender you do not have an arrangement with is a real problem. */
  lenders: {
    banks: ['TODO Bank 1', 'TODO Bank 2', 'TODO Bank 3', 'TODO Bank 4', 'TODO Bank 5', 'TODO Bank 6'],
    nbfcs: ['TODO NBFC 1', 'TODO NBFC 2', 'TODO NBFC 3', 'TODO NBFC 4', 'TODO NBFC 5', 'TODO NBFC 6'],
  },
} as const

export const NAV_LINKS = [
  { href: '/services', label: 'What we arrange' },
  { href: '/partners', label: 'Lenders' },
  { href: '/about', label: 'About' },
]

/* Form vocabulary — kept in one place because the enquiry form, the portal
   filter, and the Excel export all have to agree on the exact strings. */
export const BUSINESS_TYPES = [
  'Salaried',
  'Self-employed professional',
  'Proprietorship',
  'Partnership',
  'Private Limited',
  'LLP',
]

export const AMOUNT_RANGES = [
  'Under ₹25 lakh',
  '₹25 lakh – ₹1 crore',
  '₹1 – 5 crore',
  '₹5 – 25 crore',
  'Over ₹25 crore',
]

export const LEAD_STATUSES = ['New', 'Contacted', 'In Progress', 'Closed'] as const
