import { motion } from "motion/react";
import { timelineSection } from "../../content/timeline";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import { ICONS } from "../../lib/icons";
import { ANIMATIONS } from "../../lib/animations";
import { useLanguage } from "../../context/LanguageContext";

export default function Timeline() {
  const { t } = useLanguage();

  const getTimelineIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "terminal": return ICONS.Terminal;
      case "cloud": return ICONS.Cloud;
      case "container": return ICONS.Server;
      case "filecode": return ICONS.FileCode;
      case "activity": return ICONS.Activity;
      default: return ICONS.Layers;
    }
  };

  const stepsList = t("timeline.steps") || [];
  const translatedTimeline = timelineSection.map((item, index) => {
    const localized = stepsList[index] || {};
    return {
      ...item,
      title: localized.title || item.title,
      organization: localized.organization || item.organization,
      description: localized.description || item.description
    };
  });

  return (
    <Section id="timeline" divider>
      <Container>
        <SectionTitle
          title={t("timeline.title")}
          subtitle={t("timeline.subtitle")}
          badge={t("timeline.badge")}
        />

        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Vertical spine indicator line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-[1px] bg-hairline hidden sm:block pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-hairline block sm:hidden pointer-events-none" />

          <div className="space-y-12 relative">
            {translatedTimeline.map((item, index) => {
              const Icon = getTimelineIcon(item.iconName);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id || `timeline-step-${index}`}
                  initial={ANIMATIONS.slideUp.initial}
                  whileInView={ANIMATIONS.slideUp.animate}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className={`flex flex-col sm:flex-row relative items-stretch ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Spine node indicator ring */}
                  <div className="absolute left-[7px] sm:left-1/2 -translate-x-[4px] top-4 w-3.5 h-3.5 rounded-full border-[2.5px] border-canvas bg-product-terraform-bright z-10" />

                  {/* Spacer column representing opposite layout */}
                  <div className="hidden sm:block w-1/2 px-8" />

                  {/* Primary card column (Takes remaining 50%) */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <GlassCard glow={index === 0} hoverable className="h-full">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        {item.year ? (
                          <span className="text-xs font-semibold text-product-waypoint bg-surface-2 px-2.5 py-0.5 rounded border border-hairline">
                            {item.year}
                          </span>
                        ) : (
                          <div />
                        )}
                        
                        <Icon className="w-4 h-4 text-product-terraform-bright" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-ink">
                        {item.title}
                      </h3>
                      
                      <span className="text-[11px] font-semibold text-ink-subtle uppercase block mb-3">
                        {item.organization}
                      </span>

                      <p className="text-xs sm:text-sm font-medium leading-[1.50] text-ink-muted mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-hairline">
                        {item.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-medium rounded bg-surface-2 text-ink-muted border border-hairline"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
