import type { Metadata } from 'next'
import { Bebas_Neue, Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from '@/context/Providers'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/scroll/ScrollProgress'
import { CursorGlow } from '@/components/scroll/CursorGlow'

const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: {
    default: 'LBW Sports Shop | Gear Up. Own the Game.',
    template: '%s | LBW Sports Shop',
  },
  description:
    'Premium cricket bats, balls, kits, shuttlecocks, sportswear and multi-sport gear from LBW Sports Shop — Hanamkonda & Mancherial. Enquire on WhatsApp.',
  metadataBase: new URL('https://lbwsports.in'),
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
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
