"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

const liquidVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uDistortion;
  
  // Curl noise function
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  vec3 curlNoise(vec3 p) {
    float eps = 0.1;
    
    float n1 = snoise(p + vec3(eps, 0.0, 0.0));
    float n2 = snoise(p - vec3(eps, 0.0, 0.0));
    float n3 = snoise(p + vec3(0.0, eps, 0.0));
    float n4 = snoise(p - vec3(0.0, eps, 0.0));
    float n5 = snoise(p + vec3(0.0, 0.0, eps));
    float n6 = snoise(p - vec3(0.0, 0.0, eps));
    
    float x = (n4 - n3) - (n6 - n5);
    float y = (n6 - n5) - (n2 - n1);
    float z = (n2 - n1) - (n4 - n3);
    
    return normalize(vec3(x, y, z));
  }
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    vec3 curl = curlNoise(vec3(position.xy * 2.0, uTime * 0.5));
    pos += curl * uDistortion;
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const liquidFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Create flowing gradient
    float gradient1 = sin(uv.x * 3.14159 + uTime * 2.0) * 0.5 + 0.5;
    float gradient2 = sin(uv.y * 3.14159 + uTime * 1.5) * 0.5 + 0.5;
    float gradient3 = sin(length(uv - 0.5) * 6.0 + uTime) * 0.5 + 0.5;
    
    vec3 color1 = mix(uColor1, uColor2, gradient1);
    vec3 color2 = mix(uColor2, uColor3, gradient2);
    vec3 finalColor = mix(color1, color2, gradient3);
    
    // Add glow effect
    float glow = 1.0 - length(uv - 0.5) * 2.0;
    finalColor += glow * 0.3;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

interface LiquidTextProps {
  text: string
  fontSize?: number
  position?: [number, number, number]
  distortion?: number
}

function LiquidTextMesh({ text, fontSize = 2, position = [0, 0, 0], distortion = 0.1 }: LiquidTextProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={fontSize}
      color="white"
      anchorX="center"
      anchorY="middle"
      font="/fonts/Geist-Bold.ttf"
    >
      {text}
      <shaderMaterial
        ref={materialRef}
        vertexShader={liquidVertexShader}
        fragmentShader={liquidFragmentShader}
        transparent={true}
        uniforms={{
          uTime: { value: 0 },
          uDistortion: { value: distortion },
          uColor1: { value: [0.9, 0.2, 0.8] }, // Pink
          uColor2: { value: [0.6, 0.3, 0.9] }, // Purple
          uColor3: { value: [0.2, 0.8, 1.0] }, // Cyan
        }}
      />
    </Text>
  )
}

interface LiquidTextComponentProps {
  text: string
  className?: string
  fontSize?: number
  distortion?: number
}

export default function LiquidText({ text, className = "", fontSize = 2, distortion = 0.1 }: LiquidTextComponentProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <LiquidTextMesh text={text} fontSize={fontSize} distortion={distortion} />
      </Canvas>
    </div>
  )
}
