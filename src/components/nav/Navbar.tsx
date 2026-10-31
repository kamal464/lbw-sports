'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/brand/Logo'
import { brand } from '@/lib/stores'
import { isCricketPath } from '@/lib/theme'
import { whatsappUrl } from '@/lib/whatsapp'
import { clsx } from 'clsx'

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Gear' },
  { href: '/shop/cricket', label: 'Cricket' },
  { href: '/#sports', label: 'Sports' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const cricketTheme = isCricketPath(pathname)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50',
        cricketTheme ? 'bg-[#0a0a0a]' : 'bg-white shadow-[0_1px_0_0_rgba(28,47,122,0.12)]',
      )}
    >
      <div className={clsx('relative overflow-hidden', cricketTheme ? 'xforcz-topbar' : 'lbw-topbar')}>
        <div
          className={clsx('pointer-events-none absolute inset-0', cricketTheme ? 'xforcz-topbar-shine' : 'lbw-topbar-shine')}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-3 py-2 md:justify-between md:px-6">
          <p
            className={clsx(
              'flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[11px] font-bold tracking-[0.08em] md:text-left md:text-xs',
              cricketTheme ? 'text-[#f5d76e]' : 'uppercase tracking-[0.22em] text-[#f6e7a5] md:tracking-[0.28em]',
            )}
          >
            {cricketTheme ? (
              <>
                <img src={brand.cricketBrandMark} alt="" className="h-6 w-auto object-contain" />
                <span className="font-extrabold italic tracking-[0.18em] text-[#f5d76e]">{brand.cricketBrand}™</span>
                <span className="hidden text-[#f5d76e]/50 sm:inline">·</span>
                <span className="font-semibold normal-case tracking-wide text-white/85">{brand.fullForm}</span>
              </>
            ) : (
              <>
                <span className="rounded-sm bg-[#e0b000] px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#10204f]">
                  LBW
                </span>
                <span className="hidden text-[#e0b000]/70 sm:inline" aria-hidden>
                  ·
                </span>
                <span className="normal-case tracking-wide">{brand.fullForm}</span>
              </>
            )}
          </p>
          <p
            className={clsx(
              'hidden text-[10px] font-semibold uppercase tracking-[0.2em] md:block',
              cricketTheme ? 'text-[#f5d76e]/70' : 'text-white/70',
            )}
          >
            Hanamkonda · Mancherial
          </p>
        </div>
      </div>

      <div className={clsx('border-b-[3px]', cricketTheme ? 'border-[#c9a227]' : 'border-[#1c2f7a]')}>
        <div className="mx-auto flex h-[4.85rem] max-w-7xl items-center gap-4 px-3 md:h-[5.75rem] md:gap-6 md:px-6">
          <Logo />
          {cricketTheme && (
            <img
              src={brand.cricketBrandMark}
              alt="X-FORCZ"
              className="hidden h-12 w-auto object-contain sm:block md:h-14"
            />
          )}

          <nav className="ml-8 hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  'group relative text-sm font-semibold uppercase tracking-[0.14em] transition',
                  cricketTheme
                    ? pathname === link.href
                      ? 'text-[#f5d76e]'
                      : 'text-white/70 hover:text-[#f5d76e]'
                    : pathname === link.href
                      ? 'text-[#1c2f7a]'
                      : 'text-foreground/70 hover:text-[#1c2f7a]',
                )}
              >
                {link.label}
                <span
                  className={clsx(
                    'absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100',
                    cricketTheme ? 'bg-[#f5d76e]' : 'bg-[#e0b000]',
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black sm:inline-flex hover:brightness-110"
            >
              WhatsApp
            </a>
            <button
              type="button"
              className={clsx(
                'grid h-10 w-10 place-items-center border lg:hidden',
                cricketTheme ? 'border-[#f5d76e]/40 text-[#f5d76e]' : 'border-[#1c2f7a]/20 text-[#1c2f7a]',
              )}
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? '×' : '≡'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={clsx(
              'border-t px-4 py-6 lg:hidden',
              cricketTheme ? 'border-[#f5d76e]/20 bg-[#111]' : 'border-foreground/8 bg-mist',
            )}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            aria-label="Mobile"
          >
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'font-display text-3xl tracking-wide',
                      cricketTheme ? 'text-white hover:text-[#f5d76e]' : 'text-foreground hover:text-lime',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex bg-[#25D366] px-4 py-3 text-sm font-bold uppercase tracking-wider text-black"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
