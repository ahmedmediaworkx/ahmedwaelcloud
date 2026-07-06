import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import { ICONS } from "../../lib/icons";

export default function About() {
  const { t } = useLanguage();
  const CpuIcon = ICONS.Cpu;
  const ShieldIcon = ICONS.Shield;
  const TargetIcon = ICONS.Anchor;

  const paragraphs: string[] = t("about.paragraphs") || [];

  return (
    <Section id="about" divider>
      <Container>
        <SectionTitle
          title={t("about.title")}
          subtitle={t("about.subtitle")}
          badge={t("about.badge")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Paragraph explanation card */}
          <div className="lg:col-span-7">
            <GlassCard hoverable={false} className="flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2">
                <CpuIcon className="w-5 h-5 text-product-terraform-bright" />
                <h3 className="text-lg font-bold text-ink">
                  {t("about.philosophyTitle")}
                </h3>
              </div>
              
              <div className="space-y-4 text-sm sm:text-base font-medium leading-[1.69] text-ink-muted">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Sider cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Career objective card */}
            <GlassCard glow hoverable className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <TargetIcon className="w-5 h-5 text-product-waypoint" />
                <h3 className="text-lg font-bold text-ink">
                  {t("about.missionTitle")}
                </h3>
              </div>
              <p className="text-sm font-medium leading-[1.69] text-ink-muted">
                {t("about.missionDesc")}
              </p>
            </GlassCard>

            {/* Mindset card */}
            <GlassCard hoverable className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <ShieldIcon className="w-5 h-5 text-product-vault" />
                <h3 className="text-lg font-bold text-ink">
                  {t("about.sloganTitle")}
                </h3>
              </div>
              <p className="text-sm font-medium leading-[1.69] text-ink-muted">
                {t("about.sloganDesc")}
              </p>
              
              <div className="mt-4 pt-4 border-t border-hairline flex items-center justify-between text-[11px] font-mono text-ink-subtle">
                <span>{t("about.reliabilityScore")}</span>
                <span>{t("about.securityPosture")}</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>
    </Section>
  );
}
