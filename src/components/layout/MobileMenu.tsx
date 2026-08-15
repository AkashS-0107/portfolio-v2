import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

interface NavItem {
  id: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  navItems: NavItem[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  navItems,
}) => {
  const { github, linkedin, email, resume } = portfolioData.professionalLinks;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#09090B] animate-fadeIn">
      {/* Top Bar with Minimal Header & Close Button */}
      <div className="flex items-center justify-between p-6 border-b border-[#27272A]/50">
        <div className="w-6" />
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full border border-[#27272A] text-[#9E9A93] hover:text-[#F4F4F6] hover:border-[#C56A4A] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
        <nav className="flex flex-col space-y-3 py-2" aria-label="Mobile Navigation">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                className={`font-display text-2xl sm:text-3xl tracking-tight transition-colors py-3 flex items-center justify-between border-b border-[#27272A]/30 focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded px-2 animate-fadeInUp ${
                  isActive ? 'text-[#C56A4A] font-normal' : 'text-[#9E9A93] hover:text-[#F4F4F6]'
                }`}
                style={{ animationDelay: `${(idx + 1) * 60}ms` }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#C56A4A] inline-block ml-4" />
                )}
              </a>
            );
          })}
        </nav>

        {/* External Professional Links */}
        <div className="pt-6 border-t border-[#27272A] space-y-3 animate-fadeInUp delay-300">
          <p className="font-heading text-xs uppercase tracking-widest text-[#9E9A93]">
            Connect & Profiles
          </p>

          <div className="flex flex-col space-y-2 font-heading text-sm text-[#F4F4F6]">
            {resume && (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 border-b border-[#27272A]/40 text-[#9E9A93] hover:text-[#C56A4A] transition-colors focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded px-1 min-h-[44px]"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 border-b border-[#27272A]/40 text-[#9E9A93] hover:text-[#C56A4A] transition-colors focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded px-1 min-h-[44px]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 border-b border-[#27272A]/40 text-[#9E9A93] hover:text-[#C56A4A] transition-colors focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded px-1 min-h-[44px]"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={email}
              onClick={onClose}
              className="flex items-center justify-between py-2.5 text-[#C56A4A] hover:text-[#E08A68] transition-colors font-medium focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded px-1 min-h-[44px]"
            >
              <span>Email</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

