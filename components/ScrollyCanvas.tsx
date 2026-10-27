"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 75;

function getFramePath(index: number) {
  const paddedIndex = index.toString().padStart(2, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
}

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const loadedCountRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  const { scrollYProgress } = useScroll();

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Find the requested frame, or the closest loaded frame
    let img = imagesRef.current[frameIndex];
    let effectiveIndex = frameIndex;

    if (!img) {
      let minDiff = Infinity;
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (imagesRef.current[i]) {
          const diff = Math.abs(i - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            effectiveIndex = i;
            img = imagesRef.current[i];
          }
        }
      }
    }

    if (!img) return;
    if (lastDrawnFrameRef.current === effectiveIndex && effectiveIndex === frameIndex) {
      return;
    }
    lastDrawnFrameRef.current = effectiveIndex;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== Math.floor(displayWidth * dpr) || canvas.height !== Math.floor(displayHeight * dpr)) {
      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const canvasRatio = displayWidth / displayHeight;
    const imgRatio = (img.naturalWidth || img.width) / (img.naturalHeight || img.height);

    let drawWidth = displayWidth;
    let drawHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  const scheduleDraw = (frame: number) => {
    targetFrameRef.current = frame;
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(targetFrameRef.current);
        rafIdRef.current = null;
      });
    }
  };

  const loadSingleFrame = (index: number, onLoaded?: () => void) => {
    if (imagesRef.current[index]) {
      onLoaded?.();
      return;
    }
    const img = new Image();
    img.decoding = "async";
    img.src = getFramePath(index);
    img.onload = () => {
      imagesRef.current[index] = img;
      loadedCountRef.current++;
      onLoaded?.();
    };
  };

  useEffect(() => {
    let isCancelled = false;

    // Phase 1: PRIORITY LOAD Frame 0 immediately and draw it
    loadSingleFrame(0, () => {
      if (isCancelled) return;
      scheduleDraw(0);

      // Phase 2: Load initial buffer (frames 1 to 5)
      for (let i = 1; i <= 5; i++) {
        loadSingleFrame(i);
      }

      // Phase 3: Background lazy queue for remaining frames during browser idle time
      let currentIndex = 6;
      const loadNextBatch = () => {
        if (isCancelled || currentIndex >= FRAME_COUNT) return;

        const batchSize = 3;
        const end = Math.min(currentIndex + batchSize, FRAME_COUNT);
        for (let i = currentIndex; i < end; i++) {
          loadSingleFrame(i);
        }
        currentIndex = end;

        if (currentIndex < FRAME_COUNT) {
          if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(loadNextBatch, { timeout: 200 });
          } else {
            setTimeout(loadNextBatch, 50);
          }
        }
      };

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadNextBatch, { timeout: 300 });
      } else {
        setTimeout(loadNextBatch, 100);
      }
    });

    return () => {
      isCancelled = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const rounded = Math.min(Math.max(Math.round(latest), 0), FRAME_COUNT - 1);
    if (!imagesRef.current[rounded]) {
      loadSingleFrame(rounded, () => scheduleDraw(rounded));
    }
    scheduleDraw(rounded);
  });

  useEffect(() => {
    const handleResize = () => {
      lastDrawnFrameRef.current = -1;
      scheduleDraw(targetFrameRef.current);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-[#121212]">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}
