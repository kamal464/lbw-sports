'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { MotionMarquee } from '@/components/motion/MotionMarquee'
import { brand, stores } from '@/lib/stores'
import { categories } from '@/lib/products'
import { whatsappUrl } from '@/lib/whatsapp'

export function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer className="relative mt-auto overflow-hidden bg-pitch-deep text-white">
      <div className="relative z-10">
        <MotionMarquee tone="dark" />
      </div>
      <div className="pointer-events-none absolute inset-0 stadium-glow opacity-50" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-white/65">
            Premium cricket and multi-sport gear for players who train hard and play harder. Hanamkonda &
            Mancherial.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex bg-[#25D366] px-3 py-2 text-xs font-bold uppercase tracking-wider text-black"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex text-sm font-semibold text-white/80 hover:text-white"
            >
              {brand.email}
            </a>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white"
            >
              {brand.instagramHandle}
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-xl tracking-wide text-white">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            {[
              ['/', 'Home'],
              ['/franchise', 'Franchise'],
              ['/shop', 'Gear'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xl tracking-wide text-white">Categories</p>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={c.href} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xl tracking-wide text-white">Stay in the game</p>
          <p className="mt-2 text-sm text-white/60">Write to us and we will reply from the shop.</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (!email.trim()) return
              window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('LBW Sports enquiry')}&body=${encodeURIComponent(`Please contact me at ${email.trim()}`)}`
              setDone(true)
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-white/20 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-white/40 focus:border-white"
            />
            <button type="submit" className="bg-white px-4 text-xs font-bold uppercase tracking-wider text-pitch-deep">
              Join
            </button>
          </form>
          {done && <p className="mt-2 text-xs text-[#25D366]">Your email app should open to {brand.email}.</p>}
          <div className="mt-6 space-y-3 text-xs text-white/50">
            {stores.map((s) => (
              <p key={s.city}>
                <span className="text-white/75">{s.city}:</span> {s.phone}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-4 py-5 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${brand.email}`} className="hover:text-white">
              {brand.email}
            </a>
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
              {brand.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
