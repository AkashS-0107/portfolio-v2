import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Target,
  Code2,
  ExternalLink,
  Maximize2,
  FolderGit2,
  Layers,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { CertificateLightboxModal } from './CertificateLightboxModal';

const SKILL_NAME_MAP: Record<string, string> = {
  'prompt-eng': 'Prompt Engineering',
  'ai-assisted-dev': 'AI-Assisted Development',
  'ai': 'Artificial Intelligence',
  'ml': 'Machine Learning',
  'aiml-dev': 'AI / ML Engineering',
  'python': 'Python',
  'nodejs': 'Node.js',
  'express': 'Express',
  'sql': 'SQL',
  'typescript': 'TypeScript',
  'c': 'C',
  'cpp': 'C++',
  'react': 'React',
};

const PROJECT_NAME_MAP: Record<string, string> = {
  'future-pe': 'Future PE',
  'titan-fitness-club': 'Titan Fitness Club',
  'inamigos-foundation': 'InAmigos Foundation',
  'worksure': 'WorkSure',
};

export const CertificateRoulette: React.FC = () => {
  const { certifications } = portfolioData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const deckRef = useRef<HTMLDivElement>(null);
  const wheelThrottleRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);

  const activeCert = certifications[activeIndex] || certifications[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
  }, [certifications.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % certifications.length);
  }, [certifications.length]);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA'].includes(activeTag)) return;
      if (isLightboxOpen) return;

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (deckRef.current && deckRef.current.contains(document.activeElement)) {
          e.preventDefault();
          setIsLightboxOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, isLightboxOpen]);

  // Scoped wheel navigation handler
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (e.deltaY > 0) {
      // Scroll Down -> Next certificate
      if (activeIndex < certifications.length - 1) {
        e.preventDefault();
        if (now - wheelThrottleRef.current > 250) {
          wheelThrottleRef.current = now;
          setActiveIndex((prev) => prev + 1);
        }
      }
    } else if (e.deltaY < 0) {
      // Scroll Up -> Previous certificate
      if (activeIndex > 0) {
        e.preventDefault();
        if (now - wheelThrottleRef.current > 250) {
          wheelThrottleRef.current = now;
          setActiveIndex((prev) => prev - 1);
        }
      }
    }
  };

  // Touch gesture swipe handler
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartYRef.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartYRef.current;
    touchStartYRef.current = null;

    const SWIPE_THRESHOLD = 40;
    if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
      if (deltaY < 0) {
        // Swipe Up -> Next
        if (activeIndex < certifications.length - 1) {
          setActiveIndex((prev) => prev + 1);
        }
      } else {
        // Swipe Down -> Previous
        if (activeIndex > 0) {
          setActiveIndex((prev) => prev - 1);
        }
      }
    }
  };

  // Mouse tilt perspective effect on active card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / (rect.height / 2)) * -3.5,
      y: (x / (rect.width / 2)) * 3.5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Upper Control Strip & Clean Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#27272A] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#141418] border border-[#27272A] text-[#C56A4A]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F6] uppercase tracking-wider font-heading">
              CERTIFICATE COLLECTION
            </h3>
            <span className="text-[#9E9A93] text-xs font-body">
              Explorable credentials & verified course outcomes
            </span>
          </div>
        </div>

        {/* Counter and Navigation controls */}
        <div className="flex items-center gap-4">
          <div className="px-3.5 py-1.5 rounded bg-[#141418] border border-[#27272A] text-[#C56A4A] text-xs font-mono-tech font-bold">
            {activeIndex + 1} of {certifications.length}
          </div>

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
        </div>
      </div>

      {/* Main Two-Part Desktop Composition (LEFT: Deck Visual, RIGHT: Learning Narrative) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Physical Deck (6 cols on Desktop) */}
        <div
          ref={deckRef}
          tabIndex={0}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="lg:col-span-6 space-y-4 focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none rounded-lg p-1"
          aria-label="Certificate roulette gallery deck. Use scroll wheel or arrow keys to navigate."
        >
          {/* Deck Container */}
          <div className="relative min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex items-center justify-center p-2">
            {/* Background Deck Layered Peek Cards */}
            {certifications.map((cert, idx) => {
              const diff = idx - activeIndex;
              const isActive = idx === activeIndex;

              // Compute physical card placement in depth stack
              let transformStyle = '';
              let opacityStyle = 0;
              let zIndexStyle = 10;
              let isVisible = false;

              if (isActive) {
                transformStyle = `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(0, 0, 0) scale(1)`;
                opacityStyle = 1;
                zIndexStyle = 30;
                isVisible = true;
              } else if (diff === 1) {
                transformStyle = 'perspective(1000px) translate3d(12px, 16px, -30px) scale(0.94)';
                opacityStyle = 0.45;
                zIndexStyle = 20;
                isVisible = true;
              } else if (diff === -1) {
                transformStyle = 'perspective(1000px) translate3d(-12px, -16px, -30px) scale(0.94)';
                opacityStyle = 0.45;
                zIndexStyle = 20;
                isVisible = true;
              } else if (diff === 2) {
                transformStyle = 'perspective(1000px) translate3d(24px, 32px, -60px) scale(0.88)';
                opacityStyle = 0.2;
                zIndexStyle = 10;
                isVisible = true;
              } else if (diff === -2) {
                transformStyle = 'perspective(1000px) translate3d(-24px, -32px, -60px) scale(0.88)';
                opacityStyle = 0.2;
                zIndexStyle = 10;
                isVisible = true;
              }

              if (!isVisible) return null;

              return (
                <div
                  key={cert.id}
                  data-cursor={isActive ? 'view' : undefined}
                  onClick={() => {
                    if (isActive) {
                      setIsLightboxOpen(true);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  onMouseMove={isActive ? handleMouseMove : undefined}
                  onMouseLeave={isActive ? handleMouseLeave : undefined}
                  style={{
                    transform: transformStyle,
                    opacity: opacityStyle,
                    zIndex: zIndexStyle,
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
                  }}
                  className={`absolute inset-x-2 sm:inset-x-4 top-2 bottom-2 rounded-xl bg-[#141418] border transition-colors cursor-pointer flex flex-col justify-between overflow-hidden shadow-2xl ${
                    isActive
                      ? 'border-[#C56A4A]/80 hover:border-[#C56A4A]'
                      : 'border-[#27272A] hover:border-[#33333C]'
                  }`}
                >
                  {/* Active Certificate Header Overlay */}
                  <div className="p-3 sm:p-4 border-b border-[#27272A]/70 flex items-center justify-between bg-[#09090B]/60 backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#C56A4A] bg-[#141418] px-2 py-0.5 rounded border border-[#C56A4A]/30 font-mono-tech uppercase">
                        {cert.issuer}
                      </span>
                      {cert.status && (
                        <span className="text-[10px] text-[#9E9A93] bg-[#09090B] px-2 py-0.5 rounded border border-[#27272A] font-mono-tech">
                          {cert.status}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#9E9A93] font-mono-tech font-semibold">
                      {cert.issueDate || cert.year}
                    </span>
                  </div>

                  {/* Certificate Image Frame - ORIGINAL COLORS (NO TINT, NO FILTER) */}
                  <div className="relative flex-1 p-3 sm:p-4 flex items-center justify-center bg-[#09090B]/90 group">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={`Official certificate document for ${cert.title}`}
                        className="max-h-[220px] sm:max-h-[260px] md:max-h-[290px] w-auto object-contain rounded border border-[#27272A] bg-[#141418] shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
                        loading="eager"
                      />
                    ) : (
                      <div className="text-center p-6 text-[#9E9A93] font-mono-tech text-xs">
                        {cert.title}
                      </div>
                    )}

                    {/* Inspection Hover Hint on Active Card */}
                    {isActive && (
                      <div className="absolute inset-0 bg-[#09090B]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#C56A4A] text-[#09090B] font-mono-tech text-xs font-bold shadow-2xl">
                          <Maximize2 className="w-4 h-4" />
                          <span>INSPECT FULL CERTIFICATE</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Active Card Footer */}
                  <div className="p-3 sm:p-4 border-t border-[#27272A]/70 bg-[#09090B]/60 flex items-center justify-between text-xs">
                    <h4 className="font-bold text-[#F4F4F6] truncate pr-2 font-heading">
                      {cert.title}
                    </h4>
                    {isActive && (
                      <span className="text-[10px] text-[#C56A4A] font-mono-tech shrink-0 font-semibold uppercase">
                        Click to enlarge
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selector Thumbnails Strip for Quick Switching */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {certifications.map((cert, idx) => {
              const isCur = idx === activeIndex;
              return (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`p-1.5 rounded border transition-all text-center min-h-[44px] flex flex-col items-center justify-center ${
                    isCur
                      ? 'bg-[#141418] border-[#C56A4A] text-[#C56A4A] shadow'
                      : 'bg-[#09090B] border-[#27272A] text-[#9E9A93] hover:border-[#33333C]'
                  }`}
                  aria-label={`Select certification ${idx + 1}: ${cert.title}`}
                >
                  <span className="text-[10px] font-mono-tech font-bold block">
                    0{idx + 1}
                  </span>
                  <span className="text-[9px] truncate w-full block text-[#9E9A93]">
                    {cert.issuer}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Structured Learning Narrative Panel (6 cols on Desktop) */}
        <div
          key={activeCert.id}
          className="lg:col-span-6 p-6 sm:p-7 rounded-xl bg-[#141418] border border-[#27272A] shadow-2xl space-y-6 animate-fadeIn"
          style={{ animationDuration: '300ms' }}
        >
          {/* Header info */}
          <div className="space-y-2 border-b border-[#27272A] pb-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-[#C56A4A] font-bold uppercase tracking-widest font-mono-tech">
                {activeCert.issuer}
              </span>
              <span className="text-xs text-[#9E9A93] font-mono-tech font-semibold">
                {activeCert.issueDate || activeCert.date || activeCert.year}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F4F4F6] tracking-tight font-heading">
              {activeCert.title}
            </h3>
            {activeCert.category && (
              <p className="text-xs text-[#9E9A93] font-mono-tech">{activeCert.category}</p>
            )}
          </div>

          {/* 1. WHAT I LEARNED */}
          {activeCert.whatILearned && activeCert.whatILearned.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#C56A4A] font-semibold text-xs uppercase tracking-widest font-mono-tech">
                <BookOpen className="w-4 h-4 text-[#C56A4A]" />
                <span>WHAT I LEARNED</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#F4F4F6] leading-relaxed">
                {activeCert.whatILearned.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#C56A4A] font-mono-tech font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 2. WHY IT MATTERS */}
          {activeCert.whyItMatters && (
            <div className="space-y-2 bg-[#09090B] p-4 rounded-lg border border-[#27272A]">
              <div className="flex items-center gap-2 text-[#C56A4A] font-semibold text-xs uppercase tracking-widest font-mono-tech">
                <Lightbulb className="w-4 h-4 text-[#C56A4A]" />
                <span>WHY IT MATTERS</span>
              </div>
              <p className="text-xs sm:text-sm text-[#9E9A93] leading-relaxed">
                {activeCert.whyItMatters}
              </p>
            </div>
          )}

          {/* 3. WHERE I APPLIED IT (CONDITIONAL: Hide if not verified) */}
          {activeCert.whereIApplied && (
            <div className="space-y-2 bg-[#09090B] p-4 rounded-lg border border-[#27272A]">
              <div className="flex items-center gap-2 text-[#C56A4A] font-semibold text-xs uppercase tracking-widest font-mono-tech">
                <Target className="w-4 h-4 text-[#C56A4A]" />
                <span>WHERE I APPLIED IT</span>
              </div>
              <p className="text-xs sm:text-sm text-[#9E9A93] leading-relaxed">
                {activeCert.whereIApplied}
              </p>
            </div>
          )}

          {/* 4. RELATED SKILLS (CONDITIONAL: Render only if present) */}
          {activeCert.relatedSkills && activeCert.relatedSkills.length > 0 && (
            <div className="pt-2 border-t border-[#27272A] space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-[#9E9A93] uppercase tracking-widest font-mono-tech">
                <Code2 className="w-3.5 h-3.5 text-[#C56A4A]" />
                <span>CONNECTED SKILLS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeCert.relatedSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2.5 py-1 rounded bg-[#09090B] border border-[#27272A] text-[#F4F4F6] text-xs font-mono-tech"
                  >
                    {SKILL_NAME_MAP[sk] || sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 5. RELATED PROJECTS (CONDITIONAL: Render only if present) */}
          {activeCert.relatedProjects && activeCert.relatedProjects.length > 0 && (
            <div className="pt-2 border-t border-[#27272A] space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-[#9E9A93] uppercase tracking-widest font-mono-tech">
                <FolderGit2 className="w-3.5 h-3.5 text-[#C56A4A]" />
                <span>APPLIED IN PROJECTS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeCert.relatedProjects.map((projId) => (
                  <span
                    key={projId}
                    className="px-3 py-1 rounded bg-[#09090B] border border-[#C56A4A]/40 text-[#C56A4A] text-xs font-mono-tech font-bold"
                  >
                    {PROJECT_NAME_MAP[projId] || projId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 6. CREDENTIAL / VERIFICATION URL (CONDITIONAL) */}
          {activeCert.verificationUrl && (
            <div className="pt-3 border-t border-[#27272A]">
              <a
                href={activeCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#09090B] border border-[#C56A4A]/50 text-[#C56A4A] hover:border-[#C56A4A] text-xs font-mono-tech font-bold transition-all min-h-[44px]"
              >
                <span>VERIFY CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Enlarged Inspection */}
      <CertificateLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={activeCert.title}
        issuer={activeCert.issuer}
        date={activeCert.issueDate || activeCert.date || activeCert.year}
        image={activeCert.image}
        verificationUrl={activeCert.verificationUrl}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrevNext={certifications.length > 1}
        currentIndex={activeIndex}
        totalCount={certifications.length}
      />
    </div>
  );
};
