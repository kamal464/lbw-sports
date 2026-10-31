import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, getProductBySlug, products } from '@/lib/products'
import { ProductActions } from '@/components/product/ProductActions'
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

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 pt-32 md:grid-cols-2 md:px-6 md:pt-36">
      <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10 bg-mist">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>

      <div>
        <Link
          href={`/shop/${product.category}`}
          className="text-xs font-bold uppercase tracking-[0.25em] text-orange"
        >
          {sport?.name} · {product.group}
        </Link>
        <h1 className="mt-3 font-display text-5xl tracking-wide text-foreground md:text-6xl">{product.name}</h1>
        <p className="mt-6 text-foreground/65">{product.longDescription}</p>

        <dl className="mt-8 grid gap-3 border border-foreground/10 bg-charcoal p-4 sm:grid-cols-2">
          {Object.entries(product.specs).map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] uppercase tracking-wider text-foreground/40">{label}</dt>
              <dd className="text-sm text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <ProductActions product={product} />
      </div>
    </div>
  )
}
