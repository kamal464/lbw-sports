'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/brand/Logo'
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
    <header className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-[#1c2f7a] bg-white">
      <div className="mx-auto flex h-[5.15rem] max-w-7xl items-center gap-4 px-3 md:h-[6.15rem] md:gap-6 md:px-6">
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
            className={clsx(
              'grid h-10 w-10 place-items-center border lg:hidden',
              'border-[#1c2f7a]/20 text-[#1c2f7a]',
            )}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? '×' : '≡'}
          </button>
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
