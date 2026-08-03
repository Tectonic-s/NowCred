import type { Metadata } from 'next'
import { SITE } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'The terms on which Ippo Loan arranges credit, and the limits of what we do.',
}

/* ─────────────────────────────────────────────────────────────────────────────
   PLACEHOLDER — a plain-English skeleton, not legal advice. Every TODO is a
   decision for you and your counsel. The representative-example wording in
   particular is regulated copy and must match what you are entitled to say.
   ───────────────────────────────────────────────────────────────────────────── */

export default function TermsPage() {
  return (
    <div className="sheet">
      <header className="pagehead">
        <p className="fineprint">Last updated — TODO</p>
        <h1>Terms of service</h1>
        <p className="lede">
          What we do, what we do not do, and what you can hold us to.
        </p>
      </header>

      <section className="band rail" style={{ borderTop: 'none' }}>
        <p className="marginalia">The terms</p>
        <div className="prose">
          <h2>We arrange credit — we do not lend it</h2>
          <p>
            {SITE.legalName} introduces you to lenders. Every rupee comes from a bank or an NBFC on
            our panel, under a contract between you and them. We are not a party to that contract
            and we cannot approve, decline, price, or vary a facility.
          </p>

          <h2>How we are paid</h2>
          <p>
            You pay us nothing. The lender pays us a commission when a facility completes. We will
            tell you the lender and the amount before you commit, on every offer we bring you. We
            are paid only on completion, which means we have a commercial interest in your saying
            yes — we disclose it so you can weigh our advice knowing that.
          </p>

          <h2>What the figures on this site mean</h2>
          <p>
            Every rate, schedule, and worked example published here is a representative example. It
            is not an offer, a quote, or a promise. The rate you are offered depends on your
            circumstances, the lender, and the facility, and it may be higher than the figure shown.
            TODO — confirm the exact representative-APR wording you are entitled to publish, and the
            proportion of accepted applicants who must receive it.
          </p>

          <h2>What we need from you</h2>
          <ul>
            <li>Information that is true and complete. A lender that discovers otherwise will decline the file, and it may be recorded.</li>
            <li>Documents that are genuine and current.</li>
            <li>Prompt answers to lender queries — most delays come from here rather than from the lender.</li>
          </ul>

          <h2>Eligibility and credit searches</h2>
          <p>
            Checking your rate uses a soft search that other lenders cannot see. A hard search is
            made only after you choose an offer and instruct us to proceed. We will tell you before
            that happens.
          </p>

          <h2>Borrowing has consequences</h2>
          <p>
            Missing payments can affect your credit score and make borrowing harder and more
            expensive later. On a secured facility, the property or asset given as security is at
            risk if you do not keep up repayments. If you are struggling, call us before the payment
            is due — early is the only time anything useful can be done.
          </p>

          <h2>What we are not liable for</h2>
          <p>
            A lender&rsquo;s decision, a lender&rsquo;s conduct, or a valuation or legal opinion
            produced by a third party. TODO — have counsel set the liability cap and the exclusions.
          </p>

          <h2>Complaints</h2>
          <p>
            Email {SITE.email} or call {SITE.phone}. We will acknowledge within TODO and respond
            within TODO. If you are not satisfied you may refer the matter to TODO — name the
            relevant ombudsman or authority.
          </p>

          <h2>Governing law</h2>
          <p>TODO — jurisdiction and governing law.</p>
        </div>
      </section>
    </div>
  )
}
