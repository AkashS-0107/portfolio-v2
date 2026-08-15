import React from 'react';
import { Cpu, Code2, GraduationCap, Compass } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { TubelightEffect } from '../ui/TubelightEffect';

export const About: React.FC = () => {
  const { about } = portfolioData;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272A] relative bg-[#09090B]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header with Tubelight Electrical Ignition Reveal */}
        <TubelightEffect className="p-5 rounded bg-[#141418] border border-[#27272A] shadow-xl">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F4F6] uppercase font-heading">
              ABOUT ME
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C56A4A]/50 to-transparent flex-1 ml-4 hidden sm:block" />
          </div>
        </TubelightEffect>

        {/* Editorial Pillars Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Statement Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 rounded bg-[#141418] border border-[#27272A] hover:border-[#33333C] transition-all space-y-4">
              <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                <h3 className="text-base font-semibold text-[#F4F4F6] flex items-center gap-2.5 font-heading">
                  <Compass className="w-4 h-4 text-[#C56A4A]" />
                  <span>OVERVIEW & BACKGROUND</span>
                </h3>
                <span className="font-mono-tech text-[10px] text-[#C56A4A] bg-[#09090B] px-2 py-0.5 rounded border border-[#27272A]">
                  Overview
                </span>
              </div>
              <p className="editorial-dropcap font-body text-[#F4F4F6] leading-relaxed text-base sm:text-lg font-normal">
                {about.shortIntro}
              </p>
              {about.professionalFocus && (
                <p className="text-[#9E9A93] leading-relaxed text-sm pt-4 border-t border-[#27272A] font-body">
                  {about.professionalFocus}
                </p>
              )}
            </div>

            {/* AI/ML Direction */}
            {about.aiMlDirection && (
              <div className="p-7 rounded bg-[#141418] border-l-2 border-[#C56A4A] border-y border-r border-[#27272A] space-y-3">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded bg-[#09090B] text-[#C56A4A] border border-[#27272A] shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading text-xs font-bold text-[#C56A4A] tracking-wider uppercase">
                        AI / ML & Prompt Engineering
                      </h4>
                    </div>
                    <p className="text-[#9E9A93] text-sm leading-relaxed font-body">
                      {about.aiMlDirection}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Secondary Pillars Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Development Focus */}
            {about.developmentFocus && (
              <div className="p-6 rounded bg-[#141418] border border-[#27272A] space-y-3">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <div className="flex items-center gap-2.5">
                    <Code2 className="w-4 h-4 text-[#C56A4A]" />
                    <h4 className="font-heading text-xs font-bold text-[#F4F4F6] tracking-wider uppercase">
                      Full-Stack Development
                    </h4>
                  </div>
                </div>
                <p className="text-[#9E9A93] text-sm leading-relaxed font-body">
                  {about.developmentFocus}
                </p>
              </div>
            )}

            {/* Learning & Systems Focus */}
            {about.learningBuildingFocus && (
              <div className="p-6 rounded bg-[#141418] border border-[#27272A] space-y-3">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#C56A4A]" />
                    <h4 className="font-heading text-xs font-bold text-[#F4F4F6] tracking-wider uppercase">
                      Systems & Fundamentals
                    </h4>
                  </div>
                </div>
                <p className="text-[#9E9A93] text-sm leading-relaxed font-body">
                  {about.learningBuildingFocus}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

