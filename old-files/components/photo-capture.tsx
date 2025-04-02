"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import Image from "next/image";

interface PhotoCaptureProps {
  onCapture: (photoData: string | null) => void;
}

export default function PhotoCapture({ onCapture }: PhotoCaptureProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setShowCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoData = canvas.toDataURL("image/jpeg");
        setPhoto(photoData);
        onCapture(photoData);
        stopCamera();
      }
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
    onCapture(null);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-black">Take a photo (optional):</p>

      {!showCamera && !photo && (
        <Button
          type="button"
          onClick={startCamera}
          className="w-full bg-white border border-black text-black hover:bg-gray-100"
        >
          <Camera className="w-4 h-4 mr-2" />
          Take Photo
        </Button>
      )}

      {showCamera && (
        <div className="relative border border-black rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <Button
              type="button"
              onClick={takePhoto}
              className="bg-white border border-black text-black hover:bg-gray-100"
            >
              Take Photo
            </Button>
            <Button
              type="button"
              onClick={stopCamera}
              className="bg-white border border-black text-black hover:bg-gray-100"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {photo && (
        <div className="relative">
          <Image
            src={photo}
            alt="Captured photo"
            width={300}
            height={200}
            className="w-full border border-black rounded-xl"
          />
          <Button
            type="button"
            onClick={clearPhoto}
            className="absolute top-2 right-2 p-2 h-auto bg-white border border-black text-black hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
