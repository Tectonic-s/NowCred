import { Resend } from 'resend'
import { SITE } from '@/lib/data/content'

function client() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

const FROM = process.env.MAIL_FROM ?? 'NowCred <noreply@nowcred.in>'

/* The palette, repeated here as literals: email clients strip <style> blocks
   and have never heard of a custom property, so every colour has to be inline. */
const INK = '#00226D'
const SLATE = '#1a2a4a'
const TAUPE = '#6b7a99'
const SAND = '#ffffff'
const PAPER = '#f5f6fa'
const RULE = '#c8cfe8'

const SERIF = "'Hoefler Text', Baskerville, 'Palatino Linotype', Palatino, Georgia, serif"
const SANS = "'Segoe UI', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
const MONO = "'SF Mono', Menlo, Consolas, 'Courier New', monospace"

/** The NowCred wordmark: "Now" in navy, "Cred" in red, as table cells for email clients. */
function mark() {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="font-family:'Hoefler Text',Baskerville,Georgia,serif;font-size:22px;font-weight:700;letter-spacing:-0.01em;line-height:1">
      <span style="color:#ffffff">Now</span><span style="color:#F9002D">Cred</span>
    </td></tr>
  </table>`
}

function shell(inner: string) {
  return `<div style="background:${PAPER};padding:32px 16px;font-family:${SANS};color:${SLATE}">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto">
      <tr>
        <td style="background:${INK};padding:22px 28px">
          ${mark()}
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;border:1px solid ${RULE};border-top:none;padding:28px">
          ${inner}
        </td>
      </tr>
      <tr>
        <td style="padding:16px 4px;font-family:${MONO};font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:${TAUPE}">
          ${SITE.phone} &middot; ${SITE.email} &middot; ${SITE.hours}
        </td>
      </tr>
    </table>
  </div>`
}

export async function sendConfirmation({
  to,
  name,
  referenceId,
  facility,
}: {
  to: string
  name: string
  referenceId: string
  facility: string
}) {
  const inner = `
    <p style="margin:0 0 16px;font-size:15px;color:${SLATE}">Dear ${name},</p>
    <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:${SLATE}">
      We have your enquiry. An adviser will call you within <strong style="color:${INK}">${SITE.responseTime}</strong>
      to talk through what you need and what it would actually cost.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
      style="border-top:2px solid ${INK};border-bottom:1px solid ${RULE};margin-bottom:22px">
      <tr>
        <td style="padding:14px 0 6px;font-family:${MONO};font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${TAUPE}">
          Your reference
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 14px;font-family:${MONO};font-size:26px;letter-spacing:.08em;color:${INK}">
          ${referenceId}
        </td>
      </tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:13px">
      <tr>
        <td style="padding:6px 0;color:${TAUPE}">What you asked about</td>
        <td style="padding:6px 0;text-align:right;color:${INK};font-weight:600">${facility}</td>
      </tr>
    </table>
    <p style="margin:22px 0 0;font-size:13px;line-height:1.6;color:${TAUPE}">
      Quote that reference on any call or reply and we will find your file straight away.
      Nothing is committed and nothing has touched your credit file.
    </p>`

  return client().emails.send({
    from: FROM,
    to,
    subject: `We have your enquiry — ${referenceId}`,
    html: shell(inner),
  })
}

export async function sendAdminAlert({
  referenceId,
  name,
  phone,
  city,
  email,
  facility,
  loanAmount,
}: {
  referenceId: string
  name: string
  phone: string
  city: string
  /* Null when the customer chose to be phoned only. The alert still goes out —
     an enquiry without an email is not a lesser lead. */
  email: string | null
  facility: string
  loanAmount: string
}) {
  const to = process.env.NOTIFICATION_EMAIL ?? SITE.email
  const portal = `${process.env.NEXTAUTH_URL ?? 'http://localhost:5040'}/ippo-portal`

  const rows: [string, string][] = [
    ['Reference', referenceId],
    ['Name', name],
    ['Phone', phone],
    ['City', city || '—'],
    ['Email', email || 'Phone only'],
    ['Requirement', facility],
    ['Amount', loanAmount || '—'],
  ]

  const inner = `
    <p style="margin:0 0 18px;font-family:${SERIF};font-size:20px;color:${INK}">New enquiry</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
      style="font-size:13px;border-top:2px solid ${INK}">
      ${rows
        .map(
          ([label, value]) => `<tr>
            <td style="padding:10px 0;border-bottom:1px solid ${RULE};color:${TAUPE};width:38%">${label}</td>
            <td style="padding:10px 0;border-bottom:1px solid ${RULE};color:${INK};font-weight:600;font-family:${MONO}">${value}</td>
          </tr>`,
        )
        .join('')}
    </table>
    <p style="margin:24px 0 0">
      <a href="${portal}" style="display:inline-block;background:${INK};color:${PAPER};font-size:13px;
        padding:12px 22px;text-decoration:none;border-radius:2px">Open in the portal</a>
    </p>`

  return client().emails.send({
    from: FROM,
    to,
    subject: `${referenceId} — ${facility} — ${name}`,
    html: shell(inner),
  })
}
