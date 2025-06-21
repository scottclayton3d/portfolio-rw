"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random particle positions
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#8b5cf6" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

function GradientSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial color="#ec4899" transparent opacity={0.1} wireframe />
    </mesh>
  )
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ParticleField />
        <GradientSphere />
      </Canvas>
    </div>
  )
}
