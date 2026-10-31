import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from '@/context/Providers'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { CursorGlow } from '@/components/scroll/CursorGlow'
import { JsonLd } from '@/components/seo/JsonLd'
import { brand } from '@/lib/stores'

const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

const title = 'LBW Sports Shop | Cricket & Sports Gear in Hanamkonda & Mancherial'
const description =
  'LBW Sports Shop in Hanamkonda and Mancherial — cricket bats, balls, kits, badminton, football, fitness gear and teamwear. Enquire on WhatsApp for stock.'

export const viewport: Viewport = {
  themeColor: '#1c2f7a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://lbwsports.in'),
  title: {
    default: title,
    template: '%s | LBW Sports Shop',
  },
  description,
  applicationName: brand.name,
  keywords: [
    'LBW Sports',
    'LBW Sports Shop',
    'cricket shop Hanamkonda',
    'cricket shop Mancherial',
    'cricket bats Telangana',
    'badminton gear',
    'football kits',
    'sportswear',
    'sublimation jerseys',
    'WhatsApp sports enquiry',
  ],
  authors: [{ name: brand.name, url: 'https://lbwsports.in' }],
  creator: brand.name,
  publisher: brand.name,
  category: 'sports',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lbwsports.in',
    siteName: brand.name,
    title,
    description,
    images: [
      {
        url: '/gear/hero-gear.jpg',
        width: 1200,
        height: 630,
        alt: 'LBW Sports Shop cricket bat, ball and shuttlecock',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/gear/hero-gear.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }, { url: '/favicon.ico' }],
    apple: [{ url: '/icon.png' }],
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <JsonLd />
        <Providers>
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
