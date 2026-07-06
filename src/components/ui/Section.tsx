import React from "react";
import { motion } from "motion/react";

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  divider?: boolean;
}

export default function Section({ children, id, className = "", divider = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`relative py-24 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      {divider && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-hairline" />
      )}
    </motion.section>
  );
}

