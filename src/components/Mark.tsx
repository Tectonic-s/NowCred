/**
 * NowCred logotype — "Now" in navy, "Cred" in red, set in Stardom (Fontshare).
 * Rendered as HTML so the font loads from the CDN link in layout.tsx.
 */
export default function Mark({ size = 28 }: { size?: number }) {
  return (
    <span
      className="mark"
      style={{
        fontFamily: 'var(--f-logo)',
        fontSize: `${size}px`,
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.01em',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <span style={{ color: '#00226D' }}>Now</span>
      <span style={{ color: '#F9002D' }}>Cred</span>
    </span>
  )
}
