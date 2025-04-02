"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PostCarousel } from "@/components/post-carousel"
import { PostForm } from "@/components/post-form"
import { ChevronRight } from "lucide-react"

export function Intro() {
  const [step, setStep] = useState<"intro" | "preview" | "form" | "complete">("intro")

  return (
    <div className="w-full min-h-screen flex flex-col">
      {step === "intro" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 bg-amber-50">
          <h1 className="text-3xl font-serif font-medium text-amber-900">Park Bench Memories</h1>
          <p className="text-amber-800 max-w-md">
            Welcome to a digital guestbook anchored to this park bench. Read memories left by others and share your own.
          </p>
          <div className="w-full max-w-xs">
            <img
              src="/placeholder.svg?height=200&width=300"
              alt="Illustration of a park bench"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <Button onClick={() => setStep("preview")} className="mt-8 bg-amber-700 hover:bg-amber-800 text-amber-50">
            Explore Memories <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {step === "preview" && (
        <div className="flex flex-col items-center min-h-screen bg-amber-50 p-6">
          <h2 className="text-2xl font-serif font-medium text-amber-900 mb-6">Recent Memories</h2>
          <PostCarousel onSeeMore={() => setStep("form")} />
        </div>
      )}

      {step === "form" && (
        <div className="flex flex-col items-center min-h-screen bg-amber-50 p-6">
          <h2 className="text-2xl font-serif font-medium text-amber-900 mb-6">Share Your Memory</h2>
          <PostForm onComplete={() => setStep("complete")} />
        </div>
      )}

      {step === "complete" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 bg-amber-50">
          <h2 className="text-2xl font-serif font-medium text-amber-900">Thank You!</h2>
          <p className="text-amber-800 max-w-md">
            Your memory has been added to the park bench guestbook. You now have access to all memories shared here.
          </p>
          <Button
            onClick={() => (window.location.href = "/guestbook")}
            className="mt-4 bg-amber-700 hover:bg-amber-800 text-amber-50"
          >
            View All Memories <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

