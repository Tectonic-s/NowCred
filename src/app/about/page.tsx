import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who Ippo Loan is, how we are paid, and the things we will tell you that a lender selling its own product cannot.',
}

export default function AboutPage() {
  return (
    <div className="sheet">
      <header className="pagehead">
        <p className="fineprint">Founded {SITE.founded}</p>
        <h1>We are the ones reading the small print for you.</h1>
        <p className="lede">
          Ippo Loan arranges credit. A lender can only sell you its own product and can only
          tell you about its own terms. We hold a panel, so we can tell you when the answer is
          somebody else — or when the answer is not to borrow at all.
        </p>
      </header>

      <section className="band rail" style={{ borderTop: 'none' }}>
        <p className="marginalia">The name</p>
        <div className="stack">
          <h2 className="head">Ippo means one step.</h2>
          <p className="lede">
            一歩. It is the smallest unit of getting somewhere, and it is how borrowing should feel:
            one payment, then the next, on a path whose end you can see from where you are standing.
            Every schedule we show you ends in a line that reads zero, and we put that line on the
            page before you sign rather than after.
          </p>
        </div>
      </section>

      {/* The section the footer and every CTA link to — the honest bit. */}
      <section className="band rail" id="fees">
        <p className="marginalia">How we get paid</p>
        <div>
          <div className="stack">
            <h2 className="head">The lender pays us, and we tell you how much.</h2>
            <p className="lede">
              You pay us nothing. When a facility completes, the lender pays us a commission — which
              means the honest question to ask any broker is whether they would still recommend the
              same lender if the commissions were reversed. So we put ours in writing.
            </p>
          </div>

          <div className="columns">
            <article className="column">
              <h3>Disclosed before you commit</h3>
              <p>
                Every offer we bring you names the lender and states what we would be paid if you
                took it. You see that alongside the rate, not buried in a document you sign later.
              </p>
            </article>

            <article className="column">
              <h3>Nothing charged to you</h3>
              <p>
                No arrangement fee, no advice fee, no fee for a case that does not complete. If we
                cannot place your file you owe us nothing and we will say so quickly.
              </p>
            </article>

            <article className="column">
              <h3>We will tell you not to borrow</h3>
              <p>
                Some enquiries are better answered with a smaller sum, a different facility, or a
                few months of waiting. We are paid on completion, so this costs us — which is
                exactly why it is worth saying out loud.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">How a case runs</p>
        <div>
          <div className="stack">
            <h2 className="head">Four steps, and you can stop at any of them.</h2>
          </div>

          {/* Numbered because this genuinely is a sequence — the order is the
              information. Elsewhere on this site, numbering would be decoration. */}
          <ol className="ruled" style={{ marginTop: '2rem', maxWidth: 'var(--measure)' }}>
            <li>
              <span>
                <strong>You tell us what the money is for.</strong> Seven questions on the site, or
                one phone call. Nothing touches your credit file.
              </span>
            </li>
            <li>
              <span>
                <strong>We check the panel.</strong> A soft search tells us who would look at your
                file and roughly where they would price it. Other lenders cannot see it.
              </span>
            </li>
            <li>
              <span>
                <strong>You get the offers, with the schedules.</strong> Every offer we got, what we
                would be paid on each, and our recommendation with the reason attached.
              </span>
            </li>
            <li>
              <span>
                <strong>You choose, and we run the paperwork.</strong> Valuation, legal, and the
                lender&rsquo;s queries are ours to chase. This is the only step that leaves a hard
                mark on your file.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">Where we are</p>
        <div>
          <div className="stack">
            <h2 className="head">Two offices, and a phone that a person answers.</h2>
          </div>

          <div className="columns columns--two" style={{ marginTop: '2rem' }}>
            {SITE.offices.map((o) => (
              <article className="column" key={o.city}>
                <h3>
                  {o.city}
                  {o.hq && <span className="fineprint"> &middot; Head office</span>}
                </h3>
                <p>
                  {o.area}
                  <br />
                  {o.city} {o.pincode}
                </p>
              </article>
            ))}
          </div>

          <div className="figures">
            <div>
              <span className="fineprint">Phone</span>
              <b>{SITE.phone}</b>
            </div>
            <div>
              <span className="fineprint">Open</span>
              <b>{SITE.hours}</b>
            </div>
          </div>

          <div className="actions" style={{ marginTop: '2rem' }}>
            <Link className="btn" href="/enquiry">
              Check your rate
            </Link>
            <a className="btn btn--quiet" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
