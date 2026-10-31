'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

type Props = {
  mouse?: { x: number; y: number }
  scale?: number
}

/** Willow face + grain + sticker texture */
function useBatTextures() {
  return useMemo(() => {
    if (typeof document === 'undefined') {
      return { face: null as THREE.CanvasTexture | null, grip: null as THREE.CanvasTexture | null }
    }

    const face = document.createElement('canvas')
    face.width = 512
    face.height = 1024
    const f = face.getContext('2d')!

    const g = f.createLinearGradient(0, 0, 512, 0)
    g.addColorStop(0, '#8f6a38')
    g.addColorStop(0.18, '#c9a56a')
    g.addColorStop(0.45, '#efd7a6')
    g.addColorStop(0.7, '#d8b57a')
    g.addColorStop(1, '#9a7340')
    f.fillStyle = g
    f.fillRect(0, 0, 512, 1024)

    for (let i = 0; i < 70; i++) {
      const x = 20 + Math.random() * 470
      f.strokeStyle = `rgba(55, 30, 8, ${0.04 + Math.random() * 0.1})`
      f.lineWidth = 0.8 + Math.random() * 2
      f.beginPath()
      f.moveTo(x, 0)
      f.bezierCurveTo(x + 14, 250, x - 16, 650, x + 6, 1024)
      f.stroke()
    }

    // sticker
    f.fillStyle = '#b01020'
    f.fillRect(165, 390, 180, 88)
    f.fillStyle = '#fff'
    f.font = 'bold 44px Arial'
    f.fillText('LBW', 205, 445)
    f.font = '12px Arial'
    f.fillText('ENGLISH WILLOW', 185, 468)

    // toe paint
    f.fillStyle = 'rgba(20,16,10,0.55)'
    f.fillRect(0, 940, 512, 84)

    const faceTex = new THREE.CanvasTexture(face)
    faceTex.colorSpace = THREE.SRGBColorSpace
    faceTex.anisotropy = 8

    const grip = document.createElement('canvas')
    grip.width = 128
    grip.height = 256
    const gc = grip.getContext('2d')!
    for (let y = 0; y < 256; y += 8) {
      gc.fillStyle = y % 16 === 0 ? '#a50f1c' : '#7a0b14'
      gc.fillRect(0, y, 128, 8)
    }
    const gripTex = new THREE.CanvasTexture(grip)
    gripTex.colorSpace = THREE.SRGBColorSpace
    gripTex.wrapS = gripTex.wrapT = THREE.RepeatWrapping
    gripTex.repeat.set(1, 6)

    return { face: faceTex, grip: gripTex }
  }, [])
}

function buildBladeGeometry() {
  // Accurate cricket bat face silhouette (handle at +Y, toe at -Y)
  const shape = new THREE.Shape()
  shape.moveTo(-0.095, 0.62)
  shape.lineTo(-0.118, 0.42)
  shape.bezierCurveTo(-0.155, 0.1, -0.168, -0.25, -0.158, -0.52)
  shape.bezierCurveTo(-0.148, -0.7, -0.075, -0.82, 0, -0.845)
  shape.bezierCurveTo(0.075, -0.82, 0.148, -0.7, 0.158, -0.52)
  shape.bezierCurveTo(0.168, -0.25, 0.155, 0.1, 0.118, 0.42)
  shape.lineTo(0.095, 0.62)
  shape.closePath()

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelThickness: 0.028,
    bevelSize: 0.022,
    bevelSegments: 6,
    curveSegments: 40,
  })
  geo.translate(0, 0, -0.0275)
  geo.computeVertexNormals()
  return geo
}

export function CricketBat({ mouse = { x: 0, y: 0 }, scale = 1.15 }: Props) {
  const ref = useRef<Group>(null)
  const { face, grip } = useBatTextures()
  const bladeGeo = useMemo(() => buildBladeGeometry(), [])
  const spineGeo = useMemo(() => {
    // Triangular-ish back spine along blade
    const shape = new THREE.Shape()
    shape.moveTo(0, 0.55)
    shape.lineTo(-0.035, -0.75)
    shape.lineTo(0.035, -0.75)
    shape.closePath()
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false })
    g.rotateY(Math.PI / 2)
    g.translate(0, 0, -0.06)
    return g
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    // Showcase: slow turn + mouse lean (like inspecting a real bat)
    const targetY = 0.55 + mouse.x * 0.45 + Math.sin(t * 0.35) * 0.12
    const targetX = -0.28 + mouse.y * 0.2 + Math.sin(t * 0.4) * 0.04
    const targetZ = mouse.x * -0.08
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * Math.min(1, delta * 3.2)
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * Math.min(1, delta * 3.2)
    ref.current.rotation.z += (targetZ - ref.current.rotation.z) * Math.min(1, delta * 3)
    ref.current.position.y = Math.sin(t * 0.9) * 0.045
  })

  return (
    <group ref={ref} scale={scale} position={[0.05, -0.15, 0]}>
      {/* Blade face */}
      <mesh geometry={bladeGeo} castShadow receiveShadow>
        <meshStandardMaterial
          map={face ?? undefined}
          color={face ? '#ffffff' : '#e2c48a'}
          roughness={0.38}
          metalness={0.04}
        />
      </mesh>

      {/* Back spine swell */}
      <mesh geometry={spineGeo} castShadow>
        <meshStandardMaterial color="#c4a06a" roughness={0.5} />
      </mesh>

      {/* Splice / shoulder */}
      <mesh position={[0, 0.68, 0]} castShadow>
        <boxGeometry args={[0.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#a67c42" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.055, 0.012, 8, 24]} />
        <meshStandardMaterial color="#5c3a18" roughness={0.7} />
      </mesh>

      {/* Sarawak cane handle */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.032, 0.042, 0.58, 24]} />
        <meshStandardMaterial color="#6b4423" roughness={0.8} />
      </mesh>

      {/* Rubber grip sleeve */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <cylinderGeometry args={[0.046, 0.05, 0.5, 24]} />
        <meshStandardMaterial
          map={grip ?? undefined}
          color={grip ? '#ffffff' : '#b01020'}
          roughness={0.7}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 1.36, 0]}>
        <cylinderGeometry args={[0.048, 0.048, 0.03, 20]} />
        <meshStandardMaterial color="#1a1208" />
      </mesh>

      {/* Toe guard */}
      <mesh position={[0, -0.86, 0.01]} rotation={[0.25, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.045, 0.09]} />
        <meshStandardMaterial color="#1c1610" roughness={0.75} />
      </mesh>
    </group>
  )
}
