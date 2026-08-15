import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react';

interface CertificateLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  issuer: string;
  date?: string;
  image?: string;
  verificationUrl?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrevNext?: boolean;
  currentIndex?: number;
  totalCount?: number;
}

export const CertificateLightboxModal: React.FC<CertificateLightboxModalProps> = ({
  isOpen,
  onClose,
  title,
  issuer,
  date,
  image,
  verificationUrl,
  onPrev,
  onNext,
  hasPrevNext = false,
  currentIndex,
  totalCount,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && onPrev) {
        onPrev();
      } else if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !image) return null;

  const formattedCounter =
    typeof currentIndex === 'number' && typeof totalCount === 'number' && totalCount > 0
      ? `${currentIndex + 1} of ${totalCount}`
      : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09090B]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-lightbox-title"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="w-full max-w-7xl mx-auto flex items-center justify-between z-10 py-2 border-b border-[#27272A]/80 font-mono-tech"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-[#141418] border border-[#27272A] text-[#C56A4A]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#C56A4A] font-bold uppercase tracking-widest block">
              {issuer} • Verified Evidence
            </span>
            <h2 id="certificate-lightbox-title" className="text-sm sm:text-base font-bold text-[#F4F4F6] font-heading tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {formattedCounter && (
            <span className="px-2.5 py-1 rounded bg-[#141418] border border-[#27272A] text-[#C56A4A] text-xs font-mono-tech font-bold">
              {formattedCounter}
            </span>
          )}

          {date && (
            <span className="hidden sm:inline-block text-xs text-[#9E9A93] bg-[#141418] px-3 py-1 rounded border border-[#27272A]">
              ISSUED: {date}
            </span>
          )}

          {verificationUrl && (
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#C56A4A] hover:underline font-bold bg-[#141418] px-3 py-1.5 rounded border border-[#C56A4A]/40 min-h-[44px]"
            >
              <span>VERIFY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded bg-[#141418] border border-[#27272A] hover:border-[#C56A4A] hover:text-[#C56A4A] text-[#9E9A93] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
            aria-label="Close certificate preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Image Container */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Previous Button */}
        {hasPrevNext && onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-[#09090B]/80 border border-[#27272A] hover:border-[#C56A4A] hover:text-[#C56A4A] text-[#9E9A93] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xl backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Certificate Image Frame */}
        <div className="relative max-w-full max-h-full flex items-center justify-center p-2">
          <img
            src={image}
            alt={`Official certificate document for ${title} issued by ${issuer}`}
            className="max-w-full max-h-[78vh] object-contain rounded border border-[#27272A] shadow-2xl bg-[#141418]"
            loading="eager"
          />
        </div>

        {/* Navigation Next Button */}
        {hasPrevNext && onNext && (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-[#09090B]/80 border border-[#27272A] hover:border-[#C56A4A] hover:text-[#C56A4A] text-[#9E9A93] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xl backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
            aria-label="Next certificate"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Information Footer */}
      <div
        className="w-full max-w-7xl mx-auto flex items-center justify-between py-2 border-t border-[#27272A]/80 font-mono-tech text-xs text-[#9E9A93]"
        onClick={(e) => e.stopPropagation()}
      >
        <span>Certificate Evidence Preview</span>
        <span className="hidden sm:inline">Press ESC to close, Left/Right/Up/Down arrows to navigate</span>
        <button
          type="button"
          onClick={onClose}
          className="text-[#C56A4A] hover:underline font-bold focus-visible:ring-2 focus-visible:ring-[#C56A4A] focus-visible:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};
