'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

type Props = {
  position?: [number, number, number]
  scale?: number
  phase?: number
  speed?: number
  /** 'rally' = cork-first flight arcs; 'float' = gentle hover */
  path?: 'rally' | 'float'
}

/**
 * Accurate badminton shuttlecock:
 * cork nose leads in flight, 16 overlapping feather vanes form the skirt.
 */
export function Shuttlecock({
  position = [0, 0, 0],
  scale = 1,
  phase = 0,
  speed = 1,
  path = 'rally',
}: Props) {
  const ref = useRef<Group>(null)
  const t = useRef(phase)
  const prev = useRef(new THREE.Vector3())
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const featherGeo = useMemo(() => {
    // Feather vane: tapered plane shape extruded slightly
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.quadraticCurveTo(0.035, 0.05, 0.028, 0.16)
    shape.quadraticCurveTo(0.01, 0.2, 0, 0.22)
    shape.quadraticCurveTo(-0.01, 0.2, -0.028, 0.16)
    shape.quadraticCurveTo(-0.035, 0.05, 0, 0)
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.004,
      bevelEnabled: false,
      curveSegments: 8,
    })
    g.translate(0, 0, -0.002)
    return g
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta * speed
    const a = t.current

    let x: number
    let y: number
    let z: number

    if (path === 'rally') {
      // Cork-first badminton arc (side-to-side clear)
      x = Math.sin(a) * 1.7
      z = Math.cos(a * 0.85) * 0.85
      y = position[1] + 0.35 + Math.sin(a * 0.5) * 0.55 + Math.abs(Math.cos(a)) * 0.2
    } else {
      x = position[0] + Math.sin(a * 0.6 + phase) * 0.35
      y = position[1] + Math.sin(a * 0.9) * 0.2
      z = position[2] + Math.cos(a * 0.6 + phase) * 0.35
    }

    tmp.set(x, y, z)
    if (prev.current.lengthSq() < 1e-8) {
      prev.current.copy(tmp)
      ref.current.position.copy(tmp)
      return
    }
    const vel = tmp.clone().sub(prev.current)
    prev.current.copy(tmp)
    ref.current.position.copy(tmp)

    // Orient cork in direction of travel (shuttle always flies cork-first)
    if (vel.lengthSq() > 1e-6) {
      const look = tmp.clone().add(vel.normalize())
      ref.current.lookAt(look)
      ref.current.rotateX(Math.PI / 2)
    }
  })

  return (
    <group ref={ref} scale={scale} position={position}>
      {/* Cork nose (hemisphere facing -Y / flight direction after orient) */}
      <mesh position={[0, -0.08, 0]} castShadow>
        <sphereGeometry args={[0.048, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c9a36a" roughness={0.75} />
      </mesh>
      <mesh position={[0, -0.055, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[0.048, 0.045, 0.025, 24]} />
        <meshStandardMaterial color="#d8b888" roughness={0.7} />
      </mesh>

      {/* Binding tape */}
      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.018, 24]} />
        <meshStandardMaterial color="#0b6b45" roughness={0.55} />
      </mesh>

      {/* Skirt ring */}
      <mesh position={[0, -0.01, 0]}>
        <torusGeometry args={[0.042, 0.006, 8, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>

      {/* 16 feathers */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2
        const lean = 0.38
        return (
          <group key={i} rotation={[0, a, 0]}>
            <mesh
              geometry={featherGeo}
              position={[0.018, 0.02, 0]}
              rotation={[lean, 0, 0.08]}
              castShadow
            >
              <meshStandardMaterial
                color={i % 2 === 0 ? '#f8f5ec' : '#ebe4d6'}
                roughness={0.9}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
