import type { Metadata } from 'next'
import EnquiryForm from '@/components/EnquiryForm'
import { SITE } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Request a consultation',
  description:
    'Five questions, two minutes, no cost. An adviser will call to understand your requirement before anything is submitted to any institution.',
}

export default function EnquiryPage({
  searchParams,
}: {
  searchParams: { facility?: string }
}) {
  return (
    <div className="sheet">
      <header className="pagehead">
        <p className="fineprint">Five questions &middot; two minutes &middot; no cost</p>
        <h1>Request a consultation.</h1>
        <p className="lede">
          Tell us the essentials and an adviser will call you within {SITE.responseTime} to
          understand the requirement properly. Nothing is submitted to any institution, and nothing
          here commits you to anything.
        </p>
      </header>

      <section className="band rail" style={{ borderTop: 'none' }}>
        <p className="marginalia">
          The essentials,
          <br />
          nothing more
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
