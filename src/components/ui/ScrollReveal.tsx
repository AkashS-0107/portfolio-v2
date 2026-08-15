import React, { useEffect, useRef, useState } from 'react';

export type ScrollRevealVariant =
  | 'fade-up'
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'clip'
  | 'stagger';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number; // Delay in ms
  duration?: number; // Duration in ms (600 - 850ms default)
  threshold?: number; // Observer threshold (0 - 1)
  className?: string;
  staggerIndex?: number;
  staggerStep?: number; // Step delay per index (60 - 100ms)
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.12,
  className = '',
  staggerIndex = 0,
  staggerStep = 80,
  once = true,
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
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, isReducedMotion, hasObserver]);

  // Calculate total delay
  const totalDelay = delay + staggerIndex * staggerStep;

  // Immediate visibility if reduced motion is requested
  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Styles based on variant
  const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const transitionStyle: React.CSSProperties = {
    transitionProperty: variant === 'clip' ? 'transform' : 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
    transitionDelay: `${totalDelay}ms`,
    willChange: 'opacity, transform',
  };

  // Base state classes for variants
  const getVariantStyles = (): { initial: React.CSSProperties; visible: React.CSSProperties } => {
    switch (variant) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'slide-left':
        return {
          initial: { opacity: 0, transform: 'translateX(-30px)' },
          visible: { opacity: 1, transform: 'translateX(0)' },
        };
      case 'slide-right':
        return {
          initial: { opacity: 0, transform: 'translateX(30px)' },
          visible: { opacity: 1, transform: 'translateX(0)' },
        };
      case 'scale':
        return {
          initial: { opacity: 0, transform: 'scale(0.97)' },
          visible: { opacity: 1, transform: 'scale(1)' },
        };
      case 'clip':
        return {
          initial: { transform: 'translateY(100%)' },
          visible: { transform: 'translateY(0)' },
        };
      case 'stagger':
      case 'fade-up':
      default:
        return {
          initial: { opacity: 0, transform: 'translateY(24px)' },
          visible: { opacity: 1, transform: 'translateY(0)' },
        };
    }
  };

  const { initial, visible } = getVariantStyles();
  const currentStyles = isVisible ? visible : initial;

  if (variant === 'clip') {
    return (
      <div ref={containerRef} className={`overflow-hidden ${className}`}>
        <div style={{ ...transitionStyle, ...currentStyles }}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...transitionStyle, ...currentStyles }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
