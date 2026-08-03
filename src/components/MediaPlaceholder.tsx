type Props = {
  kind?: 'image' | 'video'
  label?: string
  aspect?: string
  className?: string
  style?: React.CSSProperties
}

export default function MediaPlaceholder({
  kind = 'image',
  label,
  aspect = '4/3',
  className = '',
  style,
}: Props) {
  return (
    <div
      className={`media-ph ${kind === 'video' ? 'media-ph--video' : ''} ${className}`}
      style={{ aspectRatio: aspect, ...style }}
      aria-label={label ?? (kind === 'video' ? 'Video placeholder' : 'Image placeholder')}
      role="img"
    >
      {kind === 'video' ? (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="19,15 37,24 19,33" fill="currentColor" opacity="0.6" />
        </svg>
      ) : (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="34" height="34" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1 25l9-8 7 7 5-4 13 10" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      )}
      {label && <p className="media-ph__label">{label}</p>}
    </div>
  )
}
