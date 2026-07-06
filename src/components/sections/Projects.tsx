import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsSection } from "../../content/projects";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import TechBadge from "../ui/TechBadge";
import GradientButton from "../ui/GradientButton";
import ArchitectureDiagram from "../ui/ArchitectureDiagram";
import { ICONS } from "../../lib/icons";
import { useLanguage } from "../../context/LanguageContext";
import { matchesSkill, isProjectRelatedToSkill } from "../../lib/skillMatcher";

interface ProjectsProps {
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

export default function Projects({ selectedSkill, onSelectSkill }: ProjectsProps) {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const projectsList = t("projects.projectsList") || [];
  
  // Create translated projects list based on localized content map
  const translatedProjects = projectsSection.map((proj, idx) => {
    const localized = projectsList.find((p: any) => p.id === proj.id) || {};
    return {
      ...proj,
      title: localized.title || proj.title,
      subtitle: localized.subtitle || proj.subtitle,
      problem: localized.problem || proj.problem,
      solution: localized.solution || proj.solution,
      challenges: localized.challenges || proj.challenges,
      lessonsLearned: localized.lessonsLearned || proj.lessonsLearned
    };
  });

  const activeProject = translatedProjects[activeIdx] || translatedProjects[0] || projectsSection[0];

  const ProblemIcon = ICONS.AlertCircle;
  const SolutionIcon = ICONS.Check;
  const CodeIcon = ICONS.Terminal;

  // Automatically switch project tab when a matching skill filter is clicked
  useEffect(() => {
    if (selectedSkill) {
      const matchingProjIdx = projectsSection.findIndex(proj => 
        isProjectRelatedToSkill(proj.techStack, selectedSkill)
      );
      if (matchingProjIdx !== -1 && matchingProjIdx !== activeIdx) {
        setActiveIdx(matchingProjIdx);
      }
    }
  }, [selectedSkill, activeIdx]);

  return (
    <Section id="projects" divider>
      <Container>
        <SectionTitle
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
          badge={t("projects.badge")}
        />

        {/* Clear Focus Filter notice inside projects */}
        {selectedSkill && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 bg-surface-2/60 border border-product-terraform-bright/30 rounded-xl p-4 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-product-terraform-bright animate-pulse shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-ink-muted">
                Showing blueprint solutions built using <strong className="text-white font-bold">{selectedSkill}</strong>
              </p>
            </div>
            <button
              onClick={() => onSelectSkill(null)}
              className="px-2.5 py-1 text-xxs font-bold uppercase tracking-wider rounded bg-surface-3 hover:bg-surface-1 border border-hairline text-ink hover:text-white transition-all cursor-pointer whitespace-nowrap"
            >
              Clear Filter
            </button>
          </motion.div>
        )}

        {/* Project Selector Nav Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-2 mb-10 border-b border-hairline pb-4">
          {translatedProjects.map((proj, idx) => {
            const isActive = idx === activeIdx;
            const matchesSelected = selectedSkill ? isProjectRelatedToSkill(proj.techStack, selectedSkill) : false;

            return (
              <button
                key={proj.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-wide rounded-md transition-all cursor-pointer relative flex items-center ${
                  isActive
                    ? "text-product-terraform-bright"
                    : "text-ink-subtle hover:text-ink hover:bg-surface-1"
                }`}
                id={`project-tab-${proj.id}`}
              >
                <span className="relative z-10 flex items-center justify-between w-full gap-3 text-left">
                  <span>{idx + 1}. {proj.title}</span>
                  {matchesSelected && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold bg-product-terraform-bright/20 text-product-terraform-bright border border-product-terraform-bright/30 uppercase tracking-wider shrink-0 select-none animate-pulse">
                      Match
                    </span>
                  )}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeProjectIndicator"
                    className="absolute inset-0 bg-surface-2 border border-hairline rounded-md z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Project Dynamic Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Project Details Sheet (Left 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <GlassCard hoverable={false} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-ink mb-1">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs text-ink-subtle font-semibold uppercase tracking-[0.6px]">
                    {activeProject.subtitle}
                  </p>
                </div>

                {/* Problems Panel */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-product-consul font-bold text-xs sm:text-sm uppercase">
                    <ProblemIcon className="w-4 h-4" />
                    <span>{t("projects.bottleneck")}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-[1.50] text-ink-muted">
                    {activeProject.problem}
                  </p>
                </div>

                {/* Solution Panel */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-product-nomad font-bold text-xs sm:text-sm uppercase">
                    <SolutionIcon className="w-4 h-4" />
                    <span>{t("projects.automation")}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-[1.50] text-ink-muted">
                    {activeProject.solution}
                  </p>
                </div>

                {/* Tech Stack Badge Row */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-hairline">
                  {activeProject.techStack.map((tech) => {
                    const isMatched = selectedSkill ? matchesSkill(selectedSkill, tech) : false;
                    return (
                      <TechBadge 
                        key={tech} 
                        name={tech} 
                        isActive={isMatched}
                        isDimmed={!!selectedSkill && !isMatched}
                      />
                    );
                  })}
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <GradientButton href={activeProject.githubUrl} variant="secondary" iconName="Github">
                    {t("projects.viewConfig")}
                  </GradientButton>
                  {activeProject.demoUrl && (
                    <GradientButton href={activeProject.demoUrl} variant="outline" iconName="ExternalLink">
                      {t("projects.interactiveDocs")}
                    </GradientButton>
                  )}
                </div>
              </GlassCard>

              {/* Engineering Challenges Card */}
              <GlassCard hoverable={false} glow>
                <div className="flex items-center gap-2 text-product-vault font-bold text-xs uppercase mb-2">
                  <CodeIcon className="w-4 h-4" />
                  <span>{t("projects.troubleshooting")}</span>
                </div>
                <p className="text-xs font-medium leading-[1.50] text-ink-muted mb-4">
                  <strong className="text-ink block mb-1">{t("projects.challengeLabel")}:</strong> {activeProject.challenges}
                </p>
                <p className="text-xs font-medium leading-[1.50] text-ink-muted pt-3 border-t border-hairline">
                  <strong className="text-ink block mb-1">{t("projects.lessonLabel")}:</strong> {activeProject.lessonsLearned}
                </p>
              </GlassCard>
            </div>

            {/* Architecture flow and metrics (Right 7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Metrics Header */}
              <div className="grid grid-cols-3 gap-3">
                {activeProject.metrics.map((met) => (
                  <div
                    key={met.label}
                    className="p-4 bg-surface-1 border border-hairline rounded-lg text-center"
                  >
                    <span className="text-[10px] font-semibold text-ink-subtle block uppercase tracking-[0.6px] mb-1">
                      {met.label}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-product-waypoint">
                      {met.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Architecture Diagram Canvas */}
              <ArchitectureDiagram steps={activeProject.diagramSteps} projectId={activeProject.id} />

              {/* Pipeline Sequence Accordion */}
              <div className="p-4 bg-surface-1 border border-hairline rounded-xl">
                <span className="text-[11px] font-semibold text-ink-subtle uppercase tracking-[0.6px] block mb-4">
                  {t("projects.pipelineLabel")} (01-{activeProject.architecture.length})
                </span>
                
                <ol className="space-y-3 font-sans text-xs sm:text-sm text-ink-muted">
                  {activeProject.architecture.map((step, sIdx) => (
                    <li key={sIdx} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded bg-surface-2 border border-hairline text-product-terraform-bright flex items-center justify-center font-mono text-xxs font-bold shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <p className="leading-[1.50] font-medium mt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}
