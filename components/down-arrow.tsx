"use client";

import { ChevronDown } from "lucide-react";

interface DownArrowProps {
  targetId: string;
}

export default function DownArrow({ targetId }: DownArrowProps) {
  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTarget}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black hover:bg-gray-100 transition-colors"
      aria-label={`Scroll to ${targetId}`}
    >
      <ChevronDown className="w-6 h-6 text-black" />
    </button>
  );
}
