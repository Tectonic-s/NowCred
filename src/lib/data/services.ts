import type { Service, ServiceGroup } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   What Ippo arranges.

   PLACEHOLDER RATES — every `rateFrom` and every `example` below is invented.
   They drive the representative schedule shown on each page, so they must be
   replaced with rates you can actually evidence before launch.
   ───────────────────────────────────────────────────────────────────────────── */

export const SERVICES: Service[] = [
  {
    slug: 'loan-against-property',
    group: 'Secured',
    name: 'Loan Against Property',
    category: 'Secured',
    shortDesc: 'Borrow against a house, a shop, or a shed you already own.',
    plainEnglish:
      'You keep the property and keep using it. The lender holds the papers until the last line of the schedule is paid.',
    fullDesc:
      'The cheapest large sum most people can raise, because the lender has something to hold. Up to 70% of what a valuer says the property is worth, over terms long enough to keep the monthly figure sensible. Residential, commercial, and industrial property all qualify, and the property can be occupied, rented out, or trading throughout.',
    rateFrom: '10.0%',
    keyFeatures: [
      'Up to 70% of the valued price',
      'Terms to 15 years, so the monthly figure stays low',
      'The property stays yours and stays in use',
    ],
    eligibility: [
      'Salaried or self-employed',
      'Clear, undisputed title in your name',
      'CIBIL 700 or above',
      'Property in a location the lender operates in',
    ],
    documents: [
      'KYC — PAN, Aadhaar, address proof',
      'Two years of filed ITR',
      'Title deed and parent documents',
      'Encumbrance certificate',
      'Latest valuation report',
    ],
    loanRange: '₹10 lakh – ₹25 crore',
    processingTime: '15 – 25 working days',
    example: { amount: 5000000, months: 180, rate: 10.0 },
  },
  {
    slug: 'home-loan',
    group: 'Secured',
    name: 'Home Loan',
    category: 'Property',
    shortDesc: 'Buy a finished home, or draw down in stages while one is built.',
    plainEnglish:
      'For an under-construction home the money arrives in tranches as the building reaches each stage, so you are not paying interest on cash you have not used.',
    fullDesc:
      'Ready-to-move and under-construction both work. On a build, disbursement is tied to milestones the lender inspects — foundation, slab, finishing — which keeps your interest bill matched to actual progress. Terms run long, which is what makes the monthly figure liveable on a large sum.',
    rateFrom: '8.5%',
    keyFeatures: [
      'Milestone-linked disbursement on builds',
      'Terms to 30 years',
      'Joint applications welcome',
    ],
    eligibility: [
      'Salaried or self-employed',
      'Aged 21 – 65 at the end of the term',
      'CIBIL 700 or above',
      'Income steady enough to cover the payment',
    ],
    documents: [
      'KYC — PAN, Aadhaar, address proof',
      'Income proof — salary slips or ITR',
      'Sale agreement and property papers',
      'Approved building plan',
    ],
    loanRange: 'Up to ₹5 crore',
    processingTime: '15 – 20 working days',
    example: { amount: 4000000, months: 240, rate: 8.5 },
  },
  {
    slug: 'personal-loan',
    group: 'Unsecured',
    name: 'Personal Loan',
    category: 'Unsecured',
    shortDesc: 'A fixed sum with nothing pledged against it.',
    plainEnglish:
      'Nothing of yours is held as security, which is why the rate is higher than a property loan. The schedule is short and the last line is close.',
    fullDesc:
      'For a wedding, a medical bill, a deposit, or consolidating three expensive debts into one cheaper one. Light on documents and quick to decide. Because there is no security, the rate reflects your income and your record rather than an asset — so the honest advice is to borrow the smallest sum that solves the problem.',
    rateFrom: '10.5%',
    keyFeatures: [
      'Nothing pledged, nothing at risk but your record',
      'Terms from 12 to 72 months',
      'Decided in days, not weeks',
    ],
    eligibility: [
      'Salaried, or a professional with filed returns',
      'Aged 21 – 60',
      'Net monthly income of ₹30,000 or more',
      'CIBIL 720 or above',
    ],
    documents: [
      'KYC — PAN, Aadhaar, address proof',
      'Three months of salary slips',
      'Form 16 or filed ITR',
      'Six months of salary account statements',
    ],
    loanRange: '₹2 lakh – ₹40 lakh',
    processingTime: '1 – 3 working days',
    example: { amount: 900000, months: 36, rate: 11.9 },
  },
  {
    slug: 'business-loan',
    group: 'Unsecured',
    name: 'Business Loan',
    category: 'Unsecured',
    shortDesc: 'Working funds for a trading or manufacturing business, unsecured.',
    plainEnglish:
      'The business borrows on the strength of its own numbers — turnover, filings, and bank behaviour — rather than on a property.',
    fullDesc:
      'For stock ahead of a season, a bigger order than your cash can cover, or the gap between delivering and being paid. Assessed on GST filings and bank statements rather than a valuer\'s report, which is what makes it quick. Suits MSMEs, traders, and small manufacturers with a few years of filed history.',
    rateFrom: '14.0%',
    keyFeatures: [
      'No property pledged',
      'Assessed on filings and bank conduct',
      'Sanctioned in about a week',
    ],
    eligibility: [
      'Three or more years of business vintage',
      'Annual turnover above ₹50 lakh',
      'GST registered and filing on time',
      'CIBIL 720 or above',
    ],
    documents: [
      'KYC of the promoters',
      'Three years of ITR and audited accounts',
      'Twelve months of bank statements',
      'GST returns for the last year',
    ],
    loanRange: '₹10 lakh – ₹1 crore',
    processingTime: '3 – 7 working days',
    example: { amount: 2500000, months: 48, rate: 14.0 },
  },
  {
    slug: 'balance-transfer',
    group: 'Secured',
    name: 'Balance Transfer',
    category: 'Refinancing',
    shortDesc: 'Move an existing loan somewhere cheaper.',
    plainEnglish:
      'We put your current rate beside what the rest of the market would offer you today, in rupees, and you decide whether moving is worth the paperwork.',
    fullDesc:
      'Rates you agreed to three years ago are rarely the rates you would get now. We benchmark the loan you hold against our full panel and show the difference as a total, not a percentage — because a rate cut only matters if it beats the switching costs. A top-up on the new loan is usually available at the same time.',
    rateFrom: '8.75%',
    keyFeatures: [
      'Benchmarked against the full lender panel',
      'The saving shown in rupees, after switching costs',
      'Top-up available alongside the transfer',
    ],
    eligibility: [
      'Existing loan running twelve months or more',
      'Clean repayment record throughout',
      'CIBIL 700 or above',
    ],
    documents: [
      'Current loan statement and sanction letter',
      'Property papers, if the loan is secured',
      'Six months of bank statements',
      'KYC — PAN, Aadhaar, address proof',
    ],
    loanRange: 'Matched to the loan being moved',
    processingTime: '10 – 18 working days',
    example: { amount: 3000000, months: 120, rate: 8.75 },
  },
  {
    slug: 'machinery-loan',
    group: 'Secured',
    name: 'Machinery Loan',
    category: 'Equipment',
    shortDesc: 'Buy plant and equipment without draining working capital.',
    plainEnglish:
      'The machine itself is the security, so the rate sits below an unsecured business loan and your cash stays where it is.',
    fullDesc:
      'New or imported — manufacturing, medical, printing, packaging. Repayment can be structured around your production cycle rather than a flat calendar, which matters when your revenue is seasonal. The machine secures the loan, so you are not pledging a property to buy a lathe.',
    rateFrom: '11.0%',
    keyFeatures: [
      'New and imported equipment',
      'Repayment shaped to your production cycle',
      'Secured on the machine, not your property',
    ],
    eligibility: [
      'Two or more years in manufacturing or allied trade',
      'Profitable for the last two years',
      'CIBIL 700 or above',
      'A firm quotation from the vendor',
    ],
    documents: [
      'KYC of the entity and its partners',
      'Audited financials for two years',
      'Twelve months of bank statements',
      'Vendor quotation or proforma invoice',
    ],
    loanRange: '₹10 lakh – ₹15 crore',
    processingTime: '7 – 12 working days',
    example: { amount: 6000000, months: 60, rate: 11.0 },
  },
  {
    slug: 'commercial-vehicle-loan',
    group: 'Secured',
    name: 'Commercial Vehicle Loan',
    category: 'Vehicles',
    shortDesc: 'Trucks, buses, tippers, and light commercial vehicles.',
    plainEnglish:
      'One vehicle or twenty. The schedule can be built around the contract the vehicle is running, rather than a flat monthly figure.',
    fullDesc:
      'For transport operators, contractors, and businesses running their own fleet. First vehicle, replacement, or expansion — the vehicle secures the loan and the repayment can be structured against the route or contract it is earning on.',
    rateFrom: '9.5%',
    keyFeatures: [
      'Single vehicle or a full fleet',
      'Repayment structured against the contract',
      'New and used both funded',
    ],
    eligibility: [
      'Two or more years in transport or own-fleet operation',
      'Details of any existing fleet',
      'CIBIL 680 or above',
      'Valid commercial licence and permits',
    ],
    documents: [
      'KYC — PAN, Aadhaar, address proof',
      'Three years of ITR on higher-value cases',
      'Twelve months of bank statements',
      'Vehicle invoice and registration papers',
    ],
    loanRange: '₹5 lakh – ₹5 crore',
    processingTime: '5 – 8 working days',
    example: { amount: 1800000, months: 48, rate: 9.5 },
  },
  {
    slug: 'auto-loan',
    group: 'Secured',
    name: 'Auto Loan',
    category: 'Vehicles',
    shortDesc: 'A car, new or used, funded up to the full on-road price.',
    plainEnglish:
      'The on-road price includes registration and insurance, not just the showroom figure — we quote against the number you actually have to pay.',
    fullDesc:
      'New or pre-owned. Funding runs to the full on-road cost on strong profiles, which means no down payment, though putting something down lowers what the loan costs you overall. We will show you both schedules side by side before you choose.',
    rateFrom: '8.75%',
    keyFeatures: [
      'New and pre-owned both funded',
      'Up to 100% of the on-road price',
      'Terms from 12 to 84 months',
    ],
    eligibility: [
      'Salaried or self-employed',
      'Aged 21 – 65',
      'Income of ₹3.6 lakh a year or more',
      'CIBIL 700 or above',
    ],
    documents: [
      'KYC — PAN, Aadhaar, address proof',
      'Income proof — salary slips or ITR',
      'Six months of bank statements',
      'Proforma invoice from the dealer',
    ],
    loanRange: '₹5 lakh – ₹2 crore',
    processingTime: '2 – 4 working days',
    example: { amount: 1200000, months: 60, rate: 8.75 },
  },
  {
    slug: 'cash-credit',
    group: 'Secured',
    name: 'Cash Credit',
    category: 'Working capital',
    shortDesc: 'A limit you draw against as you need it, secured on stock and receivables.',
    plainEnglish:
      'Interest is charged only on what you have actually drawn, and only for the days it is out. Leave the limit untouched and it costs you nothing but the renewal.',
    fullDesc:
      'The standard facility for a business whose money is tied up in stock and unpaid invoices. The limit is set against those, reviewed annually, and drawn and repaid as often as you like within the year. Best suited to businesses with a genuine trading cycle rather than a one-off need.',
    rateFrom: '10.5%',
    keyFeatures: [
      'Interest on the drawn balance only, by the day',
      'Draw and repay as often as you need',
      'Limit reviewed and renewed each year',
    ],
    eligibility: [
      'Two or more years of business vintage',
      'Annual turnover above ₹30 lakh',
      'CIBIL 700 or above',
      'Stock and receivables to secure the limit',
    ],
    documents: [
      'KYC of the entity and its promoters',
      'Two years of filed ITR',
      'Twelve months of bank statements',
      'Stock and debtor statements',
    ],
    loanRange: '₹5 lakh upward',
    processingTime: '7 – 12 working days',
    example: null,
  },
  {
    slug: 'dropline-overdraft',
    group: 'Secured',
    name: 'Dropline Overdraft',
    category: 'Working capital',
    shortDesc: 'An overdraft whose limit steps down on a set schedule.',
    plainEnglish:
      'It behaves like an overdraft but ends like a loan: the ceiling drops a little every month, so the facility closes itself instead of rolling on forever.',
    fullDesc:
      'For businesses that want the flexibility of an overdraft with the discipline of a term loan. You draw what you need up to the limit, and the limit reduces on a pre-set monthly schedule until it reaches zero. Property is usually required as security.',
    rateFrom: '11.0%',
    keyFeatures: [
      'Limit reduces monthly on a fixed schedule',
      'Draw and repay freely below the limit',
      'Ends on a known date',
    ],
    eligibility: [
      'Two or more years of business vintage',
      'Annual turnover above ₹30 lakh',
      'CIBIL 700 or above',
      'Property available as security',
    ],
    documents: [
      'KYC of the entity and its promoters',
      'Two years of filed ITR',
      'Twelve months of bank statements',
      'Property title documents',
    ],
    loanRange: '₹25 lakh – ₹5 crore',
    processingTime: '10 – 15 working days',
    example: null,
  },
  {
    slug: 'letter-of-credit',
    group: 'Secured',
    name: 'Letter of Credit',
    category: 'Trade',
    shortDesc: 'A bank standing behind your payment so a supplier will ship.',
    plainEnglish:
      'Your bank promises the supplier they will be paid once they prove they shipped what they agreed to. You pay a commission for that promise, not interest.',
    fullDesc:
      'For importers and domestic traders dealing with a supplier who does not yet know them. The bank\'s undertaking replaces the trust that has not been built, and the payment terms it buys you improve your working capital cycle. Priced as a commission on the value, not as a rate.',
    rateFrom: 'Commission-based',
    keyFeatures: [
      'The bank\'s promise instead of an advance payment',
      'Better terms from suppliers who do not know you',
      'Priced as commission, not interest',
    ],
    eligibility: [
      'Import, export, or domestic trading business',
      'An established banking relationship',
      'Security against the facility',
      'CIBIL 700 or above',
    ],
    documents: [
      'KYC of the entity and its promoters',
      'Purchase order and trade documents',
      'Twelve months of bank statements',
      'Security or collateral documents',
    ],
    loanRange: 'Set against the trade',
    processingTime: '5 – 10 working days',
    example: null,
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   Grouping for the solutions page.

   Secured first because it is where most of the value sits for the customer —
   the cheapest money available to them is almost always money lent against
   something they already own, and that is the point an adviser makes early.
   ───────────────────────────────────────────────────────────────────────────── */
export const GROUP_ORDER: ServiceGroup[] = ['Secured', 'Unsecured']

export const GROUP_COPY: Record<ServiceGroup, { blurb: string; caption: string }> = {
  Secured: {
    blurb:
      'Money lent against something you already own — a house, a shop, a machine, a vehicle. The lender has an asset to fall back on, so the rate is lower and the term can run longer.',
    caption: 'Backed by an asset',
  },
  Unsecured: {
    blurb:
      'Nothing of yours is pledged. The lender is relying on your income, your record, and your business’s numbers, which is why the rate is higher and the term is shorter.',
    caption: 'Backed by your profile',
  },
}

export const servicesByGroup = (group: ServiceGroup) =>
  SERVICES.filter((s) => s.group === group)

export const CATEGORY_ORDER = [
  'Secured',
  'Property',
  'Unsecured',
  'Refinancing',
  'Equipment',
  'Vehicles',
  'Working capital',
  'Trade',
]

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)

/* ─────────────────────────────────────────────────────────────────────────────
   Service → enquiry-form requirement.

   The form asks a short, customer-language question ("what you need") rather
   than naming all eleven products, so a "talk to us about this" link from a
   product page has to be translated into one of those options. Without this
   the select receives a value it has no option for and silently renders blank.
   ───────────────────────────────────────────────────────────────────────────── */
const REQUIREMENT_BY_SLUG: Record<string, string> = {
  'home-loan': 'Home loan',
  'loan-against-property': 'Loan against property',
  'personal-loan': 'Personal loan',
  'business-loan': 'Business loan',
  'balance-transfer': 'Refinancing an existing loan',
  'machinery-loan': 'Vehicle or machinery',
  'commercial-vehicle-loan': 'Vehicle or machinery',
  'auto-loan': 'Vehicle or machinery',
  'cash-credit': 'Working capital',
  'dropline-overdraft': 'Working capital',
  'letter-of-credit': 'Working capital',
}

export const requirementForSlug = (slug: string) =>
  REQUIREMENT_BY_SLUG[slug] ?? 'Not sure — I would like advice'

