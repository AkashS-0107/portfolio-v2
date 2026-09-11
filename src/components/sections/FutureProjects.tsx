import React from 'react';
import { Compass, Sparkles, AlertCircle, Cpu, FileCode2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import type { FutureProject } from '../../types/portfolio';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionTransitionLine } from '../ui/SectionTransitionLine';

const statusBadgeStyles: Record<
  FutureProject['plannedStatus'],
  { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
> = {
  PLANNED: {
    label: 'PLANNED',
    bg: 'bg-[#141418]',
    text: 'text-[#D97706]',
    border: 'border-[#D97706]/40',
    icon: <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />,
  },
  RESEARCHING: {
    label: 'RESEARCHING',
    bg: 'bg-[#141418]',
    text: 'text-[#8B5CF6]',
    border: 'border-[#8B5CF6]/40',
    icon: <Compass className="w-3.5 h-3.5 text-[#8B5CF6] animate-spin" style={{ animationDuration: '6s' }} />,
  },
  UPCOMING: {
    label: 'UPCOMING',
    bg: 'bg-[#141418]',
    text: 'text-[#3B82F6]',
    border: 'border-[#3B82F6]/40',
    icon: <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" />,
  },
};

export const FutureProjects: React.FC = () => {
  const futureProjects = portfolioData.futureProjects || [];

  return (
    <section
      id="future-projects"
      data-trig
      data-trig-var="true"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] relative scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <SectionTransitionLine
          title="Future Projects"
          action={
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#141418] border border-[#27272A] text-[#9E9A93] font-mono-tech text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C56A4A]" />
              <span>PLANNED ROADMAP & CONCEPTS</span>
            </div>
          }
        />

        {/* Informational Banner */}
        <div className="p-4 rounded bg-[#141418] border-l-2 border-[#C56A4A] border-y border-r border-[#27272A] text-[#9E9A93] font-mono-tech text-xs leading-relaxed flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#C56A4A] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#F4F4F6] block mb-0.5">FUTURE PORTFOLIO ROADMAP</strong>
            <span>
              The projects below represent Akash&apos;s upcoming technical roadmap and conceptual project extensions. These items represent future planned initiatives, clearly distinguished from completed deliverables.
            </span>
          </div>
        </div>

        {/* Future Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureProjects.map((project, idx) => {
            const badge = statusBadgeStyles[project.plannedStatus];

            return (
              <ScrollReveal
                key={project.id}
                variant="fade-up"
                staggerIndex={idx}
                staggerStep={80}
                delay={120}
              >
                <div className="flex flex-col justify-between h-full p-6 rounded bg-[#141418] border border-[#27272A] card-elevation-hover transition-all group shadow-xl relative overflow-hidden">
                  {/* Subtle diagonal background accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C56A4A]/5 to-transparent pointer-events-none" />

                  <div>
                    {/* Header: Category & Planned Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono-tech text-[11px] text-[#C56A4A] font-semibold tracking-widest uppercase bg-[#09090B] px-2.5 py-0.5 rounded border border-[#27272A]">
                        {project.category}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-mono-tech text-[10px] font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg font-bold font-heading text-[#F4F4F6] tracking-tight mb-1 group-hover:text-[#C56A4A] transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="font-mono-tech text-xs text-[#C56A4A] font-medium mb-3">
                        {project.subtitle}
                      </p>
                    )}

                    {/* Intended Purpose */}
                    <div className="mb-4 p-3 rounded bg-[#09090B] border border-[#27272A] space-y-1">
                      <span className="font-mono-tech text-[10px] text-[#C56A4A] uppercase font-bold tracking-wider block">
                        INTENDED PURPOSE:
                      </span>
                      <p className="text-[#9E9A93] text-xs font-body leading-relaxed">
                        {project.intendedPurpose}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-[#9E9A93] text-xs sm:text-sm leading-relaxed mb-4 font-body">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-[#09090B] border border-[#27272A] text-[#F4F4F6] font-mono-tech text-[11px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Info: Timeline & Provenance */}
                  <div className="pt-4 border-t border-[#27272A] space-y-2">
                    {project.timeline && (
                      <div className="flex items-center justify-between text-xs font-mono-tech">
                        <span className="text-[#9E9A93]">PLANNED TIMELINE:</span>
                        <span className="text-[#F4F4F6] font-semibold bg-[#09090B] px-2 py-0.5 rounded border border-[#27272A]">
                          {project.timeline}
                        </span>
                      </div>
                    )}
                    {project.provenanceNote && (
                      <p className="text-[10px] font-mono-tech text-[#9E9A93]/80 italic flex items-center gap-1.5">
                        <FileCode2 className="w-3 h-3 text-[#C56A4A] shrink-0" />
                        <span>{project.provenanceNote}</span>
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
