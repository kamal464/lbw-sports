'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const ball = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ball.current
    if (!fine || reduce || !el) return

    el.style.opacity = '1'
    const mouse = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 }
    const pos = { x: mouse.x, y: mouse.y }
    let rot = 0
    let frame = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const tick = () => {
      const dx = mouse.x - pos.x
      const dy = mouse.y - pos.y
      pos.x += dx * 0.14
      pos.y += dy * 0.14
      rot += Math.hypot(dx, dy) * 0.45
      el.style.transform = `translate3d(${pos.x - 22}px, ${pos.y - 22}px, 0) rotate(${rot}deg)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      ref={ball}
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-11 w-11 opacity-0 md:block"
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
        <defs>
          <radialGradient id="cursorBall" cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ff5a68" />
            <stop offset="48%" stopColor="#c8102e" />
            <stop offset="100%" stopColor="#6e0814" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#cursorBall)" />
        <ellipse
          cx="32"
          cy="32"
          rx="26"
          ry="10"
          fill="none"
          stroke="#f6f1e6"
          strokeWidth="3.2"
          transform="rotate(-28 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="26"
          ry="10"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          transform="rotate(-28 32 32)"
        />
      </svg>
    </div>
  )
}
