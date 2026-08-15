import React, { useEffect, useState, useRef } from 'react';

interface TubelightEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const TubelightEffect: React.FC<TubelightEffectProps> = ({ children, className = '' }) => {
  const [stage, setStage] = useState<'off' | 'flicker1' | 'flicker2' | 'partial' | 'blackout' | 'full'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'full';
    }
    return 'off';
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stage !== 'off') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && stage === 'off') {
          // Ignition sequence
          setStage('flicker1');
          setTimeout(() => setStage('blackout'), 120);
          setTimeout(() => setStage('flicker2'), 240);
          setTimeout(() => setStage('partial'), 400);
          setTimeout(() => setStage('blackout'), 520);
          setTimeout(() => setStage('full'), 700);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [stage]);

  const getGlowStyles = () => {
    switch (stage) {
      case 'off':
        return 'opacity-20 border-[#27272A] shadow-none';
      case 'flicker1':
        return 'opacity-60 border-[#C56A4A]/50 shadow-[0_0_15px_rgba(197,106,74,0.2)]';
      case 'flicker2':
        return 'opacity-40 border-[#27272A] shadow-none';
      case 'partial':
        return 'opacity-80 border-[#C56A4A]/70 shadow-[0_0_20px_rgba(197,106,74,0.3)]';
      case 'blackout':
        return 'opacity-10 border-[#141418] shadow-none';
      case 'full':
        return 'opacity-100 border-[#C56A4A]/60 shadow-[0_0_25px_rgba(197,106,74,0.25)]';
      default:
        return 'opacity-100 border-[#C56A4A]/60 shadow-[0_0_25px_rgba(197,106,74,0.25)]';
    }
  };

  return (
    <div ref={containerRef} className={`relative transition-all duration-150 ${getGlowStyles()} ${className}`}>
      {children}
    </div>
  );
};

