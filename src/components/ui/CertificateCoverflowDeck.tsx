import React, { useState, useCallback } from 'react';
import {
  BookOpen,
  Lightbulb,
  Target,
  Code2,
  ExternalLink,
  FolderGit2,
  Layers,
  Award,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { FanDeckCarousel, type FanDeckSlide } from './FanDeckCarousel';
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

export const CertificateCoverflowDeck: React.FC = () => {
  const { certifications } = portfolioData;
  const [centerIndex, setCenterIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Single Canonical Active Certificate State derived directly from centerIndex
  const activeCert = certifications[centerIndex] || certifications[0];

  // Map existing certification dataset to FanDeckSlide format
  const slides: FanDeckSlide[] = certifications.map((cert) => ({
    id: cert.id,
    image: cert.image || '',
    alt: `Official certificate document for ${cert.title} issued by ${cert.issuer}`,
    title: cert.title,
    issuer: cert.issuer,
    date: cert.issueDate || cert.date || cert.year,
    category: cert.category,
    badge: cert.status,
  }));

  const handlePrev = useCallback(() => {
    setCenterIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
  }, [certifications.length]);

  const handleNext = useCallback(() => {
    setCenterIndex((prev) => (prev + 1) % certifications.length);
  }, [certifications.length]);

  return (
    <div className="space-y-6 font-sans">
      {/* Upper Control & Section Counter Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#27272A] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#141418] border border-[#27272A] text-[#C56A4A]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F6] uppercase tracking-wider font-heading">
              CERTIFICATE FAN-DECK ARCHIVE
            </h3>
            <span className="text-[#9E9A93] text-xs font-body">
              Physical document deck & verified learning story
            </span>
          </div>
        </div>

        {/* Counter in Natural Numbering (1 of 5 Format) derived strictly from centerIndex */}
        <div className="px-3.5 py-1.5 rounded bg-[#141418] border border-[#27272A] text-[#C56A4A] text-xs font-mono-tech font-bold">
          {centerIndex + 1} of {certifications.length}
        </div>
      </div>

      {/* Main Two-Column Layout (LEFT: Fan Deck Stage, RIGHT: Learning Narrative Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: GSAP Certificate Fan Deck Stage (6 cols on Desktop) */}
        <div className="lg:col-span-6 space-y-4">
          <FanDeckCarousel
            slides={slides}
            centerIndex={centerIndex}
            onCenterIndexChange={setCenterIndex}
            onActiveSlideClick={() => setIsLightboxOpen(true)}
            aspectRatio="certificate"
            showCaption={false}
            showPagination={false}
            showNavigation={true}
            label="Verified credentials tactile fan deck"
          />
        </div>

        {/* RIGHT COLUMN: Structured Learning Narrative Panel (6 cols on Desktop) */}
        <div
          key={activeCert.id}
          className="lg:col-span-6 p-6 sm:p-7 rounded-xl bg-[#141418] border border-[#27272A] shadow-2xl space-y-6 animate-fadeIn"
          style={{ animationDuration: '300ms' }}
        >
          {/* Header Info */}
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

          {/* 3. WHERE I APPLIED IT */}
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

          {/* 4. CONNECTED SKILLS */}
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

          {/* 5. RELATED PROJECTS */}
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

          {/* 6. INSPECT & VERIFY CTAS */}
          <div className="pt-3 border-t border-[#27272A] flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#C56A4A] text-[#09090B] hover:bg-[#E08A68] text-xs font-mono-tech font-bold transition-all min-h-[44px]"
            >
              <Award className="w-4 h-4" />
              <span>INSPECT FULL CERTIFICATE</span>
            </button>

            {activeCert.verificationUrl && (
              <a
                href={activeCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#09090B] border border-[#C56A4A]/50 text-[#C56A4A] hover:border-[#C56A4A] text-xs font-mono-tech font-bold transition-all min-h-[44px]"
              >
                <span>VERIFY CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen Inspection */}
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
        currentIndex={centerIndex}
        totalCount={certifications.length}
      />
    </div>
  );
};
