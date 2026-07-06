import { motion } from "motion/react";
import { architectureMindsetSection } from "../../content/architectureMindset";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import { ICONS } from "../../lib/icons";
import { ANIMATIONS } from "../../lib/animations";
import { useLanguage } from "../../context/LanguageContext";

export default function ArchitectureMindset() {
  const { t } = useLanguage();

  const getStepIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "search": return ICONS.Search;
      case "gitmerge": return ICONS.GitMerge;
      case "filecode": return ICONS.FileCode;
      case "play": return ICONS.Play;
      default: return ICONS.Activity;
    }
  };

  // Maps stages to distinctive HashiCorp product highlights
  const stepColors = [
    "text-product-waypoint",    // Stage 1
    "text-product-vagrant",     // Stage 2
    "text-product-terraform",   // Stage 3
    "text-product-boundary",    // Stage 4
    "text-product-consul"       // Stage 5
  ];

  const localizedStepsList = t("mindset.steps") || [];
  const translatedSteps = architectureMindsetSection.map((step, index) => {
    const localized = localizedStepsList[index] || {};
    return {
      ...step,
      title: localized.title || step.title,
      description: localized.description || step.description
    };
  });

  return (
    <Section id="mindset" divider>
      <Container>
        <SectionTitle
          title={t("mindset.title")}
          subtitle={t("mindset.subtitle")}
          badge={t("mindset.badge")}
        />

        {/* Desktop Connected Steps */}
        <div className="relative mt-12">
          {/* Horizontal pipeline conduit connector line */}
          <div className="absolute top-12 left-[10%] right-[10%] h-[1px] bg-hairline hidden lg:block pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {translatedSteps.map((step, index) => {
              const Icon = getStepIcon(step.iconName);
              const highlightColor = stepColors[index % stepColors.length];
              
              return (
                <motion.div
                  key={step.phase}
                  initial={ANIMATIONS.slideUp.initial}
                  whileInView={ANIMATIONS.slideUp.animate}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="h-full"
                >
                  <GlassCard glow={index === 2} className="flex flex-col h-full relative group">
                    {/* Circle Phase Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-full bg-surface-2 border border-hairline flex items-center justify-center font-mono text-xs font-bold text-ink">
                        {step.phase}
                      </div>
                      
                      <Icon className={`w-4 h-4 ${highlightColor}`} />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-ink mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-medium leading-[1.50] text-ink-muted mb-4">
                      {step.description}
                    </p>

                    <ul className="space-y-1.5 mt-auto border-t border-hairline pt-3">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5 text-xxs sm:text-xs text-ink-subtle">
                          <span className={`${highlightColor} font-mono`}>&gt;</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
