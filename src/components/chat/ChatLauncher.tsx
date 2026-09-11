import React from 'react';
import { Bot, Sparkles, X } from 'lucide-react';

interface ChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  isOffline?: boolean;
}

export const ChatLauncher: React.FC<ChatLauncherProps> = ({ isOpen, onToggle, isOffline }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      data-cursor="pointer"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close AI Companion Chat' : 'Open AI Companion Chat'}
      title={isOpen ? 'Close AI Chat' : 'Ask Akash\'s AI Companion'}
      className={`fixed bottom-6 left-6 z-45 p-3 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center min-h-[48px] min-w-[48px] focus:outline-none focus:ring-2 focus:ring-[#C56A4A] group ${
        isOpen
          ? 'bg-[#27272A] text-[#F4F4F6] border border-[#3F3F46] hover:bg-[#3F3F46]'
          : 'bg-[#141418] text-[#C56A4A] border border-[#27272A] hover:border-[#C56A4A] hover:bg-[#09090B]'
      }`}
    >
      {isOpen ? (
        <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
      ) : (
        <div className="relative flex items-center justify-center">
          <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <Sparkles className="w-2.5 h-2.5 absolute -top-1 -right-1 text.terracotta animate-pulse" />
          {isOffline && (
            <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-amber-500 border border-[#09090B]" title="Local Mode" />
          )}
        </div>
      )}
    </button>
  );
};
