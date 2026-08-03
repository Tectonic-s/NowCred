/**
 * Four descending bars: steps down, and a balance going down. "Ippo" (一歩)
 * means one step, and a loan's whole job is to reach zero — the mark says both.
 *
 * The bar colours are tokens, not literals, so the mark inverts with the theme
 * instead of disappearing into a dark ground.
 */
export default function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg
      className="mark"
      width={(size * 20) / 22}
      height={size}
      viewBox="0 0 20 22"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="20" height="4" fill="var(--mark-1)" />
      <rect x="0" y="6" width="15" height="4" fill="var(--mark-2)" />
      <rect x="0" y="12" width="10" height="4" fill="var(--mark-3)" />
      <rect x="0" y="18" width="5" height="4" fill="var(--mark-4)" />
    </svg>
  )
}
