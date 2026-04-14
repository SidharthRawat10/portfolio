"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 75;

function getFramePath(index: number) {
  const paddedIndex = index.toString().padStart(2, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
}

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();
  
  // Preload images
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!active) return;
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          // Give layout a tick, then draw
          requestAnimationFrame(() => {
             drawFrame(loadedImages, 0);
          });
        }
      };
      loadedImages.push(img);
    }
    
    return () => {
      active = false;
    };
  }, []);

  const drawFrame = (imgs: HTMLImageElement[], frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgs[frameIndex]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    // Set actual size in memory
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // Set display size
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    // Normalize coordinate system
    ctx.scale(dpr, dpr);

    // Object cover logic
    const img = imgs[frameIndex];
    const canvasRatio = window.innerWidth / window.innerHeight;
    const imgRatio = img.width / img.height;

    let drawWidth = window.innerWidth;
    let drawHeight = window.innerHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = window.innerWidth;
      drawHeight = window.innerWidth / imgRatio;
      offsetY = (window.innerHeight - drawHeight) / 2;
    } else {
      drawHeight = window.innerHeight;
      drawWidth = window.innerHeight * imgRatio;
      offsetX = (window.innerWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Map scroll value to frame sequence index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length === FRAME_COUNT) {
      drawFrame(images, Math.round(latest));
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (images.length === FRAME_COUNT) {
        drawFrame(images, Math.round(frameIndex.get()));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-[#121212]">
      <canvas
        ref={canvasRef}
        className="block"
      />
    </div>
  );
}
