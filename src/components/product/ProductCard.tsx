'use client'

import Link from 'next/link'
import type { Product } from '@/lib/products'
import { enquireProductUrl } from '@/lib/whatsapp'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col border border-foreground/10 bg-charcoal p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/40">{product.group}</p>
      <Link
        href={`/product/${product.slug}`}
        className="mt-2 font-display text-2xl tracking-wide text-foreground hover:text-lime"
      >
        {product.name}
      </Link>
      <p className="mt-2 flex-1 text-sm text-foreground/55">{product.description}</p>
      <a
        href={enquireProductUrl(product.name)}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex w-fit bg-[#25D366] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black"
      >
        Enquire on WhatsApp
      </a>
    </article>
  )
}
