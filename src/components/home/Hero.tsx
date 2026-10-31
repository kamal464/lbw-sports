'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { categories } from '@/lib/products'
import { MagneticButton } from '@/components/scroll/MagneticButton'
import { whatsappUrl } from '@/lib/whatsapp'

const lines = ['GEAR FOR', 'EVERY GAME.']

export function Hero() {
  return (
    <section className="relative isolate min-h-dvh overflow-hidden bg-pitch-deep text-white">
      <img
        src="/gear/hero-gear.jpg"
        alt=""
        className="hero-drift absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-pitch-deep/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-pitch-deep via-pitch-deep/55 to-pitch-deep/25" />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col justify-end px-5 pb-8 pt-32 md:px-8 md:pb-10 md:pt-40">
        <motion.div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.32em] text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="live-dot h-2 w-2 rounded-full bg-orange" />
            LBW Sports
          </span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" />
          <span>Hanamkonda</span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" />
          <span>Mancherial</span>
        </motion.div>

        <h1 className="mt-5 max-w-4xl font-display text-[clamp(4.2rem,11vw,8.4rem)] leading-[0.82] tracking-wide">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.12 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-xl text-base text-white/75 md:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Cricket, football, badminton, fitness and teamwear from two stores in Telangana. Browse the range,
          then enquire on WhatsApp for what is in stock.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
        >
          <MagneticButton href={whatsappUrl()} external variant="whatsapp">
            Enquire on WhatsApp
          </MagneticButton>
          <MagneticButton href="/shop" variant="ghost-light">
            Browse gear
          </MagneticButton>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.66 }}
        >
          {categories.map((sport) => (
            <Link
              key={sport.slug}
              href={sport.href}
              className="group border border-white/15 bg-white/10 px-3 py-3 backdrop-blur-md transition hover:border-white/50 hover:bg-white/20"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">Sport</p>
              <p className="mt-1 font-display text-2xl tracking-wide transition group-hover:translate-x-0.5">
                {sport.name}
              </p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
