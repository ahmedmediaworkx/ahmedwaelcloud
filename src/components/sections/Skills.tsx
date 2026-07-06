import { motion } from "motion/react";
import { skillsSection } from "../../content/skills";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import TechBadge from "../ui/TechBadge";
import { IconName } from "../../lib/icons";
import { ANIMATIONS } from "../../lib/animations";
import { useLanguage } from "../../context/LanguageContext";

interface SkillsProps {
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

export default function Skills({ selectedSkill, onSelectSkill }: SkillsProps) {
  const { t } = useLanguage();

  const handleSkillClick = (skillName: string) => {
    if (selectedSkill === skillName) {
      onSelectSkill(null);
    } else {
      onSelectSkill(skillName);
      // Smooth scroll to projects section
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // Brand color index highlights for category labels
  const labelColors = [
    "text-product-terraform-bright",
    "text-product-waypoint",
    "text-product-vault",
    "text-product-boundary",
    "text-product-nomad",
    "text-product-consul"
  ];

  const translatedCategories = skillsSection.map((cat) => {
    return {
      ...cat,
      title: t(`skills.categories.${cat.id}`) || cat.title,
      description: t(`skills.categories.${cat.id}Desc`) || cat.description
    };
  });

  return (
    <Section id="skills" divider>
      <Container>
        <SectionTitle
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
          badge={t("skills.badge")}
        />

        {selectedSkill && (
          <div className="flex justify-center mb-6">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onSelectSkill(null)}
              className="px-3 py-1.5 text-xs font-semibold rounded-full bg-product-terraform-bright/10 text-product-terraform-bright border border-product-terraform-bright/30 hover:bg-product-terraform-bright/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Filtering by: <strong className="text-white font-bold">{selectedSkill}</strong></span>
              <span className="font-bold text-sm leading-none">&times;</span>
            </motion.button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translatedCategories.map((category, index) => {
            const labelColor = labelColors[index % labelColors.length];
            return (
              <motion.div
                key={category.id}
                initial={ANIMATIONS.slideUp.initial}
                whileInView={ANIMATIONS.slideUp.animate}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="h-full"
              >
                <GlassCard glow={index === 0} className="flex flex-col h-full">
                  <span className={`text-[11px] font-semibold tracking-[0.6px] uppercase block mb-1 ${labelColor}`}>
                    category: {category.id}
                  </span>
                  
                  <h3 className="text-lg font-bold text-ink mb-2">
                    {category.title}
                  </h3>
                  
                  <p className="text-xs font-medium leading-[1.50] text-ink-muted mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill) => (
                      <TechBadge
                        key={skill.name}
                        name={skill.name}
                        iconName={skill.iconName as IconName}
                        onClick={() => handleSkillClick(skill.name)}
                        isActive={selectedSkill === skill.name}
                        isDimmed={!!selectedSkill && selectedSkill !== skill.name}
                      />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
