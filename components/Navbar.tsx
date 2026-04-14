"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6 flex justify-between items-center pointer-events-none"
      >
        <Link href="/" className="pointer-events-auto text-white text-xl font-bold tracking-tighter hover:text-gray-300 transition-colors uppercase">
          Manas Rawat©
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300 pointer-events-auto">
          <Link href="#work" className="hover:text-white transition-colors relative group">
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <button 
            onClick={() => setIsAboutOpen(true)}
            className="hover:text-white transition-colors relative group bg-transparent border-none p-0 cursor-pointer text-sm font-medium text-gray-300 font-sans tracking-normal"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </button>
          <Link href="#contact" className="hover:text-white transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <button className="md:hidden text-white pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
        </button>
      </motion.nav>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] w-full h-full bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsAboutOpen(false)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-50 flex items-center gap-3 group"
              onClick={(e) => {
                e.stopPropagation();
                setIsAboutOpen(false);
              }}
            >
              <span className="text-sm font-medium uppercase tracking-widest group-hover:opacity-100 transition-opacity">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content with Sober Animation */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="relative w-full max-w-6xl h-full md:h-[90vh] rounded-lg overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* Keeping the image strictly uncompressed */}
              <img 
                src="/slides/8.jpg" 
                alt="About" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
