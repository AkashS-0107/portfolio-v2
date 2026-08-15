import React, { useEffect, useState } from 'react';
import { ArrowDown, Mail, FileDown } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { HeroCloudReveal } from '../ui/HeroCloudReveal';
import { HeroEvidenceCarousel } from './HeroEvidenceCarousel';
import { AtmosphericBackground } from '../ui/AtmosphericBackground';
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

  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const [allowParallax] = useState(() => {
    if (typeof window === 'undefined') return false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    return !prefersReducedMotion && !isMobile;
  });

  useEffect(() => {
    if (!allowParallax) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Cap upward movement to 30px max
          const scrollY = window.scrollY;
          if (scrollY < 800) {
            setScrollOffsetY(Math.min(scrollY * 0.12, 30));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allowParallax]);

  const heroStyle = allowParallax
    ? {
        transform: `translateY(-${scrollOffsetY}px)`,
        opacity: Math.max(1 - scrollOffsetY / 120, 0.7),
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }
    : {};

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#09090B]"
    >
      {/* Production-Quality Hero Atmospheric Particle/Vortex Background */}
      <AtmosphericBackground />

      {/* Cinematic Hero Cloud Reveal */}
      <HeroCloudReveal isIntroActive={isIntroActive} />

      {/* Subtle Hairline Grid Background */}
      <div className="absolute inset-0 bg-grid-hairline opacity-20 pointer-events-none z-0" />

      {/* Hero Content Container — z-30 layer with subtle scroll receding motion */}
      <div
        className="relative max-w-5xl mx-auto w-full text-center space-y-8 z-30"
        style={heroStyle}
      >
        {/* Central Primary Name — Headline Anchor */}
        <div className="space-y-4">
          <div className="overflow-hidden">
            <h1 className="font-display font-normal text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#F4F4F6] leading-[0.95] select-none animate-clipRevealUp delay-200">
              {bio.name || 'AKASH SURESH'}
            </h1>
          </div>

          {/* Technical Direction Positioning */}
          <p className="font-heading font-medium text-lg sm:text-2xl text-[#C56A4A] tracking-wider uppercase animate-fadeInUp delay-400">
            AI / FULL-STACK / AI-ASSISTED BUILDING
          </p>
        </div>

        {/* Short Human Description */}
        <p className="font-body text-base sm:text-lg text-[#9E9A93] leading-relaxed max-w-2xl mx-auto font-normal animate-fadeInUp delay-500">
          Full-stack web developer building responsive React &amp; TypeScript applications while exploring practical machine learning and AI-assisted engineering workflows.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 animate-fadeInUp delay-600">
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#C56A4A] text-[#09090B] font-heading font-semibold text-xs uppercase tracking-widest hover:bg-[#E08A68] transition-all active:scale-[0.98] shadow-lg min-h-[44px] group"
          >
            <span>VIEW MY WORK</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {isResumeAvailable && resume && (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all active:scale-[0.98] min-h-[44px]"
              aria-label="View Akash Suresh's resume"
            >
              <FileDown className="w-4 h-4 text-[#C56A4A]" />
              <span>RESUME</span>
            </a>
          )}

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all active:scale-[0.98] min-h-[44px]"
            aria-label="Open Akash Suresh's GitHub profile"
          >
            <GithubIcon className="w-4 h-4 text-[#C56A4A]" />
            <span>GITHUB</span>
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all active:scale-[0.98] min-h-[44px]"
            aria-label="Open Akash Suresh's LinkedIn profile"
          >
            <LinkedinIcon className="w-4 h-4 text-[#C56A4A]" />
            <span>LINKEDIN</span>
          </a>

          <a
            href={email}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all active:scale-[0.98] min-h-[44px]"
            aria-label="Email Akash Suresh"
          >
            <Mail className="w-4 h-4 text-[#C56A4A]" />
            <span>EMAIL</span>
          </a>
        </div>

        {/* Large Evidence Visual System Carousel */}
        <ScrollReveal variant="fade-up" delay={200}>
          <HeroEvidenceCarousel />
        </ScrollReveal>
      </div>
    </section>
  );
};
