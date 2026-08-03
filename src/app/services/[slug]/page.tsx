import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Schedule from '@/components/Schedule'
import { SERVICES, getServiceBySlug } from '@/lib/data/services'
import { SITE } from '@/lib/data/content'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getServiceBySlug(params.slug)
  if (!s) return { title: 'Not found' }
  return { title: s.name, description: s.shortDesc }
}

export default function ServicePage({ params }: Props) {
  const s = getServiceBySlug(params.slug)
  if (!s) notFound()

  return (
    <div className="sheet">
      <div style={{ paddingTop: '2rem' }}>
        <Link className="backlink" href="/services">
          ← All facilities
        </Link>
      </div>

      <header className="pagehead">
        <p className="fineprint">{s.category}</p>
        <h1>{s.name}</h1>
        <p className="lede">{s.shortDesc}</p>
      </header>

      {/* The plain-English line, given the weight it deserves. */}
      <section className="band band--tight rail" style={{ borderTop: 'none' }}>
        <p className="marginalia">In plain English</p>
        <p style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--t-xl)', color: 'var(--ink)', lineHeight: 1.35, maxWidth: '30ch' }}>
          {s.plainEnglish}
        </p>
      </section>

      <section className="band rail">
        <p className="marginalia">How it works</p>
        <div>
          <div className="stack">
            <p className="lede">{s.fullDesc}</p>
          </div>

          <div className="figures">
            <div>
              <span className="fineprint">How much</span>
              <b>{s.loanRange}</b>
            </div>
            <div>
              <span className="fineprint">How long it takes</span>
              <b>{s.processingTime}</b>
            </div>
          </div>

          <div className="columns columns--two" style={{ marginTop: '2.5rem' }}>
            <article className="column">
              <h3>What lenders look for</h3>
              <ol className="ruled">
                {s.eligibility.map((e) => (
                  <li key={e}>
                    <span>{e}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="column">
              <h3>What you&rsquo;ll need to hand</h3>
              <ol className="ruled">
                {s.documents.map((d) => (
                  <li key={d}>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      {/* A schedule for anything that amortises. Revolving facilities have no
          fixed schedule, so they get an honest explanation instead. */}
      <section className="band rail">
        <p className="marginalia">Worked example</p>
        <div>
          <div className="stack">
            <h2 className="head">
              {s.example ? 'What it would actually look like.' : 'Why there is no schedule here.'}
            </h2>
            <p className="lede">
              {s.example ? (
                <>
                  At the lowest rate on our panel, borrowing {s.example.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })} rupees
                  over {s.example.months} months looks like this. Your rate depends on your file, so
                  treat this as the shape of the thing rather than a quote.
                </>
              ) : (
                <>
                  This is a revolving facility: you draw and repay as you need to, and interest is
                  charged on what is actually outstanding. There is no fixed schedule to show you
                  because there is no fixed schedule — which is the point of it, and also the risk.
                  We will model your likely usage on the call.
                </>
              )}
            </p>
          </div>

          {s.example && (
            <div style={{ marginTop: '2rem', maxWidth: '32rem' }}>
              <Schedule
                amount={s.example.amount}
                rate={s.example.rate}
                months={s.example.months}
              />
            </div>
          )}
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">One step</p>
        <div className="stack">
          <h2 className="head">Find out what you&rsquo;d be offered on this.</h2>
          <p className="lede">
            An adviser will call within {SITE.responseTime}, go through your position, and come back
            with the actual rate and the actual schedule. Nothing touches your credit file until you
            tell us to proceed.
          </p>
          <div className="actions">
            <Link className="btn" href={`/enquiry?facility=${encodeURIComponent(s.name)}`}>
              Check your rate for {s.name.toLowerCase()}
            </Link>
            <a className="btn btn--quiet" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>
              {SITE.phone}
            </a>
          </div>
          <p className="fineprint">{SITE.hours}</p>
        </div>
      </section>
    </div>
  )
}
