"use client";

import { motion } from "framer-motion";
import { 
  SiFigma, 
  SiFramer
} from "react-icons/si";

const skills = [
  {
    name: "Premiere Pro",
    label: "Pr",
    color: "#9999FF", // Premiere Pro Purple
    startPos: { x: -1000, y: -800, rotate: -180 }, 
  },
  {
    name: "Photoshop",
    label: "Ps",
    color: "#31A8FF", // Photoshop Blue
    startPos: { x: 1000, y: -500, rotate: 180 }, 
  },
  {
    name: "Illustrator",
    label: "Ai",
    color: "#FF9A00", // Illustrator Orange
    startPos: { x: -900, y: 700, rotate: 90 }, 
  },
  {
    name: "Figma",
    isIcon: true, 
    icon: SiFigma,
    color: "#0ACF83", // Figma Green
    startPos: { x: 800, y: 800, rotate: -90 }, 
  },
  {
    name: "After Effects",
    label: "Ae",
    color: "#9999FF", // After Effects Purple
    startPos: { x: -100, y: -900, rotate: 360 }, 
  },
  { 
    name: "Framer Motion", 
    isIcon: true, 
    icon: SiFramer, 
    color: "#0055FF", 
    startPos: { x: 600, y: -600, rotate: 180 } 
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-32 overflow-hidden bg-[#0c0c0c] border-t border-white/5 flex flex-col items-center justify-center min-h-[90vh] z-50">
      
      {/* Infinite Running Marquee Background */}
      <div className="absolute top-1/2 left-0 w-[200vw] overflow-hidden -translate-y-1/2 pointer-events-none opacity-[0.03] z-0 flex select-none">
        <motion.div
          className="flex whitespace-nowrap text-[15vw] font-black text-white uppercase leading-none tracking-tight"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          <span className="pr-16">PREMIERE PRO • PHOTOSHOP • ILLUSTRATOR • FIGMA • AFTER EFFECTS •</span>
          <span className="pr-16">PREMIERE PRO • PHOTOSHOP • ILLUSTRATOR • FIGMA • AFTER EFFECTS •</span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl w-full px-6 flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="text-center mb-16 z-10"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
            Core Skills
          </h2>
          <p className="text-gray-500 text-xl font-light max-w-2xl mx-auto">
            My complete creative arsenal.
          </p>
        </motion.div>

        {/* The Container for the jumbling white balls */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10 w-full relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
        >
          {skills.map((skill, i) => {
            const IconComponent = skill.icon;
            
            return (
              <motion.div
                key={skill.name}
                // Use variants so that `whileInView` on the parent safely triggers children 
                // regardless of their starting position far off-screen.
                variants={{
                  hidden: { 
                    opacity: 0, 
                    x: skill.startPos.x, 
                    y: skill.startPos.y, 
                    rotate: skill.startPos.rotate,
                    scale: 0.1 
                  },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    y: 0, 
                    rotate: 0,
                    scale: 1,
                    transition: { 
                      duration: 1.5, 
                      type: "spring",
                      bounce: 0.35,
                      stiffness: 50,
                      damping: 12,
                      mass: 1.2,
                    }
                  }
                }}
                whileHover={{
                  y: -15,
                  scale: 1.15,
                  boxShadow: `0px 20px 40px -10px ${skill.color}80`,
                  transition: { duration: 0.3, type: "spring" }
                }}
                className="relative group flex flex-col items-center justify-center cursor-pointer will-change-transform z-10 hover:z-20 w-28 h-28 md:w-36 md:h-36 rounded-full bg-white transition-shadow duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1),_inset_0_10px_20px_rgba(255,255,255,0.4)]"
              >
                
                {/* Continuous floating animation for the inner content */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + (i % 4), // Varied duration for organic feel
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                  className="relative z-10 flex items-center justify-center w-full h-full"
                >
                  {skill.isIcon && IconComponent ? (
                    <IconComponent className="w-12 h-12 md:w-16 md:h-16" style={{ color: skill.color }} />
                  ) : (
                    <span 
                      className="text-4xl md:text-6xl font-extrabold tracking-tighter"
                      style={{ color: skill.color }}
                    >
                      {skill.label}
                    </span>
                  )}
                </motion.div>
                
                {/* Text below the ball */}
                <span className="absolute -bottom-10 md:-bottom-12 text-sm md:text-md font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-300 whitespace-nowrap">
                  {skill.name}
                </span>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
