import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { navItems } from '../../data/navigation';
import { useResumeAvailable } from '../../hooks/useResumeAvailable';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Quick Links' | 'Projects' | 'Certifications';
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectProject }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isResumeAvailable = useResumeAvailable();

  const { professionalLinks, projects, certifications } = portfolioData;

  const commands: CommandItem[] = [
    // Navigation
    ...navItems.map((item) => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      category: 'Navigation' as const,
      action: () => {
        window.location.hash = `#${item.id}`;
        onClose();
      },
    })),

    // Quick Links
    ...(isResumeAvailable && professionalLinks.resume
      ? [
          {
            id: 'link-resume',
            label: 'View / Download Resume',
            category: 'Quick Links' as const,
            action: () => {
              window.open(professionalLinks.resume, '_blank');
              onClose();
            },
          },
        ]
      : []),
    ...(professionalLinks.github
      ? [
          {
            id: 'link-github',
            label: 'Open GitHub Profile',
            category: 'Quick Links' as const,
            action: () => {
              window.open(professionalLinks.github, '_blank');
              onClose();
            },
          },
        ]
      : []),
    ...(professionalLinks.linkedin
      ? [
          {
            id: 'link-linkedin',
            label: 'Open LinkedIn Profile',
            category: 'Quick Links' as const,
            action: () => {
              window.open(professionalLinks.linkedin, '_blank');
              onClose();
            },
          },
        ]
      : []),
    ...(professionalLinks.email
      ? [
          {
            id: 'link-email',
            label: `Send Email (${professionalLinks.email.replace(/^mailto:/, '')})`,
            category: 'Quick Links' as const,
            action: () => {
              if (professionalLinks.email) {
                window.location.assign(professionalLinks.email);
              }
              onClose();
            },
          },
        ]
      : []),

    // Projects
    ...projects.map((proj) => ({
      id: `proj-${proj.id}`,
      label: `Explore Project: ${proj.title}`,
      category: 'Projects' as const,
      action: () => {
        window.location.hash = '#projects';
        if (onSelectProject) onSelectProject(proj.id);
        onClose();
      },
    })),

    // Certifications
    ...certifications.map((cert) => ({
      id: `cert-${cert.id}`,
      label: `View Certificate: ${cert.title} (${cert.issuer})`,
      category: 'Certifications' as const,
      action: () => {
        window.location.hash = '#certifications-hackathons';
        onClose();
      },
    })),
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09090B]/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="relative w-full max-w-xl bg-[#09090B] border border-[#27272A] rounded shadow-2xl overflow-hidden flex flex-col font-mono-tech text-[#F4F4F6] max-h-[75vh] animate-scaleIn">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 bg-[#141418] border-b border-[#27272A]">
          <Search className="w-5 h-5 text-[#C56A4A] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search commands, projects, certifications, or links (Ctrl+K)..."
            className="w-full bg-transparent text-sm font-mono-tech text-[#F4F4F6] placeholder-[#9E9A93] focus:outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[#9E9A93] hover:text-[#F4F4F6] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Command List */}
        <div className="p-2 overflow-y-auto space-y-1 flex-1 text-xs">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-[#9E9A93]">No matching commands found.</div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded border flex items-center justify-between transition-all min-h-[44px] ${
                    isSelected
                      ? 'bg-[#141418] border-[#C56A4A] text-[#F4F4F6] font-bold'
                      : 'bg-transparent border-transparent text-[#9E9A93] hover:bg-[#141418]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#C56A4A] px-2 py-0.5 rounded bg-[#09090B] border border-[#27272A]">
                      {cmd.category}
                    </span>
                    <span className="font-body text-[#F4F4F6]">{cmd.label}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-[#C56A4A] transition-transform ${isSelected ? 'translate-x-1' : 'opacity-0'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-[#141418] border-t border-[#27272A] text-[10px] text-[#9E9A93] flex items-center justify-between font-mono-tech">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-[#C56A4A] font-semibold">Command Palette</span>
        </div>
      </div>
    </div>
  );
};

