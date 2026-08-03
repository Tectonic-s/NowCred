import type { Metadata } from 'next'
import { SITE } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'What Ippo Loan does with the information you give us, and what it does not do.',
}

/* ─────────────────────────────────────────────────────────────────────────────
   PLACEHOLDER — this is a plain-English skeleton, not legal advice and not a
   compliant notice. It must be reviewed against the DPDP Act 2023 and whatever
   your lender agreements require before launch. The bracketed items are
   decisions only you can make.
   ───────────────────────────────────────────────────────────────────────────── */

export default function PrivacyPage() {
  return (
    <div className="sheet">
      <header className="pagehead">
        <p className="fineprint">Last updated — TODO</p>
        <h1>Privacy policy</h1>
        <p className="lede">
          What we do with what you tell us. Written to be read, not to be survived.
        </p>
      </header>

      <section className="band rail" style={{ borderTop: 'none' }}>
        <p className="marginalia">In short</p>
        <div className="prose">
          <p>
            We collect what we need to find you a lender, we share it with the lenders we approach
            on your behalf, and we do not sell it to anybody. That is the whole shape of it. The
            detail follows.
          </p>

          <h2>Who we are</h2>
          <p>
            {SITE.legalName} (&ldquo;{SITE.shortName}&rdquo;), CIN {SITE.cin}, of TODO — registered
            address. We are the data fiduciary for the information described here. Reach us at{' '}
            {SITE.email} or {SITE.phone}.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>What you type into the enquiry form: name, mobile number, email, what you do, what facility you want, how much, and anything you write in the message box.</li>
            <li>What you tell an adviser on a call, which we add to the same file.</li>
            <li>Documents you send us so a lender can assess you — identity, income, and property or business papers.</li>
            <li>TODO — confirm whether analytics or session recording is in use, and name the processor if so.</li>
          </ul>

          <h2>Why we hold it</h2>
          <ul>
            <li>To work out which lenders would consider your file and at what price.</li>
            <li>To make an application to the lender you choose.</li>
            <li>To contact you about that enquiry. We do not add you to a marketing list off the back of it.</li>
            <li>To keep the records our lender agreements and TODO — applicable regulation require us to keep.</li>
          </ul>

          <h2>Who sees it</h2>
          <p>
            The lenders we approach on your behalf, and only those. Each of them is responsible for
            what they then do with it under their own notice. We also use TODO — name your hosting,
            email, and database providers, who process it on our instructions and cannot use it for
            anything else. We do not sell your information and we do not pass it to lead brokers.
          </p>

          <h2>How long we keep it</h2>
          <p>
            TODO — state the retention period, and separate the case where a facility completes
            (records usually kept for a set number of years) from the case where it does not
            (usually shorter).
          </p>

          <h2>What you can ask for</h2>
          <ul>
            <li>A copy of what we hold about you.</li>
            <li>Correction of anything wrong.</li>
            <li>Deletion, where we are not required to keep it.</li>
            <li>Withdrawal of your consent to be contacted, at any time.</li>
          </ul>
          <p>
            Email {SITE.email} and we will answer within TODO — state your service level. If you are
            not satisfied you can complain to TODO — name the relevant authority.
          </p>

          <h2>Your credit file</h2>
          <p>
            Checking your eligibility uses a soft search, which other lenders cannot see and which
            does not affect your score. A hard search — the kind that is recorded — only happens
            once you have chosen an offer and told us to proceed. We will say so explicitly before
            it happens.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes materially we will say so on this page and date it above.
          </p>
        </div>
      </section>
    </div>
  )
}
