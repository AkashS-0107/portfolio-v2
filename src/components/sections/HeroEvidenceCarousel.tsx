import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, Lock, Clock } from 'lucide-react';

// Asset Imports for Evidence
import titanHeroImg from '../../assets/images/titan/titan hero.png';
import worksureHeroImg from '../../assets/images/worksure/hero.png';
import worksureEmployerImg from '../../assets/images/worksure/employer login.png';
import worksureEmployeeImg from '../../assets/images/worksure/worker login.png';
import inamigos1Img from '../../assets/images/inamigos/Screenshot 2026-08-06 224851.png';
import inamigos2Img from '../../assets/images/inamigos/Screenshot 2026-08-06 224901.png';
import inamigos3Img from '../../assets/images/inamigos/Screenshot 2026-08-06 224924.png';
import awsFoundationsCertImg from '../../assets/images/certificate/foundations of prompt engineering.png';
import awsEssentialsCertImg from '../../assets/images/certificate/aws essentials prompt engineering.png';
import mongodbCertImg from '../../assets/images/certificate/mongodb.png';
import ibmCertImg from '../../assets/images/certificate/ibm skillsbuild.png';

interface CarouselCard {
  id: string;
  badge: string;
  status: 'FLAGSHIP' | 'COMPLETED' | 'CREDENTIALS' | 'IN DEVELOPMENT';
  title: string;
  subtitle: string;
  description: string;
  mainImage?: string;
  secondaryImages?: string[];
  links?: Array<{
    label: string;
    url: string;
    author?: string;
  }>;
  isConfidential?: boolean;
  confidentialNotice?: string;
  isEditorialPreview?: boolean;
  tracks?: string[];
  targetSectionId: string;
}

export const HeroEvidenceCarousel: React.FC = () => {
  const cards: CarouselCard[] = [
    {
      id: 'titan',
      badge: '01 — FLAGSHIP PROJECT',
      status: 'FLAGSHIP',
      title: 'Titan Fitness Club',
      subtitle: 'Full-Stack Architecture & Frontend Engineering',
      description:
        'Flagship full-stack fitness management platform under active engineering and development.',
      mainImage: titanHeroImg,
      isConfidential: true,
      confidentialNotice:
        'Approved public hero visual representation. Administrative modules and internal architecture remain confidential.',
      targetSectionId: 'projects',
    },
    {
      id: 'worksure',
      badge: '02 — VERIFIED WORK',
      status: 'COMPLETED',
      title: 'WorkSure',
      subtitle: 'UI/UX Revamp & Frontend Architecture',
      description:
        'Task assurance web platform with dedicated employer and worker portals for real-time task management.',
      mainImage: worksureHeroImg,
      secondaryImages: [worksureEmployerImg, worksureEmployeeImg],
      links: [
        {
          label: 'Frontend Repo (Akash Suresh)',
          url: 'https://github.com/AkashS-0107/worksure-2.0',
          author: 'Akash Suresh',
        },
        {
          label: 'Backend Repo (Kevin)',
          url: 'https://github.com/Kevin-1702-git/worksure',
          author: 'Kevin',
        },
      ],
      targetSectionId: 'projects',
    },
    {
      id: 'inamigos',
      badge: '03 — WEBSITE REBUILD',
      status: 'COMPLETED',
      title: 'InAmigos Foundation',
      subtitle: 'UI/UX & Web Development Rebuild',
      description:
        'Comprehensive website rebuild for InAmigos Foundation built with React, TypeScript, and AI-assisted workflows.',
      mainImage: inamigos1Img,
      secondaryImages: [inamigos2Img, inamigos3Img],
      links: [
        {
          label: 'InAmigos Rebuild Repo (Akash Suresh)',
          url: 'https://github.com/AkashS-0107/inamigos-foundation',
          author: 'Akash Suresh',
        },
      ],
      targetSectionId: 'projects',
    },
    {
      id: 'future-pe',
      badge: '04 — INTERNSHIP PROJECT',
      status: 'IN DEVELOPMENT',
      title: 'Future PE',
      subtitle: 'Prompt Engineering Internship',
      description:
        'Active prompt engineering project developed during the Future Interns Prompt Engineering Internship.',
      isEditorialPreview: true,
      tracks: [
        'AI Website Generation',
        'UGC Content Marketing',
        'SEO Content Clusters',
      ],
      targetSectionId: 'projects',
    },
    {
      id: 'credentials',
      badge: '05 — CERTIFICATIONS & ACHIEVEMENTS',
      status: 'CREDENTIALS',
      title: 'Certifications & Hackathons',
      subtitle: 'AWS, MongoDB, IBM SkillsBuild, NPTEL & Hackathons',
      description:
        'Verified professional certifications in AI prompt engineering, database architecture, operating systems, and hackathon achievements.',
      mainImage: awsFoundationsCertImg,
      secondaryImages: [awsEssentialsCertImg, mongodbCertImg, ibmCertImg],
      links: [
        {
          label: 'View All Credentials',
          url: '#certifications-hackathons',
        },
      ],
      targetSectionId: 'certifications-hackathons',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevCard = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  // Auto-advance every 6.5 seconds (Section 06 requirement)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextCard();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextCard]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextCard();
      } else {
        prevCard();
      }
    }
    touchStartX.current = null;
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextCard();
    } else if (e.key === 'ArrowLeft') {
      prevCard();
    }
  };

  const activeCard = cards[currentIndex];

  return (
    <div
      className="w-full max-w-6xl mx-auto mt-12 sm:mt-16 text-left"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Portfolio Evidence Carousel"
    >
      {/* Editorial Header bar above evidence stage */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#27272A]/60">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C56A4A]" />
          <span className="font-heading text-xs font-semibold tracking-widest text-[#C56A4A] uppercase">
            {activeCard.badge}
          </span>
        </div>

        {/* State controls: 01 02 03 04 */}
        <div className="flex items-center gap-2">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`px-2.5 py-1 rounded text-xs font-mono-tech transition-all ${
                currentIndex === idx
                  ? 'bg-[#C56A4A] text-[#09090B] font-bold shadow-sm'
                  : 'bg-[#141418] text-[#9E9A93] hover:text-[#F4F4F6] border border-[#27272A]'
              }`}
              aria-label={`Go to evidence slide ${idx + 1}`}
            >
              0{idx + 1}
            </button>
          ))}

          <div className="flex items-center gap-1 ml-2">
            <button
              type="button"
              onClick={prevCard}
              className="p-1.5 rounded bg-[#141418] border border-[#27272A] text-[#9E9A93] hover:text-[#F4F4F6] hover:border-[#C56A4A] transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextCard}
              className="p-1.5 rounded bg-[#141418] border border-[#27272A] text-[#9E9A93] hover:text-[#F4F4F6] hover:border-[#C56A4A] transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Evidence Display Stage */}
      <div
        className="mt-6 rounded-2xl bg-[#141418] border border-[#27272A] overflow-hidden shadow-2xl transition-all group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left / Top Visual Stage (7 Cols on desktop) */}
          <div className="lg:col-span-7 relative bg-[#09090B] overflow-hidden min-h-[260px] sm:min-h-[340px] flex items-center justify-center p-4 sm:p-6">
            {activeCard.isEditorialPreview ? (
              <div className="relative w-full h-full rounded-lg border border-[#27272A] bg-[#141418] p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-[#27272A] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C56A4A] animate-pulse" />
                    <span className="font-mono-tech text-xs text-[#C56A4A] uppercase font-bold tracking-wider">
                      Future Interns — Internship Project
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#09090B] border border-[#C56A4A]/40 text-[#C56A4A] font-mono-tech text-[10px] font-bold uppercase">
                    <Clock className="w-3 h-3 animate-pulse text-[#C56A4A]" />
                    <span>IN DEVELOPMENT</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono-tech text-[10px] text-[#9E9A93] tracking-widest uppercase">
                    EDITORIAL PROJECT PREVIEW
                  </span>
                  <h4 className="font-heading text-2xl sm:text-3xl font-bold text-[#F4F4F6] tracking-tight">
                    {activeCard.title}
                  </h4>
                  <p className="font-mono-tech text-xs text-[#C56A4A] font-medium">
                    {activeCard.subtitle} • July 30, 2026 — August 30, 2026
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono-tech text-[10px] text-[#9E9A93] uppercase tracking-wider block">
                    CONFIRMED DELIVERABLE TRACKS:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {activeCard.tracks?.map((track, i) => (
                      <div
                        key={track}
                        className="flex items-center gap-2.5 p-2 rounded bg-[#09090B] border border-[#27272A] text-xs font-mono-tech text-[#F4F4F6]"
                      >
                        <span className="text-[#C56A4A] font-bold">0{i + 1}</span>
                        <span>{track}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#09090B] border border-[#27272A] text-[11px] font-mono-tech text-[#9E9A93] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C56A4A] shrink-0" />
                  <span>CURRENTLY BEING DEVELOPED — Evidence will be published upon deliverable completion.</span>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#27272A]/50 bg-[#09090B] flex items-center justify-center">
                {activeCard.mainImage && (
                  <img
                    src={activeCard.mainImage}
                    alt={`${activeCard.title} Visual Evidence`}
                    className="w-full h-auto max-h-[380px] object-cover object-top rounded-lg group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                )}

                {/* Confidential Badge if applicable */}
                {activeCard.isConfidential && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#09090B]/90 backdrop-blur-md border border-[#C56A4A]/50 text-[#C56A4A] text-[11px] font-mono-tech tracking-wider uppercase shadow-lg">
                    <Lock className="w-3 h-3 text-[#C56A4A]" />
                    <span>Approved Hero Representation</span>
                  </div>
                )}
              </div>
            )}

            {/* Floating Secondary Preview Thumbnails on Desktop if present */}
            {activeCard.secondaryImages && activeCard.secondaryImages.length > 0 && (
              <div className="hidden sm:flex absolute bottom-4 right-4 gap-2 z-10">
                {activeCard.secondaryImages.map((img, i) => (
                  <div
                    key={i}
                    className="w-16 h-12 rounded border border-[#27272A] overflow-hidden bg-[#09090B] shadow-lg hover:border-[#C56A4A] transition-colors"
                  >
                    <img
                      src={img}
                      alt={`${activeCard.title} preview thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right / Bottom Info Panel (5 Cols on desktop) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#27272A] bg-[#141418]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs tracking-wider text-[#C56A4A] uppercase">
                  {activeCard.status}
                </span>
                <span className="font-mono-tech text-xs text-[#9E9A93]">
                  0{currentIndex + 1} / 0{cards.length}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#F4F4F6] tracking-tight">
                  {activeCard.title}
                </h3>
                <p className="font-heading text-xs sm:text-sm text-[#C56A4A] mt-1 font-medium">
                  {activeCard.subtitle}
                </p>
              </div>

              <p className="font-body text-sm text-[#9E9A93] leading-relaxed">
                {activeCard.description}
              </p>

              {activeCard.confidentialNotice && (
                <div className="p-3 rounded bg-[#09090B] border border-[#27272A] text-xs text-[#9E9A93] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C56A4A] shrink-0 mt-0.5" />
                  <span>{activeCard.confidentialNotice}</span>
                </div>
              )}
            </div>

            {/* Links and Actions */}
            <div className="pt-6 mt-6 border-t border-[#27272A] space-y-3">
              {activeCard.links && activeCard.links.length > 0 ? (
                <div className="space-y-2">
                  {activeCard.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : '_self'}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-between w-full p-2.5 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A]/50 text-xs font-mono-tech text-[#F4F4F6] hover:text-[#C56A4A] transition-all group/link"
                    >
                      <span className="truncate">{link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#9E9A93] group-hover/link:text-[#C56A4A] shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  href={`#${activeCard.targetSectionId}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A] text-xs font-heading font-semibold text-[#F4F4F6] hover:text-[#C56A4A] tracking-wider uppercase transition-all"
                >
                  <span>View Details in Section</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
