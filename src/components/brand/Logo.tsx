import Link from 'next/link'
import { clsx } from 'clsx'

type LogoProps = {
  className?: string
  compact?: boolean
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/lbw-logo.png"
      alt="LBW Sports — Play to live fit"
      className={clsx('w-auto object-contain object-left', className)}
    />
  )
}

export function Logo({ className, compact }: LogoProps) {
  return (
    <Link href="/" className={clsx('inline-flex shrink-0 items-center', className)} aria-label="LBW Sports home">
      <LogoMark className={compact ? 'h-12' : 'h-[4.35rem] md:h-[5.15rem]'} />
    </Link>
  )
}
