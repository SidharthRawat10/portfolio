"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full min-h-[70vh] bg-[#0a0a0a] flex flex-col justify-between overflow-hidden z-20 overflow-hidden pt-32 pb-12 px-8 md:px-24">
      
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ffffff] opacity-[0.02] blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gray-400 text-lg uppercase tracking-[0.2em] mb-4"
        >
          Got a project in mind?
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-12 hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
        >
          Let's Talk.
        </motion.h2>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="mailto:iammanasdesigner@gmail.com" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105">
            <span className="relative z-10">iammanasdesigner@gmail.com</span>
            <div className="absolute inset-0 bg-gray-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Manas Singh Rawat. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="https://www.linkedin.com/in/manas-rawat-bbb597213/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300">LinkedIn</a>
          <a href="tel:9654358055" className="hover:text-white transition-colors duration-300">+91 96543 58055</a>
        </div>
      </div>
    </footer>
  );
}
