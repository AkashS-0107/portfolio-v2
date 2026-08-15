import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'interactive' | 'view' | 'inspect' | 'drag' | 'link'>('default');
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasTouch = 'ontouchstart' in window;
    return hasFinePointer && !isCoarsePointer && !prefersReducedMotion && !hasTouch;
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

      const inspectTarget = target.closest('[data-cursor="inspect"]');
      const dragTarget = target.closest('[data-cursor="drag"], .cursor-grab, .cursor-grabbing');
      const viewTarget = target.closest('[data-cursor="view"], .group\\/img');
      const linkTarget = target.closest(
        '[data-cursor="link"], a[target="_blank"], a[href^="http"]'
      );
      const interactiveTarget = target.closest(
        'button, a, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])'
      );

      if (inspectTarget) {
        setCursorState('inspect');
      } else if (dragTarget) {
        setCursorState('drag');
      } else if (viewTarget) {
        setCursorState('view');
      } else if (linkTarget) {
        setCursorState('link');
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

  const isBadgeState = ['view', 'inspect', 'drag', 'link'].includes(cursorState);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden aria-hidden" aria-hidden="true">
      {/* Subtle Inner Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 ${
          isBadgeState
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
          isBadgeState
            ? 'w-14 h-14 border-[#C56A4A] bg-[#09090B]/90 shadow-xl scale-100'
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
        {cursorState === 'inspect' && (
          <span className="font-mono-tech text-[9px] font-bold tracking-widest text-[#C56A4A] uppercase">
            INSPECT
          </span>
        )}
        {cursorState === 'drag' && (
          <span className="font-mono-tech text-[9px] font-bold tracking-widest text-[#C56A4A] uppercase">
            DRAG
          </span>
        )}
        {cursorState === 'link' && (
          <span className="font-mono-tech text-[11px] font-bold text-[#C56A4A]">
            ↗
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
