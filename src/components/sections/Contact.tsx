import React, { useState } from "react";
import { contactSection } from "../../content/contact";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";
import GradientButton from "../ui/GradientButton";
import { ICONS } from "../../lib/icons";
import { useLanguage } from "../../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [responseLog, setResponseLog] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MailIcon = ICONS.Mail;
  const MapPinIcon = ICONS.MapPin;
  const ClockIcon = ICONS.Clock;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) {
      setResponseLog((prev) => [...prev, "ERROR: Required fields missing (email or message)."]);
      return;
    }

    setIsSubmitting(true);
    setResponseLog((prev) => [...prev, "POST /api/v1/ping HTTP/1.1", "Host: ahmedwael.cloud", "Content-Type: application/json"]);

    setTimeout(() => {
      setResponseLog((prev) => [
        ...prev,
        "Resolving server payload queue...",
        `Dispatching envelope for <${formState.email}>...`,
        "HTTP/1.1 202 Accepted",
        "Response: { status: 'queued', message_id: 'msg_01h8v932p', delivery_target: 'mediaworkx.ahmed@outlook.com' }"
      ]);
      setIsSubmitting(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <Section id="contact">
      <Container>
        <SectionTitle
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          badge={t("contact.badge")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Metadata Cards (Left 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[11px] font-semibold text-ink-subtle uppercase tracking-[0.6px] block">
              {t("contact.labels.socketInfo")}
            </span>

            <GlassCard hoverable={false} className="flex-1 flex flex-col justify-between gap-6">
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-center gap-4">
                  <MapPinIcon className="w-5 h-5 text-product-waypoint shrink-0" />
                  <div>
                    <span className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px] block">
                      {t("contact.labels.location")}
                    </span>
                    <span className="text-sm font-bold text-ink">
                      {contactSection.location}
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-4">
                  <ClockIcon className="w-5 h-5 text-product-vault shrink-0" />
                  <div>
                    <span className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px] block">
                      {t("contact.labels.availability")}
                    </span>
                    <span className="text-sm font-bold text-ink leading-snug">
                      {contactSection.availability}
                    </span>
                  </div>
                </div>

                {/* Email Direct */}
                <div className="flex items-center gap-4">
                  <MailIcon className="w-5 h-5 text-product-terraform-bright shrink-0" />
                  <div>
                    <span className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px] block">
                      {t("contact.labels.email")}
                    </span>
                    <a
                      href={`mailto:${contactSection.email}`}
                      className="text-sm font-bold text-product-waypoint hover:text-product-waypoint/80 break-all"
                    >
                      {contactSection.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Social Shortcuts */}
              <div className="pt-6 border-t border-hairline flex items-center gap-3">
                <GradientButton href={contactSection.linkedin} variant="secondary" iconName="Linkedin" className="flex-1">
                  LinkedIn
                </GradientButton>
                <GradientButton href={contactSection.github} variant="secondary" iconName="Github" className="flex-1">
                  GitHub
                </GradientButton>
              </div>
            </GlassCard>
          </div>

          {/* Interactive Ping Terminal Form (Right 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-[11px] font-semibold text-ink-subtle uppercase tracking-[0.6px] block">
              {t("contact.labels.apiEnvelope")}
            </span>

            <GlassCard hoverable={false} className="flex flex-col gap-6">
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px]">
                      {t("contact.labels.name")}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ahmed Wael"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-surface-1 border border-hairline rounded-md focus:outline-none focus:border-product-terraform-bright text-ink placeholder-ink-subtle transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px]">
                      {t("contact.labels.senderEmail")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ahmed@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-surface-1 border border-hairline rounded-md focus:outline-none focus:border-product-terraform-bright text-ink placeholder-ink-subtle transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px]">
                    {t("contact.labels.subject")}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud Architecture Role Open"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-surface-1 border border-hairline rounded-md focus:outline-none focus:border-product-terraform-bright text-ink placeholder-ink-subtle transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px]">
                    {t("contact.labels.message")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Wrote a nice payload here..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-surface-1 border border-hairline rounded-md focus:outline-none focus:border-product-terraform-bright text-ink placeholder-ink-subtle transition-colors resize-none"
                  />
                </div>

                <GradientButton
                  variant="primary"
                  iconName={isSubmitting ? "RefreshCw" : "Terminal"}
                  className="w-full"
                >
                  {isSubmitting ? t("contact.labels.transmitting") : t("contact.labels.dispatch")}
                </GradientButton>
              </form>

              {/* Terminal Logs response panel */}
              {responseLog.length > 0 && (
                <div className="p-4 bg-black border border-hairline rounded-lg text-left">
                  <div className="flex items-center gap-1.5 mb-2 pointer-events-none select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-product-consul" />
                    <span className="w-1.5 h-1.5 rounded-full bg-product-vault" />
                    <span className="w-1.5 h-1.5 rounded-full bg-product-nomad" />
                    <span className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px] ml-1">
                      {t("contact.labels.stdout")}
                    </span>
                  </div>
                  
                  <div className="font-mono text-[10px] text-ink-muted space-y-1 overflow-x-auto select-all max-h-[120px] pb-1">
                    {responseLog.map((log, lIdx) => (
                      <div
                        key={lIdx}
                        className={`${
                          log.startsWith("HTTP")
                            ? "text-product-nomad font-bold"
                            : log.startsWith("ERROR")
                            ? "text-product-consul"
                            : "text-ink-muted"
                        }`}
                      >
                        {log.startsWith("POST") || log.startsWith("HTTP") || log.startsWith("Response:") || log.startsWith("ERROR") ? "" : "$ "}
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </Container>
    </Section>
  );
}
