import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  isOffline: boolean;
}

const MAX_CHARS = 500;

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, isOffline }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isValid = text.trim().length > 0 && !isOverLimit && !isLoading;

  useEffect(() => {
    // Focus input on mount
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isValid) return;

    onSend(text);
    setText('');

    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    // Auto-adjust textarea height
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-[#27272A] bg-[#09090B] relative">
      <div className="flex items-end gap-2 bg-[#141418] border border-[#27272A] rounded-xl p-2 focus-within:border-[#C56A4A] transition-colors">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isOffline ? 'Ask a portfolio question (Local Mode)...' : 'Ask anything about Akash or tech...'}
          rows={1}
          disabled={isLoading}
          maxLength={MAX_CHARS + 50} // Soft padding for counter display
          aria-label="Message input"
          aria-describedby="char-counter"
          className="w-full bg-transparent text-xs text-slate-100 placeholder:text-[#9E9A93]/60 resize-none focus:outline-none max-h-24 py-1.5 px-1 leading-relaxed"
        />

        <button
          type="submit"
          disabled={!isValid}
          data-cursor="pointer"
          aria-label="Send message"
          className={`p-2 rounded-lg transition-all shrink-0 flex items-center justify-center min-h-[36px] min-w-[36px] ${
            isValid
              ? 'bg-[#C56A4A] text-[#09090B] hover:bg-[#E08A68] active:scale-95'
              : 'bg-[#27272A] text-[#9E9A93]/40 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#C56A4A]" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Input Info & Character Limit */}
      <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-[#9E9A93]/80 font-mono-tech">
        <span>Enter to send • Shift+Enter for newline</span>
        <span
          id="char-counter"
          className={isOverLimit ? 'text-red-400 font-bold' : charCount > 450 ? 'text-amber-400' : ''}
        >
          {charCount}/{MAX_CHARS}
        </span>
      </div>
    </form>
  );
};
