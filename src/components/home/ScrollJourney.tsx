'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ScrollJourney() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: '.journey-pin',
        },
      })

      tl.fromTo(
        '.journey-photo',
        { scale: 1.2, xPercent: 6, yPercent: 4 },
        { scale: 1.05, xPercent: -8, yPercent: -6, ease: 'none', duration: 1 },
      ).fromTo(
        '.journey-line',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.35 },
        0.15,
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={root} className="relative h-[180vh] bg-black">
      <div className="journey-pin relative flex h-dvh items-end overflow-hidden">
        <img
          src="/gear/hero-gear.jpg"
          alt=""
          className="journey-photo absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-deep via-pitch-deep/25 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-16 md:px-8">
          <p className="journey-line text-xs font-bold uppercase tracking-[0.35em] text-white/70">The kit</p>
          <h2 className="journey-line mt-3 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] text-white">
            BAT. BALL. SHUTTLE.
          </h2>
          <p className="journey-line mt-4 max-w-lg text-white/80">
            The frame drifts as you scroll — willow, leather, then feather — the same three pieces on the shop floor.
          </p>
        </div>
      </div>
    </section>
  )
}
