import React, { useEffect, useRef, useState } from 'react';

interface HeroVideoBackgroundProps {
  className?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const VIDEO_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      return;
    }

    // Scroll fade effect and IntersectionObserver pause optimization
    let animationFrameId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = containerRef.current?.offsetHeight || window.innerHeight;

      // Calculate smooth opacity falloff as user scrolls down into #projects
      if (scrollY <= heroHeight) {
        const ratio = Math.max(0, 1 - scrollY / (heroHeight * 0.85));
        setVideoOpacity(ratio);
      } else if (videoOpacity !== 0) {
        setVideoOpacity(0);
      }
    };

    const onScrollThrottled = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });

    // IntersectionObserver to pause video playback when Hero is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.play().catch((err) => {
              if (import.meta.env.DEV) {
                console.warn('[HeroVideoBackground] Playback error or autoplay restricted:', err);
              }
            });
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', onScrollThrottled);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [videoOpacity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden bg-[#09090B] pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Fallback & Base Ink Obsidian Background */}
      <div className="absolute inset-0 bg-[#09090B] z-0" />

      {/* CloudFront Cinematic Video Background Layer */}
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onError={(e) => {
            if (import.meta.env.DEV) {
              console.error('[HeroVideoBackground] Video load error:', e);
            }
            setHasError(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-out z-10 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ opacity: isLoaded ? videoOpacity * 0.65 : 0 }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      {/* Dark Cinematic Atmospheric Overlays — Enforces Ink Obsidian Vibe and High Contrast */}
      {/* 1. Base dark vignette tint */}
      <div className="absolute inset-0 bg-[#09090B]/50 z-20 pointer-events-none" />

      {/* 2. Top & Bottom Linear Gradient Fade to ensure navbar and lower section transition seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/90 via-[#09090B]/30 to-[#09090B] z-20 pointer-events-none" />

      {/* 3. Radial center lighting softener to preserve typography crispness */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#09090B_95%)] z-20 pointer-events-none" />
    </div>
  );
};
