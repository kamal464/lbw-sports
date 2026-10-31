import { getProductBySlug } from '@/lib/products'

export function isCricketPath(pathname: string) {
  if (pathname === '/shop/cricket' || pathname.startsWith('/shop/cricket/')) return true
  if (pathname.startsWith('/product/')) {
    const slug = pathname.replace('/product/', '').split('/')[0]
    return getProductBySlug(slug)?.category === 'cricket'
  }
  return false
}
