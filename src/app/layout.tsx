import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import Shell from '@/components/Shell'
import { SITE } from '@/lib/data/content'

/* Stardom (Fontshare) is loaded via <link> in the layout below — next/font
   does not support third-party CDNs outside Google Fonts. */

const DESCRIPTION =
  `${SITE.brand} is a financial advisory and loan facilitation firm. With ${SITE.experienceYears} years of ` +
  `industry expertise, we help you find the right financial solution from leading banks and financial ` +
  `institutions — matched to your profile, across ${SITE.region.primary}.`

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:5040'),
  title: {
    default: `${SITE.brand} — your trusted financial partner`,
    template: `%s — ${SITE.brand}`,
  },
  description: DESCRIPTION,
  keywords: [
    'financial advisory',
    'loan consultant',
    'home loan',
    'loan against property',
    'business loan',
    SITE.region.primary,
    ...SITE.region.cities,
  ],
  openGraph: {
    title: `${SITE.brand} — your trusted financial partner`,
    description: `${SITE.experienceYears} years of financial expertise, applied to your requirement.`,
    type: 'website',
    locale: 'en_IN',
    siteName: SITE.legalName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.brand} — your trusted financial partner`,
    description: `${SITE.experienceYears} years of financial expertise, applied to your requirement.`,
  },
  /* Nothing on this site should be indexed until the placeholder contact and
     registration details in content.ts are replaced with the real ones. Flip
     this to true when that is done. */
  robots: { index: false, follow: false },
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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1e' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=stardom@700&display=swap"
        />
      </head>
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  )
}
