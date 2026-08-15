import React from 'react';
import { ArrowDown, Mail, FileDown } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { HeroCloudReveal } from '../ui/HeroCloudReveal';
import { HeroEvidenceCarousel } from './HeroEvidenceCarousel';
import { HeroVideoBackground } from '../ui/HeroVideoBackground';
import { useResumeAvailable } from '../../hooks/useResumeAvailable';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { ScrollReveal } from '../ui/ScrollReveal';

interface HeroProps {
  onOpenCommandPalette?: () => void;
  isIntroActive?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isIntroActive = false }) => {
  const { bio, professionalLinks } = portfolioData;
  const isResumeAvailable = useResumeAvailable();
  const { github, linkedin, email, resume } = professionalLinks;

  return (
    <section
      id="hero"
      data-trig
      data-trig-var="true"
      data-trig-pixels="true"
      className="relative min-h-[100svh] min-h-[100dvh] flex flex-col items-center justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#09090B]"
    >
      {/* 03 — Full-Bleed CloudFront Video Atmospheric Background */}
      <div className="absolute inset-0 hero-atmosphere-parallax pointer-events-none z-0">
        <HeroVideoBackground />
      </div>

      {/* Cinematic Hero Cloud Reveal Sequence Handoff */}
      <HeroCloudReveal isIntroActive={isIntroActive} />

      {/* Subtle Hairline Technical Grid */}
      <div className="absolute inset-0 bg-grid-hairline opacity-20 pointer-events-none z-10" />

      {/* Main Cinematic Hero Content Container */}
      <div className="relative max-w-5xl mx-auto w-full text-center space-y-8 z-30 my-auto hero-headline-parallax">
        {/* Central Primary Display Title — AKASH SURESH */}
        <div className="space-y-3 sm:space-y-4">
          <div className="overflow-hidden">
            <h1 className="font-display font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#F4F4F6] leading-[0.95] select-none animate-clipRevealUp delay-200">
              {bio.name || 'AKASH SURESH'}
            </h1>
          </div>

          {/* Technical Direction Positioning */}
          <p className="font-heading font-medium text-xs sm:text-lg md:text-xl text-[#C56A4A] tracking-[0.2em] sm:tracking-[0.25em] uppercase animate-fadeInUp delay-400">
            AI / FULL-STACK / AI-ASSISTED BUILDING
          </p>
        </div>

        {/* Short Human Statement */}
        <p className="font-body text-sm sm:text-base md:text-lg text-[#9E9A93] leading-relaxed max-w-2xl mx-auto font-normal animate-fadeInUp delay-500">
          Full-stack developer building practical web applications and AI-driven systems. Focused on clean frontend architecture, reliable backends, and AI-assisted workflows.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 animate-fadeInUp delay-600">
          {/* Primary CTA */}
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#C56A4A] text-[#09090B] font-heading font-semibold text-xs uppercase tracking-widest hover:bg-[#E08A68] transition-all active:scale-[0.98] shadow-lg min-h-[44px] group"
          >
            <span>VIEW PROJECTS</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Secondary CTA — Resume */}
          {isResumeAvailable && resume && (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#141418]/90 backdrop-blur-md border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all active:scale-[0.98] min-h-[44px]"
              aria-label="View Akash Suresh's resume"
            >
              <FileDown className="w-4 h-4 text-[#C56A4A]" />
              <span>VIEW RESUME</span>
            </a>
          )}

          {/* Quiet Actions */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#141418]/90 backdrop-blur-md border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all active:scale-[0.98] min-h-[44px]"
            aria-label="Open Akash Suresh's GitHub profile"
          >
            <GithubIcon className="w-4 h-4 text-[#C56A4A]" />
            <span>GITHUB</span>
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#141418]/90 backdrop-blur-md border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all active:scale-[0.98] min-h-[44px]"
            aria-label="Open Akash Suresh's LinkedIn profile"
          >
            <LinkedinIcon className="w-4 h-4 text-[#C56A4A]" />
            <span>LINKEDIN</span>
          </a>

          <a
            href={email}
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#141418]/90 backdrop-blur-md border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all active:scale-[0.98] min-h-[44px]"
            aria-label="Email Akash Suresh"
          >
            <Mail className="w-4 h-4 text-[#C56A4A]" />
            <span>EMAIL</span>
          </a>
        </div>

        {/* 08 — Real Evidence Strip */}
        <div className="pt-4 animate-fadeInUp delay-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto p-3 sm:p-4 rounded-xl bg-[#141418]/80 backdrop-blur-md border border-[#27272A]/70 text-center shadow-xl">
            <div className="space-y-0.5 border-r border-[#27272A]/40 last:border-r-0">
              <span className="font-mono-tech text-[10px] text-[#9E9A93] uppercase tracking-wider block">
                PROJECTS
              </span>
              <span className="font-heading text-lg sm:text-xl font-bold text-[#F4F4F6]">
                4+
              </span>
            </div>
            <div className="space-y-0.5 border-r border-[#27272A]/40 sm:border-r last:border-r-0">
              <span className="font-mono-tech text-[10px] text-[#9E9A93] uppercase tracking-wider block">
                EXPERIENCE
              </span>
              <span className="font-heading text-sm sm:text-base font-bold text-[#C56A4A] uppercase tracking-wide">
                INTERNSHIPS
              </span>
            </div>
            <div className="space-y-0.5 border-r border-[#27272A]/40 last:border-r-0">
              <span className="font-mono-tech text-[10px] text-[#9E9A93] uppercase tracking-wider block">
                CREDENTIALS
              </span>
              <span className="font-heading text-lg sm:text-xl font-bold text-[#F4F4F6]">
                5+
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[10px] text-[#9E9A93] uppercase tracking-wider block">
                CURRENT
              </span>
              <span className="font-heading text-xs sm:text-xs font-bold text-[#C56A4A] uppercase tracking-wide">
                IN DEVELOPMENT
              </span>
            </div>
          </div>
        </div>

        {/* 09 — Cinematic Hero Evidence Project Reel Carousel */}
        <div className="hero-evidence-parallax">
          <ScrollReveal variant="fade-up" delay={200}>
            <HeroEvidenceCarousel />
          </ScrollReveal>
        </div>
      </div>

      {/* 13 — Living Scroll Indicator Cue */}
      <div className="relative z-30 pt-6 pb-2 animate-fadeIn delay-800 living-scroll-indicator">
        <a
          href="#projects"
          className="group flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C56A4A] rounded p-1"
          aria-label="Scroll down to Projects section"
        >
          {/* Thin vertical line with traveling copper point */}
          <div className="relative w-[2px] h-10 bg-[#27272A] rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-[#C56A4A] rounded-full shadow-[0_0_8px_#C56A4A] living-scroll-cue-dot" />
          </div>
          <span className="font-mono-tech text-[10px] text-[#9E9A93] tracking-widest uppercase opacity-70 group-hover:text-[#C56A4A] group-hover:opacity-100 transition-colors">
            SCROLL
          </span>
        </a>
      </div>
    </section>
  );
};

