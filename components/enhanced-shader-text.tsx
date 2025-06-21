"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"

const advancedVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uVertexDistortion;
  
  // Noise function for vertex displacement
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
  
  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Apply vertex-level distortion for organic edge deformation
    vec3 pos = position;
    float noise = snoise(vec3(position.xy * 5.0, uTime * 0.5));
    pos += normal * noise * uVertexDistortion;
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const advancedFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uDistortion;
  uniform float uSpeed;
  uniform float uEdgeDistortion;
  uniform float uFlowIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  // Enhanced noise functions
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
  
  // Fractal Brownian Motion for complex patterns
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  // Curl noise for fluid-like flow
  vec3 curlNoise(vec3 p) {
    float eps = 0.1;
    
    float n1 = fbm(p + vec3(eps, 0.0, 0.0));
    float n2 = fbm(p - vec3(eps, 0.0, 0.0));
    float n3 = fbm(p + vec3(0.0, eps, 0.0));
    float n4 = fbm(p - vec3(0.0, eps, 0.0));
    float n5 = fbm(p + vec3(0.0, 0.0, eps));
    float n6 = fbm(p - vec3(0.0, 0.0, eps));
    
    float x = (n4 - n3) - (n6 - n5);
    float y = (n6 - n5) - (n2 - n1);
    float z = (n2 - n1) - (n4 - n3);
    
    return normalize(vec3(x, y, z));
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Create flowing edge distortion using curl noise
    vec3 flowField = curlNoise(vec3(uv * 3.0, uTime * uSpeed * 0.3));
    vec2 flow = flowField.xy * uFlowIntensity;
    
    // Multiple layers of edge distortion
    float edgeNoise1 = fbm(vec3(uv * 6.0 + flow, uTime * uSpeed * 0.8));
    float edgeNoise2 = fbm(vec3(uv * 12.0 - flow * 0.5, uTime * uSpeed * 1.2));
    float edgeNoise3 = snoise(vec3(uv * 24.0 + flow * 0.3, uTime * uSpeed * 0.6));
    
    // Combine noise for organic edge distortion
    float combinedEdgeNoise = edgeNoise1 * 0.5 + edgeNoise2 * 0.3 + edgeNoise3 * 0.2;
    
    // Create distance field from center for edge detection
    float distFromCenter = length(uv - 0.5);
    
    // Apply edge distortion - stronger at the edges
    float edgeDistortion = combinedEdgeNoise * uEdgeDistortion * smoothstep(0.1, 0.5, distFromCenter);
    
    // Create distorted text boundary
    float textBoundary = 0.4 + edgeDistortion;
    float edgeMask = 1.0 - smoothstep(textBoundary - 0.1, textBoundary + 0.1, distFromCenter);
    
    // Discard pixels outside the distorted boundary
    if (edgeMask < 0.1) discard;
    
    // Create flowing internal gradient distortion
    vec2 gradientFlow = flow * 0.3;
    vec2 distortedUV = uv + gradientFlow;
    
    // Enhanced gradient system with flowing colors
    float time = uTime * uSpeed;
    float gradient1 = sin(distortedUV.x * 6.28318 + time * 2.0 + combinedEdgeNoise) * 0.5 + 0.5;
    float gradient2 = sin(distortedUV.y * 6.28318 + time * 1.5 - combinedEdgeNoise) * 0.5 + 0.5;
    float gradient3 = sin((distortedUV.x + distortedUV.y) * 4.0 + time + edgeDistortion * 10.0) * 0.5 + 0.5;
    float radialGradient = sin(distFromCenter * 8.0 + time * 0.8) * 0.5 + 0.5;
    
    // Complex color mixing with flow influence
    vec3 color1 = mix(uColor1, uColor2, gradient1);
    vec3 color2 = mix(uColor3, uColor4, gradient2);
    vec3 color3 = mix(color1, color2, gradient3);
    vec3 finalColor = mix(color3, mix(uColor1, uColor3, 0.5), radialGradient * 0.4);
    
    // Add flowing highlights
    float highlight = fbm(vec3(distortedUV * 8.0, time * 2.0));
    finalColor += highlight * 0.2 * vec3(1.0, 0.9, 0.8);
    
    // Edge glow effect with flow
    float edgeGlow = 1.0 - smoothstep(0.0, 0.2, abs(edgeMask - 0.5));
    finalColor += edgeGlow * 0.4 * mix(uColor2, uColor4, sin(time + combinedEdgeNoise * 5.0) * 0.5 + 0.5);
    
    // Dynamic brightness with edge consideration
    float brightness = 0.7 + 0.5 * sin(time * 3.0 + distortedUV.x * 8.0 + combinedEdgeNoise * 3.0);
    brightness *= (0.6 + 0.4 * edgeMask); // Brighter in center, dimmer at flowing edges
    
    finalColor *= brightness;
    
    // Flowing alpha with soft edges
    float flowingAlpha = edgeMask * (0.8 + 0.2 * sin(time * 2.0 + combinedEdgeNoise * 4.0));
    
    gl_FragColor = vec4(finalColor, flowingAlpha);
  }
`

interface EnhancedShaderTextProps {
  text: string
  fontSize?: number
  position?: [number, number, number]
  colorScheme?: "vibrant" | "iridescent" | "sunset" | "ocean"
  edgeDistortion?: number
  flowIntensity?: number
}

function EnhancedShaderText({
  text,
  fontSize = 2,
  position = [0, 0, 0],
  colorScheme = "vibrant",
  edgeDistortion = 0.2,
  flowIntensity = 0.1,
}: EnhancedShaderTextProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const colorSchemes = {
    vibrant: {
      color1: [1.0, 0.2, 0.8], // Hot pink
      color2: [0.8, 0.4, 1.0], // Purple
      color3: [0.2, 0.8, 1.0], // Cyan
      color4: [1.0, 0.8, 0.2], // Yellow
    },
    iridescent: {
      color1: [0.1, 0.9, 0.9], // Cyan
      color2: [0.9, 0.1, 0.9], // Magenta
      color3: [0.9, 0.9, 0.1], // Yellow
      color4: [0.1, 0.1, 0.9], // Blue
    },
    sunset: {
      color1: [1.0, 0.4, 0.1], // Orange
      color2: [1.0, 0.1, 0.4], // Red-pink
      color3: [0.8, 0.2, 0.8], // Purple
      color4: [0.2, 0.1, 0.6], // Deep blue
    },
    ocean: {
      color1: [0.1, 0.6, 0.9], // Ocean blue
      color2: [0.2, 0.9, 0.8], // Turquoise
      color3: [0.6, 0.3, 0.9], // Purple
      color4: [0.1, 0.8, 0.6], // Teal
    },
  }

  const colors = colorSchemes[colorScheme]

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
        vertexShader={advancedVertexShader}
        fragmentShader={advancedFragmentShader}
        transparent={true}
        side={THREE.DoubleSide}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: [window.innerWidth, window.innerHeight] },
          uDistortion: { value: 0.3 },
          uSpeed: { value: 0.5 },
          uEdgeDistortion: { value: edgeDistortion },
          uFlowIntensity: { value: flowIntensity },
          uVertexDistortion: { value: 0.05 },
          uColor1: { value: colors.color1 },
          uColor2: { value: colors.color2 },
          uColor3: { value: colors.color3 },
          uColor4: { value: colors.color4 },
        }}
      />
    </Text>
  )
}

interface EnhancedWebGLTextShaderProps {
  text: string
  className?: string
  fontSize?: number
  colorScheme?: "vibrant" | "iridescent" | "sunset" | "ocean"
  edgeDistortion?: number
  flowIntensity?: number
}

export default function EnhancedWebGLTextShader({
  text,
  className = "",
  fontSize = 2,
  colorScheme = "vibrant",
  edgeDistortion = 0.2,
  flowIntensity = 0.1,
}: EnhancedWebGLTextShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
      )
    }
  }, [])

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <EnhancedShaderText
          text={text}
          fontSize={fontSize}
          colorScheme={colorScheme}
          edgeDistortion={edgeDistortion}
          flowIntensity={flowIntensity}
        />
      </Canvas>
    </div>
  )
}
