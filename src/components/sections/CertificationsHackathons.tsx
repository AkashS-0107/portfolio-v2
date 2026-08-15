import React, { useState } from 'react';
import { Trophy, ShieldCheck, CheckCircle2, Eye } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import type { Hackathon } from '../../types/portfolio';
import { CertificateRoulette } from '../ui/CertificateRoulette';
import { CertificateLightboxModal } from '../ui/CertificateLightboxModal';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionTransitionLine } from '../ui/SectionTransitionLine';

export const CertificationsHackathons: React.FC = () => {
  const { hackathons } = portfolioData;
  const [activeHackathonCert, setActiveHackathonCert] = useState<Hackathon | null>(null);

  return (
    <section id="certifications-hackathons" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] relative scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header with SectionTransitionLine */}
        <SectionTransitionLine
          number="04"
          title="Credentials & Proof"
          subtitle="A collection of verified certifications and hackathon experience, with the learning story behind each one."
        />

        {/* 1. Immersive 5-Certificate Roulette Experience revealed as one visual object */}
        <ScrollReveal variant="fade-up" delay={80}>
          <CertificateRoulette />
        </ScrollReveal>

        {/* 2. Hackathons & Competitions Area (THREX Hackathon Separation) */}
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
                Hackathon Entry ({hackathons.length})
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
                  <div className="p-6 rounded-xl bg-[#141418] border border-[#27272A] hover:border-[#33333C] transition-all space-y-4 shadow-xl h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-[#C56A4A] font-bold uppercase tracking-widest font-mono-tech">
                          Hackathon • {hack.event || hack.name}
                        </span>
                        {/* Status Badge: MUST display Participant for THREX */}
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

                    {/* Hackathon Certificate Image Trigger */}
                    {hack.certificateImage && (
                      <div className="pt-3 border-t border-[#27272A]/70 flex items-center justify-between">
                        <span className="text-xs text-[#9E9A93] uppercase font-mono-tech">
                          Participation Certificate
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveHackathonCert(hack)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A] text-[#C56A4A] text-xs font-semibold font-mono-tech transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
                        >
                          <Eye className="w-4 h-4" />
                          <span>INSPECT CERTIFICATE</span>
                        </button>
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
          issuer="THREX Hackathon"
          date={activeHackathonCert.date}
          image={activeHackathonCert.certificateImage}
        />
      )}
    </section>
  );
};
