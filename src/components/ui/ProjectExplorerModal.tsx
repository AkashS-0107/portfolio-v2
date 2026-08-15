import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ShieldAlert, Code2, Layers, CheckCircle2, Eye, UserCheck, AlertTriangle, Briefcase, Wrench, Clock, Sparkles } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { GithubIcon } from './Icons';
import { ProjectGalleryLightbox } from './ProjectGalleryLightbox';
import { FanDeckCarousel } from './FanDeckCarousel';

interface ProjectExplorerModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectExplorerModal: React.FC<ProjectExplorerModalProps> = ({ project, isOpen, onClose }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryCenterIndex, setGalleryCenterIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape' && !lightboxOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxOpen, onClose]);

  if (!isOpen || !project) return null;

  const openLightboxAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const isFuturePe = project.id === 'future-pe';

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-[#09090B]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#09090B] border border-[#27272A] rounded shadow-2xl overflow-y-auto flex flex-col my-auto text-[#F4F4F6] animate-scaleIn">
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#141418] border-b border-[#27272A]">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-[#09090B] border border-[#27272A] text-[#C56A4A] font-mono-tech text-xs font-semibold uppercase">
                {project.category}
              </span>
              <h2 id="project-modal-title" className="text-lg sm:text-xl font-bold font-heading text-[#F4F4F6] tracking-tight">
                {project.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A] hover:text-[#C56A4A] text-[#9E9A93] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-8 flex-1">
            {/* Future PE Dedicated Explorer View */}
            {isFuturePe ? (
              <div className="space-y-6">
                {/* 1. OVERVIEW & INTERNSHIP CONTEXT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded bg-[#141418] border border-[#27272A] space-y-2">
                    <h3 className="font-mono-tech text-xs font-bold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C56A4A]" />
                      <span>OVERVIEW</span>
                    </h3>
                    <p className="text-sm text-[#F4F4F6] leading-relaxed font-body">
                      Future PE is an active prompt engineering project developed during the Future Interns Prompt Engineering Internship.
                    </p>
                  </div>

                  {project.internshipContext && (
                    <div className="p-5 rounded bg-[#141418] border border-[#27272A] space-y-2">
                      <h3 className="font-mono-tech text-xs font-bold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#C56A4A]" />
                        <span>INTERNSHIP</span>
                      </h3>
                      <div className="font-mono-tech text-xs space-y-1">
                        <p className="text-[#F4F4F6] font-bold text-sm">
                          {project.internshipContext.organization}
                        </p>
                        <p className="text-[#C56A4A]">
                          {project.internshipContext.role}
                        </p>
                        <p className="text-[#9E9A93]">
                          {project.internshipContext.period}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. CURRENT WORK */}
                <div className="p-5 rounded bg-[#141418] border border-[#27272A] space-y-2">
                  <h3 className="font-mono-tech text-xs font-bold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C56A4A]" />
                    <span>CURRENT WORK</span>
                  </h3>
                  <p className="text-xs text-[#9E9A93] leading-relaxed font-body">
                    The project is currently IN DEVELOPMENT, focusing on designing, optimizing, and evaluating production prompt engineering workflows across three core business deliverable tracks.
                  </p>
                </div>

                {/* 3. PROJECT TRACKS */}
                {project.workstreams && project.workstreams.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-mono-tech text-xs font-bold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#C56A4A]" />
                      <span>PROJECT TRACKS</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.workstreams.map((ws) => (
                        <div
                          key={ws.id}
                          className="p-4 rounded bg-[#141418] border border-[#27272A] space-y-2 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <span className="font-mono-tech text-xs font-bold text-[#C56A4A]">
                              {ws.number.replace(/^0/, '')}
                            </span>
                            <h4 className="font-heading text-sm font-bold text-[#F4F4F6]">
                              {ws.title}
                            </h4>
                            <p className="text-xs text-[#9E9A93] leading-relaxed font-body">
                              {ws.description}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-[#27272A] text-[10px] font-mono-tech text-[#C56A4A] uppercase">
                            Deliverable Track {ws.number.replace(/^0/, '')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. TOOLS & METHODS */}
                <div className="space-y-2">
                  <h3 className="font-mono-tech text-xs font-bold text-[#9E9A93] uppercase tracking-widest flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#C56A4A]" />
                    <span>TOOLS & METHODS</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.toolsMethods || project.technologies).map((method) => (
                      <span
                        key={method}
                        className="px-3 py-1 rounded bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-mono-tech text-xs"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. EVIDENCE */}
                <div className="p-4 rounded bg-[#141418] border border-[#27272A] space-y-2">
                  <h3 className="font-mono-tech text-xs font-bold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C56A4A]" />
                    <span>EVIDENCE</span>
                  </h3>
                  <p className="text-xs text-[#9E9A93] leading-relaxed font-body">
                    Implementation evidence will be added as the individual workstreams are completed and approved for publication.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Titan Confidentiality Notice */}
                {project.disclosureLevel === 'confidential' && (
                  <div className="p-4 rounded bg-[#141418] border-l-2 border-[#C56A4A] border-y border-r border-[#27272A] text-[#C56A4A] text-xs font-mono-tech space-y-2">
                    <div className="flex items-center gap-2 font-bold tracking-wider">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-[#C56A4A]" />
                      <span>CONFIDENTIALITY CONTROL NOTICE</span>
                    </div>
                    <p className="leading-relaxed text-[#F4F4F6] font-body text-xs">
                      {project.confidentialNotice ||
                        'Flagship project under active engineering. Administrative modules and system architecture are confidential until official release. Only approved public hero representation is displayed.'}
                    </p>
                    <div className="text-[11px] text-[#9E9A93] pt-1">
                      Further project details will be shared after completion and official approval.
                    </div>
                  </div>
                )}

                {/* InAmigos Rebuild Disclaimer Notice */}
                {project.disclaimerNotice && (
                  <div className="p-4 rounded bg-[#141418] border border-[#27272A] text-[#9E9A93] text-xs font-mono-tech space-y-2">
                    <div className="flex items-center gap-2 text-[#C56A4A] font-semibold">
                      <AlertTriangle className="w-4 h-4 text-[#C56A4A] shrink-0" />
                      <span>ORGANIZATIONAL CLAIM DISCLAIMER</span>
                    </div>
                    <p className="leading-relaxed text-[#9E9A93] font-body text-xs">{project.disclaimerNotice}</p>
                  </div>
                )}

                {/* Hero Image / Primary Preview */}
                {project.heroImage && (
                  <div className="relative rounded overflow-hidden border border-[#27272A] bg-[#141418] group">
                    <img
                      src={project.heroImage}
                      alt={`${project.title} Hero Evidence`}
                      className="w-full h-64 sm:h-80 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono-tech text-xs">
                      <span className="px-3 py-1 rounded bg-[#09090B]/90 border border-[#27272A] text-[#F4F4F6]">
                        APPROVED PUBLIC VISUAL EVIDENCE
                      </span>
                      {project.evidenceImages && project.evidenceImages.length > 0 && (
                        <button
                          type="button"
                          onClick={() => openLightboxAt(0)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#C56A4A] text-[#09090B] font-semibold hover:bg-[#E08A68] transition-colors shadow min-h-[44px]"
                        >
                          <Eye className="w-4 h-4" />
                          <span>FULLSCREEN GALLERY</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Evidence Image Fan Deck Gallery */}
                {project.evidenceImages && project.evidenceImages.length > 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
                      <h3 className="font-mono-tech text-xs font-semibold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span>PROJECT EVIDENCE FAN DECK ({project.evidenceImages.length} SCREENSHOTS)</span>
                      </h3>
                      <span className="text-[#9E9A93] text-xs font-mono-tech">Drag / Swipe to browse • Click to inspect</span>
                    </div>

                    <FanDeckCarousel
                      slides={project.evidenceImages.map((img, idx) => ({
                        id: img.title + idx,
                        image: img.url,
                        alt: img.title,
                        title: img.title,
                        badge: img.type ? img.type.toUpperCase() : undefined,
                        subtitle: img.description,
                      }))}
                      centerIndex={galleryCenterIndex}
                      onCenterIndexChange={setGalleryCenterIndex}
                      onActiveSlideClick={(_, idx) => openLightboxAt(idx)}
                      aspectRatio="video"
                      showCaption={true}
                      showPagination={true}
                      showNavigation={true}
                      label={`${project.title} screenshot evidence fan deck`}
                    />
                  </div>
                )}

                {/* Core Architectural Details (What is it, Why built, What Akash did) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.whatIsIt && (
                    <div className="p-4 rounded bg-[#141418] border border-[#27272A] space-y-2">
                      <p className="font-mono-tech text-xs font-bold text-[#C56A4A] uppercase tracking-widest">WHAT IS IT?</p>
                      <p className="text-xs text-[#9E9A93] leading-relaxed font-body">{project.whatIsIt}</p>
                    </div>
                  )}

                  {project.whyBuilt && (
                    <div className="p-4 rounded bg-[#141418] border border-[#27272A] space-y-2">
                      <p className="font-mono-tech text-xs font-bold text-[#C56A4A] uppercase tracking-widest">WHY WAS IT BUILT?</p>
                      <p className="text-xs text-[#9E9A93] leading-relaxed font-body">{project.whyBuilt}</p>
                    </div>
                  )}

                  {project.whatAkashDid && (
                    <div className="p-4 rounded bg-[#141418] border border-[#27272A] space-y-2">
                      <p className="font-mono-tech text-xs font-bold text-[#C56A4A] uppercase tracking-widest">AKASH'S ROLE</p>
                      <p className="text-xs text-[#9E9A93] leading-relaxed font-body">{project.whatAkashDid}</p>
                    </div>
                  )}
                </div>

                {/* Contribution Breakdown */}
                {project.contribution && (
                  <div className="p-4 rounded bg-[#141418] border border-[#27272A] flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-[#C56A4A] shrink-0" />
                    <div>
                      <span className="font-mono-tech text-[10px] text-[#9E9A93] uppercase block">CONTRIBUTOR ROLE:</span>
                      <span className="font-heading text-sm font-semibold text-[#F4F4F6]">{project.contribution}</span>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="font-mono-tech text-xs font-bold text-[#9E9A93] uppercase tracking-widest">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded bg-[#141418] border border-[#27272A] text-[#F4F4F6] font-mono-tech text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Repositories with explicit contributor distinction (Akash vs Kevin) */}
                {project.repositoriesList && project.repositoriesList.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-[#27272A]">
                    <h4 className="font-mono-tech text-xs font-semibold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      <span>VERIFIED REPOSITORIES & ATTRIBUTION</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.repositoriesList.map((repo) => (
                        <div
                          key={repo.url}
                          className="p-4 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A]/40 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono-tech text-xs text-[#9E9A93] uppercase font-semibold">{repo.label}</span>
                            <span className="px-2 py-0.5 rounded bg-[#09090B] border border-[#27272A] text-[#C56A4A] font-mono-tech text-[10px]">
                              {repo.type}
                            </span>
                          </div>

                          <div className="font-mono-tech text-xs space-y-0.5">
                            <p className="text-[#F4F4F6] font-bold">Contributor: {repo.author}</p>
                            <p className="text-[#9E9A93] text-[11px] font-body">{repo.role}</p>
                          </div>

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#C56A4A] hover:underline pt-2 transition-colors min-h-[44px]"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>OPEN REPOSITORY</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Bar */}
          <div className="sticky bottom-0 bg-[#141418] border-t border-[#27272A] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#9E9A93]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Disclosure Level: {project.disclosureLevel?.toUpperCase() || 'PUBLIC'}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A] text-[#F4F4F6] font-mono-tech text-xs transition-colors min-h-[44px]"
            >
              CLOSE EXPLORER
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox for screenshots */}
      {project.evidenceImages && (
        <ProjectGalleryLightbox
          images={project.evidenceImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </>
  );
};

