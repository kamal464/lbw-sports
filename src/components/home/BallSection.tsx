'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { whatsappUrl } from '@/lib/whatsapp'

export function BallSection() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) return
      gsap.fromTo(
        '.delivery-photo',
        { scale: 1.18, xPercent: 6 },
        {
          scale: 1,
          xPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      gsap.from('.delivery-line', {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="bg-pitch-deep py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2 md:px-8">
        <div>
          <p className="delivery-line text-xs font-bold uppercase tracking-[0.35em] text-white/60">Every delivery</p>
          <h2 className="delivery-line mt-3 font-display text-5xl leading-none md:text-7xl">
            BUILT FOR EVERY DELIVERY
          </h2>
          <p className="delivery-line mt-5 max-w-md text-white/70">
            Red leather with a raised seam, and shuttlecocks that fly true. Ask what is on the shelf before you come in.
          </p>
          <div className="delivery-line mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl('Hi LBW Sports! I need cricket balls and shuttlecocks. What is in stock?')}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wider text-black"
            >
              Ask for stock
            </a>
            <a
              href="/shop/cricket"
              className="border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wider"
            >
              Browse cricket
            </a>
          </div>
        </div>
        <div className="overflow-hidden">
          <img
            src="/gear/ball-shuttle.jpg"
            alt="Red cricket ball and badminton shuttlecock"
            className="delivery-photo h-[60vh] w-full object-cover md:h-[72vh]"
          />
        </div>
      </div>
    </section>
  )
}
