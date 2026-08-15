import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visibleSections = new Map<string, IntersectionObserverEntry>();

    const evaluateActiveSection = () => {
      // If near absolute top of page, force 'hero' as active section
      if (window.scrollY < 80) {
        setActiveSection((prev) => (prev !== 'hero' ? 'hero' : prev));
        return;
      }

      let bestSectionId = '';
      let minDistanceToFocus = Infinity;
      const focusLineY = 120; // Viewport reading focus line below sticky header

      visibleSections.forEach((entry, id) => {
        if (!entry.isIntersecting) return;

        const rect = entry.boundingClientRect;
        const distance = Math.abs(rect.top - focusLineY);

        if (distance < minDistanceToFocus) {
          minDistanceToFocus = distance;
          bestSectionId = id;
        }
      });

      if (bestSectionId) {
        setActiveSection((prev) => (prev !== bestSectionId ? bestSectionId : prev));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry);
        });
        evaluateActiveSection();
      },
      {
        rootMargin: '-80px 0px -20% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScrollFallback = () => {
      if (window.scrollY < 80) {
        setActiveSection((prev) => (prev !== 'hero' ? 'hero' : prev));
      }
    };

    window.addEventListener('scroll', handleScrollFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollFallback);
    };
  }, [sectionIds]);

  return activeSection;
}


