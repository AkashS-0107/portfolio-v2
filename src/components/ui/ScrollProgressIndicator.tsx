import React, { useEffect, useState } from 'react';

export const ScrollProgressIndicator: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const currentProgress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
        setProgress(currentProgress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile Top Horizontal Progress Line */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-[2px] bg-[#27272A]/40 pointer-events-none">
        <div
          className="h-full bg-[#C56A4A] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Desktop Right Vertical Progress Bar */}
      <div
        className="hidden md:block fixed right-0 top-0 bottom-0 z-40 w-[2px] bg-[#27272A]/30 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full bg-[#C56A4A] transition-all duration-150 ease-out rounded-full shadow-[0_0_8px_rgba(197,106,74,0.5)]"
          style={{ height: `${progress}%` }}
        />
      </div>
    </>
  );
};

export default ScrollProgressIndicator;
