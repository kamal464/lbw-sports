'use client'

import Link from 'next/link'
import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

type Props = {
  href: string
  children: ReactNode
  className?: string
  variant?: 'lime' | 'ghost' | 'orange' | 'whatsapp' | 'ghost-light'
  external?: boolean
}

export function MagneticButton({
  href,
  children,
  className,
  variant = 'lime',
  external,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    setOffset({
      x: (e.clientX - r.left - r.width / 2) * 0.25,
      y: (e.clientY - r.top - r.height / 2) * 0.25,
    })
  }

  const classes = clsx(
    'inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold uppercase tracking-[0.16em] transition',
    variant === 'lime' && 'bg-lime text-white hover:bg-pitch-deep',
    variant === 'ghost' && 'border border-foreground/25 text-foreground hover:border-lime hover:text-lime',
    variant === 'ghost-light' && 'border border-white/40 text-white hover:border-white hover:bg-white/10',
    variant === 'orange' && 'bg-orange text-white hover:bg-foreground',
    variant === 'whatsapp' && 'bg-[#25D366] text-black hover:brightness-110',
    className,
  )

  return (
    <motion.div animate={{ x: offset.x, y: offset.y }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}>
      {external ? (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noreferrer"
          onMouseMove={onMove}
          onMouseLeave={() => setOffset({ x: 0, y: 0 })}
          className={classes}
        >
          {children}
        </a>
      ) : (
        <Link
          ref={ref}
          href={href}
          onMouseMove={onMove}
          onMouseLeave={() => setOffset({ x: 0, y: 0 })}
          className={classes}
        >
          {children}
        </Link>
      )}
    </motion.div>
  )
}
