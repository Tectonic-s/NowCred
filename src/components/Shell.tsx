'use client'

import { usePathname } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

/**
 * The portal is a tool, not a marketing page — it gets no site chrome.
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith('/ippo-portal')) return <>{children}</>

  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
