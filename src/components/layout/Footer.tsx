import React from 'react';
import { Terminal, FileDown, Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { navItems } from '../../data/navigation';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useResumeAvailable } from '../../hooks/useResumeAvailable';
import { ScrollReveal } from '../ui/ScrollReveal';

export const Footer: React.FC = () => {
  const { bio, professionalLinks, socials } = portfolioData;
  const isResumeAvailable = useResumeAvailable();

  const resumeUrl = professionalLinks.resume;
  const githubUrl = professionalLinks.github || socials.find((s) => s.id === 'github')?.url;
  const linkedinUrl = professionalLinks.linkedin || socials.find((s) => s.id === 'linkedin')?.url;
  const email = professionalLinks.email;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      data-trig
      data-trig-var="true"
      className="bg-[#09090B] border-t border-[#27272A] pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-[#9E9A93] font-mono-tech text-xs relative"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* End Credits Header Sequence */}
        <ScrollReveal variant="fade-up" delay={60}>
          <div className="text-center space-y-3 pb-8 border-b border-[#27272A]">
            <h3 className="font-heading text-xl sm:text-3xl font-bold text-[#F4F4F6] tracking-tight uppercase">
              LET'S BUILD SOMETHING
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#9E9A93] max-w-md mx-auto">
              Open for full-stack engineering, prompt design, and AI application development.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Identity column */}
          <ScrollReveal variant="fade-up" delay={120} className="md:col-span-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-[#F4F4F6] font-bold text-base tracking-widest font-heading">
                <div className="w-8 h-8 rounded bg-[#141418] border border-[#27272A] flex items-center justify-center text-[#C56A4A]">
                  <Terminal className="w-4 h-4" />
                </div>
                <span>{bio.name?.toUpperCase() || 'AKASH SURESH'}</span>
              </div>
              <p className="text-[#9E9A93] font-body text-sm leading-relaxed max-w-sm">
                {bio.headline || 'AI/ML Engineer & Full-Stack Developer'}
              </p>
              <div className="inline-block px-3 py-1 rounded bg-[#141418] border border-[#27272A] text-[11px] text-[#C56A4A] font-mono-tech">
                AI / FULL STACK / AI-ASSISTED BUILDING
              </div>
            </div>
          </ScrollReveal>

          {/* Quick navigation column */}
          <ScrollReveal variant="fade-up" delay={180} className="md:col-span-4">
            <div className="space-y-3">
              <h4 className="text-[#F4F4F6] font-bold tracking-widest uppercase text-xs font-heading">
                Navigation
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="hover:text-[#C56A4A] transition-colors py-1 flex items-center min-h-[44px]"
                  >
                    <span className="font-body text-[#9E9A93] hover:text-[#F4F4F6]">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Socials & Actions column */}
          <ScrollReveal variant="fade-up" delay={240} className="md:col-span-3">
            <div className="space-y-3">
              <h4 className="text-[#F4F4F6] font-bold tracking-widest uppercase text-xs font-heading">
                Verified Links
              </h4>
              <div className="flex flex-col gap-2">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C56A4A] transition-colors inline-flex items-center gap-2 py-1 min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A] rounded"
                    aria-label="Open Akash Suresh's GitHub profile"
                  >
                    <GithubIcon className="w-4 h-4 text-[#C56A4A]" />
                    <span className="font-body text-[#9E9A93]">GitHub</span>
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C56A4A] transition-colors inline-flex items-center gap-2 py-1 min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A] rounded"
                    aria-label="Open Akash Suresh's LinkedIn profile"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#C56A4A]" />
                    <span className="font-body text-[#9E9A93]">LinkedIn</span>
                  </a>
                )}
                {isResumeAvailable && resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C56A4A] transition-colors inline-flex items-center gap-2 py-1 min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A] rounded"
                    aria-label="View Akash Suresh's resume"
                  >
                    <FileDown className="w-4 h-4 text-[#C56A4A]" />
                    <span className="font-body text-[#9E9A93]">Resume PDF</span>
                  </a>
                )}
                {email && (
                  <a
                    href={email}
                    className="hover:text-[#C56A4A] transition-colors inline-flex items-center gap-2 py-1 min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A] rounded"
                    aria-label="Email Akash Suresh"
                  >
                    <Mail className="w-4 h-4 text-[#C56A4A]" />
                    <span className="font-body text-[#9E9A93]">Email</span>
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <ScrollReveal variant="fade-up" delay={300}>
          <div className="pt-8 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9E9A93]">
            <p>© 2026 Akash Suresh. All rights reserved.</p>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#141418] border border-[#27272A] text-[#F4F4F6] hover:text-[#C56A4A] hover:border-[#C56A4A] transition-all min-h-[44px]"
              aria-label="Back to top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#C56A4A]" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

