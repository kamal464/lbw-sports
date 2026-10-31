'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

type Props = {
  position?: [number, number, number]
  color?: string
  /** 'red' leather or white / tennis */
  variant?: 'red' | 'white' | 'tennis'
  scale?: number
  /** Flight path style */
  path?: 'bowl' | 'toss' | 'orbit'
  phase?: number
  speed?: number
}

function useLeatherTexture(variant: 'red' | 'white' | 'tennis') {
  return useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    const base =
      variant === 'red' ? '#b01020' : variant === 'white' ? '#f0f0f0' : '#d4ff3a'
    ctx.fillStyle = base
    ctx.fillRect(0, 0, 512, 512)

    for (let i = 0; i < 1200; i++) {
      ctx.fillStyle =
        variant === 'tennis'
          ? `rgba(80,100,20,${Math.random() * 0.08})`
          : `rgba(0,0,0,${Math.random() * 0.07})`
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2)
    }

    // Primary seam band
    ctx.strokeStyle = variant === 'tennis' ? '#ffffff' : '#f5f0e6'
    ctx.lineWidth = 14
    ctx.beginPath()
    ctx.ellipse(256, 256, 200, 80, 0.4, 0, Math.PI * 2)
    ctx.stroke()

    // Stitching dashes
    ctx.strokeStyle = variant === 'red' ? '#1a1a1a' : '#888'
    ctx.lineWidth = 2
    ctx.setLineDash([6, 8])
    ctx.beginPath()
    ctx.ellipse(256, 256, 200, 80, 0.4, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Quarter seam suggestion
    ctx.strokeStyle = variant === 'tennis' ? 'rgba(255,255,255,0.7)' : 'rgba(245,240,230,0.55)'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.ellipse(256, 256, 80, 200, -0.3, 0, Math.PI * 2)
    ctx.stroke()

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [variant])
}

function SeamRing({ radius = 0.182 }: { radius?: number }) {
  const geo = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
    const pts = curve.getPoints(96).map((p) => new THREE.Vector3(p.x, 0, p.y))
    const path = new THREE.CatmullRomCurve3(pts, true)
    return new THREE.TubeGeometry(path, 96, 0.006, 8, true)
  }, [radius])

  return (
    <mesh geometry={geo} rotation={[Math.PI / 2, 0.15, 0]}>
      <meshStandardMaterial color="#f4efe6" roughness={0.55} />
    </mesh>
  )
}

export function CricketBall({
  position = [0, 0, 0],
  color,
  variant = 'red',
  scale = 1,
  path = 'bowl',
  phase = 0,
  speed = 1,
}: Props) {
  const ref = useRef<Group>(null)
  const t = useRef(phase)
  const map = useLeatherTexture(variant)
  const tint = color ?? (variant === 'red' ? '#ffffff' : variant === 'white' ? '#ffffff' : '#ffffff')

  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta * speed

    // Spin like a real delivery (around seam axis)
    ref.current.rotation.z += delta * 4.5 * speed
    ref.current.rotation.x += delta * 0.8 * speed

    const a = t.current
    if (path === 'bowl') {
      // Parabolic "delivery" loop in front of camera
      const x = Math.sin(a) * 1.55
      const z = Math.cos(a) * 0.55 - 0.2
      const y = position[1] + Math.abs(Math.sin(a)) * 0.55 - 0.15
      ref.current.position.set(x, y, z)
    } else if (path === 'toss') {
      const x = Math.cos(a * 0.7) * 1.2
      const z = Math.sin(a * 0.7) * 1.1
      const y = position[1] + Math.sin(a * 1.4) * 0.65
      ref.current.position.set(x, y, z)
    } else {
      ref.current.position.set(
        Math.cos(a) * 1.6,
        position[1] + Math.sin(a * 2) * 0.2,
        Math.sin(a) * 1.6,
      )
    }
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.175, 48, 48]} />
        <meshStandardMaterial
          map={map ?? undefined}
          color={map ? tint : variant === 'red' ? '#C8102E' : variant === 'white' ? '#f2f2f2' : '#c8e000'}
          roughness={variant === 'tennis' ? 0.85 : 0.48}
          metalness={0.05}
        />
      </mesh>
      {variant !== 'tennis' && <SeamRing />}
    </group>
  )
}
