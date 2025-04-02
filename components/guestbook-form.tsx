"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import DrawingCanvas from "./drawing-canvas"

interface GuestbookFormProps {
  onSubmit: (name: string, message: string, drawing: string | null) => void
}

export default function GuestbookForm({ onSubmit }: GuestbookFormProps) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [drawing, setDrawing] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (message.trim()) {
      onSubmit(name, message, drawing)

      // Reset form
      setName("")
      setMessage("")
      setDrawing(null)

      // Clear the canvas
      const canvas = document.querySelector("canvas")
      const ctx = canvas?.getContext("2d")
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Your Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-black rounded-xl bg-white"
      />
      <Textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full p-2 border border-black rounded-xl bg-white"
      />
      <DrawingCanvas onSave={setDrawing} />
      <button
        type="submit"
        className="w-full p-2 bg-white border border-black text-black hover:bg-gray-100 transition-colors rounded-xl"
      >
        Submit
      </button>
    </form>
  )
}

