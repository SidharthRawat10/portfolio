"use client";

import React from 'react';
import { motion } from 'framer-motion';

// This structure allows you to construct a full image-based Behance-style project
const imageProjects = [
  {
    id: "social-media-project",
    // This is the image you specified as the Title
    titleImage: "/slides/2.png",
    // You can upload your content images and add their paths here
    contentImages: [
      "/slides/social-content.png", // <--- Save your image as social-content.png in public/slides/
    ]
  }
];

export default function ImagePortfolio() {
  return (
    <section id="image-portfolio" className="relative w-full bg-[#050505] z-50 pb-48 border-t border-white/5">
      {/* We use max-w-7xl to match your other sections, but allow the images to take up the full width of this container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-32">
        {imageProjects.map((project) => (
          <div key={project.id} className="w-full flex flex-col items-center">
            
            {/* 1. Title Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full flex justify-center bg-[#050505]"
            >
              <img 
                src={project.titleImage} 
                alt="Project Title"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* 2. Content Images */}
            {/* The gap-0 ensures there are no weird margins between the content images if you want them seamlessly connected */}
            <div className="w-full flex flex-col gap-8 md:gap-16 mt-8 md:mt-16">
              {project.contentImages.length > 0 ? (
                project.contentImages.map((imgSrc, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="w-full flex justify-center shadow-2xl"
                  >
                    <img 
                      src={imgSrc} 
                      alt={`Project Content ${idx + 1}`}
                      className="w-full h-auto object-contain rounded-lg border border-white/5"
                    />
                  </motion.div>
                ))
              ) : (
                /* Placeholder to show you where the content will go */
                <div className="w-full h-[400px] border border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center text-gray-500">
                  <svg className="w-12 h-12 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p>Upload your content image and add its path inside <code className="text-[#ff5e1a]">contentImages</code> array in <code className="text-[#ff5e1a]">ImagePortfolio.tsx</code></p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
