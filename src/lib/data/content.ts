/* ─────────────────────────────────────────────────────────────────────────────
   Company facts.

   PLACEHOLDER — every value marked TODO below is invented. Replace with the
   real registration, addresses, and contact details before this site goes
   anywhere near the public.

   A note on what this file deliberately no longer contains: there is no
   representative APR and no "rates from" headline figure. Ippo Loan is an
   advisory and facilitation business, not a lender. A representative APR is a
   lender's disclosure, and publishing one implies both that we set the price
   and that we can promise it. We can do neither. Indicative rates still appear
   on individual service pages, attributed to the lending market rather than
   to us.
   ───────────────────────────────────────────────────────────────────────────── */

export const SITE = {
  /* Two names, used in different places on purpose.

     `brand` is what the company is called out loud — it goes in the wordmark,
     the headings, and the body copy. `legalName` is the registered entity and
     belongs only where it legally must: the regulatory footnote, the terms,
     the privacy policy, and anything a regulator or a court would read.
     Mixing them up makes marketing copy read like a contract. */
  brand: 'NowCred',
  legalName: 'NowCred Finserv',
  shortName: 'NowCred',

  wordmark: { primary: 'Now', secondary: 'Cred' },
  tagline: 'Credit, right now.',

  meaning: 'NowCred — credit when you need it.',

  /* The single most important number on the site. Given by the founders. */
  experienceYears: '25+',

  phone: '+91 00000 00000',            // TODO
  whatsapp: '+91 00000 00000',         // TODO
  email: 'customersupport@nowcred.in', // TODO
  hours: 'Mon – Sat · 9 AM – 7 PM',
  responseTime: '2 business hours',

  cin: 'TODO-CIN-NUMBER',              // TODO
  founded: '2026',

  /* Launch region. Tamil Nadu first, South India next — stated plainly rather
     than implying a national footprint we do not have. */
  region: {
    primary: 'Tamil Nadu',
    statement:
      'Serving customers across Tamil Nadu, with plans to expand across South India.',
    /* Seed list for the future /locations/[city] pages. Adding a city here
       should be most of what it takes once those pages exist. */
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode'],
  },

  offices: [
    { city: 'Chennai', area: 'TODO — area', pincode: 'TODO', hq: true },     // TODO
    { city: 'Coimbatore', area: 'TODO — area', pincode: 'TODO', hq: false }, // TODO
  ],

  /* What we charge the customer.

     Kept from the previous build because it is the most trust-bearing thing on
     the site and it survives the repositioning intact — an adviser paid by the
     lender has a conflict of interest, and the answer to a conflict is to
     disclose it plainly, not to leave it out. */
  fees: [
    { what: 'Our advice and guidance', note: 'You pay us nothing. We are paid by the lender on completion, and we tell you which lender and how much before you commit.', cost: '₹0' },
    { what: 'Reviewing your financial profile', note: 'Income, cash flow, obligations, and what you are trying to fund — assessed before we approach anyone on your behalf.', cost: '₹0' },
    { what: 'Documentation support', note: 'Assembling the file, checking it before submission, and following it through the lender\'s process.', cost: '₹0' },
    { what: 'A second opinion on an offer', note: 'Including an offer you were given elsewhere, and including the answer that you should take it.', cost: '₹0' },
    { what: 'Lender processing fees', note: 'Charged by the lender, not by us. Stated in rupees before you proceed, never deducted as a surprise.', cost: 'As quoted' },
    { what: 'Statutory and valuation charges', note: 'Stamp duty, valuation, and legal charges where a facility requires them. Passed through at cost.', cost: 'At cost' },
  ],

  /* Lender panel. Names are placeholders until the tie-ups are signed — naming
     an institution you have no arrangement with is a real problem, and it is
     the most tempting thing to fake on a page like this. */
  lenders: {
    banks: ['TODO Bank 1', 'TODO Bank 2', 'TODO Bank 3', 'TODO Bank 4', 'TODO Bank 5', 'TODO Bank 6'],
    nbfcs: ['TODO NBFC 1', 'TODO NBFC 2', 'TODO NBFC 3', 'TODO NBFC 4', 'TODO NBFC 5', 'TODO NBFC 6'],
  },
} as const

/* ─────────────────────────────────────────────────────────────────────────────
   Trust indicators — the section directly beneath the hero.

   Deliberately not five large numbers. There is exactly one number here that
   can be stood behind (the 25 years), and inventing four more to fill a row of
   stat tiles is how a trust section stops building trust. Each item gets a
   label, a claim, and a sentence that earns the claim.
   ───────────────────────────────────────────────────────────────────────────── */
export const TRUST = [
  {
    label: 'Experience',
    title: `${SITE.experienceYears} years in financial services`,
    note: 'Spent inside banks and financial institutions, on the side of the desk that reads the file and decides. We know how yours will be read.',
  },
  {
    label: 'Access',
    title: 'Multiple banking and financial partners',
    note: 'Banks and NBFCs, each with a different appetite. A single institution can only offer you what it happens to sell.',
  },
  {
    label: 'Guidance',
    title: 'Expert financial guidance',
    note: 'A recommendation shaped to your income, your obligations, and what you are funding — not to whatever is easiest to place.',
  },
  {
    label: 'Transparency',
    title: 'A process you can see',
    note: 'What we are paid, who pays it, and where your file stands. Told to you before you commit, not after.',
  },
  {
    label: 'Relationship',
    title: 'Long-term customer relationships',
    note: 'Most of this work comes from people advised years ago. That only happens if the first piece of advice was honest.',
  },
] as const

/* ─────────────────────────────────────────────────────────────────────────────
   Why a single bank is the wrong place to start.
   ───────────────────────────────────────────────────────────────────────────── */
export const WHY_POINTS = [
  {
    title: 'More than one lender considered',
    note: 'Banks and NBFCs each set their own criteria. A profile one declines can be routine for another — but you would never learn that from the one that declined you.',
  },
  {
    title: 'Recommendations specific to you',
    note: 'Income, cash flow, existing obligations, security available, and how quickly the money is needed. Change any one of them and the right answer changes.',
  },
  {
    title: 'Guidance from people who have done it',
    note: 'Twenty-five years of watching which files get sanctioned and which get stuck, applied to yours before it is submitted anywhere.',
  },
  {
    title: 'Documentation support throughout',
    note: 'Many rejections are avoidable — a missing paper, an inconsistency between two documents, a valuation nobody chased. We assemble the file properly.',
  },
  {
    title: 'Transparent communication',
    note: 'Where your file stands, what happens next, and what it will cost. Including when the honest answer is to wait, or not to borrow at all.',
  },
] as const

/* ─────────────────────────────────────────────────────────────────────────────
   The customer journey.

   Numbered because it genuinely is a sequence — a file moves through these in
   order, and the order carries information the reader needs. This is the only
   place on the site where numbered markers are warranted.
   ───────────────────────────────────────────────────────────────────────────── */
export const JOURNEY = [
  {
    title: 'Understand your requirement',
    note: 'What the money is for, how much, and by when. A conversation rather than a form — the requirement people arrive with is often not the one they leave with.',
  },
  {
    title: 'Analyse your financial profile',
    note: 'Income and how steady it is, cash flow, existing obligations, credit record, and what security is available. This is the step that decides everything after it.',
  },
  {
    title: 'Identify suitable solutions',
    note: 'We match the profile against the partners whose criteria it actually fits, and put the realistic options in front of you with the trade-offs stated.',
  },
  {
    title: 'Support documentation and processing',
    note: 'We assemble the file, check it before it goes in, and follow it through the lender\'s process — chasing valuation, legal, and sanction on your behalf.',
  },
  {
    title: 'Continue supporting your financial journey',
    note: 'Rates move, businesses grow, and obligations end. We stay reachable afterwards — for the refinance, the next facility, or a question about someone else\'s offer.',
  },
] as const

/* ─────────────────────────────────────────────────────────────────────────────
   Solutions on the roadmap. Shown as "in development" so the ambition is
   visible without implying we can place them today.
   ───────────────────────────────────────────────────────────────────────────── */
export const FUTURE_SOLUTIONS = [
  {
    name: 'Insurance',
    note: 'Life, health, and cover for the assets a facility is secured against — advised alongside the borrowing rather than sold on afterwards.',
  },
  {
    name: 'Investments',
    note: 'The other half of a financial plan. Where the surplus goes once the borrowing has been structured properly.',
  },
] as const

export const NAV_LINKS = [
  { href: '/services', label: 'Solutions' },
  { href: '/about', label: 'About' },
  { href: '/partners', label: 'Partners' },
]

/* ─────────────────────────────────────────────────────────────────────────────
   Form vocabulary — kept in one place because the enquiry form, the portal
   filter, and the Excel export all have to agree on the exact strings.
   ───────────────────────────────────────────────────────────────────────────── */

/* Deliberately short, and in customer language rather than product language.
   The full facility list lives on the services pages; asking a first-time
   visitor to choose between eleven products is asking them to do the adviser's
   job before the adviser has spoken to them. */
export const REQUIREMENT_TYPES = [
  'Home loan',
  'Loan against property',
  'Personal loan',
  'Business loan',
  'Working capital',
  'Vehicle or machinery',
  'Refinancing an existing loan',
  'Insurance or investments',
  'Not sure — I would like advice',
]

export const AMOUNT_RANGES = [
  'Under ₹25 lakh',
  '₹25 lakh – ₹1 crore',
  '₹1 – 5 crore',
  '₹5 – 25 crore',
  'Over ₹25 crore',
]

/* Retained for the portal and the export: leads captured before the form was
   simplified still carry a business type, and those columns must keep
   rendering for the people working the older records. */
export const BUSINESS_TYPES = [
  'Salaried',
  'Self-employed professional',
  'Proprietorship',
  'Partnership',
  'Private Limited',
  'LLP',
]

export const LEAD_STATUSES = ['New', 'Contacted', 'In Progress', 'Closed'] as const
