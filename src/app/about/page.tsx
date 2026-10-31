import type { Metadata } from 'next'
import Link from 'next/link'
import { stores } from '@/lib/stores'
import { whatsappUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'LBW Sports Shop serves players across Hanamkonda and Mancherial with cricket gear, team kits, sportswear and multi-sport equipment. Play to live fit.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-32 md:px-6 md:pt-36">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange">About</p>
      <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
        MORE THAN EQUIPMENT. IT&apos;S THE GAME.
      </h1>
      <div className="mt-8 space-y-5 text-lg text-foreground/65">
        <p>
          LBW Sports Shop serves players across Hanamkonda and Mancherial with cricket gear, team kits,
          sportswear, and multi-sport equipment.
        </p>
        <p>
          We help you choose the right bat, kit, or custom jersey, then confirm what is on the shelf in
          Hanamkonda or Mancherial.
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {['Quality', 'Performance', 'Passion', 'Trust'].map((v) => (
          <div key={v} className="border border-foreground/10 bg-charcoal px-5 py-6">
            <p className="font-display text-3xl text-lime">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 space-y-4 text-sm text-foreground/55">
        {stores.map((s) => (
          <p key={s.city}>
            <span className="text-foreground">{s.city}</span> — {s.address}
          </p>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/shop" className="inline-flex bg-lime px-5 py-3 text-sm font-bold uppercase tracking-wider text-white">
          Browse catalogue
        </Link>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-black"
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}
