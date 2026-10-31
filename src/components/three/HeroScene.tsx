'use client'

import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { CricketBat } from '@/components/three/CricketBat'
import { CricketBall } from '@/components/three/CricketBall'
import { Shuttlecock } from '@/components/three/Shuttlecock'

function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <color attach="background" args={['#063d28']} />
      <fog attach="fog" args={['#063d28', 7, 15]} />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[4, 7.5, 3]}
        angle={0.4}
        penumbra={0.55}
        intensity={3}
        color="#fff6e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-4, 3, -2]} angle={0.55} intensity={0.9} color="#9dffc4" />
      <pointLight position={[2, 0, 3]} intensity={0.45} color="#ffd7a8" />

      <CricketBat mouse={mouse} />

      <CricketBall variant="red" path="bowl" speed={0.55} phase={0.2} scale={1} position={[0, 0.15, 0]} />
      <CricketBall variant="white" path="toss" speed={0.4} phase={1.4} scale={0.88} position={[0, 0.35, 0]} />

      <Shuttlecock path="rally" speed={0.65} phase={0.3} scale={1.35} position={[0, 0.4, 0]} />
      <Shuttlecock path="rally" speed={0.5} phase={2.1} scale={1.1} position={[0, 0.55, 0]} />
      <Shuttlecock path="float" speed={0.7} phase={1.0} scale={0.95} position={[0.8, 0.9, 0.4]} />

      <ContactShadows position={[0, -1.45, 0]} opacity={0.55} scale={14} blur={2.6} far={5} />
    </>
  )
}

function HeroFallback() {
  return (
    <div className="absolute inset-0 hero-fallback" aria-hidden>
      <svg className="hero-svg-bat" viewBox="0 0 80 280" fill="none">
        <path
          d="M28 42 L24 70 C18 120 16 170 20 210 C22 230 32 248 40 252 C48 248 58 230 60 210 C64 170 62 120 56 70 L52 42 Z"
          fill="url(#willow)"
          stroke="#8a6430"
          strokeWidth="1.5"
        />
        <rect x="34" y="8" width="12" height="40" rx="3" fill="#b01020" />
        <rect x="36" y="4" width="8" height="6" rx="1" fill="#1a1208" />
        <rect x="26" y="238" width="28" height="10" rx="2" fill="#1c1610" />
        <defs>
          <linearGradient id="willow" x1="20" y1="40" x2="60" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a67c42" />
            <stop offset="0.5" stopColor="#efd7a6" />
            <stop offset="1" stopColor="#9a7340" />
          </linearGradient>
        </defs>
      </svg>

      <div className="hero-svg-ball hero-svg-ball--1">
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#C8102E" />
          <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="#f5f0e6" strokeWidth="3" transform="rotate(-25 32 32)" />
          <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 4" transform="rotate(-25 32 32)" />
        </svg>
      </div>
      <div className="hero-svg-ball hero-svg-ball--2">
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="#f2f2f2" stroke="#ccc" />
          <ellipse cx="32" cy="32" rx="24" ry="9" fill="none" stroke="#999" strokeWidth="2" transform="rotate(20 32 32)" />
        </svg>
      </div>
      <div className="hero-svg-shuttle hero-svg-shuttle--1">
        <svg viewBox="0 0 48 72">
          <path d="M24 8 L40 58 L8 58 Z" fill="#f4efe4" stroke="#d9d0c0" />
          <circle cx="24" cy="62" r="9" fill="#c9a36a" />
          <rect x="14" y="52" width="20" height="5" fill="#0b6b45" />
        </svg>
      </div>
      <div className="hero-svg-shuttle hero-svg-shuttle--2">
        <svg viewBox="0 0 48 72">
          <path d="M24 8 L40 58 L8 58 Z" fill="#ebe4d6" stroke="#d0c6b4" />
          <circle cx="24" cy="62" r="9" fill="#c9a36a" />
          <rect x="14" y="52" width="20" height="5" fill="#0b6b45" />
        </svg>
      </div>
    </div>
  )
}

export function HeroScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 768px)').matches
    if (reduce || mobile) return
    setReady(true)
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!ready) return <HeroFallback />

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0.35, 0.25, 4.3], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
