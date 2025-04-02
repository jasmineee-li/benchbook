"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Lock } from "lucide-react"

// Sample data - in a real app, this would come from your database
const PREVIEW_POSTS = [
  {
    id: 1,
    author: "Emma",
    date: "April 12, 2025",
    content:
      "I sat on this bench after getting engaged at the lake. The sun was setting and everything felt perfect in that moment.",
  },
  {
    id: 2,
    author: "Michael",
    date: "March 28, 2025",
    content:
      "Every Sunday morning I come here with my coffee and watch the world wake up. It's become my little ritual.",
  },
  {
    id: 3,
    author: "Sophia",
    date: "March 15, 2025",
    content:
      "Found this bench when I needed a quiet moment during a difficult day. The view helped me find perspective.",
  },
]

interface PostCarouselProps {
  onSeeMore: () => void
}

export function PostCarousel({ onSeeMore }: PostCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex === PREVIEW_POSTS.length - 1 ? 0 : prevIndex + 1))
  }

  const prevPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? PREVIEW_POSTS.length - 1 : prevIndex - 1))
  }

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <Card className="bg-white p-6 shadow-md rounded-xl min-h-[300px] flex flex-col">
          <div className="text-sm text-amber-700 mb-1">
            {PREVIEW_POSTS[currentIndex].author} • {PREVIEW_POSTS[currentIndex].date}
          </div>
          <p className="text-amber-900 flex-grow font-serif">"{PREVIEW_POSTS[currentIndex].content}"</p>
          <div className="text-xs text-amber-600 mt-4">
            {currentIndex + 1} of {PREVIEW_POSTS.length} preview memories
          </div>
        </Card>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white h-8 w-8 rounded-full border-amber-200"
          onClick={prevPost}
        >
          <ChevronLeft className="h-4 w-4 text-amber-700" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white h-8 w-8 rounded-full border-amber-200"
          onClick={nextPost}
        >
          <ChevronRight className="h-4 w-4 text-amber-700" />
        </Button>
      </div>

      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-1 mb-4">
          {PREVIEW_POSTS.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-amber-700" : "bg-amber-300"}`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center text-amber-700 bg-amber-100 px-4 py-2 rounded-lg">
            <Lock className="h-4 w-4 mr-2" />
            <span className="text-sm">More memories are locked</span>
          </div>

          <Button onClick={onSeeMore} className="bg-amber-700 hover:bg-amber-800 text-amber-50">
            Share Your Memory to See More
          </Button>
        </div>
      </div>
    </div>
  )
}

