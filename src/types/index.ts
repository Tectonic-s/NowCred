export interface ServiceExample {
  /** Principal in rupees. */
  amount: number
  /** Term in months. */
  months: number
  /** Annual rate as a percentage, e.g. 11.9 */
  rate: number
}

/* The split customers actually feel: is an asset pledged, or is the lender
   relying on your profile? It changes the rate, the paperwork, and the risk,
   so it is the top-level grouping on the solutions page. `category` stays as
   the finer label underneath. */
export type ServiceGroup = 'Secured' | 'Unsecured'

export interface Service {
  slug: string
  name: string
  group: ServiceGroup
  category: string
  shortDesc: string
  /** The one-line translation out of lending vocabulary. Carries the brand. */
  plainEnglish: string
  fullDesc: string
  rateFrom: string
  keyFeatures: string[]
  eligibility: string[]
  documents: string[]
  loanRange: string
  processingTime: string
  /** Null for revolving facilities, which have no fixed schedule to show. */
  example: ServiceExample | null
}

export interface Lead {
  id: number
  referenceId: string
  createdAt: string
  updatedAt: string
  name: string
  phone: string
  city: string
  facility: string
  loanAmount: string
  /* Nullable: the first-contact form no longer requires these. They are filled
     in by an adviser after the call, or carried by leads captured under the
     older, longer form. */
  email: string | null
  businessType: string | null
  turnover: string | null
  message: string | null
  status: string
  assignedTo: string | null
  notes: string | null
}

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed'
