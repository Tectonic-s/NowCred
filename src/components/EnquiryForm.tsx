'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BUSINESS_TYPES, AMOUNT_RANGES } from '@/lib/data/content'
import { FACILITIES } from '@/lib/data/services'

interface FormState {
  name: string
  phone: string
  email: string
  businessType: string
  facility: string
  loanAmount: string
  turnover: string
  message: string
  consent: boolean
}

export default function EnquiryForm({ defaultFacility = '' }: { defaultFacility?: string }) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    facility: defaultFacility,
    loanAmount: '',
    turnover: '',
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "That address is missing an @ or a domain — check it and we'll send the reference there."
    if (!form.businessType) e.businessType = 'Pick the closest description.'
    if (!form.facility) e.facility = "Pick one, or choose “Not sure” and we'll work it out on the call."
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
          {errors.email && (
            <p className="err" id="email-err">
              {errors.email}
            </p>
          )}
        </div>

        <div className={field('businessType')}>
          <label htmlFor="businessType">What you do</label>
          <select
            id="businessType"
            className="select"
            value={form.businessType}
            onChange={(e) => set('businessType', e.target.value)}
            aria-invalid={!!errors.businessType}
            aria-describedby={describedBy('businessType')}
          >
            <option value="">Select</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p className="err" id="businessType-err">
              {errors.businessType}
            </p>
          )}
        </div>
      </div>

      <div className="form__pair">
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
            {FACILITIES.map((f) => (
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

        <div className="field">
          <label htmlFor="loanAmount">How much (optional)</label>
          <select
            id="loanAmount"
            className="select"
            value={form.loanAmount}
            onChange={(e) => set('loanAmount', e.target.value)}
          >
            <option value="">Select a range</option>
            {AMOUNT_RANGES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="turnover">Annual income or turnover (optional)</label>
        <select
          id="turnover"
          className="select"
          value={form.turnover}
          onChange={(e) => set('turnover', e.target.value)}
        >
          <option value="">Select a range</option>
          {AMOUNT_RANGES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Anything we should know (optional)</label>
        <textarea
          id="message"
          className="textarea"
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="What the money is for, when you need it, anything a lender might ask about."
        />
      </div>

      <div className={errors.consent ? 'field field--invalid' : 'field'}>
        <label className="consent">
          <input
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
            , and I&rsquo;m happy for Ippo to contact me about this enquiry.
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
        {loading ? 'Sending…' : 'Send enquiry'}
      </button>

      <p className="fineprint">
        Nothing is committed &middot; No mark on your credit file
      </p>
    </form>
  )
}
