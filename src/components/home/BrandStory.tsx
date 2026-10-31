'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/scroll/MagneticButton'
import { whatsappUrl } from '@/lib/whatsapp'

const values = ['Quality', 'Performance', 'Passion', 'Trust']

export function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28">
      <div className="pitch-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.p
          className="text-sm font-bold uppercase tracking-[0.3em] text-orange"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our story
        </motion.p>
        <motion.h2
          className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] text-foreground"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          MORE THAN EQUIPMENT. IT&apos;S THE GAME.
        </motion.h2>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-foreground/60"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          LBW Sports Shop is a destination for players who want reliable gear — from cricket kits and custom
          jerseys to everyday training essentials. Visit us in Hanamkonda and Mancherial, or browse online and
          message us for stock checks.
        </motion.p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v}
              className="border border-foreground/10 bg-mist px-4 py-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="font-display text-2xl tracking-wide text-lime md:text-3xl">{v}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <MagneticButton href="/about" variant="orange">
            Discover LBW
          </MagneticButton>
          <MagneticButton href={whatsappUrl()} external variant="whatsapp">
            Chat with us
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
