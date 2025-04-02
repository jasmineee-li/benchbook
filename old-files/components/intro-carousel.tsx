"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Entry } from "./guestbook-container";

interface IntroCarouselProps {
  entries: Entry[];
  onCreatePost: () => void;
}

export default function IntroCarousel({
  entries,
  onCreatePost,
}: IntroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const previewEntries = entries.slice(0, 3); // Show only first 3 entries

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <Carousel className="w-full" onSelect={(index) => setCurrentSlide(index)}>
        <CarouselContent>
          {previewEntries.map((entry, index) => (
            <CarouselItem key={entry.id}>
              <Card className="border border-black bg-white">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-black">{entry.name}</h3>
                      <span className="text-sm text-gray-600">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-black">{entry.message}</p>
                    {entry.drawing && (
                      <div className="mt-4">
                        <Image
                          src={entry.drawing}
                          alt="User drawing"
                          width={300}
                          height={200}
                          className="border border-black rounded-xl"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
          <CarouselItem>
            <Card className="border border-black bg-white">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] space-y-4">
                <p className="text-center text-black">
                  Want to see more memories?
                </p>
                <Button
                  onClick={onCreatePost}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Share Your Memory First
                </Button>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <div className="flex items-center justify-center mt-4 space-x-2">
          <CarouselPrevious className="relative" />
          <div className="text-sm text-black">
            {currentSlide + 1} / {previewEntries.length + 1}
          </div>
          <CarouselNext className="relative" />
        </div>
      </Carousel>
    </div>
  );
}
