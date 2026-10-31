import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, getProductBySlug, products } from '@/lib/products'
import { ProductActions } from '@/components/product/ProductActions'
import { brand } from '@/lib/stores'
import { clsx } from 'clsx'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Gear' }
  const sport = categories.find((item) => item.slug === product.category)
  const description = `${product.description} Available at LBW Sports Shop in Hanamkonda and Mancherial. Enquire on WhatsApp.`
  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} | LBW Sports Shop`,
      description,
      url: `/product/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
      type: 'website',
    },
    other: {
      'product:category': sport?.name ?? product.category,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  const sport = categories.find((item) => item.slug === product.category)
  const cricket = product.category === 'cricket'

  return (
    <div className={clsx(cricket && 'xforcz-page')}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 pt-36 md:grid-cols-2 md:px-6 md:pt-40">
        {cricket && (
          <div className="md:col-span-2">
            <div className="xforcz-hero flex items-center justify-between gap-4 border border-[#c9a227]/40 px-4 py-3 md:px-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#f5d76e]">
                {brand.cricketBrand}™ Cricket
              </p>
              <img src={brand.cricketBrandMark} alt="X-FORCZ" className="h-10 w-auto object-contain md:h-12" />
            </div>
          </div>
        )}
        <div
          className={clsx(
            'relative aspect-[4/5] overflow-hidden border',
            cricket ? 'border-[#c9a227]/40 bg-black' : 'border-foreground/10 bg-mist',
          )}
        >
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <Link
            href={`/shop/${product.category}`}
            className={clsx(
              'text-xs font-bold uppercase tracking-[0.25em]',
              cricket ? 'text-[#f5d76e]' : 'text-orange',
            )}
          >
            {cricket ? `${brand.cricketBrand}™ · ${product.group}` : `${sport?.name} · ${product.group}`}
          </Link>
          <h1
            className={clsx(
              'mt-3 font-display text-5xl tracking-wide md:text-6xl',
              cricket ? 'text-white' : 'text-foreground',
            )}
          >
            {product.name}
          </h1>
          <p className={clsx('mt-6', cricket ? 'text-white/70' : 'text-foreground/65')}>{product.longDescription}</p>

          <dl
            className={clsx(
              'mt-8 grid gap-3 border p-4 sm:grid-cols-2',
              cricket ? 'border-[#f5d76e]/25 bg-black/40' : 'border-foreground/10 bg-charcoal',
            )}
          >
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label}>
                <dt
                  className={clsx(
                    'text-[11px] uppercase tracking-wider',
                    cricket ? 'text-[#f5d76e]/70' : 'text-foreground/40',
                  )}
                >
                  {label}
                </dt>
                <dd className={clsx('text-sm', cricket ? 'text-white' : 'text-foreground')}>{value}</dd>
              </div>
            ))}
          </dl>

          <ProductActions product={product} />
        </div>
      </div>
    </div>
  )
}
