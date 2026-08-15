import React from 'react';
import { Calendar, CheckCircle, Building2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { CareerTimeline } from '../ui/CareerTimeline';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionTransitionLine } from '../ui/SectionTransitionLine';

export const Internships: React.FC = () => {
  const { internships } = portfolioData;

  return (
    <section id="internships" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] relative scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header with SectionTransitionLine */}
        <SectionTransitionLine number="02" title="Experience" />

        {/* Newspaper Ledger Engineering Timeline */}
        <div className="relative border-l border-[#27272A] ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
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
                <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-5 h-5 rounded bg-[#09090B] border border-[#C56A4A] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C56A4A]" />
                </div>

                {/* Internship Ledger Card */}
                <div className="p-7 rounded bg-[#141418] border border-[#27272A] hover:border-[#33333C] transition-all shadow-xl space-y-4">
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

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#09090B] border border-[#27272A] text-[#9E9A93] font-mono-tech text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#C56A4A]" />
                      <span>
                        {internship.startDate} — {internship.endDate}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#9E9A93] text-sm leading-relaxed font-body">{internship.description}</p>

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
    </section>
  );
};


