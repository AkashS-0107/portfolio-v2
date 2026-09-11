import React, { useState } from 'react';
import { Calendar, CheckCircle, Building2, Award, FileCheck, Eye, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { CareerTimeline } from '../ui/CareerTimeline';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionTransitionLine } from '../ui/SectionTransitionLine';
import { CertificateLightboxModal } from '../ui/CertificateLightboxModal';

interface LightboxState {
  isOpen: boolean;
  title: string;
  issuer: string;
  date?: string;
  image?: string;
}

export const Internships: React.FC = () => {
  const { internships } = portfolioData;

  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isOpen: false,
    title: '',
    issuer: '',
  });

  const openLightbox = (title: string, issuer: string, date?: string, image?: string) => {
    if (!image) return;
    setLightboxState({
      isOpen: true,
      title,
      issuer,
      date,
      image,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section
      id="internships"
      data-trig
      data-trig-var="true"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] relative scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header with SectionTransitionLine */}
        <SectionTransitionLine title="Experience" />

        {/* Newspaper Ledger Engineering Timeline with Living Draw Line */}
        <div className="relative ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {/* Timeline Background Track & Living Copper Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#27272A] rounded-full overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#C56A4A] via-[#C56A4A] to-[#E08A68] transition-all duration-150 rounded-full"
              style={{ height: 'calc(var(--trig, 0.4) * 100%)' }}
            />
          </div>

          {internships.map((internship, idx) => (
            <ScrollReveal
              key={internship.id}
              variant="slide-left"
              staggerIndex={idx}
              staggerStep={100}
              delay={100}
            >
              <div className="relative group">
                {/* Monospaced Timeline Node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-5 h-5 rounded bg-[#09090B] border border-[#C56A4A] flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C56A4A] animate-pulse" />
                </div>

                {/* Internship Ledger Card */}
                <div className="p-7 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A]/50 transition-all shadow-xl space-y-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#27272A] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[#C56A4A] font-mono-tech text-xs font-bold uppercase tracking-widest">
                        <Building2 className="w-4 h-4 text-[#C56A4A]" />
                        <span>{internship.organization || internship.company}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F4F4F6] tracking-tight">
                        {internship.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-mono-tech text-xs font-bold uppercase">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>COMPLETED</span>
                      </span>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#09090B] border border-[#27272A] text-[#9E9A93] font-mono-tech text-xs font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#C56A4A]" />
                        <span>
                          {internship.startDate} — {internship.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#9E9A93] text-sm leading-relaxed font-body">{internship.description}</p>

                  {/* Document Credential Details & Registration Badges */}
                  {(internship.certificateId || (internship.registrationDetails && internship.registrationDetails.length > 0)) && (
                    <div className="p-3 rounded bg-[#09090B] border border-[#27272A] space-y-2 font-mono-tech text-xs">
                      {internship.certificateId && (
                        <div className="flex items-center justify-between text-[#C56A4A]">
                          <span className="font-bold uppercase tracking-wider">VERIFIED CERTIFICATE ID:</span>
                          <span className="text-[#F4F4F6] font-semibold bg-[#141418] px-2 py-0.5 rounded border border-[#27272A]">
                            {internship.certificateId}
                          </span>
                        </div>
                      )}
                      {internship.registrationDetails && (
                        <div className="flex flex-wrap gap-2 pt-1 border-t border-[#27272A]/60">
                          {internship.registrationDetails.map((detail, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-2 py-0.5 rounded bg-[#141418] border border-[#27272A] text-[#9E9A93] text-[11px]"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Certificate & LOR Evidence Action Triggers */}
                  {(internship.certificateImage || internship.lorImage) && (
                    <div className="pt-2 border-t border-[#27272A] space-y-3 font-mono-tech">
                      <h4 className="text-xs font-bold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#C56A4A]" />
                        <span>VERIFIED CREDENTIAL DOCUMENTS</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {internship.certificateImage && (
                          <div className="p-3 rounded bg-[#09090B] border border-[#27272A] flex flex-col justify-between space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#F4F4F6] flex items-center gap-2">
                                <Award className="w-4 h-4 text-[#C56A4A]" />
                                Completion Certificate
                              </span>
                              <span className="text-[10px] text-[#10B981] font-mono-tech border border-[#10B981]/30 px-1.5 py-0.5 rounded bg-[#10B981]/10">
                                VERIFIED
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                openLightbox(
                                  `${internship.organization} — Completion Certificate`,
                                  internship.organization,
                                  `${internship.startDate} — ${internship.endDate}`,
                                  internship.certificateImage
                                )
                              }
                              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] text-[#C56A4A] hover:text-[#E08A68] text-xs font-mono-tech font-bold transition-all min-h-[44px]"
                              aria-label={`View ${internship.organization} Completion Certificate`}
                            >
                              <Eye className="w-4 h-4" />
                              <span>VIEW COMPLETION CERTIFICATE</span>
                            </button>
                          </div>
                        )}

                        {internship.lorImage && (
                          <div className="p-3 rounded bg-[#09090B] border border-[#27272A] flex flex-col justify-between space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#F4F4F6] flex items-center gap-2">
                                <FileCheck className="w-4 h-4 text-[#C56A4A]" />
                                Letter of Recommendation (LOR)
                              </span>
                              <span className="text-[10px] text-[#10B981] font-mono-tech border border-[#10B981]/30 px-1.5 py-0.5 rounded bg-[#10B981]/10">
                                OFFICIAL LOR
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                openLightbox(
                                  `${internship.organization} — Letter of Recommendation (LOR)`,
                                  internship.organization,
                                  `${internship.startDate} — ${internship.endDate}`,
                                  internship.lorImage
                                )
                              }
                              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] text-[#C56A4A] hover:text-[#E08A68] text-xs font-mono-tech font-bold transition-all min-h-[44px]"
                              aria-label={`View ${internship.organization} Letter of Recommendation`}
                            >
                              <Eye className="w-4 h-4" />
                              <span>VIEW LOR DOCUMENT</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities & Deliverables grid */}
                  {internship.responsibilities && internship.responsibilities.length > 0 && (
                    <div className="pt-4 border-t border-[#27272A] space-y-3 font-mono-tech">
                      <h4 className="text-xs font-bold text-[#C56A4A] uppercase tracking-widest flex items-center gap-2">
                        <span>DELIVERABLES & RESPONSIBILITIES</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {internship.responsibilities.map((resp, respIdx) => (
                          <div key={respIdx} className="flex items-start gap-2.5 text-xs text-[#F4F4F6] bg-[#09090B] p-2.5 rounded border border-[#27272A]">
                            <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                            <span className="font-body leading-relaxed">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Career & Learning Timeline */}
        <ScrollReveal variant="fade-up" delay={200}>
          <CareerTimeline />
        </ScrollReveal>
      </div>

      {/* Lightbox Modal for Internship Documents (Certificate & LOR) */}
      <CertificateLightboxModal
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        title={lightboxState.title}
        issuer={lightboxState.issuer}
        date={lightboxState.date}
        image={lightboxState.image}
      />
    </section>
  );
};


