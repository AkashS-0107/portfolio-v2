import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Internships } from './components/sections/Internships';
import { CertificationsHackathons } from './components/sections/CertificationsHackathons';
import { Connect } from './components/sections/Connect';
import { Socials } from './components/sections/Socials';
import { Footer } from './components/layout/Footer';
import { useActiveSection } from './hooks/useActiveSection';
import { navItems } from './data/navigation';
import { RecruiterViewBar } from './components/ui/RecruiterViewBar';
import { CommandPalette } from './components/ui/CommandPalette';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgressIndicator } from './components/ui/ScrollProgressIndicator';
import { BackToTop } from './components/ui/BackToTop';

export function App() {
  const sectionIds = ['hero', ...navItems.map((item) => item.id)];
  const activeSection = useActiveSection(sectionIds);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-100 font-sans selection:bg-[#C56A4A]/30 selection:text-[#F4F4F6]">
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
        <Hero onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        {/* 2. ABOUT */}
        <About />

        {/* 3. SKILLS */}
        <Skills onSelectProject={handleSelectProjectFromSkill} />

        {/* 4. PROJECTS */}
        <Projects
          externalSelectedProjectId={selectedProjectId}
          onClearExternalSelectedProject={() => setSelectedProjectId(null)}
        />

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

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={handleSelectProjectFromSkill}
      />
      {/* Custom Hardware-Accelerated Interactive Cursor */}
      <CustomCursor />
    </div>
  );
}

export default App;

