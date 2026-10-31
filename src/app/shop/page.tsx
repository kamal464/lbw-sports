import { ShopClient } from '@/components/shop/ShopClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gear Catalogue',
}

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams
  return <ShopClient initialQuery={params.q ?? ''} />
}
