import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionTransitionLine } from '../ui/SectionTransitionLine';

const platformIcons: Record<string, React.ReactNode> = {
  GitHub: <GithubIcon className="w-5 h-5 text-[#C56A4A]" />,
  LinkedIn: <LinkedinIcon className="w-5 h-5 text-[#C56A4A]" />,
  Email: <Mail className="w-5 h-5 text-[#C56A4A]" />,
};

export const Socials: React.FC = () => {
  const { socials, professionalLinks } = portfolioData;

  const getResolvedUrl = (platform: string, fallbackUrl?: string): string | undefined => {
    const key = platform.toLowerCase();
    if (key === 'github') return professionalLinks.github;
    if (key === 'linkedin') return professionalLinks.linkedin;
    if (key === 'email') return professionalLinks.email;
    return fallbackUrl;
  };

  const getAccessibleLabel = (platform: string, label: string): string => {
    const key = platform.toLowerCase();
    if (key === 'github') return "Open Akash Suresh's GitHub profile";
    if (key === 'linkedin') return "Open Akash Suresh's LinkedIn profile";
    if (key === 'email') return "Email Akash Suresh";
    return `Open ${label}`;
  };

  const activeSocials = socials
    .map((s) => ({
      ...s,
      targetUrl: getResolvedUrl(s.platform, s.url),
    }))
    .filter((s): s is typeof s & { targetUrl: string } => Boolean(s.targetUrl));

  return (
    <section id="socials" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] relative scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header with SectionTransitionLine */}
        <SectionTransitionLine number="07" title="Profiles & Network" />

        {/* 3-Column Professional Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSocials.map((social, idx) => {
            const isMail = social.platform.toLowerCase() === 'email';
            const ariaLabel = getAccessibleLabel(social.platform, social.label);

            return (
              <ScrollReveal
                key={social.id}
                variant="fade-up"
                staggerIndex={idx}
                staggerStep={80}
                delay={100}
              >
                <div className="p-6 sm:p-7 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A]/50 transition-all flex flex-col justify-between shadow-xl group h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="p-3 rounded bg-[#09090B] border border-[#27272A] text-[#C56A4A]">
                        {platformIcons[social.platform] || <Mail className="w-5 h-5" />}
                      </div>
                      <span className="font-mono-tech text-[10px] text-[#10B981] uppercase tracking-widest bg-[#09090B] px-2.5 py-1 rounded border border-[#27272A]">
                        VERIFIED PROFILE
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold font-heading text-[#F4F4F6] tracking-tight group-hover:text-[#C56A4A] transition-colors">
                        {social.platform}
                      </h3>
                      <p className="text-xs text-[#9E9A93] font-mono-tech mt-1 truncate">
                        {social.label}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#27272A] text-right">
                    <a
                      href={social.targetUrl}
                      {...(!isMail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold text-[#C56A4A] hover:underline transition-colors min-h-[44px] px-1 focus:outline-none focus:ring-1 focus:ring-[#C56A4A] rounded"
                      aria-label={ariaLabel}
                    >
                      <span>{isMail ? 'SEND EMAIL' : 'VISIT PROFILE'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};


