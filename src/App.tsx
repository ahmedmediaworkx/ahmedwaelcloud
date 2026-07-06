import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { ThemeContext } from "./lib/theme";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import ArchitectureMindset from "./components/sections/ArchitectureMindset";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Timeline from "./components/sections/Timeline";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <LanguageProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="min-h-screen relative bg-canvas text-ink font-sans selection:bg-product-terraform/20">
          {/* Global Fixed HashiCorp Grid Backdrop */}
          <div className="fixed inset-0 pointer-events-none z-0 hashicorp-grid" />

          {/* Floating Top Header Navigation */}
          <Navbar />

          {/* Core Layout Sections Flow */}
          <main className="relative z-10">
            <Hero />
            <About />
            <ArchitectureMindset />
            <Skills selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />
            <Projects selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />
            <Timeline />
            <Certifications />
            <Contact />
          </main>

          {/* Sticky Professional Footer */}
          <Footer />
        </div>
      </ThemeContext.Provider>
    </LanguageProvider>
  );
}
