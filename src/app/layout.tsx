import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import Shell from '@/components/Shell'
import { SITE } from '@/lib/data/content'

/* No next/font here on purpose. The type stack is composed of faces that ship
   with the OS (see globals.css) — loading a webfont would put a network
   round-trip in front of the first paint for no gain. */

export const metadata: Metadata = {
  title: {
    default: `${SITE.brand} — a loan you can see the end of`,
    template: `%s — ${SITE.brand}`,
  },
  description:
    'Ippo arranges personal, property, and business loans across a panel of banks and NBFCs — and shows you the whole repayment schedule, down to the last line, before you sign.',
  openGraph: {
    title: `${SITE.brand} — a loan you can see the end of`,
    description: 'The whole schedule, in plain English, before you sign.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Never block zoom: a lending site has to stay legible to people who need
  // to pinch in, and a maximum-scale lock is an accessibility failure.
  maximumScale: 5,
  // Paints the mobile browser chrome to match the page in both themes, so the
  // status bar does not sit on a white strip above a sand or ink ground.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#efe7d4' },
    { media: '(prefers-color-scheme: dark)', color: '#1b2129' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  )
}
