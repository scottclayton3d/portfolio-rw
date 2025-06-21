"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import type * as THREE from "three"

interface ModelProps {
  url: string
  scale?: number
}

function Model({ url, scale = 1 }: ModelProps) {
  const { scene } = useGLTF(url)
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return <primitive ref={meshRef} object={scene} scale={scale} />
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-2" />
        <p>Loading 3D Model...</p>
      </div>
    </Html>
  )
}

interface ThreeDModelViewerProps {
  modelUrl: string
  title: string
  description: string
}

export default function ThreeDModelViewer({ modelUrl, title, description }: ThreeDModelViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const controlsRef = useRef<any>(null)

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const zoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(0.8)
      controlsRef.current.update()
    }
  }

  const zoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(0.8)
      controlsRef.current.update()
    }
  }

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${isFullscreen ? "fixed inset-4 z-50" : "h-96"}`}>
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button size="icon" variant="secondary" onClick={resetCamera} className="bg-black/50 backdrop-blur-sm">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" onClick={zoomIn} className="bg-black/50 backdrop-blur-sm">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" onClick={zoomOut} className="bg-black/50 backdrop-blur-sm">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-black/50 backdrop-blur-sm"
        >
          {isFullscreen ? "✕" : "⛶"}
        </Button>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Suspense fallback={<LoadingFallback />}>
          <Model url={modelUrl} />
          <Environment preset="studio" />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
