import React from "react";
import { motion } from "motion/react";
import { ANIMATIONS } from "../../lib/animations";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  badge,
  centered = true
}: SectionTitleProps) {
  return (
    <motion.div
      initial={ANIMATIONS.slideUp.initial}
      whileInView={ANIMATIONS.slideUp.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={ANIMATIONS.slideUp.transition}
      className={`mb-16 max-w-3xl ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      {badge && (
        <span className="inline-block mb-3 text-xs font-semibold tracking-[0.6px] uppercase text-product-terraform-bright">
          {badge}
        </span>
      )}
      
      <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold tracking-[-1.0px] leading-[1.19] text-ink">
        {title}
      </h2>
      
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg font-medium leading-[1.69] text-ink-muted">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
