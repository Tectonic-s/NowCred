import type { Metadata } from 'next'
import Link from 'next/link'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import { SERVICES, GROUP_ORDER, GROUP_COPY, servicesByGroup } from '@/lib/data/services'
import { SITE, FUTURE_SOLUTIONS } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Solutions',
  description: `Secured and unsecured funding — home loans, loan against property, personal and business loans, working capital, equipment and trade facilities — identified for your profile across ${SITE.brand}'s banking and NBFC partners.`,
}

export default function ServicesPage() {
  return (
    <div className="sheet">
      <header className="pagehead">
        <div className="split" style={{ alignItems: 'start', gap: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div className="stack">
            <p className="fineprint">{SERVICES.length} facilities &middot; multiple partners</p>
            <h1>The shapes money comes in.</h1>
            <p className="lede">
              We are not a lender. Each of these is placed with a bank or an NBFC from our partner
              network, and which one suits you depends on what you own, what you earn, and what you are
              funding. That is the conversation — this page is only the vocabulary for it.
            </p>
          </div>
          <MediaPlaceholder label="Financial consultation" aspect="4/3" className="settle" />
        </div>
      </header>

      {/* Video section */}
      <section className="band video-band" id="services-video" aria-label="Our services">
        <div className="video-band__inner">
          <div className="stack">
            <p className="trust__label">How we work</p>
            <h2 className="head">The right facility depends on your profile, not a catalogue.</h2>
            <p className="lede">
              Watch how {SITE.brand} matches borrowers to the right lender — and why that
              conversation matters before any application is made.
            </p>
          </div>
          <MediaPlaceholder kind="video" label="Services overview" aspect="16/9" />
        </div>
      </section>

      {GROUP_ORDER.map((group, i) => (
        <section
          className="band band--tight"
          key={group}
          style={{ borderTop: 'none' }}
          aria-labelledby={`group-${group}`}
        >
          <div className="catrule">
            <h2 id={`group-${group}`}>{group}</h2>
            <span className="fineprint">{GROUP_COPY[group].caption}</span>
          </div>
          <p className="group__blurb">{GROUP_COPY[group].blurb}</p>

          {servicesByGroup(group).map((s) => (
            <Link className="entry" href={`/services/${s.slug}`} key={s.slug}>
              <h3>{s.name}</h3>
              <p>{s.shortDesc}</p>
              <span className="entry__rate">
                {s.category}
                <small>{s.processingTime}</small>
              </span>
            </Link>
          ))}

          {/* Image placeholder after every other group */}
          {i % 2 === 0 && (
            <MediaPlaceholder
              label={`${group} solutions`}
              aspect="21/9"
              style={{ marginTop: '2rem' }}
            />
          )}
        </section>
      ))}

      {/* Roadmap, labelled as roadmap. Listing these beside live facilities
          without the distinction would be a claim we cannot honour today. */}
      <section className="band band--tight" style={{ borderTop: 'none' }} aria-labelledby="group-future">
        <div className="catrule">
          <h2 id="group-future">Future financial solutions</h2>
          <span className="fineprint">In development</span>
        </div>
        <p className="group__blurb">
          Borrowing is one part of a financial position. These are being built next, and are not
          available today.
        </p>

        {FUTURE_SOLUTIONS.map((f) => (
          <div className="entry entry--static" key={f.name}>
            <h3>{f.name}</h3>
            <p>{f.note}</p>
            <span className="entry__rate">
              Soon
              <small>in development</small>
            </span>
          </div>
        ))}
      </section>

      <section className="band rail">
        <p className="marginalia">Not sure?</p>
        <div className="stack">
          <h2 className="head">Most people arrive asking for the wrong one.</h2>
          <p className="lede">
            The facility that suits you is often not the one you came looking for — money lent
            against property you already own usually costs several percent less than the same sum
            unsecured. Tell us what it is for, and we will tell you which of these fits, including
            when the answer is &ldquo;none of them, not for this&rdquo;.
          </p>
          <div className="actions">
            <Link className="btn" href="/enquiry">
              Talk to an expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
