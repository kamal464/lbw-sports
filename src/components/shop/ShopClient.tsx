'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  categories,
  groupsFor,
  searchProducts,
  type CategorySlug,
} from '@/lib/products'
import { enquireProductUrl, whatsappUrl } from '@/lib/whatsapp'

type Props = {
  initialCategory?: CategorySlug
  initialQuery?: string
}

export function ShopClient({ initialCategory, initialQuery = '' }: Props) {
  const [query, setQuery] = useState(initialQuery)
  const active = initialCategory ?? 'all'

  const sports = useMemo(() => {
    const matched = searchProducts(query)
    const visible = categories.filter((sport) => active === 'all' || sport.slug === active)
    return visible
      .map((sport) => ({
        ...sport,
        groups: groupsFor(matched.filter((item) => item.category === sport.slug)),
      }))
      .filter((sport) => sport.groups.length > 0)
  }, [query, active])

  const title = initialCategory
    ? categories.find((sport) => sport.slug === initialCategory)?.name
    : 'All gear'

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 md:px-6 md:pt-36">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange">Gear</p>
          <h1 className="mt-2 font-display text-5xl text-foreground md:text-6xl">{title}</h1>
          <p className="mt-3 max-w-xl text-foreground/55">
            Every sport is listed with the gear we carry. Message us on WhatsApp to check stock for Hanamkonda
            or Mancherial.
          </p>
        </div>
        <a
          href={whatsappUrl('Hi LBW Sports! I want to enquire about gear in your store.')}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-black"
        >
          Enquire on WhatsApp
        </a>
      </div>

      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Link href="/shop" className={chip(active === 'all')}>
            All sports
          </Link>
          {categories.map((sport) => (
            <Link key={sport.slug} href={`/shop/${sport.slug}`} className={chip(active === sport.slug)}>
              {sport.name}
            </Link>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bats, shuttles, kits..."
          className="min-w-[220px] border border-foreground/15 bg-charcoal px-3 py-2.5 text-sm outline-none focus:border-lime"
        />
      </div>

      {sports.length === 0 ? (
        <p className="text-foreground/50">Nothing matches that search. Send a WhatsApp enquiry and we will check.</p>
      ) : (
        <div className="space-y-16">
          {sports.map((sport) => (
            <section key={sport.slug} id={sport.slug} className="scroll-mt-28">
              <div className="relative mb-6 overflow-hidden border border-foreground/10">
                <img src={sport.image} alt="" className="h-40 w-full object-cover md:h-52" />
                <div className="absolute inset-0 bg-gradient-to-r from-pitch-deep via-pitch-deep/75 to-pitch-deep/20" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">Sport</p>
                  <h2 className="font-display text-4xl tracking-wide text-white md:text-6xl">{sport.name}</h2>
                  <p className="mt-1 max-w-lg text-sm text-white/75">{sport.description}</p>
                </div>
              </div>

              <div className="space-y-8">
                {sport.groups.map(({ group, items }) => (
                  <div key={group}>
                    <h3 className="border-b border-foreground/10 pb-2 font-display text-2xl tracking-wide text-lime">
                      {group}
                    </h3>
                    <ul className="divide-y divide-foreground/10">
                      {items.map((item) => (
                        <li key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <Link
                              href={`/product/${item.slug}`}
                              className="font-display text-2xl tracking-wide text-foreground hover:text-lime"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-1 max-w-xl text-sm text-foreground/55">{item.description}</p>
                          </div>
                          <a
                            href={enquireProductUrl(item.name)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-fit shrink-0 bg-[#25D366] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black"
                          >
                            Enquire on WhatsApp
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function chip(active: boolean) {
  return active
    ? 'bg-lime px-3 py-2 text-xs font-bold uppercase tracking-wider text-white'
    : 'border border-foreground/15 bg-charcoal px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground/70 hover:border-lime hover:text-lime'
}
