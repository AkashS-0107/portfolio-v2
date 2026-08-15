import React, { useEffect } from 'react';
import { X, ExternalLink, Code, Briefcase, Award, Layers } from 'lucide-react';
import type { Skill } from '../../types/portfolio';
import { portfolioData } from '../../data/portfolioData';

interface SkillEvidenceModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const SkillEvidenceModal: React.FC<SkillEvidenceModalProps> = ({
  skill,
  isOpen,
  onClose,
  onSelectProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !skill) return null;

  const linkedProjects = portfolioData.projects.filter(
    (p) =>
      skill.relatedProjects?.includes(p.id) ||
      p.technologies.some((t) => t.toLowerCase() === skill.name.toLowerCase())
  );

  const linkedInternships = portfolioData.internships.filter(
    (i) =>
      skill.relatedInternships?.includes(i.id) ||
      i.technologies?.some((t) => t.toLowerCase() === skill.name.toLowerCase()) ||
      i.responsibilities.some((r) => r.toLowerCase().includes(skill.name.toLowerCase()))
  );

  const linkedCertifications = portfolioData.certifications.filter(
    (c) =>
      skill.relatedCertifications?.includes(c.id) ||
      c.relatedSkills?.includes(skill.id) ||
      c.title.toLowerCase().includes(skill.name.toLowerCase()) ||
      c.category?.toLowerCase().includes(skill.name.toLowerCase())
  );

  const hasEvidence =
    linkedProjects.length > 0 || linkedInternships.length > 0 || linkedCertifications.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09090B]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#09090B] border border-[#27272A] rounded shadow-2xl overflow-hidden flex flex-col my-auto text-[#F4F4F6] max-h-[85vh] animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141418] border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#09090B] border border-[#27272A] text-[#C56A4A]">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono-tech text-[10px] text-[#C56A4A] tracking-widest uppercase">
                Skill Evidence
              </span>
              <h2 id="skill-modal-title" className="text-lg font-bold font-heading text-[#F4F4F6] tracking-tight">
                {skill.name}
              </h2>
            </div>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 font-mono-tech text-xs">
          {skill.description && (
            <p className="text-[#9E9A93] text-xs font-body bg-[#141418] p-3.5 rounded border border-[#27272A] leading-relaxed">
              {skill.description}
            </p>
          )}

          {!hasEvidence ? (
            <div className="p-8 text-center bg-[#141418] rounded border border-[#27272A] text-[#9E9A93] space-y-2">
              <Layers className="w-8 h-8 text-[#9E9A93]/40 mx-auto mb-2" />
              <p className="font-semibold text-[#F4F4F6] text-sm font-heading">No linked evidence currently available.</p>
              <p className="text-xs text-[#9E9A93] font-body">
                This skill is part of Akash's active capability stack, but specific public evidence artifacts are not linked yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Linked Projects */}
              {linkedProjects.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#C56A4A] font-semibold uppercase tracking-widest border-b border-[#27272A] pb-1">
                    <Code className="w-3.5 h-3.5" />
                    <span>LINKED PROJECTS ({linkedProjects.length})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {linkedProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3.5 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A]/50 transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#F4F4F6] text-xs font-heading">{proj.title}</span>
                          <span className="text-[9px] text-[#10B981] bg-[#09090B] px-2 py-0.5 rounded border border-[#27272A]">
                            {proj.status}
                          </span>
                        </div>
                        <p className="text-[#9E9A93] font-body text-xs line-clamp-2">{proj.description}</p>
                        {onSelectProject && (
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectProject(proj.id);
                            }}
                            className="inline-flex items-center gap-1 text-[#C56A4A] hover:underline pt-1 text-[11px] min-h-[44px]"
                          >
                            <span>VIEW PROJECT EVIDENCE</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Linked Internships */}
              {linkedInternships.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#C56A4A] font-semibold uppercase tracking-widest border-b border-[#27272A] pb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>LINKED INTERNSHIP EXPOSURE ({linkedInternships.length})</span>
                  </div>

                  <div className="space-y-2">
                    {linkedInternships.map((intern) => (
                      <div
                        key={intern.id}
                        className="p-3.5 rounded bg-[#141418] border border-[#27272A] space-y-1"
                      >
                        <div className="flex items-center justify-between text-[#F4F4F6] font-semibold font-heading">
                          <span>{intern.organization}</span>
                          <span className="text-[#9E9A93] text-[10px] font-mono-tech">{intern.role}</span>
                        </div>
                        <p className="text-[#9E9A93] font-body text-xs">{intern.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Linked Certifications */}
              {linkedCertifications.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#C56A4A] font-semibold uppercase tracking-widest border-b border-[#27272A] pb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>LINKED CERTIFICATIONS ({linkedCertifications.length})</span>
                  </div>

                  <div className="space-y-2">
                    {linkedCertifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-3.5 rounded bg-[#141418] border border-[#27272A] flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-[#F4F4F6] text-xs font-heading">{cert.title}</p>
                          <p className="text-[#9E9A93] text-[10px]">{cert.issuer} • {cert.issueDate || cert.year}</p>
                        </div>
                        <span className="text-[#10B981] text-[9px] px-2 py-0.5 rounded bg-[#09090B] border border-[#27272A]">
                          VERIFIED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#141418] border-t border-[#27272A] px-6 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A] text-[#F4F4F6] font-mono-tech text-xs transition-colors min-h-[44px]"
          >
            CLOSE EVIDENCE
          </button>
        </div>
      </div>
    </div>
  );
};

