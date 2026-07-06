import { socialsSection } from "../../content/socials";
import { ICONS } from "../../lib/icons";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const CodeIcon = ICONS.Terminal;

  // Resolve icons for footers
  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "github": return ICONS.Github;
      case "linkedin": return ICONS.Linkedin;
      default: return ICONS.Mail;
    }
  };

  return (
    <footer className="py-12 bg-canvas border-t border-hairline relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-sm font-bold text-ink uppercase tracking-wider">
              AHMED_WAEL<span className="text-product-terraform-bright">.sh</span>
            </span>
            <p className="text-xs text-ink-muted text-center md:text-left font-medium leading-[1.50]">
              {t("ahmedwaelcloud")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialsSection.map((link) => {
              const Icon = getSocialIcon(link.iconName);
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-surface-1 border border-hairline text-ink-muted hover:text-white hover:bg-surface-2 transition-colors duration-200"
                  aria-label={link.platform}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-ink-subtle">
          <span className="text-[10px] font-semibold uppercase tracking-[0.6px]">
            © {new Date().getFullYear()} Ahmed Wael. {t("footer.rights")}
          </span>
          <div className="flex items-center gap-3 text-[10px] font-semibold">
            <div className="flex items-center gap-1">
              <CodeIcon className="w-3.5 h-3.5 text-product-terraform-bright" />
              <span>v2.1.0-STABLE</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-product-nomad" />
              <span>{t("footer.status")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
