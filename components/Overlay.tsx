"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Opacity maps
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);

  // Y transform (parallax)
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75], [50, -50]);

  return (
    <div className="pointer-events-none absolute top-0 left-0 w-full h-[500vh]">
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center z-10 overflow-hidden">
        
        {/* Section 1: 0% scroll */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex items-center justify-center text-center px-8"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl">
            Manas Rawat.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Graphic Designer & Video Editor.</span>
          </h1>
        </motion.div>

        {/* Section 2: 30% scroll */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center justify-start text-left px-8 md:px-24"
        >
          <h2 className="text-4xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-xl max-w-2xl">
            I create compelling visual content.
          </h2>
        </motion.div>

        {/* Section 3: 60% scroll */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-end text-right px-8 md:px-24"
        >
          <h2 className="text-4xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-xl max-w-2xl">
            Specializing in Print, <br/> Video & 3D Animation.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
