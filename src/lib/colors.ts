// Centralized style palette matching Vercel/Linear dark aesthetics
// All hex colors mapped here to prevent hardcoded hex values in visual layers

export const COLORS = {
  // Brand Accents
  primary: {
    hex: "#3b82f6", // Blue
    twClass: "text-blue-500",
    bgClass: "bg-blue-500"
  },
  secondary: {
    hex: "#6366f1", // Indigo
    twClass: "text-indigo-500",
    bgClass: "bg-indigo-500"
  },
  accent: {
    hex: "#06b6d4", // Cyan
    twClass: "text-cyan-500",
    bgClass: "bg-cyan-500"
  },

  // Dark Neutrals (Linear/Stripe style)
  dark: {
    bg: "bg-slate-950",
    cardBg: "bg-slate-900/40",
    cardBorder: "border-slate-800/60",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    textMuted: "text-slate-500"
  },

  // Light Neutrals (Premium clean style)
  light: {
    bg: "bg-slate-50",
    cardBg: "bg-white",
    cardBorder: "border-slate-200/80",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    textMuted: "text-slate-400"
  }
};
