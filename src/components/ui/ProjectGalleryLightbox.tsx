import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { ProjectEvidenceImage } from '../../types/portfolio';

interface ProjectGalleryLightboxProps {
  images: ProjectEvidenceImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ProjectGalleryLightbox: React.FC<ProjectGalleryLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const activeImage = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09090B]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-[#9E9A93] font-mono-tech text-xs z-10">
        <div className="flex items-center gap-2">
          <Maximize2 className="w-4 h-4 text-[#C56A4A]" />
          <span className="font-semibold text-[#F4F4F6] uppercase font-heading">{activeImage.title}</span>
          <span className="text-[#9E9A93]">
            {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded bg-[#141418] border border-[#27272A] hover:text-[#C56A4A] hover:border-[#C56A4A] transition-all text-[#9E9A93] min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close image viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Area with Navigation Buttons */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <button
          type="button"
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-[#141418]/90 border border-[#27272A] hover:border-[#C56A4A] text-[#F4F4F6] transition-all shadow-xl hover:scale-105 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-[#C56A4A]" />
        </button>

        <div className="max-w-5xl max-h-[75vh] flex flex-col items-center justify-center p-2">
          <img
            src={activeImage.url}
            alt={activeImage.title}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded border border-[#27272A] shadow-2xl"
          />
          {activeImage.description && (
            <p className="mt-3 text-center text-xs sm:text-sm text-[#9E9A93] font-mono-tech max-w-2xl bg-[#141418] px-4 py-2 rounded border border-[#27272A]">
              {activeImage.description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
          className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-[#141418]/90 border border-[#27272A] hover:border-[#C56A4A] text-[#F4F4F6] transition-all shadow-xl hover:scale-105 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-[#C56A4A]" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {images.map((img, idx) => (
          <button
            key={img.title + idx}
            type="button"
            onClick={() => onNavigate(idx)}
            className={`relative rounded overflow-hidden border-2 transition-all shrink-0 w-16 h-12 ${
              idx === currentIndex
                ? 'border-[#C56A4A] scale-105 shadow'
                : 'border-[#27272A] opacity-40 hover:opacity-100'
            }`}
          >
            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

