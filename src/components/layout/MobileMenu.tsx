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
      {/* Top Bar with Close Button */}
      <div className="flex items-center justify-between p-6 border-b border-[#27272A]/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C56A4A]" />
          <span className="font-heading text-xs uppercase tracking-widest text-[#9E9A93]">
            Navigation
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full border border-[#27272A] text-[#9E9A93] hover:text-[#F4F4F6] hover:border-[#C56A4A] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
        <nav className="flex flex-col space-y-4 py-4" aria-label="Mobile Menu Navigation">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                className={`font-display text-3xl sm:text-4xl tracking-tight transition-colors py-2 flex items-center justify-between animate-fadeInUp ${
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

        {/* Divider & External Professional Links */}
        <div className="pt-6 border-t border-[#27272A] space-y-4 animate-fadeInUp delay-300">
          <p className="font-heading text-xs uppercase tracking-widest text-[#9E9A93]">
            Connect & Profiles
          </p>

          <div className="flex flex-col space-y-3 font-heading text-sm text-[#F4F4F6]">
            {resume && (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-between py-2 border-b border-[#27272A]/40 text-[#9E9A93] hover:text-[#C56A4A] transition-colors"
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
              className="flex items-center justify-between py-2 border-b border-[#27272A]/40 text-[#9E9A93] hover:text-[#C56A4A] transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-between py-2 border-b border-[#27272A]/40 text-[#9E9A93] hover:text-[#C56A4A] transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={email}
              onClick={onClose}
              className="flex items-center justify-between py-2 text-[#C56A4A] hover:text-[#E08A68] transition-colors font-medium"
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
