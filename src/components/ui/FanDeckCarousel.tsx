import React, { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '../../utils/cn';

export interface FanDeckSlide {
  id: string;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
  issuer?: string;
  date?: string;
  category?: string;
  badge?: string;
  aspectRatio?: string;
}

export interface FanDeckCarouselProps {
  slides: FanDeckSlide[];
  centerIndex: number;
  onCenterIndexChange: (index: number) => void;
  onActiveSlideClick?: (slide: FanDeckSlide, index: number) => void;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  label?: string;
  className?: string;
  cardClassName?: string;
  aspectRatio?: 'certificate' | 'video' | 'auto' | string;
}

interface SlotConfig {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export const FanDeckCarousel: React.FC<FanDeckCarouselProps> = ({
  slides,
  centerIndex,
  onCenterIndexChange,
  onActiveSlideClick,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  label = 'Verified credentials editorial fan deck',
  className = '',
  cardClassName = '',
  aspectRatio = 'certificate',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Interaction and gesture tracking refs
  const isPointerDownRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const hasDraggedRef = useRef<boolean>(false);
  const pointerDownXRef = useRef<number>(0);
  const pointerDownYRef = useRef<number>(0);
  const isVerticalScrollRef = useRef<boolean | null>(null);
  const hoveredSlotRef = useRef<number | null>(null);

  const numSlides = slides.length;

  // Responsive Fan Geometry Calculators
  const getResponsiveMultiplier = useCallback(() => {
    if (typeof window === 'undefined') return { x: 1, rot: 1, scaleStep: 0.12 };
    const w = window.innerWidth;
    if (w < 640) {
      return { x: 0.52, rot: 0.45, scaleStep: 0.08 }; // Compact mobile fan
    } else if (w < 1024) {
      return { x: 0.75, rot: 0.72, scaleStep: 0.1 }; // Moderate tablet fan
    }
    return { x: 1.0, rot: 1.0, scaleStep: 0.12 }; // Full editorial desktop fan
  }, []);

  const getHeightMultiplier = useCallback(() => {
    if (typeof window === 'undefined') return { scale: 1, y: 1 };
    const h = window.innerHeight;
    if (h < 700) {
      return { scale: 0.85, y: 0.7 };
    }
    return { scale: 1.0, y: 1.0 };
  }, []);

  // Compute Base Fan Slot Configuration for relative position slot (-2 to +2)
  const getSlotConfig = useCallback(
    (slot: number): SlotConfig => {
      const resp = getResponsiveMultiplier();
      const height = getHeightMultiplier();

      if (slot === 0) {
        // Center Active Card
        return {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1.0 * height.scale,
          opacity: 1.0,
          zIndex: 50,
        };
      }

      const absSlot = Math.abs(slot);
      const sign = Math.sign(slot);

      // Fan spread calculations based on distance from center
      const baseX = (absSlot === 1 ? 160 : 280) * sign * resp.x;
      const baseY = (absSlot === 1 ? 12 : 28) * height.y;
      const baseRot = (absSlot === 1 ? 8 : 16) * sign * resp.rot;
      const baseScale = Math.max(0.6, (1.0 - absSlot * resp.scaleStep) * height.scale);
      const baseOpacity = absSlot === 1 ? 0.85 : 0.65;
      const baseZ = Math.round(40 - absSlot * 10);

      return {
        x: baseX,
        y: baseY,
        rotation: baseRot,
        scale: baseScale,
        opacity: baseOpacity,
        zIndex: baseZ,
      };
    },
    [getResponsiveMultiplier, getHeightMultiplier]
  );

  // Core GSAP DOM Animation Render Function
  const updateFanDeckLayout = useCallback(
    (animate = true, hoverSlot: number | null = null) => {
      if (!containerRef.current || numSlides === 0) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const effectiveAnimate = animate && !prefersReducedMotion;

      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        // Calculate circular shortest relative diff from centerIndex
        let diff = idx - centerIndex;
        while (diff > numSlides / 2) diff -= numSlides;
        while (diff < -numSlides / 2) diff += numSlides;

        const absDiff = Math.abs(diff);

        // Bounded Visible Map: Hide cards outside visible fan (+/- 2 slots)
        if (absDiff > 2.2) {
          if (effectiveAnimate) {
            gsap.to(cardEl, {
              opacity: 0,
              scale: 0.5,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
              onComplete: () => {
                cardEl.style.visibility = 'hidden';
                cardEl.style.pointerEvents = 'none';
              },
            });
          } else {
            cardEl.style.opacity = '0';
            cardEl.style.visibility = 'hidden';
            cardEl.style.pointerEvents = 'none';
          }
          return;
        }

        cardEl.style.visibility = 'visible';

        // Base slot configuration
        const config = getSlotConfig(diff);

        let targetX = config.x;
        let targetY = config.y;
        let targetRot = config.rotation;
        let targetScale = config.scale;
        const targetOpacity = config.opacity;
        const targetZIndex = config.zIndex;

        // Apply desktop Hover Expansion & Neighbor Displacement if hovering a slot
        if (hoverSlot !== null) {
          if (diff === hoverSlot) {
            targetY -= 10 * getHeightMultiplier().y; // Elevate
            targetScale += 0.03; // Subtle scale increase
            targetRot *= 0.7; // Align closer to straight
          } else if (diff > hoverSlot) {
            targetX += 18 * getResponsiveMultiplier().x; // Push neighboring right cards away
          } else if (diff < hoverSlot) {
            targetX -= 18 * getResponsiveMultiplier().x; // Push neighboring left cards away
          }
        }

        cardEl.style.zIndex = `${targetZIndex}`;
        cardEl.style.pointerEvents = 'auto';

        if (effectiveAnimate) {
          gsap.to(cardEl, {
            x: targetX,
            y: targetY,
            rotation: targetRot,
            scale: targetScale,
            opacity: targetOpacity,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          gsap.set(cardEl, {
            x: targetX,
            y: targetY,
            rotation: targetRot,
            scale: targetScale,
            opacity: targetOpacity,
          });
        }
      });
    },
    [centerIndex, numSlides, getSlotConfig, getHeightMultiplier, getResponsiveMultiplier]
  );

  // Sync GSAP Layout whenever centerIndex or slides change
  useEffect(() => {
    updateFanDeckLayout(true, hoveredSlotRef.current);
  }, [centerIndex, updateFanDeckLayout]);

  // Window Resize & Unmount Cleanup
  useEffect(() => {
    const handleResize = () => {
      updateFanDeckLayout(false, hoveredSlotRef.current);
    };

    window.addEventListener('resize', handleResize);
    const cardElements = cardRefs.current;

    return () => {
      window.removeEventListener('resize', handleResize);
      // Kill all active GSAP animations on unmount
      if (cardElements) {
        cardElements.forEach((el) => {
          if (el) gsap.killTweensOf(el);
        });
      }
    };
  }, [updateFanDeckLayout]);

  // Circular Navigation Helpers
  const goToIndex = useCallback(
    (newIndex: number) => {
      if (numSlides === 0) return;
      const normalized = ((newIndex % numSlides) + numSlides) % numSlides;
      onCenterIndexChange(normalized);
    },
    [numSlides, onCenterIndexChange]
  );

  const handlePrev = useCallback(() => {
    goToIndex(centerIndex - 1);
  }, [centerIndex, goToIndex]);

  const handleNext = useCallback(() => {
    goToIndex(centerIndex + 1);
  }, [centerIndex, goToIndex]);

  // Direct Card Selection Click / Active Card Lightbox Trigger Handler
  const handleCardClick = (slide: FanDeckSlide, idx: number, e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (idx === centerIndex) {
      // Clicking centered card -> trigger Lightbox
      if (onActiveSlideClick) {
        onActiveSlideClick(slide, idx);
      }
    } else {
      // Clicking neighbor card -> immediately center it
      goToIndex(idx);
    }
  };

  // Hover Interaction Event Handlers (Desktop)
  const handleCardMouseEnter = (idx: number) => {
    if (window.innerWidth < 768) return; // Skip hover effects on touch screens
    let diff = idx - centerIndex;
    while (diff > numSlides / 2) diff -= numSlides;
    while (diff < -numSlides / 2) diff += numSlides;

    hoveredSlotRef.current = diff;
    updateFanDeckLayout(true, diff);
  };

  const handleCardMouseLeave = () => {
    if (window.innerWidth < 768) return;
    hoveredSlotRef.current = null;
    updateFanDeckLayout(true, null);
  };

  // Pointer & Gesture Lifecycle (Mobile Vertical Scroll Protection)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    isDraggingRef.current = false;
    isVerticalScrollRef.current = null;
    pointerDownXRef.current = e.clientX;
    pointerDownYRef.current = e.clientY;

    // DO NOT call setPointerCapture here! Delay until > 6px horizontal drag confirmed.
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - pointerDownXRef.current;
    const deltaY = e.clientY - pointerDownYRef.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (!isDraggingRef.current) {
      // 1. Below 6px threshold check
      if (absX <= 6 && absY <= 6) return;

      // 2. Gesture intention check: compare abs(deltaX) vs abs(deltaY)
      if (isVerticalScrollRef.current === null) {
        if (absY > absX) {
          // Vertical movement dominant -> release gesture to browser for native page scroll
          isVerticalScrollRef.current = true;
          return;
        } else {
          isVerticalScrollRef.current = false;
        }
      }

      if (isVerticalScrollRef.current) return;

      // Horizontal movement dominant & > 6px threshold crossed -> confirm horizontal drag
      isDraggingRef.current = true;
      hasDraggedRef.current = true;

      if (containerRef.current) {
        try {
          containerRef.current.setPointerCapture(e.pointerId);
        } catch {
          // Ignore pointer capture errors
        }
      }
    }

    if (isVerticalScrollRef.current || !isDraggingRef.current) return;

    // Direct visual feedback for horizontal drag using GSAP
    const dragOffset = deltaX * 0.4;
    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      let diff = idx - centerIndex;
      while (diff > numSlides / 2) diff -= numSlides;
      while (diff < -numSlides / 2) diff += numSlides;
      if (Math.abs(diff) > 2.2) return;

      const config = getSlotConfig(diff);
      gsap.to(cardEl, {
        x: config.x + dragOffset,
        duration: 0.1,
        overwrite: 'auto',
      });
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (containerRef.current) {
      try {
        if (containerRef.current.hasPointerCapture(e.pointerId)) {
          containerRef.current.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }
    }

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const deltaX = e.clientX - pointerDownXRef.current;

      if (deltaX < -35) {
        handleNext();
      } else if (deltaX > 35) {
        handlePrev();
      } else {
        updateFanDeckLayout(true, null);
      }

      // Suppress click activation immediately after drag release
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 80);
    } else {
      isDraggingRef.current = false;
      hasDraggedRef.current = false;
      updateFanDeckLayout(true, null);
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
  };

  // Keyboard Accessibility Event Handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const activeSlide = slides[centerIndex];
      if (activeSlide && onActiveSlideClick) {
        onActiveSlideClick(activeSlide, centerIndex);
      }
    }
  };

  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    cardRefs.current[idx] = el;
  };

  if (numSlides === 0) return null;

  const activeSlide = slides[centerIndex] || slides[0];

  // Dynamic Aspect Ratio styling
  const aspectClass =
    aspectRatio === 'certificate'
      ? 'aspect-[4/3] sm:aspect-[1.38/1]'
      : aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : '';

  return (
    <div
      className={cn('space-y-4 font-sans select-none', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* Editorial Fan Viewport Container */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] flex items-center justify-center overflow-hidden focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded-xl bg-[#09090B]/60 border border-[#27272A]/80 py-4 touch-pan-y"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Render Cards Stack */}
        {slides.map((slide, idx) => {
          const isActive = idx === centerIndex;

          return (
            <div
              key={slide.id || idx}
              ref={(el) => setCardRef(el, idx)}
              role="group"
              aria-roledescription="slide"
              aria-current={isActive ? 'true' : undefined}
              aria-label={`${idx + 1} of ${numSlides}: ${slide.title || slide.alt}`}
              onClick={(e) => handleCardClick(slide, idx, e)}
              onMouseEnter={() => handleCardMouseEnter(idx)}
              onMouseLeave={handleCardMouseLeave}
              className={cn(
                'absolute w-[240px] sm:w-[310px] md:w-[370px] rounded-xl bg-[#141418] border overflow-hidden shadow-2xl transition-colors cursor-pointer group flex flex-col justify-between',
                isActive
                  ? 'border-[#C56A4A] shadow-[#C56A4A]/10'
                  : 'border-[#27272A] hover:border-[#33333C]',
                cardClassName
              )}
              style={{
                willChange: 'transform, opacity',
              }}
            >
              {/* Slide Card Header Meta (Optional) */}
              {(slide.issuer || slide.badge || slide.category) && (
                <div className="p-3 border-b border-[#27272A]/80 flex items-center justify-between bg-[#09090B]/80 backdrop-blur-xs text-xs font-mono-tech">
                  <div className="flex items-center gap-2">
                    {slide.issuer && (
                      <span className="text-[10px] font-bold text-[#C56A4A] bg-[#141418] px-2 py-0.5 rounded border border-[#C56A4A]/30 uppercase">
                        {slide.issuer}
                      </span>
                    )}
                    {slide.badge && (
                      <span className="text-[10px] text-[#9E9A93] bg-[#09090B] px-2 py-0.5 rounded border border-[#27272A]">
                        {slide.badge}
                      </span>
                    )}
                  </div>
                  {slide.date && (
                    <span className="text-xs text-[#9E9A93] font-mono-tech font-semibold">
                      {slide.date}
                    </span>
                  )}
                </div>
              )}

              {/* Natural Aspect Ratio Image Container (NO CROP, NO TINT, NO FILTER - OBJECT-CONTAIN) */}
              <div
                className={cn(
                  'relative w-full flex-1 p-3 flex items-center justify-center bg-[#09090B]/90',
                  aspectClass
                )}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded border border-[#27272A] bg-[#141418] shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
                  loading={isActive ? 'eager' : 'lazy'}
                />

                {/* Inspect Overlay Trigger on Active Slide */}
                {isActive && (
                  <div className="absolute inset-0 bg-[#09090B]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#C56A4A] text-[#09090B] font-mono-tech text-xs font-bold shadow-2xl">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>INSPECT FULLSCREEN</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Slide Card Footer Title */}
              {slide.title && (
                <div className="p-3 border-t border-[#27272A]/80 bg-[#09090B]/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F4F4F6] truncate font-heading">
                    {slide.title}
                  </span>
                  {isActive && (
                    <span className="text-[10px] text-[#C56A4A] font-mono-tech shrink-0 font-semibold uppercase">
                      Active
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Clean Natural Counter (1 of 5 format) */}
      {(showNavigation || showPagination) && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#27272A]">
          {/* Active Caption / Title */}
          {showCaption && activeSlide.title ? (
            <div className="text-xs font-mono-tech text-[#9E9A93]">
              <span className="text-[#F4F4F6] font-semibold">{activeSlide.title}</span>
              {activeSlide.subtitle && <span> — {activeSlide.subtitle}</span>}
            </div>
          ) : (
            <div />
          )}

          {/* Minimal Navigation Buttons & Counter */}
          <div className="flex items-center gap-4">
            {showPagination && (
              <div className="px-3.5 py-1.5 rounded bg-[#141418] border border-[#27272A] text-[#C56A4A] text-xs font-mono-tech font-bold tracking-wider">
                {centerIndex + 1} of {numSlides}
              </div>
            )}

            {showNavigation && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] hover:text-[#C56A4A] text-[#9E9A93] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] hover:text-[#C56A4A] text-[#9E9A93] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Selection Selector Buttons (Derived strictly from centerIndex) */}
      <div className="grid grid-cols-5 gap-2 pt-1">
        {slides.map((slide, idx) => {
          const isCur = idx === centerIndex;
          return (
            <button
              key={slide.id || idx}
              type="button"
              onClick={() => goToIndex(idx)}
              className={cn(
                'p-1.5 rounded border transition-all text-center min-h-[44px] flex flex-col items-center justify-center',
                isCur
                  ? 'bg-[#141418] border-[#C56A4A] text-[#C56A4A] shadow'
                  : 'bg-[#09090B] border-[#27272A] text-[#9E9A93] hover:border-[#33333C]'
              )}
              aria-label={`Select item ${idx + 1}: ${slide.title || slide.alt}`}
            >
              <span className="text-[11px] font-mono-tech font-bold block">
                {idx + 1}
              </span>
              <span className="text-[9px] truncate w-full block text-[#9E9A93]">
                {slide.issuer || slide.title || `Item ${idx + 1}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
