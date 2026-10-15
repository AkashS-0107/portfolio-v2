import React, { useState } from 'react';
import { Trophy, ShieldCheck, CheckCircle2, Eye, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import type { Hackathon } from '../../types/portfolio';
import { CertificateCoverflowDeck } from '../ui/CertificateCoverflowDeck';
import { CertificateLightboxModal } from '../ui/CertificateLightboxModal';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionTransitionLine } from '../ui/SectionTransitionLine';

export const CertificationsHackathons: React.FC = () => {
  const { hackathons } = portfolioData;
  const [activeHackathonCert, setActiveHackathonCert] = useState<Hackathon | null>(null);

  return (
    <section
      id="certifications-hackathons"
      data-trig
      data-trig-var="true"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] relative scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header with SectionTransitionLine */}
        <SectionTransitionLine
          title="Credentials"
          subtitle="A collection of verified certifications and hackathon experience, with the learning story behind each one."
        />

        {/* 1. Immersive 7-Certificate Fan-Deck Experience */}
        <ScrollReveal variant="fade-up" delay={80}>
          <CertificateCoverflowDeck />
        </ScrollReveal>

        {/* 2. Hackathons & Competitions Area */}
        <ScrollReveal variant="fade-up" delay={140}>
          <div className="space-y-6 pt-10 border-t border-[#27272A]">
            <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#27272A]">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-[#C56A4A]" />
                <h3 className="text-lg font-bold text-[#F4F4F6] tracking-tight font-heading uppercase">
                  Hackathons & Competitions
                </h3>
              </div>
              <span className="text-xs text-[#9E9A93] font-mono-tech">
                Hackathon Entries ({hackathons.length})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hackathons.map((hack, idx) => (
                <ScrollReveal
                  key={hack.id}
                  variant="fade-up"
                  staggerIndex={idx}
                  staggerStep={80}
                  delay={180}
                >
                  <div className="p-6 rounded-xl bg-[#141418] border border-[#27272A] hover:border-[#33333C] transition-all space-y-5 shadow-xl h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-[#C56A4A] font-bold uppercase tracking-widest font-mono-tech">
                          Hackathon • {hack.organizer || hack.event || hack.name}
                        </span>
                        {/* Status Badge: MUST display Participant */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#09090B] border border-[#27272A] text-[#C56A4A] text-xs font-semibold font-mono-tech">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#C56A4A]" />
                          <span>{hack.status}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-[#F4F4F6] tracking-tight font-heading">
                          {hack.event || hack.name}
                        </h4>
                        <span className="text-xs text-[#9E9A93] font-mono-tech block mt-0.5">
                          {hack.date}
                        </span>
                        {hack.certificate && (
                          <p className="text-xs text-[#10B981] mt-2 flex items-center gap-1 font-mono-tech">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{hack.certificate}</span>
                          </p>
                        )}
                        {hack.description && (
                          <p className="text-xs sm:text-sm font-body text-[#9E9A93] mt-2 leading-relaxed">
                            {hack.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Visible Hackathon Certificate Image Preview */}
                    {hack.certificateImage && (
                      <div className="space-y-3 pt-3 border-t border-[#27272A]/70">
                        <div
                          onClick={() => setActiveHackathonCert(hack)}
                          className="relative rounded-lg overflow-hidden border border-[#27272A] hover:border-[#C56A4A]/60 bg-[#09090B] cursor-pointer group/cert transition-all aspect-[16/10] flex items-center justify-center shadow-inner"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setActiveHackathonCert(hack);
                            }
                          }}
                          aria-label={`View full certificate for ${hack.event || hack.name}`}
                        >
                          <img
                            src={hack.certificateImage}
                            alt={`Certificate of Participation for ${hack.event || hack.name} awarded to Akash Suresh`}
                            className="w-full h-full object-cover sm:object-contain transition-transform duration-300 group-hover/cert:scale-[1.02]"
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-[#09090B]/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#09090B]/95 border border-[#C56A4A] text-[#C56A4A] font-mono-tech text-xs font-bold shadow-lg">
                              <Eye className="w-3.5 h-3.5" />
                              <span>CLICK TO ENLARGE</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] text-[#9E9A93] uppercase font-mono-tech">
                            Participation Evidence
                          </span>
                          <div className="flex items-center gap-2">
                            {hack.projectUrl && (
                              <a
                                href={hack.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A] text-[#F4F4F6] hover:text-[#C56A4A] text-xs font-mono-tech font-semibold transition-all min-h-[44px]"
                                aria-label={`View ${hack.projectName || 'project'} repository`}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>{hack.projectName || 'PROJECT'} REPO</span>
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => setActiveHackathonCert(hack)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A] text-[#C56A4A] text-xs font-semibold font-mono-tech transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
                            >
                              <Eye className="w-4 h-4" />
                              <span>INSPECT</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox Modal for Hackathon Certificate Inspection */}
      {activeHackathonCert && activeHackathonCert.certificateImage && (
        <CertificateLightboxModal
          isOpen={!!activeHackathonCert}
          onClose={() => setActiveHackathonCert(null)}
          title={activeHackathonCert.event || activeHackathonCert.name || 'Hackathon Certificate'}
          issuer={activeHackathonCert.organizer || activeHackathonCert.event || 'Hackathon'}
          date={activeHackathonCert.date}
          image={activeHackathonCert.certificateImage}
        />
      )}
    </section>
  );
};
