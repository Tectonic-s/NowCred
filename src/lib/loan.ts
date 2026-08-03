/* ─────────────────────────────────────────────────────────────────────────────
   Repayment maths.

   The schedule is the centrepiece of this site, so it has to actually
   reconcile: the payments must sum to the total, the interest must sum to the
   charge for credit, and the closing balance must land on exactly zero. We
   therefore work in whole paise (integers) and put every rounding remainder
   into the final payment — which is how lenders do it, and why a real final
   instalment is usually a rupee or two off the others.
   ───────────────────────────────────────────────────────────────────────────── */

export interface ScheduleRow {
  /** 1-based instalment number. */
  n: number
  /** Payment due, in rupees. */
  payment: number
  /** Interest portion of this payment, in rupees. */
  interest: number
  /** Principal portion of this payment, in rupees. */
  principal: number
  /** Balance outstanding after this payment, in rupees. */
  balance: number
}

export interface Schedule {
  rows: ScheduleRow[]
  /** The level monthly instalment, in rupees. */
  emi: number
  /** Every payment added together, in rupees. */
  totalRepayable: number
  /** Total repayable less the principal, in rupees. */
  totalInterest: number
}

/**
 * Level-instalment (EMI) schedule for a fixed-rate loan.
 *
 * @param principal Amount borrowed, in rupees.
 * @param annualRatePct Annual rate as a percentage, e.g. 11.9
 * @param months Term in months.
 */
export function buildSchedule(principal: number, annualRatePct: number, months: number): Schedule {
  if (principal <= 0 || months <= 0) {
    return { rows: [], emi: 0, totalRepayable: 0, totalInterest: 0 }
  }

  const r = annualRatePct / 100 / 12
  const P = Math.round(principal * 100) // work in paise

  // Zero-rate loans would divide by zero in the annuity formula.
  const emiPaise =
    r === 0
      ? Math.round(P / months)
      : Math.round((P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1))

  const rows: ScheduleRow[] = []
  let balance = P

  for (let n = 1; n <= months; n++) {
    const interest = Math.round(balance * r)
    const isLast = n === months

    // The last instalment clears whatever is left, absorbing every rounding
    // remainder so the closing balance is exactly zero.
    const payment = isLast ? balance + interest : emiPaise
    const principalPart = payment - interest
    balance -= principalPart

    rows.push({
      n,
      payment: payment / 100,
      interest: interest / 100,
      principal: principalPart / 100,
      balance: balance / 100,
    })
  }

  const totalRepayable = rows.reduce((sum, row) => sum + row.payment, 0)

  return {
    rows,
    emi: emiPaise / 100,
    totalRepayable,
    totalInterest: totalRepayable - P / 100,
  }
}

/**
 * The rows worth showing: the first few, a marker for the identical middle,
 * then the final two — the point being that the reader can see the last line.
 */
export function abridge(rows: ScheduleRow[], head = 3, tail = 2) {
  if (rows.length <= head + tail + 1) {
    return { head: rows, skipped: 0, tail: [] as ScheduleRow[] }
  }
  return {
    head: rows.slice(0, head),
    skipped: rows.length - head - tail,
    tail: rows.slice(rows.length - tail),
  }
}

/** Indian digit grouping: 12,34,567.89 rather than 1,234,567.89 */
export function inr(amount: number, opts: { paise?: boolean } = {}) {
  const { paise = true } = opts
  return amount.toLocaleString('en-IN', {
    minimumFractionDigits: paise ? 2 : 0,
    maximumFractionDigits: paise ? 2 : 0,
  })
}

/** "₹9,00,000" for headings, where paise would be noise. */
export function inrShort(amount: number) {
  return `₹${inr(amount, { paise: false })}`
}

/** Month labels for a schedule starting the month after `from`. */
export function dueDate(from: Date, monthOffset: number) {
  const d = new Date(from.getFullYear(), from.getMonth() + monthOffset, 1)
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}
