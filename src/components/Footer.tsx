import Link from 'next/link'
import Mark from '@/components/Mark'
import { SITE } from '@/lib/data/content'
import { SERVICES } from '@/lib/data/services'

export default function Footer() {
  return (
    <footer className="colophon">
      <div className="sheet">
        <div className="colophon__inner">
          <Link className="wordmark" href="/" aria-label={`${SITE.brand}, back to top`}>
            <Mark size={28} />
          </Link>

          <div className="colophon__links">
            <div>
              <h4>Borrowing</h4>
              <ul>
                <li>
                  <Link href="/enquiry">Talk to an expert</Link>
                </li>
                <li>
                  <Link href="/services">Solutions</Link>
                </li>
                {SERVICES.slice(0, 3).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <Link href="/about">About us</Link>
                </li>
                <li>
                  <Link href="/partners">Lender panel</Link>
                </li>
                <li>
                  <Link href="/about#fees">How we get paid</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Help</h4>
              <ul>
                <li>
                  <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <Link href="/privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of service</Link>
                </li>
              </ul>
            </div>
          </div>

          <p className="legal">
            {SITE.legalName} arranges credit; it does not lend. We are paid a commission by the lender
            when a facility completes, and we will tell you which lender and how much before you
            commit to anything. Rates and figures shown across this site are representative examples
            — the rate you are offered depends on your circumstances and may be higher. Missing
            payments can affect your credit score and make borrowing harder later; if you are
            struggling, call us before the payment is due. CIN {SITE.cin}. © {new Date().getFullYear()}{' '}
            {SITE.legalName}.
          </p>
        </div>
      </div>
    </footer>
  )
}
