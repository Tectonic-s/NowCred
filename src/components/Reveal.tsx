'use client'

import { useEffect, useRef } from 'react'

/**
 * One reveal, used sparingly. Anything already on screen at mount is shown
 * immediately rather than animated — a fade that fires on content the reader
 * is already looking at reads as a bug.
 */
export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.shown = 'true'
      return
    }

    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.dataset.shown = 'true'
      return
    }

    let timer: ReturnType<typeof setTimeout>
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        timer = setTimeout(() => {
          el.dataset.shown = 'true'
        }, delay)
        obs.disconnect()
      },
      { threshold: 0.12 },
    )

    obs.observe(el)
    return () => {
      obs.disconnect()
      clearTimeout(timer)
    }
  }, [delay])

  return (
    <div className="reveal" ref={ref} data-shown="false">
      {children}
    </div>
  )
}
