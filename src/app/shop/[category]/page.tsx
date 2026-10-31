import { notFound } from 'next/navigation'
import { categories, type CategorySlug } from '@/lib/products'
import { ShopClient } from '@/components/shop/ShopClient'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) return { title: 'Shop' }
  return {
    title: `${cat.name} Gear`,
    description: `${cat.description} at LBW Sports Shop in Hanamkonda and Mancherial. Enquire on WhatsApp for stock.`,
    alternates: { canonical: cat.href },
    openGraph: {
      title: `${cat.name} Gear | LBW Sports Shop`,
      description: cat.description,
      url: cat.href,
      images: [{ url: cat.image.startsWith('http') ? cat.image : cat.image }],
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()
  return <ShopClient initialCategory={category as CategorySlug} />
}
