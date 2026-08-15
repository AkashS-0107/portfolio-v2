import React, { useState, useEffect } from 'react';
import { Menu, X, Search, FileDown } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { portfolioData } from '../../data/portfolioData';
import { MobileMenu } from './MobileMenu';
import { useResumeAvailable } from '../../hooks/useResumeAvailable';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        className={`fixed top-0 left-0 right-0 z-40 animate-headerEntrance transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090B]/80 backdrop-blur-sm border-b border-[#27272A]/40 py-3 shadow-none'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-[36px] flex items-center">
          {/* Desktop 3-Region CSS Grid Layout (min-width: 769px) */}
          <div className="header-inner hidden min-[769px]:grid grid-cols-[1fr_auto_1fr] items-center w-full min-h-[36px]">
            {/* Region 1: Left reserved region for grid balance */}
            <div className="header-left justify-self-start" aria-hidden="true" />

            {/* Region 2: Primary Navigation — Mathematically Centered */}
            <nav
              className="primary-nav primary-navigation justify-self-center flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6"
              aria-label="Main Navigation"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative py-1 font-heading text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded px-1.5 ${
                      isActive
                        ? 'text-[#F4F4F6]'
                        : 'text-[#9E9A93] hover:text-[#F4F4F6]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#C56A4A] rounded-full animate-fadeIn" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Region 3: Utility Navigation — Right Region */}
            <div className="header-utilities justify-self-end flex items-center gap-2 lg:gap-3 xl:gap-5">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
                className="font-heading text-xs uppercase tracking-widest text-[#9E9A93] hover:text-[#F4F4F6] transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded p-1.5 xl:px-1 xl:py-0.5 flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4 xl:hidden" />
                <span className="hidden xl:inline">GitHub</span>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="font-heading text-xs uppercase tracking-widest text-[#9E9A93] hover:text-[#F4F4F6] transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded p-1.5 xl:px-1 xl:py-0.5 flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-4 h-4 xl:hidden" />
                <span className="hidden xl:inline">LinkedIn</span>
              </a>

              {isResumeAvailable && resume && (
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Resume"
                  aria-label="Resume"
                  className="font-heading text-xs uppercase tracking-widest text-[#9E9A93] hover:text-[#F4F4F6] transition-colors flex items-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded p-1.5 xl:px-1 xl:py-0.5"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#C56A4A]" />
                  <span className="hidden xl:inline">Resume</span>
                </a>
              )}

              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="p-1.5 rounded text-[#9E9A93] hover:text-[#C56A4A] hover:bg-[#141418] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C56A4A] flex items-center justify-center min-h-[32px] min-w-[32px]"
                  aria-label="Open Command Palette"
                  title="Search (⌘K)"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Header Bar — Anonymized Header with Right MENU & Search */}
          <div className="max-[768px]:flex min-[769px]:hidden items-center justify-between w-full">
            {/* Intentionally Minimal Left Space */}
            <div className="w-6" />

            {/* Right: Search & Mobile Menu Trigger */}
            <div className="flex items-center gap-2">
              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="p-2 rounded text-[#9E9A93] hover:text-[#C56A4A] focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C56A4A]"
                  aria-label="Open Command Palette"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}

              <button
                type="button"
                onClick={toggleMobileMenu}
                className="px-3.5 py-2 rounded border border-[#27272A] text-[#F4F4F6] hover:border-[#C56A4A] font-heading text-xs font-semibold tracking-wider transition-colors min-h-[44px] flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
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


