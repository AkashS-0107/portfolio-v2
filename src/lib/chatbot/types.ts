export type ChatRole = 'user' | 'assistant';

export interface ChatMessagePayload {
  role: ChatRole;
  content: string;
}

export interface ChatMessage extends ChatMessagePayload {
  id: string;
  timestamp: string;
  source?: 'llm' | 'fallback' | 'system';
  isError?: boolean;
}

export interface LLMProvider {
  name: string;
  generateResponse(
    messages: ChatMessagePayload[],
    systemPrompt: string
  ): Promise<string>;
}
