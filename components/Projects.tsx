"use client";

import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  { 
    id: 1, 
    date: 'Nov 2023 - Present',
    title: 'WPP Production',
    role: 'Print-Designer',
    desc: 'Developed digital and print assets for GSK pharma and engaging visual elements for Smart and standard EDA presentations.',
  },
  { 
    id: 2, 
    date: 'Aug 2022 - Sept 2023',
    title: 'Socially Polished', 
    role: 'Graphic Designer',
    desc: 'Created 100+ graphics and videos for 10+ brands, boosting engagement by 35% and contributing to a 30% increase in leads.',
  },
  { 
    id: 3, 
    date: 'Dec 2021 - May 2022',
    title: 'Mr. Moustache Cake', 
    role: 'Graphic Designer & Video Editor',
    desc: 'Designed 50+ social media posts and reels, boosting engagement by 40% in 3 months and driving online sales.',
  },
  { 
    id: 4, 
    date: 'Nov 2022 - Dec 2022',
    title: 'Du.Today', 
    role: 'Video Editor',
    desc: 'Created 20+ reels on campus updates and events. Produced 4-5 viral videos that significantly increased page reach.',
  },
];

export default function Projects() {
  return (
    <section id="work" className="min-h-screen bg-[#121212] py-32 px-8 md:px-24 relative z-20">
      <div className="max-w-4xl mx-auto pt-24">
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-24 text-white tracking-tight"
        >
          Professional Experience
        </motion.h3>
        
        <div className="relative border-l border-white/20 ml-4 md:ml-0">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="mb-16 ml-10 md:ml-16 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[45px] md:-left-[69px] top-2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 transition-transform duration-300 hover:scale-150"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
                <h4 className="text-3xl font-bold text-white">{exp.title}</h4>
                <span className="text-gray-500 font-medium tracking-wide">{exp.date}</span>
              </div>
              
              <p className="text-gray-400 mb-6 uppercase tracking-widest font-semibold text-sm">
                {exp.role}
              </p>
              
              <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
