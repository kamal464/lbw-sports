'use client'

import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/lib/products'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'

export function CategoryGrid() {
  return (
    <section id="sports" className="section-light py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange">Shop by category</p>
          <h2 className="mt-3 font-display text-5xl text-foreground md:text-6xl">PICK YOUR ARENA</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={cat.href}
                className="group relative block aspect-[16/11] overflow-hidden border border-foreground/10"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pitch-deep via-pitch-deep/35 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-lime/15" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-display text-3xl tracking-wide text-white transition duration-500 group-hover:-translate-y-1">
                    {cat.name}
                  </h3>
                  <p className="mt-1 max-w-[16rem] text-sm text-white/70 transition duration-500 group-hover:text-white">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-block translate-y-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Enter →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
