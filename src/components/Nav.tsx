'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Mark from '@/components/Mark'
import { SITE, NAV_LINKS } from '@/lib/data/content'

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the drawer on navigation, otherwise it stays open over the new page.
  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="masthead">
      <div className="sheet">
        <div className="masthead__inner">
          <Link className="wordmark" href="/">
            <Mark size={28} />
          </Link>

          <nav className="nav" aria-label="Main">
            <span className="nav__desktop">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </span>

            {/* Hidden on phones by CSS — it collides with the wordmark there,
                and the drawer carries it instead. */}
            <Link className="btn nav__cta" href="/enquiry">
              Talk to an expert
            </Link>

            <button
              type="button"
              className="nav__toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-drawer"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </nav>
        </div>

        {open && (
          <div className="nav__drawer" id="nav-drawer">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link className="btn" href="/enquiry" style={{ marginTop: '1rem' }}>
              Talk to an expert
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
