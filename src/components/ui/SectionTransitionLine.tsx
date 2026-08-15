import React, { useEffect, useRef, useState } from 'react';

interface SectionTransitionLineProps {
  number?: string; // e.g. "01"
  title: string; // e.g. "Selected Work"
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
}

export const SectionTransitionLine: React.FC<SectionTransitionLineProps> = ({
  number,
  title,
  subtitle,
  className = '',
  action,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasObserver] = useState(() => typeof window !== 'undefined' && 'IntersectionObserver' in window);
  const [isReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [isVisible, setIsVisible] = useState(() => isReducedMotion || !hasObserver);

  useEffect(() => {
    if (isReducedMotion || !hasObserver) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isReducedMotion, hasObserver]);

  return (
    <div ref={containerRef} className={`space-y-6 ${className}`}>
      {/* Animated Growing Transition Rule */}
      <div className="relative w-full h-[1px] bg-[#27272A] overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C56A4A] via-[#C56A4A]/60 to-transparent transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: isVisible ? '100%' : '0%' }}
        />
      </div>

      {/* Section Header with Number, Title Clip Reveal, & Action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {number && (
            <span className="font-mono-tech text-xs sm:text-sm font-bold text-[#C56A4A] uppercase tracking-widest bg-[#141418] px-2.5 py-1 rounded border border-[#27272A]">
              {number}
            </span>
          )}
          <div className="overflow-hidden">
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F4F4F6] uppercase font-heading transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: isVisible ? 'translateY(0%)' : 'translateY(100%)',
              }}
            >
              {title}
            </h2>
          </div>
        </div>

        {action && <div>{action}</div>}
      </div>

      {subtitle && (
        <p className="text-xs sm:text-sm text-[#9E9A93] font-body max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTransitionLine;
