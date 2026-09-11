import { useState, useCallback, useRef } from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import type { ChatMessage, ChatMessagePayload } from '../lib/chatbot/types.js';
import { getLocalFallbackResponse } from '../lib/chatbot/fallback.js';

const INITIAL_GREETING: ChatMessage = {
  id: 'init-1',
  role: 'assistant',
  content: "Hi, I'm Akash's AI portfolio assistant. Ask me about his projects, skills, experience, or anything else.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  source: 'system',
};

export function useChat() {
  const { isOnline } = useOnlineStatus();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);

      // Create User Message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMessage]);

      // If OFFLINE: Use local fallback engine immediately
      if (!isOnline) {
        setIsLoading(true);
        setTimeout(() => {
          const fallbackText = getLocalFallbackResponse(trimmed);
          const assistantMessage: ChatMessage = {
            id: `assist-${Date.now()}`,
            role: 'assistant',
            content: fallbackText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            source: 'fallback',
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 300);
        return;
      }

      // ONLINE: Send POST to /api/chat
      setIsLoading(true);

      // Cancel previous request if pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        // Build payload history (last 8 messages max)
        const historyPayload: ChatMessagePayload[] = [...messages, userMessage]
          .slice(-8)
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: historyPayload }),
          signal: controller.signal,
        });

        const rawText = await response.text();
        let data: Record<string, unknown> | null = null;

        if (rawText && rawText.trim().length > 0) {
          try {
            data = JSON.parse(rawText) as Record<string, unknown>;
          } catch {
            data = null;
          }
        }

        if (!response.ok) {
          const apiErr = data && typeof data.error === 'string' ? data.error : null;
          const statusText = `Server error (HTTP ${response.status}). Please try again later.`;
          throw new Error(apiErr || statusText);
        }

        if (!data || typeof data !== 'object') {
          throw new Error(`Server error (HTTP ${response.status}). Please try again later.`);
        }

        const replyContent =
          (typeof data.message === 'string' && data.message) ||
          (typeof data.response === 'string' && data.response) ||
          'No response returned.';

        const assistantMessage: ChatMessage = {
          id: `assist-${Date.now()}`,
          role: 'assistant',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'llm',
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;

        let errorMsg = err instanceof Error ? err.message : 'Network failure';

        // Sanitize any raw SyntaxError, JSON parse errors, or HTML snippets
        if (/SyntaxError|JSON|Unexpected token|<|<!DOCTYPE/i.test(errorMsg)) {
          errorMsg = 'Server error (HTTP 500). Please try again later.';
        }

        // Fallback response on error
        const fallbackText = getLocalFallbackResponse(trimmed);
        const errorMessage: ChatMessage = {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `${fallbackText}\n\n*(Note: Online AI request encountered an error: ${errorMsg})*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'fallback',
          isError: true,
        };

        setError(errorMsg);
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [isOnline, isLoading, messages]
  );

  const retry = useCallback(() => {
    // Find last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      sendMessage(lastUserMsg.content);
    }
  }, [messages, sendMessage]);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_GREETING]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    isOnline,
    sendMessage,
    retry,
    clearChat,
  };
}
