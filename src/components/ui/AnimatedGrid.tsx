import { motion } from "motion/react";

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(51,65,85,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(51,65,85,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" 
      />
      
      {/* Radial fade mask to make grid soft around the margins */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-50 dark:via-slate-950 to-slate-50 dark:to-slate-950" />

      {/* Pulsing Light Dots */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 dark:opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 blur-[100px]"
        />
      </div>

      <div className="absolute top-[10%] right-[10%] opacity-30 dark:opacity-10">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-[400px] h-[400px] rounded-full bg-cyan-400/15 blur-[80px]"
        />
      </div>
    </div>
  );
}
