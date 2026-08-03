'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { REQUIREMENT_TYPES, AMOUNT_RANGES, SITE } from '@/lib/data/content'

/* First contact asks for five things and no more.

   Everything an adviser actually needs — business vintage, obligations,
   turnover, security available — comes out of the call, where the answers are
   better and the customer is not guessing at a dropdown. A long form on a page
   like this does not qualify the lead, it loses it.

   Email stays on the form but stays optional: some people would rather only be
   phoned, and refusing their enquiry over a missing email address is a
   self-inflicted wound. */

interface FormState {
  name: string
  phone: string
  city: string
  facility: string
  loanAmount: string
  email: string
  message: string
  consent: boolean
}

export default function EnquiryForm({ defaultFacility = '' }: { defaultFacility?: string }) {
  const router = useRouter()

  /* A value the select has no option for renders as blank, which would leave a
     required field looking answered when it is not. Anything unrecognised —
     a stale link, a hand-edited query string — falls back to empty so the
     customer is asked properly. */
  const prefill = REQUIREMENT_TYPES.includes(defaultFacility) ? defaultFacility : ''

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    city: '',
    facility: prefill,
    loanAmount: '',
    email: '',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }))

  /** Errors say what is wrong and how to fix it — never just "invalid". */
  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'We need a name to put on the file.'
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, '')))
      e.phone = 'Ten digits, starting 6 to 9. No country code needed.'
    if (!form.city.trim())
      e.city = 'The town or city you are in — it decides which lenders can help.'
    if (!form.facility)
      e.facility = 'Pick the closest one, or choose “Not sure” and we will work it out on the call.'
    if (!form.loanAmount) e.loanAmount = 'A rough range is enough. It can change later.'
    // Only validated when filled in, because it is optional.
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'That address is missing an @ or a domain — check it, or leave it blank.'
    if (!form.consent) e.consent = 'We need your agreement before we can call you.'
    return e
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Move focus to the first problem rather than leaving the reader to hunt.
      const first = document.getElementById(Object.keys(errs)[0])
      first?.focus()
      return
    }

    setErrors({})
    setLoading(true)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (data.success) {
        router.push(`/thank-you?ref=${data.referenceId}`)
        return
      }

      setErrors({
        submit:
          res.status === 429
            ? 'That is a few tries in quick succession. Wait a minute and send it again.'
            : data.error ?? 'Something went wrong at our end. Try again in a moment.',
      })
    } catch {
      setErrors({ submit: 'That did not reach us — check your connection and send it again.' })
    } finally {
      setLoading(false)
    }
  }

  const field = (key: string) => `field${errors[key] ? ' field--invalid' : ''}`
  const describedBy = (key: string) => (errors[key] ? `${key}-err` : undefined)

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form__pair">
        <div className={field('name')}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            className="input"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy('name')}
            autoComplete="name"
          />
          {errors.name && (
            <p className="err" id="name-err">
              {errors.name}
            </p>
          )}
        </div>

        <div className={field('phone')}>
          <label htmlFor="phone">Mobile number</label>
          <input
            id="phone"
            className="input"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone')}
            autoComplete="tel-national"
          />
          {errors.phone && (
            <p className="err" id="phone-err">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="form__pair">
        <div className={field('city')}>
          <label htmlFor="city">Town or city</label>
          <input
            id="city"
            className="input"
            value={form.city}
            onChange={(e) => set('city', e.target.value)}
            aria-invalid={!!errors.city}
            aria-describedby={describedBy('city')}
            autoComplete="address-level2"
            list="city-suggestions"
          />
          {/* Suggestions, not a closed list — enquiries come from towns that are
              not on it, and a select would turn those people away. */}
          <datalist id="city-suggestions">
            {SITE.region.cities.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          {errors.city && (
            <p className="err" id="city-err">
              {errors.city}
            </p>
          )}
        </div>

        <div className={field('facility')}>
          <label htmlFor="facility">What you need</label>
          <select
            id="facility"
            className="select"
            value={form.facility}
            onChange={(e) => set('facility', e.target.value)}
            aria-invalid={!!errors.facility}
            aria-describedby={describedBy('facility')}
          >
            <option value="">Select</option>
            {REQUIREMENT_TYPES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          {errors.facility && (
            <p className="err" id="facility-err">
              {errors.facility}
            </p>
          )}
        </div>
      </div>

      <div className={field('loanAmount')}>
        <label htmlFor="loanAmount">Approximately how much</label>
        <select
          id="loanAmount"
          className="select"
          value={form.loanAmount}
          onChange={(e) => set('loanAmount', e.target.value)}
          aria-invalid={!!errors.loanAmount}
          aria-describedby={describedBy('loanAmount')}
        >
          <option value="">Select a range</option>
          {AMOUNT_RANGES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errors.loanAmount && (
          <p className="err" id="loanAmount-err">
            {errors.loanAmount}
          </p>
        )}
      </div>

      {/* Folded away rather than removed. Someone who wants to explain their
          situation up front should be able to, without it being the price of
          entry for everyone else. */}
      <details className="more">
        <summary>Add an email or a note (optional)</summary>
        <div className="more__body">
          <div className={field('email')}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy('email')}
              autoComplete="email"
            />
            <p className="hint">
              We send your reference number here. Leave it blank to be phoned only.
            </p>
            {errors.email && (
              <p className="err" id="email-err">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="message">Anything we should know</label>
            <textarea
              id="message"
              className="textarea"
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              placeholder="What the money is for, when you need it, or anything you would rather say before the call."
            />
          </div>
        </div>
      </details>

      <div className={errors.consent ? 'field field--invalid' : 'field'}>
        <label className="consent">
          <input
            id="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy('consent')}
          />
          <span>
            I&rsquo;ve read the{' '}
            <a className="textlink" href="/privacy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>{' '}
            and the{' '}
            <a className="textlink" href="/terms" target="_blank" rel="noopener noreferrer">
              terms
            </a>
            , and I&rsquo;m happy for {SITE.shortName} to contact me about this enquiry.
          </span>
        </label>
        {errors.consent && (
          <p className="err" id="consent-err">
            {errors.consent}
          </p>
        )}
      </div>

      {errors.submit && (
        <p className="notice" role="alert">
          {errors.submit}
        </p>
      )}

      <button className="btn btn--block" type="submit" disabled={loading}>
        {loading ? 'Sending…' : 'Request a consultation'}
      </button>

      <p className="fineprint">
        Nothing is committed &middot; No application is made on your behalf
      </p>
    </form>
  )
}
