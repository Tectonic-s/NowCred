import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomInt } from 'crypto'

// In-memory rate limiter: max 5 submissions per IP per 60s.
// Entries are pruned on every request so the map cannot grow without bound.
const rateLimitMap = new Map<string, { count: number; ts: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  for (const [key, val] of rateLimitMap) {
    if (now - val.ts > RATE_WINDOW_MS) rateLimitMap.delete(key)
  }
  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.ts > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, ts: now })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

// Ambiguous glyphs (I, O, 0, 1) are left out: this reference gets read down a
// phone line, so it has to survive being spoken and written back.
const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function genRef(): string {
  let r = 'IP-'
  for (let i = 0; i < 6; i++) r += REF_ALPHABET[randomInt(REF_ALPHABET.length)]
  return r
}

export async function POST(req: NextRequest) {
  try {
    // Last value in x-forwarded-for is the one set by the trusted edge; earlier
    // values can be prepended by the client to spoof an identity.
    const ip = req.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() ?? '127.0.0.1'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const { name, phone, city, facility, loanAmount, email, message, consent } = body

    /* Mirrors the five fields the form asks for, plus consent. Email is
       deliberately not required — see the note in EnquiryForm. These strings
       are shown to the customer verbatim, so they are written for a person
       rather than for a log. */
    if (!name?.trim())
      return NextResponse.json({ error: 'Please tell us your name.' }, { status: 400 })
    if (!/^[6-9]\d{9}$/.test(String(phone ?? '').replace(/[\s-]/g, '')))
      return NextResponse.json(
        { error: 'That mobile number does not look right — ten digits, starting 6 to 9.' },
        { status: 400 },
      )
    if (!city?.trim())
      return NextResponse.json({ error: 'Please tell us which town or city you are in.' }, { status: 400 })
    if (!facility)
      return NextResponse.json({ error: 'Please choose what you need.' }, { status: 400 })
    if (!loanAmount)
      return NextResponse.json({ error: 'Please choose a rough amount.' }, { status: 400 })
    if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return NextResponse.json(
        { error: 'That email address is not valid — check it, or leave it blank.' },
        { status: 400 },
      )
    if (!consent)
      return NextResponse.json({ error: 'We need your agreement before we can contact you.' }, { status: 400 })

    const enquiry = await prisma.enquiry.create({
      data: {
        referenceId: genRef(),
        name: name.trim().slice(0, 120),
        phone: phone.trim().slice(0, 20),
        city: city.trim().slice(0, 80),
        facility,
        loanAmount: String(loanAmount).slice(0, 50),
        email: email?.trim().toLowerCase().slice(0, 254) || null,
        message: message?.trim().slice(0, 1000) || null,
      },
    })

    // A mail outage must not lose us the lead — it is already saved above.
    try {
      const { sendConfirmation, sendAdminAlert } = await import('@/lib/email')
      await Promise.allSettled([
        // No address given means no confirmation to send — that is a valid
        // enquiry, not a failure.
        enquiry.email
          ? sendConfirmation({
              to: enquiry.email,
              name: enquiry.name,
              referenceId: enquiry.referenceId,
              facility: enquiry.facility,
            })
          : Promise.resolve(),
        sendAdminAlert({
          referenceId: enquiry.referenceId,
          name: enquiry.name,
          phone: enquiry.phone,
          city: enquiry.city,
          email: enquiry.email,
          facility: enquiry.facility,
          loanAmount: enquiry.loanAmount,
        }),
      ])
    } catch {
      /* email failure must not block the response */
    }

    return NextResponse.json({ success: true, referenceId: enquiry.referenceId })
  } catch (err) {
    console.error('[POST /api/enquiry]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
