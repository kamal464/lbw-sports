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
  return { title: cat?.name ?? 'Shop' }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()
  return <ShopClient initialCategory={category as CategorySlug} />
}
