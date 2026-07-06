import React from "react";
import { motion } from "motion/react";
import { ICONS, IconName } from "../../lib/icons";
import { ANIMATIONS } from "../../lib/animations";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "accent" | "outline";
  iconName?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
  download?: boolean;
}

export default function GradientButton({
  children,
  onClick,
  href,
  variant = "primary",
  iconName,
  iconPosition = "right",
  className = "",
  download = false
}: GradientButtonProps) {
  const Icon = iconName ? ICONS[iconName] : null;

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-white text-black font-semibold border-transparent hover:bg-white/90";
      case "secondary":
        return "bg-surface-2 text-ink border-hairline hover:bg-surface-3 hover:text-white";
      case "accent":
        return "bg-product-terraform text-white font-semibold border-transparent hover:bg-product-terraform-bright";
      case "outline":
      default:
        return "bg-transparent text-ink-muted border-hairline hover:bg-surface-1 hover:text-white";
    }
  };

  const buttonContent = (
    <span className="flex items-center justify-center gap-1.5 font-medium text-xs tracking-wider uppercase">
      {Icon && iconPosition === "left" && <Icon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />}
    </span>
  );

  const buttonClasses = `group inline-flex items-center justify-center px-4.5 py-2.5 rounded-md border transition-all duration-200 cursor-pointer ${getVariantStyles()} ${className}`;

  if (href) {
    if (href.startsWith("#")) {
      return (
        <motion.a
          href={href}
          whileTap={ANIMATIONS.clickButton.tap}
          className={buttonClasses}
        >
          {buttonContent}
        </motion.a>
      );
    }
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download={download}
        whileTap={ANIMATIONS.clickButton.tap}
        className={buttonClasses}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileTap={ANIMATIONS.clickButton.tap}
      className={buttonClasses}
    >
      {buttonContent}
    </motion.button>
  );
}
