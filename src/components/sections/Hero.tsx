import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { heroSection } from "../../content/hero";
import Container from "../ui/Container";
import GradientButton from "../ui/GradientButton";
import MetricCard from "../ui/MetricCard";
import { ICONS } from "../../lib/icons";
import { useLanguage } from "../../context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const { t } = useLanguage();
  const ChevronDownIcon = ICONS.ChevronRight;

  const catchyHooks = t("hero.hooks") || [
    "Junior Cloud Engineer",
    "Infrastructure as Code Architect",
    "Kubernetes & Container Builder",
    "GitOps Automation Specialist",
    "High-Availability Systems Dev"
  ];

  // Specific HashiCorp accent colors for hook rotation
  const hookColors = [
    "text-product-terraform-bright", // Terraform Purple
    "text-product-waypoint",         // Waypoint Cyan
    "text-product-vault",            // Vault Yellow
    "text-product-boundary",         // Boundary Coral
    "text-product-nomad"             // Nomad Green
  ];

  const [hookIndex, setHookIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHookIndex((prev) => (prev + 1) % catchyHooks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [catchyHooks.length]);

  // Mapped directly to HashiCorp's product accent color scheme
  const quickBadges = [
    { name: "AWS SAA", icon: ICONS.Cloud, label: "Cloud Architect", color: "text-product-vagrant" },
    { name: "Kubernetes", icon: ICONS.Layers, label: "Orchestration", color: "text-product-nomad" },
    { name: "Terraform", icon: ICONS.FileCode, label: "IaC Automation", color: "text-product-terraform" },
    { name: "Docker", icon: ICONS.Server, label: "Containerization", color: "text-product-waypoint" },
    { name: "GitOps Actions", icon: ICONS.RefreshCw, label: "CI/CD Sync", color: "text-product-boundary" },
    { name: "Prometheus", icon: ICONS.Activity, label: "Observability", color: "text-product-consul" }
  ];

  // Map translations to metrics format dynamically
  const translatedMetrics = [
    {
      label: "AWS",
      value: "10+ Services",
      description: t("hero.metrics.awsDesc")
    },
    {
      label: "UPTIME_SLO",
      value: "99.99%",
      description: t("hero.metrics.uptimeDesc")
    },
    {
      label: "DEPLOY_SPEED",
      value: "10x",
      description: t("hero.metrics.speedDesc")
    },
    {
      label: "AUTOMATION",
      value: "100%",
      description: t("hero.metrics.autoDesc")
    }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 flex flex-col justify-center overflow-hidden bg-canvas"
    >
      <Container className="relative z-10 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* System Init Badge / Product Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-[0.6px] uppercase rounded-full border bg-surface-1 border-hairline text-ink-muted"
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-product-nomad opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-product-nomad"></span>
            </span>
            <span>{t("hero.badge")}</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={itemVariants}
            className="w-full text-center"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-1.6px] text-ink max-w-5xl mx-auto leading-[1.17] flex flex-col items-center justify-center">
              <span className="block mb-2">{t("hero.greeting")}</span>
              <span className="relative block h-[1.3em] overflow-hidden w-full max-w-[320px] sm:max-w-[580px] md:max-w-[750px] lg:max-w-[850px] select-none">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hookIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`absolute inset-0 block text-center font-bold ${hookColors[hookIndex % hookColors.length]}`}
                  >
                    {catchyHooks[hookIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-center text-ink-muted max-w-3xl leading-[1.69] font-medium"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Actions */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <GradientButton href={heroSection.ctaHref} variant="primary" className="w-full sm:w-auto">
              {t("hero.cta")}
            </GradientButton>
            <GradientButton href={heroSection.secondaryCtaHref} variant="secondary" className="w-full sm:w-auto">
              {t("hero.secondaryCta")}
            </GradientButton>
            <GradientButton href="https://github.com/ahmedmediaworkx" variant="outline" iconName="Github" className="w-full sm:w-auto">
              {t("hero.githubButton")}
            </GradientButton>
          </motion.div>

          {/* Core Stack Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-16 w-full max-w-4xl"
          >
            <div className="text-center mb-6">
              <span className="text-xs font-semibold tracking-[0.6px] uppercase text-ink-subtle">
                {t("hero.stackHeader")}
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {quickBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.name}
                    whileHover={{ y: -3, backgroundColor: "var(--color-surface-2)" }}
                    className="p-4 bg-surface-1 border border-hairline rounded-lg flex flex-col items-center justify-center text-center transition-colors duration-200"
                  >
                    <Icon className={`w-5 h-5 ${badge.color} mb-1.5`} />
                    <span className="text-xs font-semibold text-ink block">
                      {badge.name}
                    </span>
                    <span className="text-[10px] font-medium text-ink-subtle block mt-0.5">
                      {badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Numeric Core metrics widgets */}
          <motion.div
            variants={itemVariants}
            className="mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {translatedMetrics.map((metric, idx) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                description={metric.description}
                index={idx}
              />
            ))}
          </motion.div>

          {/* Scroll down indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-1"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-[11px] font-semibold tracking-[0.6px] uppercase text-ink-subtle">
                {t("hero.scrollToExplore")}
              </span>
              <ChevronDownIcon className="w-3.5 h-3.5 text-ink-subtle rotate-90 mt-1" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
