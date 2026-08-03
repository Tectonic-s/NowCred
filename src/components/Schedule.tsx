import { buildSchedule, abridge, inr, inrShort, dueDate } from '@/lib/loan'

/**
 * A repayment schedule, abridged to the rows that matter: the first few, a
 * marker for the identical middle, and the final two — so the reader can see
 * the last line from the top of the page. That last line is the argument.
 */
export default function Schedule({
  amount,
  rate,
  months,
  from = new Date(),
  animate = false,
}: {
  amount: number
  rate: number
  months: number
  from?: Date
  /** Stagger the rows in on load. Home page only — elsewhere it is noise. */
  animate?: boolean
}) {
  const { rows, totalRepayable, totalInterest } = buildSchedule(amount, rate, months)
  const { head, skipped, tail } = abridge(rows)

  const settle = (i: number): React.CSSProperties | undefined =>
    animate ? { animationDelay: `${280 + i * 55}ms` } : undefined

  const cls = (extra = '') => `row${extra}${animate ? ' settle' : ''}`

  // Row index across head + skip marker + tail, for the stagger.
  let i = 0

  return (
    <figure className={`schedule${animate ? ' settle' : ''}`} style={animate ? { animationDelay: '160ms' } : undefined}>
      <div className="schedule__head">
        <strong>
          {inrShort(amount)} over {months} months
        </strong>
        <span className="fineprint">{rate}% fixed</span>
      </div>

      <div className="row row--head">
        <span className="row__no">No.</span>
        <span className="row__due">Due</span>
        <span className="row__pay">Payment</span>
        <span className="row__left">Left to pay</span>
      </div>

      {head.map((r) => (
        <div key={r.n} className={cls()} style={settle(i++)}>
          <span className="row__no">{String(r.n).padStart(2, '0')}</span>
          <span className="row__due">{dueDate(from, r.n)}</span>
          <span className="row__pay">{inr(r.payment)}</span>
          <span className="row__left">{inr(r.balance)}</span>
        </div>
      ))}

      {skipped > 0 && (
        <div className={cls(' row--skip')} style={settle(i++)}>
          <span className="row__no">&nbsp;</span>
          <span className="row__due">{skipped} more, unchanged</span>
          <span className="row__pay">{inr(head[0].payment)}</span>
          <span className="row__left">&nbsp;</span>
        </div>
      )}

      {tail.map((r, idx) => {
        const isLast = idx === tail.length - 1
        return (
          <div key={r.n} className={cls(isLast ? ' row--last' : '')} style={settle(i++)}>
            <span className="row__no">{String(r.n).padStart(2, '0')}</span>
            <span className="row__due">{dueDate(from, r.n)}</span>
            <span className="row__pay">{inr(r.payment)}</span>
            <span className="row__left">{inr(r.balance)}</span>
          </div>
        )
      })}

      <figcaption className="schedule__foot">
        <span className="fineprint">Total repayable ₹{inr(totalRepayable)}</span>
        <span className="fineprint">Interest ₹{inr(totalInterest)}</span>
      </figcaption>
    </figure>
  )
}
