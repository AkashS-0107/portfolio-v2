import React, { useEffect, useRef } from 'react';
import { Bot, X, RotateCcw, Trash2, WifiOff, Sparkles, Loader2 } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../lib/chatbot/types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessageType[];
  isLoading: boolean;
  isOffline: boolean;
  error: string | null;
  onSendMessage: (text: string) => void;
  onRetry: () => void;
  onClear: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  onClose,
  messages,
  isLoading,
  isOffline,
  error,
  onSendMessage,
  onRetry,
  onClear,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="AI Companion Chat Window"
      className="fixed bottom-20 left-4 sm:left-6 z-45 w-[calc(100vw-2rem)] max-w-sm h-[480px] max-h-[80vh] bg-[#09090B] border border-[#27272A] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#F4F4F6] font-sans animate-fadeIn"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#27272A] bg-[#141418]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#C56A4A] text-[#09090B] flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-mono-tech text-xs font-bold tracking-wider text-slate-100">
                AKASH'S COMPANION
              </h3>
              <Sparkles className="w-3 h-3 text-[#C56A4A]" />
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-1 text-[10px] font-mono-tech">
              {isOffline ? (
                <span className="text-amber-400 flex items-center gap-1">
                  <WifiOff className="w-2.5 h-2.5" /> LOCAL MODE
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" /> ONLINE
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onClear}
            data-cursor="pointer"
            title="Clear Chat History"
            aria-label="Clear chat history"
            className="p-1.5 text-[#9E9A93] hover:text-[#C56A4A] rounded-lg transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            data-cursor="pointer"
            title="Close Chat Panel (Esc)"
            aria-label="Close chat panel"
            className="p-1.5 text-[#9E9A93] hover:text-slate-100 rounded-lg transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-1 scrollbar-thin scrollbar-thumb-[#27272A]">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#9E9A93] py-2 px-3 bg-[#141418] border border-[#27272A] rounded-xl w-max animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C56A4A]" />
            <span>Thinking...</span>
          </div>
        )}

        {/* Error Retry Banner */}
        {error && (
          <div className="mt-2 p-2.5 bg-red-950/40 border border-red-900/60 rounded-xl flex items-center justify-between text-xs text-red-300">
            <span>Failed to reach AI service.</span>
            <button
              type="button"
              onClick={onRetry}
              data-cursor="pointer"
              className="flex items-center gap-1 px-2 py-1 rounded bg-red-900/60 hover:bg-red-800 text-red-100 font-bold transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Footer */}
      <ChatInput onSend={onSendMessage} isLoading={isLoading} isOffline={isOffline} />
    </div>
  );
};
