import { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { FutureProjects } from './components/sections/FutureProjects';
import { Internships } from './components/sections/Internships';
import { CertificationsHackathons } from './components/sections/CertificationsHackathons';
import { Connect } from './components/sections/Connect';
import { Socials } from './components/sections/Socials';
import { Footer } from './components/layout/Footer';
import { useActiveSection } from './hooks/useActiveSection';
import { navItems } from './data/navigation';
import { RecruiterViewBar } from './components/ui/RecruiterViewBar';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgressIndicator } from './components/ui/ScrollProgressIndicator';
import { BackToTop } from './components/ui/BackToTop';
import { CinematicIntro } from './components/ui/CinematicIntro';
import { initTrig } from './lib/trig';
import { useRouting } from './hooks/useRouting';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { NotFound } from './components/ui/NotFound';
import { OfflineNotification } from './components/ui/OfflineNotification';
import { Chatbot } from './components/chat/Chatbot';

const CommandPalette = lazy(() =>
  import('./components/ui/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

export interface ActiveHoveredSkill {
  skillId: string;
  skillName: string;
  relatedProjects: string[];
}

export function App() {
  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);
  const { is404, navigateToHome, navigateToProjects } = useRouting();
  const { showOfflineBanner, dismissNotification } = useOnlineStatus();

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeHoveredSkill, setActiveHoveredSkill] = useState<ActiveHoveredSkill | null>(null);

  // Cinematic Intro Active State
  const [isIntroActive, setIsIntroActive] = useState(() => {
    if (typeof window === 'undefined') return false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !prefersReducedMotion;
  });

  // Global Centralized Trig.js Initialization
  useEffect(() => {
    initTrig();
  }, [isIntroActive]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSelectProjectFromSkill = (projectId: string) => {
    setSelectedProjectId(projectId);
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (is404) {
    return (
      <div className="min-h-screen bg-[#09090B] text-slate-100 font-sans selection:bg-[#C56A4A]/30 selection:text-[#F4F4F6]">
        <NotFound
          onBackToPortfolio={navigateToHome}
          onViewProjects={navigateToProjects}
        />
        <OfflineNotification
          show={showOfflineBanner}
          onDismiss={dismissNotification}
        />
        <CustomCursor />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-100 font-sans selection:bg-[#C56A4A]/30 selection:text-[#F4F4F6]">
      {/* Stage 12 — Cinematic Opening Sequence */}
      {isIntroActive && (
        <CinematicIntro onComplete={() => setIsIntroActive(false)} />
      )}

      {/* Scroll Progress Bar (Desktop right vertical line / Mobile top horizontal line) */}
      <ScrollProgressIndicator />

      {/* Sticky Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Page Layout rendered in exact required order */}
      <main id="main-content" className="relative">
        {/* 1. HERO */}
        <Hero
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          isIntroActive={isIntroActive}
        />

        {/* 2. ABOUT */}
        <About />

        {/* 3. SKILLS */}
        <Skills
          onSelectProject={handleSelectProjectFromSkill}
          onHoverSkillChange={setActiveHoveredSkill}
        />

        {/* 4. PROJECTS */}
        <Projects
          externalSelectedProjectId={selectedProjectId}
          onClearExternalSelectedProject={() => setSelectedProjectId(null)}
          activeHoveredSkill={activeHoveredSkill}
        />

        {/* 4.5. FUTURE PROJECTS */}
        <FutureProjects />

        {/* 5. EXPERIENCE / INTERNSHIPS */}
        <Internships />

        {/* 6. CREDENTIALS / CERTIFICATIONS & HACKATHONS */}
        <CertificationsHackathons />

        {/* 7. LET'S CONNECT */}
        <Connect />

        {/* 8. PROFILES / SOCIALS */}
        <Socials />
      </main>

      {/* 9. FOOTER */}
      <Footer />

      {/* Back To Top Action */}
      <BackToTop />

      {/* Recruiter Experience Floating Bar */}
      <RecruiterViewBar />

      {/* Mini Open-Ended AI Chatbot */}
      <Chatbot />

      {/* Command Palette Modal */}
      <Suspense fallback={null}>
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectProject={handleSelectProjectFromSkill}
        />
      </Suspense>
      {/* Custom Hardware-Accelerated Interactive Cursor */}
      <CustomCursor />

      {/* Non-blocking Offline Notification Banner */}
      <OfflineNotification
        show={showOfflineBanner}
        onDismiss={dismissNotification}
      />
    </div>
  );
}

export default App;

