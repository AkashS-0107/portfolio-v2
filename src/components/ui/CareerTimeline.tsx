import React, { useState } from 'react';
import { Calendar, Award, Briefcase, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  year: string;
  title: string;
  subtitle: string;
  category: 'certification' | 'internship' | 'hackathon' | 'flagship';
  description: string;
  highlights: string[];
}

const timelineData: TimelineEvent[] = [
  {
    id: 'nptel-2025',
    date: '2025',
    year: '2025',
    title: 'Introduction to Operating Systems',
    subtitle: 'NPTEL / IIT Madras • Elite Certification',
    category: 'certification',
    description: 'Mastered process management, threads, memory paging, deadlocks, and low-level system execution mechanics.',
    highlights: ['Elite Certification Rank', 'Low-level CPU & Memory Paging', 'Concurrency Primitives'],
  },
  {
    id: 'ibm-jan-2026',
    date: 'Jan 2026',
    year: '2026',
    title: 'Introduction to Artificial Intelligence',
    subtitle: 'IBM SkillsBuild Certification',
    category: 'certification',
    description: 'Studied supervised/unsupervised ML models, neural network fundamentals, and ethical AI frameworks.',
    highlights: ['Theoretical AI Foundation', 'Machine Learning Models', 'AI Governance'],
  },
  {
    id: 'threx-feb-2026',
    date: 'Feb 2026',
    year: '2026',
    title: 'THREX Hackathon',
    subtitle: 'Competitive Participant',
    category: 'hackathon',
    description: 'Participated in fast-paced software development hackathon prototyping interactive web applications.',
    highlights: ['Rapid Prototyping', 'Team Execution under Time Bounds'],
  },
  {
    id: 'aws-jul-2026',
    date: 'Jul 2026',
    year: '2026',
    title: 'AWS Foundations & Essentials of Prompt Engineering',
    subtitle: 'AWS Certifications & MongoDB Basics',
    category: 'certification',
    description: 'Certified in token optimization, few-shot prompting, and structured output formatting for AI pipelines.',
    highlights: ['AWS Prompt Engineering Certs', 'MongoDB Student Certification'],
  },
  {
    id: 'future-interns-2026',
    date: 'Jul - Aug 2026',
    year: '2026',
    title: 'Prompt Engineering Intern',
    subtitle: 'Future Interns Internship',
    category: 'internship',
    description: 'Engineered AI prompt workflows, automated business web generation pipelines, and AI SEO clusters.',
    highlights: ['AI Web Generation Pipelines', 'AI Content Marketing', 'SEO Blog Automation'],
  },
  {
    id: 'inamigos-aug-2026',
    date: 'Aug 2026',
    year: '2026',
    title: 'AI Web Development Intern & Website Rebuild',
    subtitle: 'InAmigos Foundation Internship & WorkSure Launch',
    category: 'internship',
    description: 'Executed complete UI/UX rebuild for InAmigos Foundation and published WorkSure UI/UX revamp.',
    highlights: ['InAmigos Full Rebuild', 'WorkSure 2.0 UI/UX Overhaul', 'Figma & AI-Assisted Dev'],
  },
  {
    id: 'titan-flagship-2026',
    date: 'Active Roadmap',
    year: '2026+',
    title: 'Titan Fitness Club Flagship Platform',
    subtitle: 'Full-Stack Development in Progress',
    category: 'flagship',
    description: 'Active engineering and development of multi-tenant fitness management platform under confidential disclosure.',
    highlights: ['Flagship Architecture', 'React + Node.js + SQL', 'Confidential Public Hero'],
  },
];

const categoryIcons = {
  certification: <Award className="w-4 h-4 text-[#C56A4A]" />,
  internship: <Briefcase className="w-4 h-4 text-[#C56A4A]" />,
  hackathon: <Trophy className="w-4 h-4 text-[#C56A4A]" />,
  flagship: <Sparkles className="w-4 h-4 text-[#C56A4A]" />,
};

export const CareerTimeline: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(timelineData[timelineData.length - 2].id);

  const selectedEvent = timelineData.find((e) => e.id === selectedId) || timelineData[0];

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
        <div>
          <span className="font-mono-tech text-xs text-[#C56A4A] uppercase tracking-widest block mb-1">
            CAREER TIMELINE
          </span>
          <h3 className="text-lg font-bold font-heading text-[#F4F4F6] tracking-tight">
            CAREER & LEARNING TIMELINE
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-[#9E9A93]">
          <Calendar className="w-4 h-4 text-[#C56A4A]" />
          <span>2025 — PRESENT</span>
        </div>
      </div>

      {/* Horizontal / Mobile Interactive Timeline Scroller */}
      <div className="relative">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 snap-x scrollbar-thin">
          {timelineData.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`snap-center shrink-0 p-4 rounded border font-mono-tech transition-all text-left w-56 sm:w-64 min-h-[44px] ${
                  isSelected
                    ? 'bg-[#141418] border-[#C56A4A] shadow scale-[1.02]'
                    : 'bg-[#09090B] border-[#27272A] hover:border-[#33333C] text-[#9E9A93]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#C56A4A] font-bold tracking-wider">{item.date}</span>
                  <div className="p-1 rounded bg-[#09090B] border border-[#27272A]">{categoryIcons[item.category]}</div>
                </div>
                <h4 className="font-bold text-[#F4F4F6] text-xs sm:text-sm line-clamp-1 font-heading">{item.title}</h4>
                <p className="text-[#9E9A93] text-[11px] font-body truncate">{item.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Card for Active Selected Timeline Event */}
      <div className="p-6 rounded bg-[#141418] border border-[#27272A] space-y-4 font-mono-tech">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272A] pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#09090B] border border-[#27272A] text-[#C56A4A] text-xs font-semibold uppercase">
              {selectedEvent.category}
            </span>
            <span className="text-[#9E9A93] text-xs">{selectedEvent.date}</span>
          </div>

          <span className="text-[#9E9A93] text-xs font-body">{selectedEvent.subtitle}</span>
        </div>

        <div>
          <h4 className="text-base font-bold text-[#F4F4F6] mb-2 font-heading">{selectedEvent.title}</h4>
          <p className="text-[#9E9A93] font-body text-xs sm:text-sm leading-relaxed">{selectedEvent.description}</p>
        </div>

        {/* Highlights */}
        <div className="pt-2 border-t border-[#27272A]">
          <span className="text-[10px] text-[#C56A4A] uppercase tracking-widest block mb-2">VERIFIED HIGHLIGHTS</span>
          <div className="flex flex-wrap gap-2">
            {selectedEvent.highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#09090B] border border-[#27272A] text-[#F4F4F6] text-xs font-body"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{h}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

