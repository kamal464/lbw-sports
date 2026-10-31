'use client'

import type { Product } from '@/lib/products'
import { enquireProductUrl, whatsappUrl } from '@/lib/whatsapp'

export function ProductActions({ product }: { product: Product }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a
        href={enquireProductUrl(product.name)}
        target="_blank"
        rel="noreferrer"
        className="bg-[#25D366] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black hover:brightness-110"
      >
        Enquire on WhatsApp
      </a>
      <a
        href={whatsappUrl('Hi LBW Sports! I want to visit the store and check gear.')}
        target="_blank"
        rel="noreferrer"
        className="border border-foreground/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wider hover:border-lime hover:text-lime"
      >
        Ask about visit
      </a>
    </div>
  )
}
