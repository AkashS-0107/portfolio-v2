import { portfolioData } from '../data/portfolioData';

/**
 * Hook to check if resume is available in professionalLinks.
 * Guaranteed to return true when public/resume.pdf is configured.
 */
export const useResumeAvailable = (): boolean => {
  const resumeUrl = portfolioData.professionalLinks.resume;
  return Boolean(resumeUrl && resumeUrl.trim().length > 0);
};

