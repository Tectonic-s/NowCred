export interface ServiceExample {
  /** Principal in rupees. */
  amount: number
  /** Term in months. */
  months: number
  /** Annual rate as a percentage, e.g. 11.9 */
  rate: number
}

export interface Service {
  slug: string
  name: string
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
  email: string
  businessType: string
  facility: string
  loanAmount: string
  turnover: string
  message: string | null
  status: string
  assignedTo: string | null
  notes: string | null
}

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed'
