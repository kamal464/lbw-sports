'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  categories,
  groupsFor,
  searchProducts,
  type CategorySlug,
} from '@/lib/products'
import { brand } from '@/lib/stores'
import { enquireProductUrl, whatsappUrl } from '@/lib/whatsapp'
import { clsx } from 'clsx'

type Props = {
  initialCategory?: CategorySlug
  initialQuery?: string
}

export function ShopClient({ initialCategory, initialQuery = '' }: Props) {
  const [query, setQuery] = useState(initialQuery)
  const active = initialCategory ?? 'all'
  const cricketTheme = active === 'cricket'

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
    <div className={clsx(cricketTheme && 'xforcz-page')}>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-36 md:px-6 md:pt-40">
        {cricketTheme && (
          <div className="xforcz-hero mb-10 overflow-hidden border border-[#c9a227]/45">
            <div className="relative flex flex-col items-center gap-5 px-5 py-10 text-center md:flex-row md:justify-between md:px-8 md:text-left">
              <div className="relative z-10 max-w-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#f5d76e]">Cricket line</p>
                <h1 className="mt-3 font-display text-5xl tracking-wide text-white md:text-7xl">
                  {brand.cricketBrand}
                  <span className="align-super text-2xl text-[#f5d76e]">™</span>
                </h1>
                <p className="mt-3 text-base text-white/70 md:text-lg">
                  Premium cricket gear under the X-FORCZ™ theme — bats, balls, protection and match kits.
                  Enquire on WhatsApp for what is in stock.
                </p>
              </div>
              <img
                src={brand.cricketBrandMark}
                alt="X-FORCZ"
                className="relative z-10 h-28 w-auto object-contain drop-shadow-[0_12px_30px_rgba(201,162,39,0.35)] md:h-40"
              />
            </div>
          </div>
        )}

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={clsx(
                'text-sm font-bold uppercase tracking-[0.3em]',
                cricketTheme ? 'text-[#f5d76e]' : 'text-orange',
              )}
            >
              Gear
            </p>
            <h1
              className={clsx(
                'mt-2 font-display text-5xl md:text-6xl',
                cricketTheme ? 'text-white' : 'text-foreground',
              )}
            >
              {title}
            </h1>
            <p className={clsx('mt-3 max-w-xl', cricketTheme ? 'text-white/65' : 'text-foreground/55')}>
              {cricketTheme
                ? 'Cricket gear styled for X-FORCZ™. Message us on WhatsApp for Hanamkonda or Mancherial stock.'
                : 'Every sport is listed with the gear we carry. Message us on WhatsApp to check stock for Hanamkonda or Mancherial.'}
            </p>
          </div>
          <a
            href={whatsappUrl(
              cricketTheme
                ? 'Hi LBW Sports! I want to enquire about X-FORCZ cricket gear.'
                : 'Hi LBW Sports! I want to enquire about gear in your store.',
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-black"
          >
            Enquire on WhatsApp
          </a>
        </div>

        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <Link href="/shop" className={chip(active === 'all', cricketTheme)}>
              All sports
            </Link>
            {categories.map((sport) => (
              <Link
                key={sport.slug}
                href={`/shop/${sport.slug}`}
                className={chip(active === sport.slug, cricketTheme, sport.slug === 'cricket')}
              >
                {sport.name}
              </Link>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bats, shuttles, kits..."
            className={clsx(
              'min-w-[220px] border px-3 py-2.5 text-sm outline-none',
              cricketTheme
                ? 'border-[#f5d76e]/25 bg-black/40 text-white placeholder:text-white/40 focus:border-[#f5d76e]'
                : 'border-foreground/15 bg-charcoal focus:border-lime',
            )}
          />
        </div>

        {sports.length === 0 ? (
          <p className={cricketTheme ? 'text-white/50' : 'text-foreground/50'}>
            Nothing matches that search. Send a WhatsApp enquiry and we will check.
          </p>
        ) : (
          <div className="space-y-16">
            {sports.map((sport) => (
              <section key={sport.slug} id={sport.slug} className="scroll-mt-28">
                <div
                  className={clsx(
                    'relative mb-6 overflow-hidden border',
                    cricketTheme ? 'border-[#c9a227]/40' : 'border-foreground/10',
                  )}
                >
                  <img src={sport.image} alt="" className="h-40 w-full object-cover md:h-52" />
                  <div
                    className={clsx(
                      'absolute inset-0',
                      cricketTheme
                        ? 'bg-gradient-to-r from-black via-black/80 to-[#3a2a08]/55'
                        : 'bg-gradient-to-r from-pitch-deep via-pitch-deep/75 to-pitch-deep/20',
                    )}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                    <p
                      className={clsx(
                        'text-[11px] font-bold uppercase tracking-[0.28em]',
                        cricketTheme ? 'text-[#f5d76e]' : 'text-white/60',
                      )}
                    >
                      {cricketTheme ? 'X-FORCZ™ Cricket' : 'Sport'}
                    </p>
                    <h2 className="font-display text-4xl tracking-wide text-white md:text-6xl">{sport.name}</h2>
                    <p className="mt-1 max-w-lg text-sm text-white/75">{sport.description}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {sport.groups.map(({ group, items }) => (
                    <div key={group}>
                      <h3
                        className={clsx(
                          'border-b pb-2 font-display text-2xl tracking-wide',
                          cricketTheme
                            ? 'border-[#f5d76e]/25 text-[#f5d76e]'
                            : 'border-foreground/10 text-lime',
                        )}
                      >
                        {group}
                      </h3>
                      <ul className={clsx('divide-y', cricketTheme ? 'divide-[#f5d76e]/15' : 'divide-foreground/10')}>
                        {items.map((item) => (
                          <li
                            key={item.id}
                            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div>
                              <Link
                                href={`/product/${item.slug}`}
                                className={clsx(
                                  'font-display text-2xl tracking-wide',
                                  cricketTheme
                                    ? 'text-white hover:text-[#f5d76e]'
                                    : 'text-foreground hover:text-lime',
                                )}
                              >
                                {item.name}
                              </Link>
                              <p
                                className={clsx(
                                  'mt-1 max-w-xl text-sm',
                                  cricketTheme ? 'text-white/55' : 'text-foreground/55',
                                )}
                              >
                                {item.description}
                              </p>
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
    </div>
  )
}

function chip(active: boolean, dark = false, gold = false) {
  if (active && (gold || dark)) {
    return 'bg-[#f5d76e] px-3 py-2 text-xs font-bold uppercase tracking-wider text-black'
  }
  if (active) {
    return 'bg-lime px-3 py-2 text-xs font-bold uppercase tracking-wider text-white'
  }
  if (dark) {
    return 'border border-[#f5d76e]/30 bg-black/30 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/75 hover:border-[#f5d76e] hover:text-[#f5d76e]'
  }
  return 'border border-foreground/15 bg-charcoal px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground/70 hover:border-lime hover:text-lime'
}
