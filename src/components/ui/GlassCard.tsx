import React from "react";
import { motion } from "motion/react";
import { ANIMATIONS } from "../../lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  glow?: boolean;
  id?: string;
  key?: React.Key;
}

export default function GlassCard({
  children,
  className = "",
  onClick,
  hoverable = true,
  glow = false,
  id
}: GlassCardProps) {
  const cardContent = (
    <div
      id={id}
      className={`relative h-full overflow-hidden rounded-xl border bg-surface-1 border-hairline text-ink transition-all duration-300 ${
        hoverable ? "hover:bg-surface-2 hover:border-hairline" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Product Chromatic Tint instead of generic blue glow when glow is enabled */}
      {glow && (
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-product-terraform/5 blur-2xl pointer-events-none" />
      )}
      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
        {children}
      </div>
    </div>
  );

  if (hoverable && !onClick) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full"
      >
        {cardContent}
      </motion.div>
    );
  }

  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: 0.995, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="h-full"
      >
        {cardContent}
      </motion.div>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}
