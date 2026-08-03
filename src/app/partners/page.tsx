import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Lender panel',
  description:
    'The banks and NBFCs Ippo Loan places business through, and what having a panel actually changes for a borrower.',
}

export default function PartnersPage() {
  const total = SITE.lenders.banks.length + SITE.lenders.nbfcs.length

  return (
    <div className="sheet">
      <header className="pagehead">
        <p className="fineprint">{total} lenders on panel</p>
        <h1>Who actually lends you the money.</h1>
        <p className="lede">
          Ippo does not lend. Every rupee comes from one of the institutions below, and our job is
          knowing which of them says yes to a file like yours — and at what price. We list them by
          name because a panel you cannot see is not a panel.
        </p>
      </header>

      <section className="band band--tight" style={{ borderTop: 'none' }}>
        <div className="catrule">
          <h2>Banks</h2>
        </div>
        <div className="namegrid">
          {SITE.lenders.banks.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </section>

      <section className="band band--tight" style={{ borderTop: 'none' }}>
        <div className="catrule">
          <h2>NBFCs</h2>
        </div>
        <div className="namegrid">
          {SITE.lenders.nbfcs.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">Why it matters</p>
        <div>
          <div className="stack">
            <h2 className="head">One application, read by everyone at once.</h2>
            <p className="lede">
              Applying to lenders one at a time is slow and it is expensive: every hard search
              leaves a mark, and a run of marks is itself a reason to decline you. We put one file
              in front of the panel instead.
            </p>
          </div>

          <div className="columns">
            <article className="column">
              <h3>Priced against each other</h3>
              <p>
                Lenders quoting into the same file quote differently than lenders quoting alone. We
                show you every offer we get, including the ones we would not recommend, and tell you
                which we would take and why.
              </p>
            </article>

            <article className="column">
              <h3>One search, not eight</h3>
              <p>
                We check eligibility on a soft footprint that other lenders cannot see. Only when
                you pick an offer does anything hard touch your file — so shopping around costs you
                nothing.
              </p>
            </article>

            <article className="column">
              <h3>A decline is usually a mismatch</h3>
              <p>
                Being turned down by one lender rarely means the borrowing is wrong; it usually
                means the file went to a lender whose appetite did not fit it. That is a placement
                problem, and placement is what we do.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">One step</p>
        <div className="stack">
          <h2 className="head">See which of them would take your file.</h2>
          <div className="actions">
            <Link className="btn" href="/enquiry">
              Check your rate
            </Link>
            <Link className="btn btn--quiet" href="/about#fees">
              How we get paid
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
