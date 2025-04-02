"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhotoCapture from "./photo-capture";
import DrawingCanvas from "./drawing-canvas";
import { createMemory, uploadImage } from "@/lib/services/memories";
import type { Memory, NewMemory } from "@/lib/types";

interface PostFormProps {
  onComplete: (memory: Memory) => void;
}

export function PostForm({ onComplete }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    memory: "",
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [drawing, setDrawing] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.memory.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Upload photo if exists
      let photoUrl = null;
      if (photo) {
        photoUrl = await uploadImage(photo, "photo");
      }

      // Upload drawing if exists
      let drawingUrl = null;
      if (drawing) {
        drawingUrl = await uploadImage(drawing, "drawing");
      }

      // Create the new memory
      const newMemory: NewMemory = {
        author: formData.name,
        content: formData.memory,
        photo: photoUrl,
        drawing: drawingUrl,
      };

      // Save to database
      const savedMemory = await createMemory(newMemory);

      // Clear the form
      setFormData({ name: "", memory: "" });
      setPhoto(null);
      setDrawing(null);

      // Clear the canvas
      const canvas = document.querySelector("canvas");
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Notify parent of completion
      onComplete(savedMemory);
    } catch (err) {
      console.error("Error submitting memory:", err);
      setError("Failed to save your memory. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white p-6 shadow-md rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-amber-800">
            Your Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="How you'd like to be known"
            className="border-amber-200 focus-visible:ring-amber-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="memory" className="text-amber-800">
            Your Memory
          </Label>
          <Textarea
            id="memory"
            name="memory"
            value={formData.memory}
            onChange={handleChange}
            placeholder="Share your experience or thoughts about this place..."
            className="min-h-[150px] border-amber-200 focus-visible:ring-amber-500 memory-text"
            required
          />
        </div>

        <div className="space-y-6">
          <PhotoCapture onCapture={setPhoto} />
          <DrawingCanvas onSave={setDrawing} />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Share Your Memory"}
          </Button>
        </div>

        <p className="text-xs text-center text-amber-600 mt-4">
          By sharing, you'll unlock access to all memories left on this bench.
        </p>
      </form>
    </Card>
  );
}
