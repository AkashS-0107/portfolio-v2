import React from 'react';
import { Bot, User, AlertCircle, Sparkles, HardDrive } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../lib/chatbot/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

/**
 * Safely parses basic Markdown formatting (**bold**, `code`, bullet lists)
 * without using dangerouslySetInnerHTML.
 */
function renderFormattedContent(content: string): React.ReactNode {
  const lines = content.split('\n');

  return lines.map((line, lineIdx) => {
    // Check if bullet point
    const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
    const lineText = isBullet ? line.trim().substring(2) : line;

    // Split by inline code `` `code` ``
    const codeParts = lineText.split(/(`[^`]+`)/g);

    const formattedParts = codeParts.map((part, pIdx) => {
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code
            key={pIdx}
            className="px-1.5 py-0.5 rounded bg-[#1C1C22] text-[#C56A4A] font-mono text-xs border border-[#27272A]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Split by bolding `**bold**`
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
          return (
            <strong key={bIdx} className="font-semibold text-slate-100">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-1.5 my-1 pl-2">
          <span className="text-[#C56A4A] select-none">•</span>
          <div>{formattedParts}</div>
        </div>
      );
    }

    return (
      <React.Fragment key={lineIdx}>
        {formattedParts}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-start gap-2.5 my-3.5 transition-all animate-fadeIn ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border ${
          isUser
            ? 'bg-[#C56A4A] text-[#09090B] border-[#C56A4A]'
            : 'bg-[#141418] text-[#C56A4A] border-[#27272A]'
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Message Content Bubble */}
      <div
        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm font-sans ${
          isUser
            ? 'bg-[#C56A4A] text-[#09090B] rounded-tr-xs font-medium'
            : message.isError
            ? 'bg-[#181214] text-red-200 border border-red-900/50 rounded-tl-xs'
            : 'bg-[#141418] text-[#F4F4F6] border border-[#27272A] rounded-tl-xs'
        }`}
      >
        {renderFormattedContent(message.content)}

        {/* Footer Meta: Timestamp & Source Badge */}
        <div
          className={`flex items-center gap-1.5 mt-1 text-[10px] ${
            isUser ? 'text-[#09090B]/70 justify-end' : 'text-[#9E9A93] justify-start'
          }`}
        >
          <span>{message.timestamp}</span>
          {!isUser && message.source === 'fallback' && (
            <span className="inline-flex items-center gap-0.5 text-[9px] px-1 py-0.2 rounded bg-[#27272A] text-[#9E9A93]">
              <HardDrive className="w-2.5 h-2.5" /> Local
            </span>
          )}
          {!isUser && message.source === 'llm' && (
            <span className="inline-flex items-center gap-0.5 text-[9px] px-1 py-0.2 rounded bg-[#C56A4A]/10 text-[#C56A4A] border border-[#C56A4A]/20">
              <Sparkles className="w-2.5 h-2.5" /> AI
            </span>
          )}
          {!isUser && message.isError && (
            <span className="inline-flex items-center gap-0.5 text-[9px] text-red-400">
              <AlertCircle className="w-2.5 h-2.5" /> Notice
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
