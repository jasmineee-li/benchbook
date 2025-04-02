"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PostForm } from "@/components/post-form";
import { ChevronDown, Lock } from "lucide-react";
import type { Memory } from "@/lib/types";
import { getAllMemories, getPreviewMemories } from "@/lib/services/memories";
import { formatRelativeDate } from "@/lib/utils";

export function ScrollableGuestbook() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [previewMemories, setPreviewMemories] = useState<Memory[]>([]);
  const [allMemories, setAllMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const previewSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const allPostsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPreviewMemories() {
      try {
        const data = await getPreviewMemories();
        setPreviewMemories(data);
      } catch (err) {
        console.error("Error loading preview memories:", err);
        setError("Failed to load memories. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadPreviewMemories();
  }, []);

  const scrollToPreview = () => {
    previewSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormComplete = async (newMemory: Memory) => {
    setHasSubmitted(true);

    try {
      // Load all memories after submission
      const data = await getAllMemories();
      setAllMemories(data);

      // Scroll to all posts section after submission
      setTimeout(() => {
        allPostsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("Error loading all memories:", err);
      setError("Failed to load all memories. Please try refreshing the page.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-6 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-amber-700 hover:bg-amber-800 text-amber-50"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

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

      {/* Preview Posts Section */}
      <section
        ref={previewSectionRef}
        className="min-h-screen flex flex-col items-center p-6 pt-20"
      >
        <h2 className="text-2xl font-serif font-medium text-amber-900 mb-8">
          Recent Memories
        </h2>

        <div className="w-full max-w-md space-y-6 mb-12">
          {loading ? (
            <Card className="bg-white p-6 shadow-md rounded-xl">
              <p className="text-center text-amber-800">Loading memories...</p>
            </Card>
          ) : previewMemories.length === 0 ? (
            <Card className="bg-white p-6 shadow-md rounded-xl">
              <p className="text-center text-amber-800">
                No memories yet. Be the first to share one!
              </p>
            </Card>
          ) : (
            previewMemories.map((memory) => (
              <Card
                key={memory.id}
                className="bg-white p-6 shadow-md rounded-xl"
              >
                <div className="text-sm text-amber-700 mb-1">
                  {memory.author} •{" "}
                  {formatRelativeDate(new Date(memory.timestamp))}
                </div>
                <p className="text-amber-900 memory-text">"{memory.content}"</p>
                {memory.photo && (
                  <img
                    src={memory.photo}
                    alt="Memory photo"
                    className="mt-4 w-full rounded-lg"
                  />
                )}
                {memory.drawing && (
                  <img
                    src={memory.drawing}
                    alt="Memory drawing"
                    className="mt-4 w-full rounded-lg"
                  />
                )}
              </Card>
            ))
          )}
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
            {allMemories.map((memory) => (
              <Card
                key={memory.id}
                className="bg-white p-6 shadow-md rounded-xl"
              >
                <div className="text-sm text-amber-700 mb-1">
                  {memory.author} •{" "}
                  {formatRelativeDate(new Date(memory.timestamp))}
                </div>
                <p className="text-amber-900 memory-text">"{memory.content}"</p>
                {memory.photo && (
                  <img
                    src={memory.photo}
                    alt="Memory photo"
                    className="mt-4 w-full rounded-lg"
                  />
                )}
                {memory.drawing && (
                  <img
                    src={memory.drawing}
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
