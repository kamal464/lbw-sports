'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/brand/Logo'
import { brand } from '@/lib/stores'
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

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-[0_1px_0_0_rgba(28,47,122,0.12)]">
      <div className="lbw-topbar relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 lbw-topbar-shine" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-3 py-2 md:justify-between md:px-6">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#f6e7a5] md:text-left md:text-xs md:tracking-[0.28em]">
            <span className="rounded-sm bg-[#e0b000] px-1.5 py-0.5 text-[10px] font-extrabold tracking-[0.18em] text-[#10204f]">
              LBW
            </span>
            <span className="hidden text-[#e0b000]/70 sm:inline" aria-hidden>
              ·
            </span>
            <span>{brand.fullForm}</span>
          </p>
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 md:block">
            Hanamkonda · Mancherial
          </p>
        </div>
      </div>

      <div className="border-b-[3px] border-[#1c2f7a]">
        <div className="mx-auto flex h-[4.85rem] max-w-7xl items-center gap-4 px-3 md:h-[5.75rem] md:gap-6 md:px-6">
          <Logo />

          <nav className="ml-8 hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  'group relative text-sm font-semibold uppercase tracking-[0.14em] transition',
                  pathname === link.href ? 'text-[#1c2f7a]' : 'text-foreground/70 hover:text-[#1c2f7a]',
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#e0b000] transition-transform duration-300 group-hover:scale-x-100" />
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
              className="grid h-10 w-10 place-items-center border border-[#1c2f7a]/20 text-[#1c2f7a] lg:hidden"
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
            className="border-t border-foreground/8 bg-mist px-4 py-6 lg:hidden"
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
                    className="font-display text-3xl tracking-wide text-foreground hover:text-lime"
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
