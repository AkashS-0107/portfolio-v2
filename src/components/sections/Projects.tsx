import React, { useState } from 'react';
import { ExternalLink, Sparkles, Clock, CheckCircle2, AlertCircle, Eye, ShieldAlert, Layers } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import type { Project, ProjectStatus } from '../../types/portfolio';
import { GithubIcon } from '../ui/Icons';
import { ProjectExplorerModal } from '../ui/ProjectExplorerModal';

const statusBadges: Record<
  ProjectStatus,
  { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
> = {
  'IN DEVELOPMENT': {
    label: 'IN DEVELOPMENT',
    bg: 'bg-[#141418]',
    text: 'text-[#C56A4A]',
    border: 'border-[#C56A4A]/40',
    icon: <Clock className="w-3.5 h-3.5 animate-pulse text-[#C56A4A]" />,
  },
  COMPLETED: {
    label: 'COMPLETED',
    bg: 'bg-[#141418]',
    text: 'text-[#10B981]',
    border: 'border-[#10B981]/40',
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />,
  },
  'COMING SOON': {
    label: 'COMING SOON',
    bg: 'bg-[#141418]',
    text: 'text-[#9E9A93]',
    border: 'border-[#27272A]',
    icon: <AlertCircle className="w-3.5 h-3.5 text-[#9E9A93]" />,
  },
};

const filterCategories = ['ALL', 'FULL STACK', 'WEB', 'AI / ML'] as const;

interface ProjectsProps {
  externalSelectedProjectId?: string | null;
  onClearExternalSelectedProject?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  externalSelectedProjectId,
  onClearExternalSelectedProject,
}) => {
  const { projects } = portfolioData;
  const [internalSelectedProject, setInternalSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const selectedProject =
    internalSelectedProject ||
    (externalSelectedProjectId
      ? projects.find((p) => p.id === externalSelectedProjectId) || null
      : null);

  const handleCloseModal = () => {
    setInternalSelectedProject(null);
    if (onClearExternalSelectedProject) onClearExternalSelectedProject();
  };

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'FULL STACK') return p.category === 'Full Stack' || p.isFlagship;
    if (activeFilter === 'WEB') return p.category === 'Web' || p.category === 'Web Platform';
    if (activeFilter === 'AI / ML')
      return (
        p.technologies.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('prompt')) ||
        p.category.includes('AI')
      );
    return true;
  });

  const flagshipProject = filteredProjects.find((p) => p.isFlagship) || (activeFilter === 'ALL' ? projects.find((p) => p.isFlagship) : undefined);
  const standardProjects = filteredProjects.filter((p) => !p.isFlagship);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272A] bg-[#09090B] relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header & Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F4F6] uppercase font-heading">
              SELECTED WORK
            </h2>
            <div className="h-px bg-[#27272A] flex-1 ml-4 hidden sm:block" />
          </div>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded bg-[#141418] border border-[#27272A]">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded font-mono-tech text-xs font-semibold tracking-wider transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-[#C56A4A] text-[#09090B] shadow'
                      : 'text-[#9E9A93] hover:text-[#F4F4F6] hover:bg-[#09090B]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. Flagship Project (Titan Fitness Club) */}
        {flagshipProject && (
          <div className="relative rounded bg-[#141418] border-l-4 border-[#C56A4A] border-y border-r border-[#27272A] p-6 sm:p-10 shadow-2xl overflow-hidden group">
            {/* Flagship Indicator Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#09090B] border border-[#C56A4A]/40 text-[#C56A4A] font-mono-tech text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C56A4A]" />
                <span>FLAGSHIP PLATFORM</span>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded font-mono-tech text-xs font-semibold border ${
                  statusBadges[flagshipProject.status].bg
                } ${statusBadges[flagshipProject.status].text} ${
                  statusBadges[flagshipProject.status].border
                }`}
              >
                {statusBadges[flagshipProject.status].icon}
                <span>{statusBadges[flagshipProject.status].label}</span>
              </div>
            </div>

            {/* Grid content: Details + Image preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono-tech text-xs text-[#C56A4A] font-bold uppercase tracking-widest bg-[#09090B] px-2.5 py-0.5 rounded border border-[#27272A]">
                    {flagshipProject.category}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-[#F4F4F6] tracking-tight font-heading">
                  {flagshipProject.title}
                </h3>

                <p className="text-[#9E9A93] text-base leading-relaxed font-body">
                  {flagshipProject.description}
                </p>

                {/* Confidentiality Pill */}
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded bg-[#09090B] border border-[#C56A4A]/30 text-[#C56A4A] font-mono-tech text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-[#C56A4A]" />
                  <span>Public Hero Visual Only — Confidentiality Control</span>
                </div>
              </div>

              {/* Hero Image preview (ONLY approved public visual for Titan) */}
              {flagshipProject.heroImage && (
                <div
                  data-cursor="view"
                  className="lg:col-span-5 relative rounded overflow-hidden border border-[#27272A] bg-[#09090B] group/img shadow-xl cursor-pointer"
                  onClick={() => setInternalSelectedProject(flagshipProject)}
                >
                  <img
                    src={flagshipProject.heroImage}
                    alt="Titan Fitness Club Approved Public Hero Visual"
                    className="w-full h-60 sm:h-64 object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-end">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#C56A4A] text-[#09090B] font-mono-tech text-xs font-bold shadow-xl opacity-90 sm:opacity-0 sm:group-hover/img:opacity-100 transition-opacity duration-300">
                      <Eye className="w-3.5 h-3.5" />
                      <span>EXPLORE PROJECT</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-8">
              {flagshipProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded bg-[#09090B] border border-[#27272A] text-[#F4F4F6] font-mono-tech text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-[#27272A]">
              <div className="flex items-center gap-3 text-xs font-mono-tech text-[#9E9A93]">
                <span className="text-[#C56A4A] font-bold uppercase tracking-widest">Flagship Project in Active Development</span>
              </div>

              <button
                type="button"
                onClick={() => setInternalSelectedProject(flagshipProject)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#09090B] border border-[#C56A4A]/50 text-[#C56A4A] hover:bg-[#C56A4A]/10 font-mono-tech text-xs font-bold tracking-wider transition-all min-h-[44px]"
              >
                <Eye className="w-4 h-4" />
                <span>VIEW FULL EXPLORER</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Standard Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {standardProjects.map((project) => {
            const badge = statusBadges[project.status];
            const isFuturePe = project.id === 'future-pe';

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between p-6 rounded bg-[#141418] border border-[#27272A] card-elevation-hover transition-all group shadow-xl"
              >
                <div>
                  {/* Status & Category */}
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

                  {/* Future PE Editorial Header or Standard Hero Thumbnail */}
                  {isFuturePe ? (
                    <div className="mb-5 p-4 rounded bg-[#09090B] border border-[#27272A] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[10px] text-[#C56A4A] uppercase font-bold tracking-wider">
                          {project.internshipContext?.organization}
                        </span>
                        <span className="font-mono-tech text-[10px] text-[#9E9A93]">
                          {project.internshipContext?.role}
                        </span>
                      </div>
                      <p className="font-mono-tech text-[11px] text-[#9E9A93] border-t border-[#27272A]/80 pt-2">
                        {project.internshipContext?.period}
                      </p>
                    </div>
                  ) : (
                    project.heroImage && (
                      <div
                        data-cursor="view"
                        onClick={() => setInternalSelectedProject(project)}
                        className="mb-4 rounded overflow-hidden border border-[#27272A] h-40 bg-[#09090B] cursor-pointer group/img transition-colors relative"
                      >
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-[#09090B]/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#09090B]/90 border border-[#C56A4A]/60 text-[#C56A4A] font-mono-tech text-[11px] font-bold shadow-lg">
                            <Eye className="w-3.5 h-3.5" />
                            <span>EXPLORE PROJECT</span>
                          </span>
                        </div>
                        {project.evidenceImages && project.evidenceImages.length > 1 && (
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#09090B]/90 text-[#C56A4A] font-mono-tech text-[10px] border border-[#27272A] flex items-center gap-1 shadow-md">
                            <Layers className="w-3 h-3 text-[#C56A4A]" />
                            <span>{project.evidenceImages.length} SHOTS</span>
                          </span>
                        )}
                      </div>
                    )
                  )}

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold font-heading text-[#F4F4F6] tracking-tight mb-1 group-hover:text-[#C56A4A] transition-colors">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="font-mono-tech text-xs text-[#C56A4A] font-medium mb-3">
                      {project.subtitle}
                    </p>
                  )}

                  {/* Contribution tag if present */}
                  {project.contribution && (
                    <p className="font-mono-tech text-xs text-[#C56A4A] mb-3 bg-[#09090B] px-2.5 py-1 rounded border border-[#27272A] inline-block">
                      Role: {project.contribution}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-[#9E9A93] text-xs sm:text-sm leading-relaxed mb-4 font-body">
                    {project.description}
                  </p>

                  {/* Workstreams list for Future PE */}
                  {project.workstreams && project.workstreams.length > 0 && (
                    <div className="mb-5 space-y-2">
                      <span className="font-mono-tech text-[10px] text-[#C56A4A] uppercase tracking-wider block font-bold">
                        CONFIRMED WORKSTREAMS:
                      </span>
                      <div className="space-y-1.5">
                        {project.workstreams.map((ws) => (
                          <div
                            key={ws.id}
                            className="p-2 rounded bg-[#09090B] border border-[#27272A] text-xs font-mono-tech text-[#F4F4F6]"
                          >
                            <span className="text-[#C56A4A] font-bold mr-1.5">{ws.number}</span>
                            <span>{ws.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-[#09090B] border border-[#27272A] text-[#F4F4F6] font-mono-tech text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer links & Explore button */}
                <div className="pt-4 border-t border-[#27272A] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9E9A93] hover:text-[#C56A4A] transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A]"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C56A4A] hover:text-[#E08A68] transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A]"
                        aria-label={`${project.title} Live website`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setInternalSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#09090B] border border-[#27272A] hover:border-[#C56A4A] text-[#C56A4A] font-mono-tech text-xs font-semibold transition-all min-h-[44px]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>EXPLORE</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Explorer Modal */}
      <ProjectExplorerModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
};


