'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '@/components/scroll/MagneticButton'
import { whatsappUrl } from '@/lib/whatsapp'

export function BatShowcase() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) return
      gsap.fromTo(
        '.bat-photo',
        { yPercent: 8, scale: 1.12 },
        {
          yPercent: -10,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      gsap.from('.bat-line', {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="bg-mist py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2 md:px-8">
        <div className="overflow-hidden bg-pitch-deep">
          <img
            src="/gear/bat-portrait.jpg"
            alt="English willow cricket bat with red grip"
            className="bat-photo h-[70vh] w-full object-cover object-center md:h-[82vh]"
          />
        </div>
        <div>
          <p className="bat-line text-xs font-bold uppercase tracking-[0.35em] text-orange">English willow</p>
          <h2 className="bat-line mt-3 font-display text-5xl leading-none text-foreground md:text-7xl">
            FIND THE MIDDLE
          </h2>
          <ul className="mt-8 space-y-3 text-sm text-foreground/70">
            <li className="bat-line border-b border-foreground/10 pb-3">Red rubber grip for a locked handle</li>
            <li className="bat-line border-b border-foreground/10 pb-3">Pressed willow face and a clear sweet spot</li>
            <li className="bat-line border-b border-foreground/10 pb-3">Black toe guard for the bottom edge</li>
          </ul>
          <div className="bat-line mt-8">
            <MagneticButton
              href={whatsappUrl('Hi LBW Sports! Help me find the perfect cricket bat.')}
              external
              variant="whatsapp"
            >
              Find your perfect bat
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
