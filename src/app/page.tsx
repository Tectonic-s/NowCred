import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import { SITE, TRUST, WHY_POINTS, JOURNEY, FUTURE_SOLUTIONS } from '@/lib/data/content'
import { GROUP_ORDER, GROUP_COPY, servicesByGroup } from '@/lib/data/services'

export default function HomePage() {
  return (
    <div className="sheet">
      {/* ── HERO: full-bleed image, headline + CTA overlaid ──────────────── */}
      <section className="hero">
        <div className="hero__billboard settle">
          <Image
            src="/images/about/team.jpeg"
            alt="NowCred team"
            width={1600}
            height={686}
            className="hero__bg"
            priority
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div className="hero__overlay">
            <div className="hero__copy">
              <h1>The right loan.<br />From the right lender.</h1>
              <p className="hero__sub">
                {SITE.experienceYears} years of financial expertise — matching your profile to the
                bank or NBFC that will actually say yes.
              </p>
              <div className="actions">
                <Link className="btn" href="/enquiry">Talk to an expert</Link>
                <Link className="btn btn--ghost" href="/services">Explore solutions</Link>
              </div>
              <p className="fineprint" style={{ color: 'rgba(255,255,255,0.6)' }}>
                No cost to you &middot; A conversation before any application
              </p>
            </div>
          </div>
        </div>

        {/* ── quick-access product strip ──────────────────────────────────── */}
        <div className="hero__strip">
          {[
            { label: 'Home Loan', href: '/services/home-loan' },
            { label: 'Loan Against Property', href: '/services/lap' },
            { label: 'Business Loan', href: '/services/business-loan' },
            { label: 'Personal Loan', href: '/services/personal-loan' },
            { label: 'Working Capital', href: '/services/working-capital' },
          ].map((item) => (
            <Link key={item.label} className="strip__item" href={item.href}>
              <span>{item.label}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* ── trust, immediately after the hero ─────────────────────────────── */}
      <section className="band band--tight" id="trust" aria-labelledby="trust-h">
        <h2 className="sr-only" id="trust-h">
          Why customers trust us
        </h2>
        <div className="trust">
          {TRUST.map((t) => (
            <article className="trust__item" key={t.label}>
              <p className="trust__label">{t.label}</p>
              <h3>{t.title}</h3>
              <p>{t.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── video: who we are ─────────────────────────────────────────────── */}
      <section className="band video-band" id="about-video" aria-label="About NowCred">
        <div className="video-band__inner">
          <div className="stack">
            <p className="trust__label">Who we are</p>
            <h2 className="head">A conversation before any application.</h2>
            <p className="lede">
              {SITE.experienceYears} years of working inside the system — understanding how lenders
              read a file, and how to present yours so the right doors open.
            </p>
            <Link className="btn btn--quiet" href="/about">Our story</Link>
          </div>
          <MediaPlaceholder
            kind="video"
            label="NowCred — who we are"
            aspect="16/9"
          />
        </div>
      </section>

      {/* ── why not simply walk into one bank ─────────────────────────────── */}
      <section className="band rail" id="why">
        <p className="marginalia">
          Why not
          <br />
          one bank
        </p>
        <div>
          <Reveal>
            <div className="stack">
              <h2 className="head">Every customer has a different financial profile.</h2>
              <p className="lede">
                Banks and NBFCs each offer their own products, on their own criteria. {SITE.brand}{' '}
                identifies the options that suit you — assessed on income, cash flow, existing
                obligations, and what the funding is for.
              </p>
            </div>
          </Reveal>

          <div className="why-grid">
            {WHY_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 50}>
                <article className="why-item">
                  <span className="why-item__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="why-item__title">{p.title}</h3>
                  <p className="why-item__note">{p.note}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="why-media">
            <MediaPlaceholder label="Meeting / advisory" aspect="21/9" />
          </div>
        </div>
      </section>

      {/* ── the journey. Numbered because it genuinely is a sequence. ─────── */}
      <section className="band rail" id="journey">
        <p className="marginalia">How we work</p>
        <div>
          <div className="split split--media-first">
            <MediaPlaceholder label="Document review" aspect="3/4" />
            <div>
              <Reveal>
                <div className="stack">
                  <h2 className="head">Five steps, in this order.</h2>
                  <p className="lede">
                    Nothing is submitted anywhere until the first two are done properly. That is most
                    of the difference between a file that gets sanctioned and one that gets stuck.
                  </p>
                </div>
              </Reveal>
              <ol className="journey">
                {JOURNEY.map((step, i) => (
                  <Reveal key={step.title} delay={i * 60}>
                    <li className="step">
                      <span className="step__no" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="step__body">
                        <h3>{step.title}</h3>
                        <p>{step.note}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── solutions, grouped the way a customer feels them ──────────────── */}
      <section className="band rail" id="solutions">
        <p className="marginalia">Solutions</p>
        <div>
          <Reveal>
            <div className="stack">
              <h2 className="head">Matched to your profile, not to a catalogue.</h2>
              <p className="lede">
                The right facility depends on what you own, what you earn, and what you are funding.
                These are the shapes money comes in — which one suits you is the conversation.
              </p>
            </div>
          </Reveal>

          {GROUP_ORDER.map((group) => (
            <div className="group" key={group}>
              <div className="catrule">
                <h2>{group} solutions</h2>
                <span className="fineprint">{GROUP_COPY[group].caption}</span>
              </div>
              <p className="group__blurb">{GROUP_COPY[group].blurb}</p>

              {servicesByGroup(group)
                .slice(0, 4)
                .map((s) => (
                  <Link className="entry" href={`/services/${s.slug}`} key={s.slug}>
                    <h3>{s.name}</h3>
                    <p>{s.shortDesc}</p>
                    <span className="entry__rate">
                      {s.category}
                      <small>{s.processingTime}</small>
                    </span>
                  </Link>
                ))}
            </div>
          ))}

          {/* Roadmap, marked as such. Listing these as live services would be a
              claim we cannot honour today. */}
          <div className="group">
            <div className="catrule">
              <h2>Future financial solutions</h2>
              <span className="fineprint">In development</span>
            </div>
            <p className="group__blurb">
              The advisory relationship does not end at borrowing. These are being built next.
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
          </div>

          <div className="actions" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--quiet" href="/services">
              All solutions in detail
            </Link>
          </div>
        </div>
      </section>

      {/* ── what we charge, in full ───────────────────────────────────────── */}
      <section className="band rail" id="cost">
        <p className="marginalia">What it costs</p>
        <div>
          <Reveal>
            <div className="stack">
              <h2 className="head">Our guidance costs you nothing, and we say who pays us.</h2>
              <p className="lede">
                An adviser paid by the lender has a conflict of interest. The answer to that is to
                state it plainly — so here is every charge, including the ones that are not ours.
              </p>
            </div>
          </Reveal>

          <div className="table-scroll">
            <table className="table--fees">
              <thead>
                <tr>
                  <th scope="col">What it is</th>
                  <th scope="col">What it costs you</th>
                </tr>
              </thead>
              <tbody>
                {SITE.fees.map((f) => (
                  <tr key={f.what}>
                    <td>
                      {f.what}
                      <small>{f.note}</small>
                    </td>
                    <td>{f.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── where we work ─────────────────────────────────────────────────── */}
      <section className="band rail" id="region">
        <p className="marginalia">Where we work</p>
        <div className="stack">
          <h2 className="head">
            Built in {SITE.region.primary}, for {SITE.region.primary}.
          </h2>
          <p className="lede">{SITE.region.statement}</p>
          <div className="namegrid" aria-label={`Cities served across ${SITE.region.primary}`}>
            {SITE.region.cities.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <p className="fineprint">
            Elsewhere in {SITE.region.primary} &middot; we still take the call
          </p>
        </div>
      </section>

      {/* ── the ask ───────────────────────────────────────────────────────── */}
      <section className="band rail" id="talk">
        <p className="marginalia">One step</p>
        <div className="split">
          <div className="stack">
            <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', maxWidth: '21ch' }}>
              Start with a conversation, not an application.
            </h2>
            <p className="lede">
              Tell us what you need and where you are. An adviser will call you within{' '}
              {SITE.responseTime} to understand the requirement properly — before anything is
              submitted to any institution, and before you commit to anything at all.
            </p>
            <div className="actions">
              <Link className="btn" href="/enquiry">
                Request a consultation
              </Link>
              <a className="btn btn--quiet" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>
                Talk to an expert
              </a>
            </div>
            <p className="fineprint">{SITE.hours} &middot; A person answers</p>
          </div>
          <MediaPlaceholder label="Branch / team" aspect="4/3" />
        </div>
      </section>
    </div>
  )
}
