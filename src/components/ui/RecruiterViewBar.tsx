import React, { useState } from 'react';
import { FileDown, Mail, CheckCircle2, UserCheck, X, ChevronRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useResumeAvailable } from '../../hooks/useResumeAvailable';

export const RecruiterViewBar: React.FC = () => {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const { professionalLinks } = portfolioData;
  const isResumeAvailable = useResumeAvailable();

  return (
    <>
      {/* Top Banner Button Trigger */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsRecruiterMode((prev) => !prev)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono-tech text-xs font-bold tracking-wider shadow-2xl transition-all border min-h-[44px] ${
            isRecruiterMode
              ? 'bg-[#C56A4A] text-[#09090B] border-[#C56A4A]'
              : 'bg-[#141418] text-[#C56A4A] border-[#27272A] hover:border-[#C56A4A]/50 hover:text-[#F4F4F6]'
          }`}
          aria-expanded={isRecruiterMode}
          aria-label="Toggle Recruiter Evaluation Mode"
        >
          <UserCheck className="w-4 h-4" />
          <span>{isRecruiterMode ? 'EXIT RECRUITER VIEW' : 'RECRUITER QUICK VIEW'}</span>
        </button>
      </div>

      {/* Floating Recruiter Drawer / Fast Track Navigation Bar */}
      {isRecruiterMode && (
        <div className="fixed bottom-20 right-4 left-4 sm:left-auto sm:w-[420px] z-40 bg-[#09090B] border border-[#27272A] rounded p-5 shadow-2xl animate-fadeIn text-[#F4F4F6] font-mono-tech space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <div className="flex items-center gap-2 text-[#C56A4A]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span className="font-bold text-xs tracking-wider">FAST EVALUATION SUMMARY</span>
            </div>
            <button
              type="button"
              onClick={() => setIsRecruiterMode(false)}
              className="text-[#9E9A93] hover:text-[#F4F4F6] p-1 min-h-[44px]"
              aria-label="Close recruiter view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <p className="text-[#9E9A93] font-body">
              Welcome! Use these verified quick links to evaluate Akash Suresh's qualifications immediately:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {isResumeAvailable && professionalLinks.resume && (
                <a
                  href={professionalLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded bg-[#C56A4A] text-[#09090B] font-bold hover:bg-[#E08A68] transition-colors min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
                  aria-label="View or download Akash Suresh's resume"
                >
                  <FileDown className="w-4 h-4" />
                  <span>VIEW / DOWNLOAD RESUME</span>
                </a>
              )}

              {professionalLinks.github && (
                <a
                  href={professionalLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] text-[#F4F4F6] transition-colors min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
                  aria-label="Open Akash Suresh's GitHub profile"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>
              )}

              {professionalLinks.linkedin && (
                <a
                  href={professionalLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] text-[#F4F4F6] transition-colors min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
                  aria-label="Open Akash Suresh's LinkedIn profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>
              )}

              {professionalLinks.email && (
                <a
                  href={professionalLinks.email}
                  className="flex items-center justify-center gap-2 p-2.5 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] text-[#F4F4F6] transition-colors min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#C56A4A]"
                  aria-label="Email Akash Suresh"
                >
                  <Mail className="w-4 h-4" />
                  <span>EMAIL</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Jump Section Shortcuts */}
          <div className="pt-3 border-t border-[#27272A] space-y-1.5 text-[11px]">
            <span className="text-[#9E9A93] uppercase tracking-widest block text-[10px]">Quick Jump:</span>
            <div className="flex flex-wrap gap-1.5">
              <a
                href="#projects"
                onClick={() => setIsRecruiterMode(false)}
                className="px-2.5 py-1 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] text-[#9E9A93] hover:text-[#C56A4A] min-h-[44px] flex items-center"
              >
                Projects <ChevronRight className="w-3 h-3 ml-1" />
              </a>
              <a
                href="#internships"
                onClick={() => setIsRecruiterMode(false)}
                className="px-2.5 py-1 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] text-[#9E9A93] hover:text-[#C56A4A] min-h-[44px] flex items-center"
              >
                Internships <ChevronRight className="w-3 h-3 ml-1" />
              </a>
              <a
                href="#certifications-hackathons"
                onClick={() => setIsRecruiterMode(false)}
                className="px-2.5 py-1 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] text-[#9E9A93] hover:text-[#C56A4A] min-h-[44px] flex items-center"
              >
                Certifications <ChevronRight className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

