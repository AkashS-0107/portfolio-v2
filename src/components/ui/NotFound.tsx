import React from 'react';
import { Home, FolderGit2, Compass } from 'lucide-react';

interface NotFoundProps {
  onBackToPortfolio: () => void;
  onViewProjects: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({
  onBackToPortfolio,
  onViewProjects,
}) => {
  return (
    <main
      className="min-h-screen bg-[#09090B] text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-[#C56A4A]/30 selection:text-[#F4F4F6]"
      aria-labelledby="notFoundTitle"
    >
      {/* Atmospheric Ambient Background Glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-[#C56A4A]/10 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bg-[#27272A]/30 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-xl w-full text-center space-y-8 p-8 sm:p-12 rounded-2xl bg-[#141418]/60 border border-[#27272A]/60 backdrop-blur-md shadow-2xl">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C56A4A]/10 border border-[#C56A4A]/30 text-[#C56A4A] font-mono text-xs uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Error 404 • Route Not Found</span>
        </div>

        {/* Hero Number & Message */}
        <div className="space-y-3">
          <h1
            id="notFoundTitle"
            className="text-7xl sm:text-9xl font-extrabold font-heading tracking-tight text-[#F4F4F6] drop-shadow-md select-none"
          >
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F4F4F6] font-sans">
            Looks like this route wandered off.
          </h2>
          <p className="text-sm sm:text-base text-[#9E9A93] leading-relaxed max-w-md mx-auto">
            The page you are looking for does not exist or may have been moved.
            You can head back to the main portfolio or jump directly to projects.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Primary Action: Back to Portfolio */}
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#C56A4A] text-white font-medium text-sm hover:bg-[#b05c3e] transition-all duration-200 shadow-lg shadow-[#C56A4A]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <Home className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>

          {/* Secondary Action: View Projects */}
          <button
            type="button"
            onClick={onViewProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#18181B] border border-[#27272A] text-[#F4F4F6] font-medium text-sm hover:border-[#C56A4A]/60 hover:text-[#C56A4A] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>View Projects</span>
          </button>
        </div>
      </div>
    </main>
  );
};
