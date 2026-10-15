import { useState, useEffect } from 'react';
import { HeroJupiterScene } from './components/hero/HeroJupiterScene';
import { NightSkyBackdrop } from './components/hero/NightSkyBackdrop';
import { Navbar } from './components/hero/Navbar';
import { HeroContent } from './components/hero/HeroContent';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { JourneySection } from './components/sections/JourneySection';
import { ContactSection } from './components/sections/ContactSection';
import { PortfolioAssistantModal } from './components/assistant/PortfolioAssistantModal';

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  // Scroll reveal observer for content sections
  useEffect(() => {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Responsive, butter-smooth native scroll navigation
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const targetY = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#f5efe6] selection:bg-[#d8a974] selection:text-[#08080c] overflow-x-hidden antialiased">
      {/* =====================================================================
          SECTION 1: HERO — GIGANTIC JUPITER (JUPITER EXISTS ONLY HERE)
         ===================================================================== */}
      <header id="top" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#040508]">
        <NightSkyBackdrop prefersReducedMotion={prefersReducedMotion} />

        <HeroJupiterScene prefersReducedMotion={prefersReducedMotion} />

        {/* Readability vignettes: left for the type, bottom for the footer line */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(90deg, rgba(4,5,8,0.72) 0%, rgba(4,5,8,0.34) 38%, rgba(4,5,8,0) 62%), linear-gradient(180deg, rgba(4,5,8,0.62) 0%, rgba(4,5,8,0) 20%), linear-gradient(0deg, rgba(4,5,8,0.7) 0%, rgba(4,5,8,0) 28%)'
          }}
          aria-hidden="true"
        />

        {/* Top navigation with prominent ASK AI CTA */}
        <Navbar
          onOpenAssistant={() => setAssistantOpen(true)}
          onNavigateSection={scrollToSection}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Hero title, role, and actions */}
        <HeroContent onNavigateSection={scrollToSection} />
      </header>

      {/* =====================================================================
          SECTION 2: ABOUT — EDITORIAL INTRODUCTION (NO JUPITER HERE)
         ===================================================================== */}
      <AboutSection />

      {/* =====================================================================
          SECTION 3: SELECTED PROJECTS — BESPOKE EDITORIAL SHOWCASE
         ===================================================================== */}
      <ProjectsSection onNavigateSection={scrollToSection} />

      {/* =====================================================================
          SECTION 4: SKILLS — ORGANIZED TECHNICAL CAPABILITIES
         ===================================================================== */}
      <SkillsSection />

      {/* =====================================================================
          SECTION 5: JOURNEY — EDITORIAL TIMELINE
         ===================================================================== */}
      <JourneySection />

      {/* =====================================================================
          SECTION 6: CONTACT — CLOSING COMPOSITION & FORM
         ===================================================================== */}
      <ContactSection onOpenAssistant={() => setAssistantOpen(true)} />

      {/* Grounded Editorial AI Assistant Drawer */}
      <PortfolioAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
      />
    </div>
  );
}
