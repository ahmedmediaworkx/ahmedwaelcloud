import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { navigationSection } from "../../content/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { ICONS } from "../../lib/icons";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  
  // Framer Motion scroll depth tracking
  const { scrollYProgress } = useScroll();
  const progressColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#7B42BC", "#00F0FF"] // Terraform Purple to Waypoint Cyan
  );
  
  // Extract anchor IDs for active scroll-spy highlighting
  const sectionIds = navigationSection.map((item) => item.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  const MenuIcon = ICONS.Menu;
  const XIcon = ICONS.X;
  const TerminalIcon = ICONS.Terminal;
  const GlobeIcon = ICONS.Globe;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLabels: Record<string, string> = {
    "#hero": t("nav.overview"),
    "#about": t("nav.mindset"),
    "#skills": t("nav.skills"),
    "#projects": t("nav.architecture"),
    "#timeline": t("nav.milestones"),
    "#certifications": t("nav.certifications"),
    "#contact": t("nav.ping")
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-canvas/90 backdrop-blur-md border-b border-hairline"
          : "py-5 bg-transparent"
      }`}
    >
      {/* Interactive Top-Edge Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 origin-left z-50"
        style={{ scaleX: scrollYProgress, backgroundColor: progressColor }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo element */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer text-ink font-mono font-bold tracking-tight text-sm sm:text-base"
          >
            <div className="p-1.5 rounded bg-surface-2 border border-hairline text-product-terraform-bright group-hover:bg-product-terraform group-hover:text-white transition-all duration-300">
              <TerminalIcon className="w-4 h-4" />
            </div>
            <span>
              AHMED_WAEL<span className="text-product-waypoint">.sh</span>
            </span>
          </a>

          {/* Desktop Navigation Link Loops */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationSection.map((item) => {
              const anchor = item.href.replace("#", "");
              const isActive = activeSection === anchor;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded tracking-wide transition-all duration-200 relative ${
                    isActive
                      ? "text-product-waypoint"
                      : "text-ink-muted hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{navLabels[item.href] || item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-surface-2 border border-hairline rounded z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action buttons + Language switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Elegant Language toggle pill */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wide rounded bg-surface-2 border border-hairline text-ink-muted hover:bg-surface-3 hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Toggle language"
              id="lang-switcher-desktop"
            >
              <GlobeIcon className="w-3.5 h-3.5 text-product-waypoint" />
              <span>{language === "en" ? "عربي مصري" : "English"}</span>
            </motion.button>

            <a
              href="#contact"
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded bg-surface-2 border border-hairline text-ink-muted hover:bg-surface-3 hover:text-white transition-all duration-200 cursor-pointer uppercase"
            >
              {t("nav.pingButton")}
            </a>
          </div>

          {/* Mobile menu trigger + Language toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded border border-hairline text-ink-muted bg-surface-1 flex items-center justify-center"
              aria-label="Toggle language"
              id="lang-switcher-mobile"
            >
              <GlobeIcon className="w-4 h-4 text-product-waypoint" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded border border-hairline text-ink-muted bg-surface-1"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              {isOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slideout Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-hairline bg-canvas overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1 sm:px-6">
              {navigationSection.map((item) => {
                const anchor = item.href.replace("#", "");
                const isActive = activeSection === anchor;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-surface-2 text-product-waypoint border border-hairline"
                        : "text-ink-muted hover:bg-surface-1 hover:text-white"
                    }`}
                  >
                    {navLabels[item.href] || item.label}
                  </a>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-hairline flex items-center justify-between">
                <span className="text-[10px] font-semibold text-ink-subtle uppercase tracking-[0.6px]">{t("nav.status")}</span>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-wide rounded bg-white text-black hover:bg-white/90 transition-colors"
                >
                  {t("nav.pingButton")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
