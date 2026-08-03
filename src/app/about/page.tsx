import type { Metadata } from 'next'
import Link from 'next/link'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import { SITE, JOURNEY } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'About',
  description: `After ${SITE.experienceYears} years inside banks and financial institutions, ${SITE.brand} was created to help customers reach the right financial solution — beyond what any single lender can offer.`,
}

export default function AboutPage() {
  return (
    <div className="sheet">
      <header className="pagehead">
        <div className="split" style={{ alignItems: 'start', gap: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div className="stack">
            <p className="fineprint">
              {SITE.experienceYears} years in financial services &middot; {SITE.region.primary}
            </p>
            <h1>Twenty-five years on the other side of the desk.</h1>
            <p className="lede">
              {SITE.brand} was created after {SITE.experienceYears} years of serving customers through
              leading banks and financial institutions — with a vision to help people reach the right
              financial solution, beyond what any single lender is able to offer.
            </p>
          </div>
          <MediaPlaceholder label="Team / office" aspect="4/3" className="settle" />
        </div>
      </header>

      {/* The founding story, which is the whole positioning in one section. */}
      <section className="band rail" style={{ borderTop: 'none' }}>
        <p className="marginalia">Why we exist</p>
        <div>
          <div className="split">
            <div className="stack">
              <h2 className="head">A bank can only ever offer you what a bank sells.</h2>
              <p className="lede">
                Twenty-five years of sitting inside financial institutions teaches you something
                uncomfortable: the answer a customer gets depends less on their situation than on which
                door they happened to walk through. A strong file is declined because it does not match
                one institution&rsquo;s appetite that quarter. A weak one is approved at a price nobody
                explained.
              </p>
              <p className="lede">
                The customer rarely learns any of this. They learn &ldquo;no&rdquo;, and they stop —
                or they take the first &ldquo;yes&rdquo; without knowing what else was available.{' '}
                {SITE.brand} exists to stand on the other side of that: to read the profile first, and
                then go to the institutions it actually fits.
              </p>
            </div>
            <MediaPlaceholder label="Advisory meeting" aspect="3/4" />
          </div>
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">What we believe</p>
        <div>
          <div className="stack">
            <h2 className="head">The customer comes before the placement.</h2>
            <p className="lede">
              We are paid when a facility completes, which means every principle below costs us
              money at some point. That is precisely why they are worth writing down.
            </p>
          </div>

          <div className="columns">
            <article className="column">
              <h3>Advice before product</h3>
              <p>
                The first conversation is about your situation, not our panel. Until we understand
                income, obligations, and what the money is for, there is nothing honest to
                recommend.
              </p>
            </article>

            <article className="column">
              <h3>The reason, with the recommendation</h3>
              <p>
                You are told which institutions were considered, which one we suggest, and why. A
                recommendation you cannot interrogate is not advice — it is a sale.
              </p>
            </article>

            <article className="column">
              <h3>Sometimes the answer is no</h3>
              <p>
                A smaller sum, a different facility, or six months of waiting is often the right
                call. We are paid on completion, so saying this costs us — which is exactly why it
                needs saying out loud.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* The honest bit — the footer and several CTAs link straight here. */}
      <section className="band rail" id="fees">
        <p className="marginalia">How we are paid</p>
        <div>
          <div className="stack">
            <h2 className="head">The lender pays us, and we tell you how much.</h2>
            <p className="lede">
              You pay us nothing. When a facility completes, the institution pays us a commission —
              which means the honest question to ask any adviser is whether they would still make
              the same recommendation if the commissions were reversed. So we put ours in writing.
            </p>
          </div>

          <div className="columns">
            <article className="column">
              <h3>Disclosed before you commit</h3>
              <p>
                Every option we bring you names the institution and states what we would be paid if
                you took it. You see that beside the rate, not buried in a document you sign later.
              </p>
            </article>

            <article className="column">
              <h3>Nothing charged to you</h3>
              <p>
                No advisory fee, no arrangement fee, and no fee for a case that does not complete.
                If we cannot help, you owe us nothing and we will tell you quickly.
              </p>
            </article>

            <article className="column">
              <h3>Lender charges, stated up front</h3>
              <p>
                Processing, valuation, and legal charges belong to the institution, not to us. You
                get them in rupees before you proceed, never as a deduction you discover afterwards.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">How a case runs</p>
        <div>
          <div className="split split--media-first">
            <MediaPlaceholder label="Document review" aspect="3/4" />
            <div className="stack">
              <h2 className="head">Five steps, and you can stop at any of them.</h2>
              <p className="lede">
                Read from the same source as the home page, so the process described in both places
                can never drift apart.
              </p>
              {/* Numbered because this genuinely is a sequence — the order is the
                  information. Elsewhere on this site, numbering would be decoration. */}
              <ol className="ruled" style={{ marginTop: '1rem', maxWidth: 'var(--measure)' }}>
                {JOURNEY.map((step) => (
                  <li key={step.title}>
                    <span>
                      <strong>{step.title}.</strong> {step.note}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Video section — who we are */}
      <section className="band video-band" id="about-video" aria-label="About us">
        <div className="video-band__inner">
          <div className="stack">
            <p className="trust__label">Our story</p>
            <h2 className="head">Built on {SITE.experienceYears} years inside the system.</h2>
            <p className="lede">
              Understanding how lenders read a file — and how to present yours so the right doors
              open — is what {SITE.brand} was built to do.
            </p>
          </div>
          <MediaPlaceholder kind="video" label="About NowCred" aspect="16/9" />
        </div>
      </section>

      <section className="band rail">
        <p className="marginalia">Where we work</p>
        <div>
          <div className="stack">
            <h2 className="head">{SITE.region.primary} first, and properly.</h2>
            <p className="lede">
              {SITE.region.statement} Local lending is not a slogan — which institutions lend
              against which kind of property, in which district, is knowledge that does not travel.
            </p>
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
              Talk to an expert
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
