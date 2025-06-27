"use client"

import { useEffect, useRef } from "react"

export default function Demo3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rotation = 0

    const drawCube = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const size = 40

      // Simple 3D cube projection
      const cos = Math.cos(rotation)
      const sin = Math.sin(rotation)

      // Define cube vertices
      const vertices = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ]

      // Project 3D to 2D
      const projected = vertices.map(([x, y, z]) => {
        const rotatedX = x * cos - z * sin
        const rotatedZ = x * sin + z * cos
        return [centerX + rotatedX * size, centerY + y * size]
      })

      // Draw cube edges
      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0], // back face
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4], // front face
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7], // connecting edges
      ]

      ctx.strokeStyle = "#8B5CF6"
      ctx.lineWidth = 2

      edges.forEach(([start, end]) => {
        ctx.beginPath()
        ctx.moveTo(projected[start][0], projected[start][1])
        ctx.lineTo(projected[end][0], projected[end][1])
        ctx.stroke()
      })

      rotation += 0.02
      requestAnimationFrame(drawCube)
    }

    drawCube()
  }, [])

  return (
    <div className="bg-gray-900 rounded-lg h-full flex items-center justify-center">Add commentMore actions
      <canvas ref={canvasRef} width={280} height={180} className="rounded" />
    </div>
  )
}
