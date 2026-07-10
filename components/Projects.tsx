"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  { 
    id: 1, 
    date: 'Nov 2023 - Present',
    title: 'WPP Production, Gurgaon',
    role: 'Print Designer',
    bullets: [
      'Produce print and digital marketing assets for GSK pharma, routing every piece through Jira and Veeva Vault for MLR-adjacent review and approval.',
      'Own hero image and visual production for mass and Veeva-distributed emails, working to strict brand and regulatory guidelines.',
      'Build interactive Smart and standard EDA presentations used directly by field and sales teams.',
      'Serve as the design point of contact across EML, EDA, web, and video teams, keeping asset delivery on schedule through Workfront.'
    ],
  },
  { 
    id: 2, 
    date: 'Aug 2022 - Sept 2023',
    title: 'Socially Polished (Remote)', 
    role: 'Graphic Designer',
    bullets: [
      'Produced 100+ graphics and videos for 10+ brands, lifting engagement by 35%.',
      'Partnered with content and marketing teams on campaigns that drove a 30% increase in leads.',
      'Contributed to a 15% rise in repeat business through improved client satisfaction and retention.',
      'Owned visual content management for both the agency and its clients.'
    ],
  },
  { 
    id: 3, 
    date: 'Dec 2021 - May 2022',
    title: 'Mr. Moustache Cake', 
    role: 'Graphic Designer & Video Editor',
    bullets: [
      'Designed 50+ social media posts and reels, growing engagement 40% in 3 months.',
      'Drove a 25% increase in online sales through targeted content campaigns.',
      'Maintained brand consistency in close collaboration with content and marketing teams.',
      'Expanded the follower base by 30%, extending brand visibility and reach.'
    ],
  },
];

const internships = [
  {
    id: 4,
    date: 'Nov 2022 - Dec 2022',
    title: 'Du.Today',
    role: 'Video Editor',
    bullets: [
      'Created 20+ reels covering campus updates and events, boosting engagement by 30%.',
      'Shot photos and video for campus festivals, growing followers by 25%.',
      'Produced 4-5 videos that went on to increase page reach and visibility.'
    ]
  },
  {
    id: 5,
    date: 'Aug 2021 - Oct 2021',
    title: 'Handout Foundation',
    role: 'Graphic Designer',
    bullets: [
      'Designed 15+ social media graphics for campaigns including clothing donation and tree planting drives.',
      'Helped lift campaign engagement by 25% through creative visual content.',
      'Supported multiple drives with consistent, on-brand design content.'
    ]
  }
];

const credentials = [
  {
    id: 6,
    section: 'Leadership Experience',
    items: [
      {
        date: 'Jul 2023 - Jun 2024',
        title: 'Toastmasters International, District 41',
        role: 'Public Relations Manager'
      },
      {
        date: 'Jun 2022 - Jun 2023',
        title: 'Toastmasters International, District 41',
        role: 'Creative Excellence Manager'
      }
    ]
  },
  {
    id: 7,
    section: 'Education',
    items: [
      {
        date: 'Jul 2021 - Apr 2023',
        title: 'Arena Animation',
        role: 'Diploma, Graphic Designing, Video Editing & 2D/3D Animation'
      },
      {
        date: 'Apr 2020 - Apr 2021',
        title: 'Delhi University',
        role: 'Bachelor of Arts — Design Thinking, English, Political Science'
      }
    ]
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'work' | 'internships' | 'credentials'>('work');

  return (
    <section id="work" className="min-h-screen bg-[#121212] py-32 px-8 md:px-24 relative z-20">
      <div className="max-w-4xl mx-auto pt-24">
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-16 text-white tracking-tight text-center md:text-left"
        >
          My Journey
        </motion.h3>

        {/* Custom Premium Tab Switcher */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 border-b border-white/10 pb-4 justify-center md:justify-start">
          {(['work', 'internships', 'credentials'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg md:text-xl font-medium tracking-tight relative pb-4 transition-colors duration-300 ${
                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'work' && 'Work Experience'}
              {tab === 'internships' && 'Internships'}
              {tab === 'credentials' && 'Leadership & Education'}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Timeline Container */}
        <div className="relative border-l border-white/20 ml-4 md:ml-0 min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {activeTab === 'work' && experiences.map((exp, idx) => (
                <div key={exp.id} className="mb-16 ml-10 md:ml-16 relative">
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
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-gray-300 text-lg leading-relaxed">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {activeTab === 'internships' && internships.map((intern, idx) => (
                <div key={intern.id} className="mb-16 ml-10 md:ml-16 relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[45px] md:-left-[69px] top-2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 transition-transform duration-300 hover:scale-150"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
                    <h4 className="text-3xl font-bold text-white">{intern.title}</h4>
                    <span className="text-gray-500 font-medium tracking-wide">{intern.date}</span>
                  </div>
                  
                  <p className="text-gray-400 mb-6 uppercase tracking-widest font-semibold text-sm">
                    {intern.role}
                  </p>
                  
                  <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                    <ul className="space-y-3">
                      {intern.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-gray-300 text-lg leading-relaxed">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {activeTab === 'credentials' && credentials.map((group) => (
                <div key={group.id} className="mb-16 ml-10 md:ml-16 relative">
                  {/* Section Title */}
                  <h4 className="text-2xl font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 mb-8">
                    {group.section}
                  </h4>
                  
                  <div className="flex flex-col gap-8">
                    {group.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="relative pl-6 border-l-2 border-white/15">
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                          <h5 className="text-xl font-bold text-white">{item.title}</h5>
                          <span className="text-gray-500 text-sm font-medium tracking-wide">{item.date}</span>
                        </div>
                        <p className="text-gray-400 text-md">{item.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
