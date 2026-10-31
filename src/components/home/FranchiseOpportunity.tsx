'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { MagneticButton } from '@/components/scroll/MagneticButton'
import { brand } from '@/lib/stores'
import { whatsappUrl } from '@/lib/whatsapp'

const highlights = [
  'Premium interiors',
  'Wide product range',
  'Best brands',
  'Expert staff',
  'Quality assured',
]

const formats = [
  {
    size: '750 SQFT',
    title: 'Compact sports store',
    image: '/franchise/concept-750.jpg',
    points: ['Rectangular layout', 'Green turf floor', 'Billing + trial room'],
  },
  {
    size: '1000 SQFT',
    title: 'Flagship sports store',
    image: '/franchise/concept-1000.jpg',
    points: ['Premium interiors', 'Full brand walls', 'Higher display capacity'],
  },
]

export function FranchiseOpportunity() {
  return (
    <section id="franchise" className="relative overflow-hidden bg-[#070707] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(224,176,0,0.18),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-[#f5d76e]">Franchise opportunity</p>
          <h2 className="mt-3 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.92] tracking-wide">
            OWN AN LBW SPORTS STORE
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            {brand.fullForm}. Ready store concepts for 750 and 1000 sqft — premium interiors, cricket wall,
            badminton, footwear, apparel and billing counter. Enquire to start your franchise conversation.
          </p>
        </Reveal>

        <motion.div
          className="mt-10 overflow-hidden border border-[#f5d76e]/30"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/franchise/store-interior.jpg"
            alt="LBW Sports store interior with turf floor, cricket wall and billing counter"
            className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
          />
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-2">
          {highlights.map((item) => (
            <span
              key={item}
              className="border border-[#f5d76e]/35 bg-[#f5d76e]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5d76e]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {formats.map((format, i) => (
            <motion.article
              key={format.size}
              className="overflow-hidden border border-white/10 bg-white/[0.03]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.65 }}
            >
              <img src={format.image} alt={`${format.size} LBW Sports store concept`} className="aspect-[4/3] w-full object-cover object-top" />
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#f5d76e]">{format.size}</p>
                <h3 className="mt-2 font-display text-3xl tracking-wide">{format.title}</h3>
                <ul className="mt-3 space-y-1 text-sm text-white/65">
                  {format.points.map((point) => (
                    <li key={point}>· {point}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 overflow-hidden border border-white/10">
          <img
            src="/franchise/concept-750-plan.jpg"
            alt="LBW Sports 750 sqft store layout plan and section views"
            className="w-full object-cover object-top"
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <MagneticButton
            href={whatsappUrl(
              'Hi LBW Sports! I am interested in the Franchise Opportunity. Please share details for 750 / 1000 SQFT stores.',
            )}
            external
            variant="whatsapp"
          >
            Enquire for franchise
          </MagneticButton>
          <MagneticButton href="/franchise" variant="ghost-light">
            View full details
          </MagneticButton>
          <Link
            href="/contact"
            className="inline-flex items-center border-b border-[#f5d76e]/50 pb-1 text-sm font-bold uppercase tracking-wider text-[#f5d76e]"
          >
            Talk to the team
          </Link>
        </div>
      </div>
    </section>
  )
}
