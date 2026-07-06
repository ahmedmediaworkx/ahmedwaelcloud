import { motion } from "motion/react";
import { certificationsSection } from "../../content/certifications";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import { ICONS } from "../../lib/icons";
import { ANIMATIONS } from "../../lib/animations";
import { useLanguage } from "../../context/LanguageContext";

export default function Certifications() {
  const { t } = useLanguage();

  const getCertIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "cloud": return ICONS.Cloud;
      case "filecode": return ICONS.FileCode;
      case "layers": return ICONS.Layers;
      default: return ICONS.Cpu;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded border border-product-nomad/20 bg-product-nomad/5 text-product-nomad">
            {t("certifications.status.active") || "ACTIVE"}
          </span>
        );
      case "Preparing":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded border border-product-vault/20 bg-product-vault/5 text-product-vault">
            {t("certifications.status.prep") || "PREPARING_LABS"}
          </span>
        );
      case "Future":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded border border-hairline bg-surface-2 text-ink-subtle">
            {t("certifications.status.future") || "FUTURE_GOAL"}
          </span>
        );
    }
  };

  return (
    <Section id="certifications" divider>
      <Container>
        <SectionTitle
          title={t("certifications.title")}
          subtitle={t("certifications.subtitle")}
          badge={t("certifications.badge")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsSection.map((cert, index) => {
            const Icon = getCertIcon(cert.iconName);
            
            return (
              <motion.div
                key={cert.id}
                initial={ANIMATIONS.slideUp.initial}
                whileInView={ANIMATIONS.slideUp.animate}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="h-full"
              >
                <GlassCard glow={cert.status === "Active"} className="flex flex-col h-full relative group">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-5 h-5 text-product-terraform-bright" />
                    {getStatusBadge(cert.status)}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-ink mb-1 leading-snug">
                    {cert.title}
                  </h3>
                  
                  <span className="text-[11px] font-semibold text-ink-subtle uppercase block mb-3">
                    {cert.issuer}
                  </span>

                  {cert.credentialId && (
                    <div className="mt-auto pt-3 border-t border-hairline flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px]">
                        ID: {cert.credentialId}
                      </span>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-product-waypoint hover:text-product-waypoint/80 flex items-center gap-1"
                        >
                          {t("certifications.verify") || "VERIFY"} <ICONS.ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {!cert.credentialId && (
                    <div className="mt-auto pt-3 border-t border-hairline">
                      <span className="text-[10px] font-semibold text-ink-subtle block italic">
                        {cert.date}
                      </span>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
