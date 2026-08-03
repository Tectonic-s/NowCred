'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function LenderCard({ name, logo }: { name: string; logo?: string }) {
  const [imgError, setImgError] = useState(false)
  const showLogo = logo && !imgError

  return (
    <div className="lender-card">
      <div className="lender-card__logo">
        {showLogo ? (
          <Image
            src={logo}
            alt={name}
            fill
            style={{ objectFit: 'contain', padding: '1.25rem' }}
            sizes="180px"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="lender-card__icon">
            <path d="M24 6L44 20H4L24 6Z" fill="currentColor" opacity="0.45" />
            <rect x="4" y="20" width="40" height="3" rx="1" fill="currentColor" opacity="0.3" />
            <rect x="8"  y="23" width="4" height="13" rx="1" fill="currentColor" opacity="0.35" />
            <rect x="16" y="23" width="4" height="13" rx="1" fill="currentColor" opacity="0.35" />
            <rect x="24" y="23" width="4" height="13" rx="1" fill="currentColor" opacity="0.35" />
            <rect x="32" y="23" width="4" height="13" rx="1" fill="currentColor" opacity="0.35" />
            <rect x="4"  y="36" width="40" height="3" rx="1" fill="currentColor" opacity="0.3" />
          </svg>
        )}
      </div>

      <div className="lender-card__name">
        <span>{name}</span>
      </div>
    </div>
  )
}
