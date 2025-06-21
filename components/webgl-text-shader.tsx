"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uDistortion;
  uniform float uSpeed;
  uniform float uEdgeDistortion;
  uniform float uEdgeThickness;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform sampler2D uTexture;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  // Enhanced noise functions for edge distortion
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
  
  // Fractal Brownian Motion for complex edge distortion
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 4; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
  
  // Flow field for organic edge movement
  vec2 flowField(vec2 uv, float time) {
    float noise1 = fbm(vec3(uv * 2.0, time * 0.3));
    float noise2 = fbm(vec3(uv * 3.0 + 100.0, time * 0.2));
    
    return vec2(
      cos(noise1 * 6.28318) * 0.5,
      sin(noise2 * 6.28318) * 0.5
    );
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Sample the text texture (alpha channel contains text shape)
    vec4 textSample = texture2D(uTexture, uv);
    float textAlpha = textSample.a;
    
    // Create flowing edge distortion
    vec2 flow = flowField(uv, uTime * uSpeed);
    
    // Multiple layers of noise for complex edge distortion
    float edgeNoise1 = fbm(vec3(uv * 8.0 + flow, uTime * uSpeed * 0.8));
    float edgeNoise2 = fbm(vec3(uv * 16.0 - flow * 0.5, uTime * uSpeed * 1.2));
    float edgeNoise3 = snoise(vec3(uv * 32.0 + flow * 0.3, uTime * uSpeed * 0.6));
    
    // Combine noise layers for organic edge distortion
    float combinedNoise = edgeNoise1 * 0.6 + edgeNoise2 * 0.3 + edgeNoise3 * 0.1;
    
    // Create distance field for edge detection
    float edgeDistance = length(uv - 0.5);
    float edgeMask = smoothstep(0.3, 0.5, edgeDistance);
    
    // Apply edge distortion based on text boundaries
    float distortedAlpha = textAlpha + combinedNoise * uEdgeDistortion * edgeMask;
    
    // Create soft edges with flowing distortion
    float edgeGradient = smoothstep(0.3, 0.7, distortedAlpha);
    
    // Discard pixels outside distorted text boundaries
    if (edgeGradient < 0.1) discard;
    
    // Create flowing internal distortion for gradient colors
    vec2 distortion = vec2(
      fbm(vec3(uv * 4.0, uTime * uSpeed)) * 0.1,
      fbm(vec3(uv * 5.0 + 50.0, uTime * uSpeed * 0.7)) * 0.08
    ) * uDistortion;
    
    vec2 distortedUV = uv + distortion + flow * 0.05;
    
    // Create flowing gradient with multiple color zones
    float gradient1 = sin(distortedUV.x * 3.14159 + uTime * uSpeed * 2.0) * 0.5 + 0.5;
    float gradient2 = sin(distortedUV.y * 3.14159 + uTime * uSpeed * 1.5) * 0.5 + 0.5;
    float gradient3 = sin((distortedUV.x + distortedUV.y) * 2.0 + uTime * uSpeed) * 0.5 + 0.5;
    float gradient4 = sin(length(distortedUV - 0.5) * 6.0 + uTime * uSpeed * 0.8) * 0.5 + 0.5;
    
    // Mix colors based on gradients and edge distortion
    vec3 color1 = mix(uColor1, uColor2, gradient1);
    vec3 color2 = mix(uColor3, uColor4, gradient2);
    vec3 color3 = mix(color1, color2, gradient3);
    vec3 finalColor = mix(color3, uColor1, gradient4 * 0.3);
    
    // Add edge glow effect
    float edgeGlow = 1.0 - smoothstep(0.0, uEdgeThickness, abs(edgeGradient - 0.5));
    finalColor += edgeGlow * 0.3;
    
    // Add brightness variation with edge consideration
    float brightness = 0.8 + 0.4 * sin(uTime * uSpeed * 3.0 + distortedUV.x * 10.0);
    brightness *= (0.7 + 0.3 * edgeGradient); // Dimmer at edges for depth
    
    finalColor *= brightness;
    
    // Apply edge-based alpha for smooth transitions
    float finalAlpha = edgeGradient * (0.8 + 0.2 * sin(uTime * uSpeed + combinedNoise));
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`

interface ShaderTextProps {
  text: string
  fontSize?: number
  position?: [number, number, number]
  colorScheme?: "vibrant" | "iridescent" | "sunset" | "ocean"
  edgeDistortion?: number
}

function ShaderText({
  text,
  fontSize = 2,
  position = [0, 0, 0],
  colorScheme = "vibrant",
  edgeDistortion = 0.15,
}: ShaderTextProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const textRef = useRef<any>(null)

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

  useEffect(() => {
    // Create a canvas texture for the text shape
    if (textRef.current && materialRef.current) {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = 512
      canvas.height = 512

      if (ctx) {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, 512, 512)

        ctx.fillStyle = "white"
        ctx.font = "bold 120px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, 256, 256)

        const texture = new THREE.CanvasTexture(canvas)
        materialRef.current.uniforms.uTexture.value = texture
      }
    }
  }, [text])

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      color="white"
      anchorX="center"
      anchorY="middle"
      font="/fonts/Geist-Bold.ttf"
    >
      {text}
    </Text>
  )
}

interface WebGLTextShaderProps {
  text: string
  className?: string
  fontSize?: number
  colorScheme?: "vibrant" | "iridescent" | "sunset" | "ocean"
  edgeDistortion?: number
}

export default function WebGLTextShader({
  text,
  className = "",
  fontSize = 2,
  colorScheme = "vibrant",
  edgeDistortion = 0.15,
}: WebGLTextShaderProps) {
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
        <ShaderText text={text} fontSize={fontSize} colorScheme={colorScheme} edgeDistortion={edgeDistortion} />
      </Canvas>
    </div>
  )
}
