"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PostForm } from "@/components/post-form";
import { ChevronDown, Lock, PenLine } from "lucide-react";
import DownArrow from "@/components/down-arrow";
import { formatRelativeDate } from "@/lib/utils";

interface Memory {
  id: number;
  author: string;
  timestamp: Date;
  content: string;
  photo?: string | null;
  drawing?: string | null;
}

// Sample data - in a real app, this would come from your database
const PREVIEW_POSTS: Memory[] = [
  {
    id: 1,
    author: "Emma",
    timestamp: new Date(2025, 3, 12), // April 12, 2025
    content:
      "I sat on this bench after getting engaged at the lake. The sun was setting and everything felt perfect in that moment.",
  },
  {
    id: 2,
    author: "Michael",
    timestamp: new Date(2025, 2, 28), // March 28, 2025
    content:
      "Every Sunday morning I come here with my coffee and watch the world wake up. It's become my little ritual.",
  },
  {
    id: 3,
    author: "Sophia",
    timestamp: new Date(2025, 2, 15), // March 15, 2025
    content:
      "Found this bench when I needed a quiet moment during a difficult day. The view helped me find perspective.",
  },
];

const ALL_POSTS: Memory[] = [
  ...PREVIEW_POSTS,
  {
    id: 4,
    author: "James",
    timestamp: new Date(2025, 2, 10), // March 10, 2025
    content:
      "My grandfather used to bring me to this park when I was a child. Sitting here brings back those memories.",
  },
  {
    id: 5,
    author: "Olivia",
    timestamp: new Date(2025, 1, 28), // February 28, 2025
    content:
      "First picnic of the year! We chose this spot because of the beautiful view of the lake.",
  },
  {
    id: 6,
    author: "Daniel",
    timestamp: new Date(2025, 1, 14), // February 14, 2025
    content:
      "Proposed to my partner here on Valentine's Day. She said yes! This bench will always be special to us.",
  },
  {
    id: 7,
    author: "Ava",
    timestamp: new Date(2025, 0, 30), // January 30, 2025
    content:
      "Came here to read my book in peace. Ended up watching the sunset instead. No regrets.",
  },
];

export function ScrollableGuestbook() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [allPosts, setAllPosts] = useState<Memory[]>(ALL_POSTS);
  const previewSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const allPostsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToPreview = () => {
    previewSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormComplete = (newMemory: Memory) => {
    setHasSubmitted(true);
    // Add the new memory to the posts
    setAllPosts((prevPosts) => [newMemory, ...prevPosts]);
    // Scroll to all posts section after submission
    setTimeout(() => {
      allPostsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="w-full bg-amber-50">
      {/* Intro Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-serif font-medium text-amber-900 mb-6">
          Park Bench Memories
        </h1>
        <p className="text-amber-800 max-w-md mb-8 font-sans">
          An internet art project designed and assembled in Ithaca, NY, and
          Toronto, ON. Welcome to a digital guestbook anchored to this park
          bench. Read memories left by others and share your own.
        </p>
        <div className="w-full max-w-xs mb-12">
          <img
            src="/placeholder.svg?height=200&width=300"
            alt="Illustration of a park bench"
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <Button
          onClick={scrollToPreview}
          className="bg-amber-700 hover:bg-amber-800 text-amber-50 flex items-center"
        >
          Explore Memories
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </section>

      <section
        id="intro"
        className="min-h-screen flex flex-col items-center justify-center p-4"
      >
        <div className="text-center max-w-md w-full border border-black rounded-xl p-8 bg-white">
          <h1 className="text-4xl font-normal mb-6 text-black">
            Virtual Experiment
          </h1>
          <p className="mb-12 text-black">
            An internet art project designed and assembled in Ithaca, NY, and
            Toronto, ON.
          </p>
          <DownArrow targetId="explanation" />
        </div>
      </section>

      {/* Explanation Section */}
      <section
        id="explanation"
        className="min-h-screen flex flex-col items-center justify-center p-4"
      >
        <div className="text-center max-w-md w-full border border-black rounded-xl p-8 bg-white">
          <p className="mb-12 text-black leading-relaxed">
            we think the internet is too big/vast, too fast, othering, alien. we
            built this guestbook, anchored to your bench, to reimagine a sweet,
            slow web and microcommunity. welcome: read memories, leave a memory.
          </p>
          <DownArrow targetId="guestbook" />
        </div>
      </section>

      {/* Preview Posts Section */}
      <section
        ref={previewSectionRef}
        className="min-h-screen flex flex-col items-center p-6 pt-20"
      >
        <h2 className="text-2xl font-serif font-medium text-amber-900 mb-8">
          Recent Memories
        </h2>

        <div className="w-full max-w-md space-y-6 mb-12">
          {PREVIEW_POSTS.map((post) => (
            <Card key={post.id} className="bg-white p-6 shadow-md rounded-xl">
              <div className="text-sm text-amber-700 mb-1">
                {post.author} • {formatRelativeDate(post.timestamp)}
              </div>
              <p className="text-amber-900 memory-text">"{post.content}"</p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="flex items-center text-amber-700 bg-amber-100 px-4 py-2 rounded-lg">
            <Lock className="h-4 w-4 mr-2" />
            <span className="text-sm">More memories are locked</span>
          </div>

          <Button
            onClick={scrollToForm}
            className="bg-amber-700 hover:bg-amber-800 text-amber-50"
          >
            Share Your Memory to See More
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Form Section */}
      <section
        ref={formSectionRef}
        className="min-h-screen flex flex-col items-center p-6 pt-20"
      >
        <h2 className="text-2xl font-serif font-medium text-amber-900 mb-8">
          Share Your Memory
        </h2>
        <PostForm onComplete={handleFormComplete} />
      </section>

      {/* All Posts Section (visible after submission) */}
      {hasSubmitted && (
        <section
          ref={allPostsSectionRef}
          className="min-h-screen flex flex-col items-center p-6 pt-20"
        >
          <h2 className="text-2xl font-serif font-medium text-amber-900 mb-8">
            All Bench Memories
          </h2>

          <div className="w-full max-w-md space-y-6 mb-12">
            {allPosts.map((post) => (
              <Card key={post.id} className="bg-white p-6 shadow-md rounded-xl">
                <div className="text-sm text-amber-700 mb-1">
                  {post.author} • {formatRelativeDate(post.timestamp)}
                </div>
                <p className="text-amber-900 memory-text">"{post.content}"</p>
                {post.photo && (
                  <img
                    src={post.photo}
                    alt="Memory photo"
                    className="mt-4 w-full rounded-lg"
                  />
                )}
                {post.drawing && (
                  <img
                    src={post.drawing}
                    alt="Memory drawing"
                    className="mt-4 w-full rounded-lg"
                  />
                )}
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
