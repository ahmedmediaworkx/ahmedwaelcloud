import React from "react";
import { motion } from "motion/react";
import GlassCard from "./GlassCard";

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  index: number;
  key?: React.Key;
}

export default function MetricCard({ label, value, description, index }: MetricCardProps) {
  return (
    <GlassCard glow={index % 2 === 0} className="relative group">
      <span className="text-[11px] font-semibold tracking-[0.6px] text-ink-subtle uppercase block mb-1">
        {label}
      </span>
      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-2">
        {value}
      </h3>
      <p className="text-xs sm:text-sm font-medium leading-[1.50] text-ink-muted mt-auto">
        {description}
      </p>
    </GlassCard>
  );
}
