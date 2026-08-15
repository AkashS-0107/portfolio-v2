import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AtmosphericBackground } from './AtmosphericBackground';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  // Respect prefers-reduced-motion
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Phases of intro sequence:
  // 'dark': Initial obsidian screen (0ms)
  // 'name': Name title reveal begins (400ms)
  // 'subtitle': Subtitle credit appears (1600ms)
  // 'credit': Subtle portfolio credit line & horizontal light sweep (2200ms)
  // 'transition': Screen opening curtain transition (2800ms)
  // 'complete': Sequence finished, unmounted (3800ms)
  const [stage, setStage] = useState<'dark' | 'name' | 'subtitle' | 'credit' | 'transition' | 'complete'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'complete';
    }
    return 'dark';
  });

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasSkippedRef = useRef(false);

  const handleSkip = useCallback(() => {
    if (hasSkippedRef.current) return;
    hasSkippedRef.current = true;

    // Clear all pending timeline timers
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Trigger instant completion & unmount
    setStage('complete');
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    // If reduced motion is enabled, skip immediately
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Accelerated intro sequence target: 1.8s transition start, 2.3s completion
    const t1 = setTimeout(() => setStage('name'), 200);
    const t2 = setTimeout(() => setStage('subtitle'), 700);
    const t3 = setTimeout(() => setStage('credit'), 1100);
    const t4 = setTimeout(() => {
      setStage('transition');
      onComplete?.();
    }, 1600);
    const t5 = setTimeout(() => {
      setStage('complete');
    }, 2300);

    timeoutsRef.current = [t1, t2, t3, t4, t5];

    // User Interaction & Scroll skip handlers
    const onUserInteraction = () => {
      handleSkip();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;
      handleSkip();
    };

    window.addEventListener('click', onUserInteraction);
    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', onUserInteraction, { passive: true });
    window.addEventListener('touchmove', onUserInteraction, { passive: true });
    window.addEventListener('scroll', onUserInteraction, { passive: true });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onUserInteraction);
      window.removeEventListener('touchmove', onUserInteraction);
      window.removeEventListener('scroll', onUserInteraction);
    };
  }, [handleSkip, onComplete, prefersReducedMotion]);

  if (stage === 'complete') return null;

  const isNameVisible = stage !== 'dark';
  const isSubtitleVisible = stage === 'subtitle' || stage === 'credit' || stage === 'transition';
  const isCreditVisible = stage === 'credit' || stage === 'transition';
  const isTransitioning = stage === 'transition';

  return (
    <div
      aria-label="Cinematic Portfolio Introduction"
      role="region"
      onClick={() => handleSkip()}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090B] overflow-hidden select-none cursor-pointer transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isTransitioning
          ? 'opacity-0 scale-[1.015] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Explicit Skip Intro Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-[#141418]/90 border border-[#27272A] hover:border-[#C56A4A] text-[#C56A4A] font-mono-tech text-xs font-semibold tracking-widest uppercase transition-all shadow-md focus:outline-none min-h-[44px]"
      >
        SKIP INTRO
      </button>

      {/* 02 & 14 — Atmospheric Canvas Background */}
      <AtmosphericBackground className="opacity-30" />

      {/* 06 — LIGHT / ATMOSPHERIC TRANSITION: Horizon Light Beam & Radial Lens Light */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out ${
          isCreditVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Soft warm copper horizon light sweep */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#C56A4A]/30 to-transparent blur-[1px]" />
        
        {/* Soft ambient lens illumination */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[250px] sm:h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(197,106,74,0.08)_0%,transparent_70%)] blur-2xl pointer-events-none" />
      </div>

      {/* 03, 04, 05 — CINEMATIC TITLE & CREDIT CONTAINER */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5 sm:space-y-7 flex flex-col items-center justify-center">
        
        {/* 03 — CINEMATIC TITLE REVEAL: AKASH SURESH */}
        <div className="overflow-hidden py-2 px-1 max-w-full">
          <h1
            className={`font-display font-normal text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F4F4F6] leading-[1.02] tracking-tight transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isNameVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[18px]'
            }`}
          >
            AKASH SURESH
          </h1>
        </div>

        {/* 04 — SUBTITLE: AI / FULL-STACK / AI-ASSISTED BUILDING */}
        <div className="overflow-hidden py-1 max-w-full">
          <p
            className={`font-heading font-medium text-[11px] sm:text-xs md:text-sm text-[#C56A4A] tracking-[0.2em] sm:tracking-[0.28em] uppercase transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isSubtitleVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
          >
            AI / FULL-STACK / AI-ASSISTED BUILDING
          </p>
        </div>

        {/* 05 — CINEMATIC CREDIT LINE: PORTFOLIO — 2026 */}
        <div className="overflow-hidden pt-2 sm:pt-4 max-w-full">
          <p
            className={`font-mono text-[10px] sm:text-xs text-[#71717A]/80 tracking-[0.22em] sm:tracking-[0.28em] uppercase transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCreditVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            PORTFOLIO — 2026
          </p>
        </div>
      </div>

      {/* Skip indicator hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#71717A]/50 tracking-widest uppercase pointer-events-none">
        Click or scroll to skip
      </div>
    </div>
  );
};

export default CinematicIntro;
