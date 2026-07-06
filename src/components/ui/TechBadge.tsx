import React from "react";
import { motion } from "motion/react";
import { ICONS, IconName } from "../../lib/icons";
import { ANIMATIONS } from "../../lib/animations";

interface TechBadgeProps {
  name: string;
  iconName?: IconName;
  className?: string;
  key?: React.Key;
  onClick?: () => void;
  isActive?: boolean;
  isDimmed?: boolean;
}

export default function TechBadge({ 
  name, 
  iconName, 
  className = "", 
  onClick, 
  isActive = false, 
  isDimmed = false 
}: TechBadgeProps) {
  const Icon = iconName ? ICONS[iconName] : null;

  return (
    <motion.button
      onClick={onClick}
      disabled={!onClick}
      variants={ANIMATIONS.hoverBadge}
      whileHover={onClick ? "hover" : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-all duration-200 select-none ${
        onClick ? "cursor-pointer" : ""
      } ${
        isActive
          ? "bg-product-terraform-bright/20 text-white border-product-terraform-bright/60 shadow-[0_0_12px_rgba(132,74,222,0.25)] border"
          : "bg-surface-2 hover:bg-surface-3 border border-hairline text-ink-muted"
      } ${
        isDimmed && !isActive ? "opacity-30 hover:opacity-75" : "opacity-100"
      } ${className}`}
    >
      {Icon && (
        <Icon 
          className={`w-3.5 h-3.5 transition-colors duration-200 ${
            isActive ? "text-product-terraform-bright animate-pulse" : "text-product-terraform-bright"
          }`} 
        />
      )}
      <span>{name}</span>
    </motion.button>
  );
}
