import { ShopClient } from '@/components/shop/ShopClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sports Gear Catalogue',
  description:
    'Browse cricket, football, badminton, fitness, sportswear and accessories at LBW Sports Shop. Enquire on WhatsApp for stock in Hanamkonda and Mancherial.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Sports Gear Catalogue | LBW Sports Shop',
    description:
      'Browse cricket, football, badminton, fitness, sportswear and accessories. Enquire on WhatsApp for stock.',
    url: '/shop',
  },
}

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams
  return <ShopClient initialQuery={params.q ?? ''} />
}
