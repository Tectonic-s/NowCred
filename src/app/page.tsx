import Link from 'next/link'
import Schedule from '@/components/Schedule'
import Reveal from '@/components/Reveal'
import { SITE } from '@/lib/data/content'
import { SERVICES } from '@/lib/data/services'
import { buildSchedule, inr, inrShort } from '@/lib/loan'

/* The representative example the whole page is built around. Every figure
   quoted below is derived from it rather than typed by hand, so the copy can
   never drift out of step with the schedule beside it. */
const EG = { amount: 900000, rate: 11.9, months: 36 }

export default function HomePage() {
  const { emi, totalRepayable, totalInterest } = buildSchedule(EG.amount, EG.rate, EG.months)

  return (
    <div className="sheet">
      {/* ── the thesis: a schedule whose last line is zero ───────────────── */}
      <section className="hero">
        <div className="hero__grid">
          <div className="stack settle" style={{ animationDelay: '40ms' }}>
            <p className="fineprint">
              Personal, property &amp; business loans &middot; {SITE.facts[0].figure} APR representative
            </p>
            <h1>A loan you can see the end of.</h1>
            <p className="lede">
              <em>Ippo</em> means one step. We find you a lender from our panel and show you the
              whole schedule before you sign — every payment, the date it leaves your account, and
              the last line, which is always zero.
            </p>
            <div className="actions">
              <Link className="btn" href="/enquiry">
                Check your rate
              </Link>
              <Link className="btn btn--quiet" href="/services">
                See what we arrange
              </Link>
            </div>
            <p className="fineprint">Two minutes &middot; No mark on your credit file</p>
          </div>

          <Schedule amount={EG.amount} rate={EG.rate} months={EG.months} animate />
        </div>
      </section>

      {/* ── three facts ──────────────────────────────────────────────────── */}
      <section className="facts" aria-label="At a glance">
        {SITE.facts.map((f) => (
          <div className="fact" key={f.label}>
            <b>{f.figure}</b>
            <span>{f.note}</span>
          </div>
        ))}
      </section>

      {/* ── what a loan is made of ───────────────────────────────────────── */}
      <section className="band rail" id="how">
        <p className="marginalia">
          Three things
          <br />
          to settle
        </p>
        <div>
          <Reveal>
            <div className="stack">
              <h2 className="head">One rate, one payment, one end date.</h2>
              <p className="lede">
                A loan only has three moving parts. Most lenders make you find them across four
                screens and a PDF. We settle all three on one call, then put them in writing before
                you agree to anything.
              </p>
            </div>
          </Reveal>

          <div className="columns">
            <article className="column">
              <h3>What you borrow</h3>
              <p>
                From ₹2 lakh to ₹25 crore depending on the facility. Ask for less than you are
                approved for and nothing changes — there is no minimum draw and no charge for
                funds you leave alone.
              </p>
              <p className="fineprint">₹2 lakh – ₹25 crore</p>
            </article>

            <article className="column">
              <h3>How long for</h3>
              <p>
                Twelve months to thirty years, and you choose the date it leaves your account. Move
                that date once a year, free, if your salary or billing cycle moves.
              </p>
              <p className="fineprint">12 – 360 months</p>
            </article>

            <article className="column">
              <h3>What it costs</h3>
              <p>
                Quoted in rupees as well as percent, because a rate is hard to feel and a total is
                not. On a fixed facility the rate is set on the day you sign and does not move.
              </p>
              <p className="fineprint">Fixed and floating both offered</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── the plain-English promise ────────────────────────────────────── */}
      <section className="band rail" id="plain">
        <p className="marginalia">Plain English</p>
        <div>
          <Reveal>
            <div className="stack">
              <h2 className="head">The same offer, written for a person.</h2>
              <p className="lede">
                Lending paperwork is written to satisfy a regulator, and it should be. But you
                should not have to decode it to know what you are agreeing to — so we print both,
                side by side, on every offer we bring you.
              </p>
            </div>
          </Reveal>

          <div className="translation">
            <div className="translation__before">
              <p className="fineprint">The representative example</p>
              <code>
                {inrShort(EG.amount)} over {EG.months} months @ {EG.rate}% p.a. (fixed).
                <br />
                {EG.months} monthly instalments of ₹{inr(emi)}.
                <br />
                Total charge for credit ₹{inr(totalInterest)}.
                <br />
                Total amount payable ₹{inr(totalRepayable)}.
              </code>
            </div>
            <div>
              <p className="fineprint">The same thing, in words</p>
              <p className="plain">
                You would pay ₹{inr(emi)} on the same date every month for three years. The
                borrowing costs you ₹{inr(totalInterest)} on top of the {inrShort(EG.amount)} — and
                you can end it early, for nothing, whenever you like.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── the panel, and what we arrange ───────────────────────────────── */}
      <section className="band rail" id="arrange">
        <p className="marginalia">What we arrange</p>
        <div>
          <Reveal>
            <div className="stack">
              <h2 className="head">Eleven facilities, one conversation.</h2>
              <p className="lede">
                We are not a lender. We hold a panel of banks and NBFCs, and our job is to know
                which of them says yes to a file like yours — and at what price.
              </p>
            </div>
          </Reveal>

          <div style={{ marginTop: '2.5rem' }}>
            {SERVICES.slice(0, 5).map((s) => (
              <Link className="entry" href={`/services/${s.slug}`} key={s.slug}>
                <h3>{s.name}</h3>
                <p>{s.shortDesc}</p>
                <span className="entry__rate">
                  {s.rateFrom}
                  <small>{s.rateFrom === 'Commission-based' ? 'priced on value' : 'from'}</small>
                </span>
              </Link>
            ))}
          </div>

          <div className="actions" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--quiet" href="/services">
              All eleven facilities
            </Link>
          </div>
        </div>
      </section>

      {/* ── the fee schedule, in full ────────────────────────────────────── */}
      <section className="band rail" id="cost">
        <p className="marginalia">The whole cost</p>
        <div>
          <Reveal>
            <div className="stack">
              <h2 className="head">The entire fee schedule fits on a postcard.</h2>
              <p className="lede">
                This is the whole list. There is no longer version of it filed somewhere else.
              </p>
            </div>
          </Reveal>

          <div className="table-scroll">
            <table className="table--fees">
              <thead>
                <tr>
                  <th scope="col">What it is</th>
                  <th scope="col">What it costs</th>
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

      {/* ── one step ─────────────────────────────────────────────────────── */}
      <section className="band rail" id="rate">
        <p className="marginalia">One step</p>
        <div className="stack">
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', maxWidth: '21ch' }}>
            Find out what you would actually be offered.
          </h2>
          <p className="lede">
            Answer seven questions and an adviser will call you within {SITE.responseTime} with the
            real rate, the real monthly payment, and the full schedule down to the last line —
            before you decide anything, and without leaving a mark on your credit file.
          </p>
          <div className="actions">
            <Link className="btn" href="/enquiry">
              Check your rate
            </Link>
            <a className="btn btn--quiet" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>
              Talk to someone first
            </a>
          </div>
          <p className="fineprint">
            {SITE.hours} &middot; A person answers
          </p>
        </div>
      </section>
    </div>
  )
}
