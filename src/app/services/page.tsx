import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES, CATEGORY_ORDER } from '@/lib/data/services'

export const metadata: Metadata = {
  title: 'What we arrange',
  description:
    'Eleven credit facilities — secured and unsecured, personal, property, vehicle, equipment, working capital, and trade — arranged across a panel of banks and NBFCs.',
}

export default function ServicesPage() {
  // Drive the order from CATEGORY_ORDER, but never silently drop a product
  // whose category was added to the data and not to the order list.
  const known = CATEGORY_ORDER.filter((c) => SERVICES.some((s) => s.category === c))
  const rest = Array.from(new Set(SERVICES.map((s) => s.category))).filter(
    (c) => !known.includes(c),
  )
  const categories = [...known, ...rest]

  return (
    <div className="sheet">
      <header className="pagehead">
        <p className="fineprint">Eleven facilities</p>
        <h1>What we arrange, and roughly what it costs.</h1>
        <p className="lede">
          We are not a lender. Each of these is placed with a bank or an NBFC from our panel — the
          rate shown is the lowest any of them currently offers, and the one you get depends on your
          file. Every product page carries a worked example with a real schedule.
        </p>
      </header>

      {categories.map((category) => (
        <section className="band band--tight" key={category} style={{ borderTop: 'none' }}>
          <div className="catrule">
            <h2>{category}</h2>
          </div>

          {SERVICES.filter((s) => s.category === category).map((s) => (
            <Link className="entry" href={`/services/${s.slug}`} key={s.slug}>
              <h3>{s.name}</h3>
              <p>{s.shortDesc}</p>
              <span className="entry__rate">
                {s.rateFrom}
                <small>{s.rateFrom === 'Commission-based' ? 'priced on value' : 'from'}</small>
              </span>
            </Link>
          ))}
        </section>
      ))}

      <section className="band rail">
        <p className="marginalia">Not sure?</p>
        <div className="stack">
          <h2 className="head">Most people pick the wrong one first.</h2>
          <p className="lede">
            The cheapest facility you qualify for is often not the one you came looking for — a
            property-secured loan usually beats an unsecured one by several percent. Tell us what
            the money is for and we will tell you which of these fits, including when the answer is
            &ldquo;none of them, don&rsquo;t borrow for this&rdquo;.
          </p>
          <div className="actions">
            <Link className="btn" href="/enquiry">
              Check your rate
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
