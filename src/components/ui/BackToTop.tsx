import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after 400px of scrolling
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#141418] border border-[#27272A] text-[#C56A4A] hover:border-[#C56A4A] hover:bg-[#09090B] transition-all duration-300 shadow-xl active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#C56A4A]"
      aria-label="Back to top of page"
      title="Back to top"
    >
      <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};

export default BackToTop;
