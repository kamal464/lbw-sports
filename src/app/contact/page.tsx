import type { Metadata } from 'next'
import { stores, brand } from '@/lib/stores'

export const metadata: Metadata = {
  title: 'Contact & Store Locations',
  description:
    'Visit LBW Sports Shop in Hanamkonda or Mancherial, or enquire on WhatsApp. Call, map directions, email lbwsports@gmail.com and Instagram @lbw__sports.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 md:px-6 md:pt-36">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange">Contact</p>
      <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">VISIT OR MESSAGE US</h1>
      <p className="mt-4 max-w-xl text-foreground/60">
        Reach LBW Sports Shop for stock checks, custom jersey quotes, and store hours.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {stores.map((store) => (
          <article key={store.city} className="border border-foreground/10 bg-charcoal p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">{store.label}</p>
            <h2 className="mt-2 font-display text-4xl text-foreground">{store.city}</h2>
            <p className="mt-4 text-sm text-foreground/60">{store.address}</p>
            <p className="mt-3 text-sm text-foreground/80">{store.hours}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${store.phoneTel}`}
                className="bg-lime px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
              >
                Call {store.phone}
              </a>
              <a
                href={`https://wa.me/${store.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
              >
                WhatsApp
              </a>
              <a
                href={store.map}
                target="_blank"
                rel="noreferrer"
                className="border border-foreground/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
              >
                Map
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-foreground/70">
        <a href={`mailto:${brand.email}`} className="text-lime">
          {brand.email}
        </a>
        {' · '}
        <a href={brand.instagram} className="text-lime" target="_blank" rel="noreferrer">
          {brand.instagramHandle}
        </a>
      </p>
    </div>
  )
}
