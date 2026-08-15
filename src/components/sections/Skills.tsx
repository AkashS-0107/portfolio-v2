import React, { useState } from 'react';
import { Code, Globe, Cpu, Layers, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import type { Skill, SkillCategory } from '../../types/portfolio';
import { SkillEvidenceModal } from '../ui/SkillEvidenceModal';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionTransitionLine } from '../ui/SectionTransitionLine';

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  Programming: <Code className="w-4 h-4 text-[#C56A4A]" />,
  Web: <Globe className="w-4 h-4 text-[#C56A4A]" />,
  AI: <Cpu className="w-4 h-4 text-[#C56A4A]" />,
  'AI / ML': <Cpu className="w-4 h-4 text-[#C56A4A]" />,
  Frontend: <Globe className="w-4 h-4 text-[#C56A4A]" />,
  Backend: <Layers className="w-4 h-4 text-[#C56A4A]" />,
  'Tools & DevOps': <Layers className="w-4 h-4 text-[#C56A4A]" />,
};

interface SkillsProps {
  onSelectProject?: (projectId: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onSelectProject }) => {
  const { skillGroups, skills, projects, certifications } = portfolioData;
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoverSkillId, setHoverSkillId] = useState<string | null>(null);

  // Helper to summarize verified relationship for hover strip
  const getSkillEvidenceSummary = (skill: Skill) => {
    const matchedProjects = (skill.relatedProjects || [])
      .map((pid) => projects.find((p) => p.id === pid)?.title)
      .filter(Boolean);
    const matchedCerts = (skill.relatedCertifications || [])
      .map((cid) => certifications.find((c) => c.id === cid)?.issuer)
      .filter(Boolean);

    const items = [...matchedProjects, ...matchedCerts];
    if (items.length > 0) return items.slice(0, 3).join(', ');
    return skill.category + ' stack';
  };

  // Fallback to group by category if skillGroups is not pre-populated
  const groupsToDisplay =
    skillGroups && skillGroups.length > 0
      ? skillGroups
      : Array.from(new Set(skills.map((s) => s.category))).map((cat) => ({
          category: cat,
          skills: skills.filter((s) => s.category === cat),
        }));

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090B] relative scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header with SectionTransitionLine */}
        <SectionTransitionLine
          title="Skills & Technologies"
          action={
            <span className="text-xs font-mono-tech text-[#9E9A93] bg-[#141418] px-3 py-1.5 rounded border border-[#27272A]">
              Select skill to inspect evidence
            </span>
          }
        />

        {/* Categorized Skills System Grid (Grouped reveals to avoid individual pill motion) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groupsToDisplay.map((group, groupIdx) => (
            <ScrollReveal
              key={group.category}
              variant="fade-up"
              staggerIndex={groupIdx}
              staggerStep={90}
              delay={100}
            >
              <div className="p-6 rounded bg-[#141418] border border-[#27272A] hover:border-[#33333C] transition-all flex flex-col justify-between shadow-xl group h-full">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#27272A]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-[#09090B] border border-[#27272A] text-[#C56A4A]">
                        {categoryIcons[group.category] || <Code className="w-4 h-4 text-[#C56A4A]" />}
                      </div>
                      <h3 className="font-heading text-sm font-bold text-[#F4F4F6] tracking-wider uppercase">
                        {group.category}
                      </h3>
                    </div>
                    <span className="font-mono-tech text-[10px] text-[#C56A4A] uppercase tracking-widest">Stack</span>
                  </div>

                  {/* Skill Pills Group */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => {
                      const isHovered = hoverSkillId === skill.id;
                      return (
                        <button
                          key={skill.id}
                          type="button"
                          onClick={() => setSelectedSkill(skill)}
                          onMouseEnter={() => setHoverSkillId(skill.id)}
                          onMouseLeave={() => setHoverSkillId(null)}
                          onFocus={() => setHoverSkillId(skill.id)}
                          onBlur={() => setHoverSkillId(null)}
                          className={`inline-flex items-center px-3 py-2 rounded font-mono-tech text-xs transition-all active:scale-95 focus:outline-none min-h-[44px] ${
                            isHovered
                              ? 'bg-[#141418] border border-[#C56A4A] text-[#C56A4A] shadow-md'
                              : 'bg-[#09090B] border border-[#27272A] text-[#F4F4F6] hover:border-[#C56A4A]/60 hover:text-[#C56A4A]'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C56A4A] mr-2 shrink-0" />
                          <span>{skill.name}</span>
                          <ExternalLink className="w-3 h-3 ml-2 text-[#9E9A93] group-hover/pill:text-[#C56A4A] transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Relationship Feedback Bar */}
                <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-between font-mono-tech text-[10px]">
                  {hoverSkillId && group.skills.some((s) => s.id === hoverSkillId) ? (
                    <div className="flex items-center gap-1.5 text-[#C56A4A] font-semibold truncate animate-fadeIn">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C56A4A] animate-ping" />
                      <span className="truncate">
                        Used in:{' '}
                        {getSkillEvidenceSummary(group.skills.find((s) => s.id === hoverSkillId)!)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="text-[#9E9A93]">Skill Stack</span>
                      <span className="text-[#C56A4A] font-semibold tracking-wider">
                        {group.skills.length} Skills
                      </span>
                    </>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Interactive Evidence Drawer Modal */}
      <SkillEvidenceModal
        skill={selectedSkill}
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectProject={onSelectProject}
      />
    </section>
  );
};


