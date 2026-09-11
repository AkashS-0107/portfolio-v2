import React from 'react';
import { WifiOff, X } from 'lucide-react';

interface OfflineNotificationProps {
  show: boolean;
  onDismiss: () => void;
}

export const OfflineNotification: React.FC<OfflineNotificationProps> = ({
  show,
  onDismiss,
}) => {
  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fadeIn"
    >
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#141418]/95 border border-[#C56A4A]/40 shadow-2xl backdrop-blur-md text-slate-100">
        <div className="p-2 rounded-lg bg-[#C56A4A]/15 text-[#C56A4A] shrink-0">
          <WifiOff className="w-5 h-5" />
        </div>

        <div className="flex-1 pr-2 space-y-1">
          <h3 className="text-sm font-semibold text-[#F4F4F6]">
            You&apos;re offline.
          </h3>
          <p className="text-xs text-[#9E9A93] leading-relaxed">
            Some external resources may be unavailable, but the locally loaded
            portfolio is still here.
          </p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="p-1.5 rounded-lg text-[#9E9A93] hover:text-[#F4F4F6] hover:bg-[#27272A]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C56A4A] shrink-0"
          aria-label="Dismiss offline notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
