const items = [
  'Cricket',
  'Badminton',
  'Team jerseys',
  'English willow',
  'Shuttlecocks',
  'Hanamkonda',
  'Mancherial',
  'Match kits',
]

type Props = {
  tone?: 'light' | 'dark'
}

export function MotionMarquee({ tone = 'light' }: Props) {
  const row = [...items, ...items]

  return (
    <div
      className={
        tone === 'dark'
          ? 'overflow-hidden border-y border-white/10 bg-pitch-deep py-4 text-white'
          : 'overflow-hidden border-y border-foreground/10 bg-mist py-3.5 text-foreground'
      }
    >
      <div className="marquee-track flex w-max items-center gap-8">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="font-display text-2xl tracking-[0.18em] md:text-3xl">{item}</span>
            <span className="h-2 w-2 rounded-full bg-orange" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
