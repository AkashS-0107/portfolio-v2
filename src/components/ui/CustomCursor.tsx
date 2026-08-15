import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'interactive' | 'view'>('default');
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return hasFinePointer && !prefersReducedMotion;
  });

  // Position refs for lerp smoothing
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"], .group\\/img, .group\\/link, [role="img"]');
      const interactiveTarget = target.closest(
        'button, a, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])'
      );

      if (viewTarget) {
        setCursorState('view');
      } else if (interactiveTarget) {
        setCursorState('interactive');
      } else {
        setCursorState('default');
      }
    };

    const render = () => {
      // Smooth ring lerp
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.25;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.25;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden aria-hidden" aria-hidden="true">
      {/* Subtle Inner Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 ${
          cursorState === 'view'
            ? 'w-1.5 h-1.5 bg-[#C56A4A] opacity-80'
            : cursorState === 'interactive'
            ? 'w-2 h-2 bg-[#C56A4A] opacity-90'
            : 'w-1.5 h-1.5 bg-[#F4F4F6] opacity-60'
        }`}
      />

      {/* Smooth Outer Follower Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
          cursorState === 'view'
            ? 'w-12 h-12 border-[#C56A4A] bg-[#09090B]/80 shadow-lg scale-100'
            : cursorState === 'interactive'
            ? 'w-8 h-8 border-[#C56A4A]/70 bg-[#C56A4A]/10 scale-100'
            : 'w-6 h-6 border-[#71717A]/40 bg-transparent scale-90'
        }`}
      >
        {cursorState === 'view' && (
          <span className="font-mono-tech text-[9px] font-bold tracking-widest text-[#C56A4A] uppercase">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
