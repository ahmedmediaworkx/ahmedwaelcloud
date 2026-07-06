// Framer Motion Animation Configurations
// Centralized to prevent magic values in TSX files and maintain cohesive feel

export const TRANSITIONS = {
  defaultSpring: { type: "spring", stiffness: 300, damping: 30 },
  smoothEase: { type: "tween", ease: "easeInOut", duration: 0.4 },
  staggerDelay: 0.05,
};

export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  },

  hoverCard: {
    hover: {
      y: -4,
      scale: 1.01,
      borderColor: "rgba(59, 130, 246, 0.4)", // Blue-500 equivalent opacity
      boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.15)",
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  },

  hoverBadge: {
    hover: {
      scale: 1.03,
      borderColor: "rgba(6, 182, 212, 0.5)", // Cyan-500
      boxShadow: "0 4px 12px -2px rgba(6, 182, 212, 0.1)",
      transition: { duration: 0.15 }
    }
  },

  clickButton: {
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }
};
