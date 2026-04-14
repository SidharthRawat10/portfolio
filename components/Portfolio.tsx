"use client";

import React from 'react';
import { motion } from 'framer-motion';

// 5 slides configuration
const portfolioData = [
  {
    id: "slide-1",
    title: "Social Media",
    images: ["/slides/2.jpg", "/slides/3.jpg"],
  },
  {
    id: "slide-2",
    title: "Print Media",
    images: ["/slides/4.jpg"],
  },
  {
    id: "slide-3",
    title: "Branding",
    images: ["/slides/5.jpg", "/slides/6.jpg", "/slides/7.jpg"],
  }
];

export default function Portfolio() {
  if (portfolioData.length === 0) return null;

  return (
    <section id="portfolio" className="relative w-full bg-[#050505] z-50 pt-32 pb-48 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 w-full flex flex-col gap-32 overflow-hidden">
        
        {portfolioData.map((item, index) => {
          return (
            <div key={item.id} className="w-full flex flex-col gap-12 items-center">
              
              {/* Title Section */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full flex flex-col items-center justify-center text-center"
              >
                <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white mb-2">
                  {item.title}
                </h3>
              </motion.div>

              {/* Images Section - Maintained maximum original quality */}
              {item.images && item.images.length > 0 && (
                <div className="w-full flex flex-col gap-8 md:gap-12">
                  {item.images.map((imgSrc, imgIndex) => (
                    <motion.div 
                      key={`${item.id}-${imgIndex}`}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      className="w-full relative rounded-2xl overflow-hidden shadow-2xl group border border-white/5 bg-[#111]"
                    >
                      <img 
                        src={imgSrc} 
                        alt={`${item.title} - Image ${imgIndex + 1}`}
                        className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        onError={(e) => {
                           (e.target as HTMLImageElement).src = `https://via.placeholder.com/1200x800/111111/444444?text=Upload+Image+for+${item.title.replace(/ /g, '+')}`;
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

            </div>
          );
        })}

      </div>
    </section>
  );
}
