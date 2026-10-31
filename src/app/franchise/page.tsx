import type { Metadata } from 'next'
import Link from 'next/link'
import { brand } from '@/lib/stores'
import { whatsappUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Franchise Opportunity',
  description:
    'Own an LBW Sports franchise — 750 and 1000 sqft sports store concepts with premium interiors, cricket, badminton, footwear and apparel. Enquire on WhatsApp.',
  alternates: { canonical: '/franchise' },
  openGraph: {
    title: 'LBW Sports Franchise Opportunity',
    description:
      'Ready store concepts for 750 and 1000 sqft. Premium interiors, wide range, best brands. Life is better with sports.',
    url: '/franchise',
    images: [{ url: '/franchise/store-interior.jpg', alt: 'LBW Sports store interior' }],
  },
}

const gallery = [
  {
    src: '/franchise/store-interior.jpg',
    title: 'Live store look',
    caption: 'Turf floor, cricket wall, billing counter and brand presence.',
  },
  {
    src: '/franchise/concept-1000.jpg',
    title: '1000 SQFT concept',
    caption: 'Premium interiors, wide range, best brands, expert staff.',
  },
  {
    src: '/franchise/concept-750.jpg',
    title: '750 SQFT concept',
    caption: 'Compact sports store with modern fixtures and bright profile lights.',
  },
  {
    src: '/franchise/concept-750-plan.jpg',
    title: '750 SQFT layout plan',
    caption: '30 × 25 ft plan with cricket, badminton, shoes, apparel and trial room.',
  },
]

const benefits = [
  ['Premium interiors', 'Eye-catching modern fit-out with turf and profile lights'],
  ['Wide range', 'Cricket, badminton, footwear, apparel, trophies and accessories'],
  ['Best brands', 'Space planned for leading sports brands'],
  ['Ready formats', '750 sqft and 1000 sqft store concepts'],
  ['Support', 'Guidance from the LBW Sports team in Hanamkonda & Mancherial'],
]

export default function FranchisePage() {
  return (
    <div className="bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-36 md:px-6 md:pt-40">
        <p className="text-sm font-bold uppercase tracking-[0.34em] text-[#f5d76e]">Franchise opportunity</p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(3rem,8vw,5.8rem)] leading-[0.9] tracking-wide">
          BUILD YOUR LBW SPORTS STORE
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/70">
          {brand.fullForm}. Partner with LBW Sports and open a premium multi-sport retail store with a proven
          look — cricket wall, badminton, shoes, apparel, trophies and billing.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappUrl(
              'Hi LBW Sports! I am interested in the Franchise Opportunity. Please share investment and store details.',
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-black"
          >
            Enquire on WhatsApp
          </a>
          <a
            href={`mailto:${brand.email}?subject=${encodeURIComponent('LBW Sports Franchise Enquiry')}`}
            className="inline-flex border border-[#f5d76e]/50 px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#f5d76e]"
          >
            Email {brand.email}
          </a>
        </div>

        <div className="mt-14 grid gap-6">
          {gallery.map((item, index) => (
            <article key={item.src} className="overflow-hidden border border-[#f5d76e]/25 bg-white/[0.03]">
              <div className="flex items-center justify-between border-b border-[#f5d76e]/20 px-4 py-3 md:px-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#f5d76e]">
                    Frame {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-display text-3xl tracking-wide md:text-4xl">{item.title}</h2>
                </div>
                <p className="hidden max-w-sm text-sm text-white/55 md:block">{item.caption}</p>
              </div>
              <img src={item.src} alt={item.title} className="w-full object-cover object-top" />
              <p className="px-4 py-3 text-sm text-white/60 md:hidden">{item.caption}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([title, text]) => (
            <div key={title} className="border border-white/10 bg-white/[0.03] p-5">
              <p className="font-display text-2xl tracking-wide text-[#f5d76e]">{title}</p>
              <p className="mt-2 text-sm text-white/65">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-[#f5d76e]/30 bg-[#f5d76e]/10 p-6 md:p-8">
          <h2 className="font-display text-4xl tracking-wide">Ready to talk franchise?</h2>
          <p className="mt-3 max-w-2xl text-white/75">
            Message us with your city, preferred size (750 or 1000 sqft), and we will guide the next steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappUrl(
                'Hi LBW Sports! Franchise enquiry — city, preferred size 750/1000 SQFT. Please share details.',
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-black"
            >
              WhatsApp franchise desk
            </a>
            <Link
              href="/contact"
              className="inline-flex border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white"
            >
              Store contacts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
