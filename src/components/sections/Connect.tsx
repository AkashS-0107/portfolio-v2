import React from 'react';
import { FileDown, Mail, ArrowUpRight, MessageSquare } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useResumeAvailable } from '../../hooks/useResumeAvailable';

export const Connect: React.FC = () => {
  const { professionalLinks, socials } = portfolioData;
  const isResumeAvailable = useResumeAvailable();

  const resumeUrl = professionalLinks.resume;
  const githubUrl = professionalLinks.github || socials.find((s) => s.id === 'github')?.url;
  const linkedinUrl = professionalLinks.linkedin || socials.find((s) => s.id === 'linkedin')?.url;
  const email = professionalLinks.email;

  return (
    <section id="connect" className="py-28 px-4 sm:px-6 lg:px-8 border-t border-[#27272A] bg-[#09090B] relative">
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded bg-[#141418] border border-[#27272A] text-[#C56A4A] font-heading text-xs font-bold tracking-widest uppercase">
          <MessageSquare className="w-3.5 h-3.5 text-[#C56A4A]" />
          <span>Let's Connect</span>
        </div>

        {/* Display Headline */}
        <h2 className="text-3xl sm:text-5xl font-bold text-[#F4F4F6] tracking-tight font-heading uppercase leading-tight">
          LET'S BUILD <span className="text-[#C56A4A] font-display italic font-normal">Great</span> SOFTWARE TOGETHER.
        </h2>

        {/* Subtitle & Direct Email */}
        <p className="text-[#9E9A93] text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">
          Interested in full-stack web architecture, prompt engineering workflows, or AI/ML software development? Contact me at{' '}
          <a href={email} className="text-[#C56A4A] font-mono-tech underline hover:text-[#E08A68]">
            akashscontact7@gmail.com
          </a>
        </p>

        {/* Conversion Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {/* Primary CTA: EMAIL DIRECTLY */}
          {email && (
            <a
              href={email}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded bg-[#C56A4A] text-[#09090B] font-heading font-semibold text-sm tracking-wider hover:bg-[#E08A68] transition-all shadow min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
              aria-label="Email Akash Suresh"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL DIRECTLY</span>
            </a>
          )}

          {/* Secondary CTA: DOWNLOAD RESUME (conditionally enabled when asset exists) */}
          {isResumeAvailable && resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Akash_Suresh_Resume.pdf"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-sm tracking-wider hover:border-[#C56A4A] hover:text-[#C56A4A] transition-all min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
              aria-label="Download Akash Suresh's resume"
            >
              <FileDown className="w-4 h-4 text-[#C56A4A]" />
              <span>DOWNLOAD RESUME</span>
            </a>
          )}
        </div>

        {/* Configured Social Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-10 border-t border-[#27272A]">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-mono-tech text-xs hover:border-[#C56A4A] hover:text-[#C56A4A] transition-all min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
              aria-label="Open Akash Suresh's GitHub profile"
            >
              <GithubIcon className="w-4 h-4 text-[#C56A4A]" />
              <span className="font-semibold">GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9E9A93]" />
            </a>
          )}

          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-mono-tech text-xs hover:border-[#C56A4A] hover:text-[#C56A4A] transition-all min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
              aria-label="Open Akash Suresh's LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4 text-[#C56A4A]" />
              <span className="font-semibold">LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9E9A93]" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

