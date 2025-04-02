"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"

interface DrawingCanvasProps {
  onSave: (dataUrl: string | null) => void
}

export default function DrawingCanvas({ onSave }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawing, setHasDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 2
        ctx.lineCap = "round"
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setHasDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      ctx.beginPath()
    }

    // Automatically save the drawing when the user stops drawing
    if (hasDrawing) {
      saveDrawing()
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx && canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left
      const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top

      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataUrl = canvas.toDataURL()
      onSave(dataUrl)
    }
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setHasDrawing(false)
      onSave(null)
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-black">Draw something (optional):</p>
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        className="border border-black rounded-xl touch-none bg-white w-full"
      />
      {hasDrawing && (
        <button
          type="button"
          onClick={handleClear}
          className="w-full p-2 bg-white border border-black text-black hover:bg-gray-100 transition-colors rounded-xl"
        >
          Clear Drawing
        </button>
      )}
    </div>
  )
}

