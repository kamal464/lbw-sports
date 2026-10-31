'use client'

import { useId } from 'react'

type Size = { className?: string }

export function BatArt({ className }: Size) {
  const id = useId().replace(/:/g, '')
  const face = `willow-${id}`
  const spine = `spine-${id}`
  return (
    <svg viewBox="0 0 140 520" className={className} aria-hidden>
      <defs>
        <linearGradient id={face} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a5528" />
          <stop offset="18%" stopColor="#c9a36a" />
          <stop offset="48%" stopColor="#f3ddb0" />
          <stop offset="78%" stopColor="#d7b57a" />
          <stop offset="100%" stopColor="#8a6234" />
        </linearGradient>
        <linearGradient id={spine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c98a" />
          <stop offset="100%" stopColor="#a67c42" />
        </linearGradient>
      </defs>
      {/* grip */}
      <rect x="58" y="8" width="24" height="92" rx="6" fill="#9a1020" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x="58" y={14 + i * 8} width="24" height="3" fill="#6d0b16" opacity="0.85" />
      ))}
      <rect x="61" y="2" width="18" height="10" rx="2" fill="#1a1208" />
      {/* splice */}
      <path d="M52 96 H88 L96 118 H44 Z" fill="#6b4420" />
      {/* blade */}
      <path
        d="M48 112
           C40 150 28 210 26 280
           C24 340 30 400 40 450
           C48 478 62 496 70 500
           C78 496 92 478 100 450
           C110 400 116 340 114 280
           C112 210 100 150 92 112 Z"
        fill={`url(#${face})`}
        stroke="#6a4a24"
        strokeWidth="2"
      />
      {/* spine highlight */}
      <path d="M66 130 C64 220 64 340 68 470 L74 470 C70 340 70 220 74 130 Z" fill={`url(#${spine})`} opacity="0.45" />
      {/* edges */}
      <path d="M30 250 C28 330 34 420 46 470" stroke="#f6e7c4" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M110 250 C112 330 106 420 94 470" stroke="#f6e7c4" strokeWidth="3" fill="none" opacity="0.55" />
      {/* sticker */}
      <rect x="48" y="250" width="44" height="36" rx="3" fill="#b01020" />
      <text x="70" y="274" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800" fontFamily="Arial">
        LBW
      </text>
      {/* toe */}
      <path d="M42 468 C52 492 88 492 98 468 L100 482 C78 506 62 506 40 482 Z" fill="#1c1610" />
    </svg>
  )
}

export function BallArt({ className, fill = '#C8102E' }: Size & { fill?: string }) {
  const id = useId().replace(/:/g, '')
  const shade = `ball-${id}`
  const light = fill === '#f4f4f4'
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <radialGradient id={shade} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ff5a68" />
          <stop offset="45%" stopColor={fill} />
          <stop offset="100%" stopColor="#6e0814" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill={light ? '#f7f7f7' : `url(#${shade})`} stroke={light ? '#bbb' : '#3a0a10'} strokeWidth="1" />
      <ellipse cx="60" cy="60" rx="50" ry="18" fill="none" stroke="#f6f1e6" strokeWidth="5" transform="rotate(-28 60 60)" />
      <ellipse
        cx="60"
        cy="60"
        rx="50"
        ry="18"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.6"
        strokeDasharray="4 5"
        transform="rotate(-28 60 60)"
      />
      <ellipse cx="38" cy="36" rx="14" ry="8" fill="#fff" opacity="0.28" />
    </svg>
  )
}

export function ShuttleArt({ className }: Size) {
  const id = useId().replace(/:/g, '')
  const feather = `feather-${id}`
  return (
    <svg viewBox="0 0 100 160" className={className} aria-hidden>
      <defs>
        <linearGradient id={feather} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffef8" />
          <stop offset="100%" stopColor="#e4dccb" />
        </linearGradient>
      </defs>
      {/* feathers */}
      {[-28, -18, -8, 2, 12, 22].map((rot, i) => (
        <path
          key={rot}
          d="M50 18 C58 40 62 70 54 108 L46 108 C38 70 42 40 50 18 Z"
          fill={`url(#${feather})`}
          stroke="#cfc6b4"
          strokeWidth="0.6"
          opacity={0.55 + (i % 2) * 0.35}
          transform={`rotate(${rot} 50 100)`}
        />
      ))}
      <path d="M50 22 L78 108 Q50 118 22 108 Z" fill={`url(#${feather})`} stroke="#d5cdb8" />
      {/* quill lines */}
      <path d="M50 30 L50 108" stroke="#c8bfae" strokeWidth="1" />
      <path d="M38 50 L34 104" stroke="#d8d0c0" strokeWidth="0.8" />
      <path d="M62 50 L66 104" stroke="#d8d0c0" strokeWidth="0.8" />
      {/* band */}
      <rect x="28" y="104" width="44" height="10" rx="2" fill="#0b6b45" />
      <rect x="28" y="108" width="44" height="2" fill="#084830" />
      {/* cork */}
      <ellipse cx="50" cy="128" rx="18" ry="16" fill="#e2c48a" />
      <ellipse cx="50" cy="124" rx="16" ry="10" fill="#c9a36a" />
      <ellipse cx="44" cy="120" rx="5" ry="3" fill="#fff" opacity="0.35" />
    </svg>
  )
}
