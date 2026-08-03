import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Enquiry received',
  description: 'We have your enquiry and an adviser will call shortly.',
  robots: { index: false },
}

export default function ThankYouPage({ searchParams }: { searchParams: { ref?: string } }) {
  const ref = searchParams.ref

  return (
    <div className="sheet">
      <section className="band rail">
        <p className="marginalia">Received</p>
        <div className="stack">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.022em' }}>
            We have it. Someone will call.
          </h1>
          <p className="lede">
            An adviser will be in touch within {SITE.responseTime} during opening hours. They will
            have read what you sent, so you will not be asked for it twice.
          </p>

          {/* The reference is the one thing worth carrying away from this page,
              so it is set like the closing line of a schedule. */}
          {ref && (
            <div
              style={{
                borderTop: '2px solid var(--ink)',
                borderBottom: '1px solid var(--rule)',
                padding: '1.25rem 0',
                marginTop: '0.5rem',
                maxWidth: '22rem',
              }}
            >
              <p className="fineprint">Your reference</p>
              <p
                style={{
                  fontFamily: 'var(--f-data)',
                  fontSize: '1.75rem',
                  letterSpacing: '0.08em',
                  color: 'var(--ink)',
                  marginTop: '0.35rem',
                }}
              >
                {ref}
              </p>
            </div>
          )}

          <p className="lede">
            {ref ? 'Quote that on any call or reply and we will find your file straight away. ' : ''}
            We have also emailed you a copy. Nothing has touched your credit file and nothing is
            committed.
          </p>

          <div className="actions">
            <Link className="btn" href="/">
              Back to the start
            </Link>
            <a className="btn btn--quiet" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>
              Call instead — {SITE.phone}
            </a>
          </div>
          <p className="fineprint">{SITE.hours}</p>
        </div>
      </section>
    </div>
  )
}
