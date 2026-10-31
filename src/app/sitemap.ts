import type { MetadataRoute } from 'next'
import { categories, products } from '@/lib/products'

const site = 'https://lbwsports.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: MetadataRoute.Sitemap = [
    { url: site, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site}/franchise`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${site}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const sports = categories.map((sport) => ({
    url: `${site}${sport.href}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const gear = products.map((item) => ({
    url: `${site}/product/${item.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...pages, ...sports, ...gear]
}
