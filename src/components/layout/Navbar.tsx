import React, { useState, useEffect } from 'react';
import { Menu, X, Search, FileDown } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { portfolioData } from '../../data/portfolioData';
import { MobileMenu } from './MobileMenu';
import { useResumeAvailable } from '../../hooks/useResumeAvailable';

interface NavbarProps {
  activeSection: string;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenCommandPalette }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isResumeAvailable = useResumeAvailable();

  const { github, linkedin, resume } = portfolioData.professionalLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090B]/85 backdrop-blur-md border-b border-[#27272A]/50 py-3.5 shadow-xl'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Desktop Left Navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative py-1 font-heading text-xs uppercase tracking-widest font-medium transition-colors ${
                    isActive
                      ? 'text-[#F4F4F6]'
                      : 'text-[#9E9A93] hover:text-[#F4F4F6]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C56A4A] rounded-full animate-fadeIn" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions: GitHub, LinkedIn, Resume (when available), Search */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xs uppercase tracking-widest text-[#9E9A93] hover:text-[#F4F4F6] transition-colors"
            >
              GitHub
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xs uppercase tracking-widest text-[#9E9A93] hover:text-[#F4F4F6] transition-colors"
            >
              LinkedIn
            </a>
            {isResumeAvailable && resume && (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xs uppercase tracking-widest text-[#C56A4A] hover:text-[#E08A68] transition-colors flex items-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5 text-[#C56A4A]" />
                <span>Resume</span>
              </a>
            )}

            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="p-2 rounded text-[#9E9A93] hover:text-[#C56A4A] hover:bg-[#141418] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
                aria-label="Open Command Palette"
                title="Search (⌘K)"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Header Bar */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Minimal left visual space (No name repeated) */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C56A4A]/80" />
            </div>

            {/* Right: Menu trigger & Search */}
            <div className="flex items-center gap-2">
              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="p-2 rounded text-[#9E9A93] hover:text-[#C56A4A] focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Open Command Palette"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}

              <button
                type="button"
                onClick={toggleMobileMenu}
                className="px-3.5 py-2 rounded border border-[#27272A] text-[#F4F4F6] hover:border-[#C56A4A] font-heading text-xs font-semibold tracking-wider transition-colors min-h-[44px] flex items-center gap-2"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span>{isMobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        activeSection={activeSection}
        navItems={navItems}
      />
    </>
  );
};
