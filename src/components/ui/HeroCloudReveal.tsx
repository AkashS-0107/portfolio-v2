import React, { useEffect, useState } from 'react';

export const HeroCloudReveal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenReveal = sessionStorage.getItem('hero_cloud_reveal_seen');
    return !prefersReducedMotion && hasSeenReveal !== 'true';
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Trigger cloud separation sequence swiftly
    const timer1 = setTimeout(() => {
      setIsAnimating(true);
    }, 150);

    const timer2 = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hero_cloud_reveal_seen', 'true');
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center bg-[#09090B]/60 backdrop-blur-[2px]"
    >
      {/* Left Cloud Layer */}
      <div
        className={`absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#09090B] via-[#141418] to-transparent transition-transform duration-1000 ease-in-out ${
          isAnimating ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <svg
          className="absolute right-0 top-0 bottom-0 h-full w-48 translate-x-1/2 text-[#09090B] fill-current opacity-80"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q30,50 0,100 L100,100 L100,0 Z" />
        </svg>
      </div>

      {/* Right Cloud Layer */}
      <div
        className={`absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-[#09090B] via-[#141418] to-transparent transition-transform duration-1000 ease-in-out ${
          isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <svg
          className="absolute left-0 top-0 bottom-0 h-full w-48 -translate-x-1/2 text-[#09090B] fill-current opacity-80"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M100,0 Q70,50 100,100 L0,100 L0,0 Z" />
        </svg>
      </div>

      {/* Center Cinematic Shimmer */}
      <div
        className={`relative text-center transition-all duration-700 ${
          isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded bg-[#141418] border border-[#C56A4A]/40 text-[#C56A4A] font-heading font-semibold text-xs tracking-wider uppercase shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>PORTFOLIO V2</span>
        </div>
      </div>
    </div>
  );
};

