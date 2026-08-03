import type { Metadata } from 'next'
import EnquiryForm from '@/components/EnquiryForm'
import { SITE } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Check your rate',
  description:
    'Seven questions, two minutes, and no mark on your credit file. An adviser will call with the real rate and the full schedule.',
}

export default function EnquiryPage({
  searchParams,
}: {
  searchParams: { facility?: string }
}) {
  return (
    <div className="sheet">
      <header className="pagehead">
        <p className="fineprint">Two minutes &middot; No mark on your credit file</p>
        <h1>Check your rate.</h1>
        <p className="lede">
          Answer these and an adviser will call you within {SITE.responseTime} with what you would
          actually be offered — the rate, the monthly payment, and the schedule down to the last
          line. Nothing here commits you to anything.
        </p>
      </header>

      <section className="band rail" style={{ borderTop: 'none' }}>
        <p className="marginalia">
          About you,
          <br />
          and the money
        </p>
        <div style={{ maxWidth: '40rem' }}>
          <EnquiryForm defaultFacility={searchParams.facility ?? ''} />
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">Rather talk?</p>
        <div>
          <div className="stack">
            <h2 className="head">A person answers the phone.</h2>
            <p className="lede">
              If a form is the wrong way to explain your situation — and for a lot of cases it is —
              call instead. No menu tree, no callback queue.
            </p>
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

          <p className="fineprint" style={{ marginTop: '1.5rem' }}>
            Or email {SITE.email}
          </p>
        </div>
      </section>
    </div>
  )
}
