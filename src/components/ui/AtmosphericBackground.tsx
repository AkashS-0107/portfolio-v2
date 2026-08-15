import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  length: number;
  angle: number;
  angularVelocity: number;
  type: 'shard' | 'diamond' | 'dot';
  colorType: 'graphite' | 'charcoal' | 'offwhite';
  baseAlpha: number;
  frictionGlow: number;
}

interface AtmosphericBackgroundProps {
  className?: string;
}

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Interaction state held purely in refs (zero React state updates during animation)
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    lastX: -1000,
    lastY: -1000,
    speed: 0,
    active: false,
    isTouch: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Check coarse pointer / touch capability
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    mouseRef.current.isTouch = isTouchDevice;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Responsive particle count target based on viewport width (Section 07 requirement)
    const getParticleCount = (w: number) => {
      if (w < 768) return Math.floor(50 + (w / 768) * 20); // 50 - 70 (Mobile)
      if (w < 1024) return Math.floor(140 + ((w - 768) / 256) * 40); // 140 - 180 (Tablet)
      return Math.floor(300 + Math.min((w - 1024) / 896, 1) * 60); // 300 - 360 (Desktop)
    };

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const randType = Math.random();
        const type: Particle['type'] = randType < 0.45 ? 'shard' : randType < 0.8 ? 'diamond' : 'dot';

        const randColor = Math.random();
        // 55% graphite, 30% charcoal, 15% subtle warm offwhite
        const colorType: Particle['colorType'] =
          randColor < 0.55 ? 'graphite' : randColor < 0.85 ? 'charcoal' : 'offwhite';

        // Keep size very small: 0.5px to 1.5px (rarely 2px for shards)
        const size = type === 'shard' ? 0.7 + Math.random() * 0.7 : 0.5 + Math.random() * 0.9;
        const length = type === 'shard' ? size * (1.8 + Math.random() * 1.4) : size;

        // Base alpha depends on particle color type
        const baseAlpha =
          colorType === 'offwhite'
            ? 0.12 + Math.random() * 0.14
            : colorType === 'graphite'
            ? 0.25 + Math.random() * 0.25
            : 0.2 + Math.random() * 0.2;

        // Very slow ambient movement
        const baseVx = (Math.random() - 0.5) * 0.18;
        const baseVy = (Math.random() - 0.5) * 0.18;

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          size,
          length,
          angle: Math.random() * Math.PI * 2,
          angularVelocity: (Math.random() - 0.5) * 0.015,
          type,
          colorType,
          baseAlpha,
          frictionGlow: 0,
        });
      }

      particlesRef.current = particles;
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      initParticles(width, height);

      // If reduced motion is requested, render static frame once on resize
      if (prefersReducedMotion) {
        renderStaticFrame();
      }
    };

    const renderStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        drawParticle(ctx, p);
      }
    };

    const drawParticle = (context: CanvasRenderingContext2D, p: Particle) => {
      // Soft restrained radial friction glow behind high-velocity particles near cursor
      if (p.frictionGlow > 0.35) {
        context.save();
        context.beginPath();
        context.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(197, 106, 74, ${(p.frictionGlow * 0.12).toFixed(3)})`;
        context.fill();
        context.restore();
      }

      context.save();
      context.translate(p.x, p.y);
      context.rotate(p.angle);

      let fillStyle: string;
      if (p.frictionGlow > 0.15) {
        // Restrained Copper response `#C56A4A` (10-15% max during cursor interaction)
        const glowFactor = Math.min(p.frictionGlow, 0.7);
        const alpha = Math.min(p.baseAlpha + glowFactor * 0.35, 0.75);
        fillStyle = `rgba(197, 106, 74, ${alpha.toFixed(3)})`;
      } else {
        // Base neutral particles (85-90% monochromatic charcoal, graphite, offwhite)
        const alpha = p.baseAlpha.toFixed(3);
        if (p.colorType === 'offwhite') {
          fillStyle = `rgba(244, 244, 246, ${alpha})`;
        } else if (p.colorType === 'graphite') {
          fillStyle = `rgba(113, 113, 122, ${alpha})`; // Neutral glass shard #71717A
        } else {
          fillStyle = `rgba(63, 63, 70, ${alpha})`; // Charcoal dust #3F3F46
        }
      }

      context.fillStyle = fillStyle;

      if (p.type === 'shard') {
        context.fillRect(-p.size / 2, -p.length / 2, p.size, p.length);
      } else if (p.type === 'diamond') {
        context.beginPath();
        context.moveTo(0, -p.size);
        context.lineTo(p.size, 0);
        context.lineTo(0, p.size);
        context.lineTo(-p.size, 0);
        context.closePath();
        context.fill();
      } else {
        context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }

      context.restore();
    };

    const updateAndRender = () => {
      if (!isVisibleRef.current) {
        animFrameIdRef.current = requestAnimationFrame(updateAndRender);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      // Smooth cursor interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Mouse speed tracking
      const mouseDx = mouse.targetX - mouse.lastX;
      const mouseDy = mouse.targetY - mouse.lastY;
      mouse.speed = Math.hypot(mouseDx, mouseDy);
      mouse.lastX = mouse.targetX;
      mouse.lastY = mouse.targetY;

      const particles = particlesRef.current;
      const interactionRadius = Math.min(Math.max(width * 0.18, 130), 220);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Particle rotation
        p.angle += p.angularVelocity;

        // Interaction physics
        let isInteracting = false;
        if (mouse.active && !mouse.isTouch) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 0.1 && dist < interactionRadius) {
            isInteracting = true;
            const factor = Math.pow(1 - dist / interactionRadius, 1.8);

            // Subtle radial attraction force (restrained)
            const attractFx = (dx / dist) * factor * 0.035;
            const attractFy = (dy / dist) * factor * 0.035;

            // Perpendicular vortex force (subtle orbit)
            const perpX = -dy / dist;
            const perpY = dx / dist;
            const vortexFx = perpX * factor * 0.06;
            const vortexFy = perpY * factor * 0.06;

            p.vx += attractFx + vortexFx;
            p.vy += attractFy + vortexFy;

            // Friction response glow target
            const glowTarget = Math.min(factor * (0.35 + mouse.speed * 0.04), 1.0);
            p.frictionGlow += (glowTarget - p.frictionGlow) * 0.2;
          }
        }

        if (!isInteracting) {
          p.frictionGlow *= 0.91;
          p.vx += (p.baseVx - p.vx) * 0.03;
          p.vy += (p.baseVy - p.vy) * 0.03;
        }

        // Apply velocity dampening
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Soft screen border wrap-around with 20px padding
        const padding = 20;
        if (p.x < -padding) p.x = width + padding;
        if (p.x > width + padding) p.x = -padding;
        if (p.y < -padding) p.y = height + padding;
        if (p.y > height + padding) p.y = -padding;

        drawParticle(ctx, p);
      }

      animFrameIdRef.current = requestAnimationFrame(updateAndRender);
    };

    // Initialize layout bounds
    handleResize();

    // Resize listener
    window.addEventListener('resize', handleResize);

    // Mouse listeners on container and window
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRef.current.isTouch) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (mouseRef.current.isTouch) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    // IntersectionObserver & Document Visibility to pause rendering when offscreen or tab hidden
    let observer: IntersectionObserver | null = null;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
      } else if (container) {
        const rect = container.getBoundingClientRect();
        isVisibleRef.current = rect.bottom > 0 && rect.top < window.innerHeight;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting && !document.hidden;
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    // Start animation loop unless reduced motion is preferred
    if (!prefersReducedMotion) {
      animFrameIdRef.current = requestAnimationFrame(updateAndRender);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);

      if (observer) {
        observer.disconnect();
      }

      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Optional subtle dark edge vignette overlay to guarantee hero text contrast */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(9,9,11,0.7)_100%)]" />
    </div>
  );
};

export default AtmosphericBackground;
