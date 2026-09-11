import type { LLMProvider, ChatMessagePayload } from './types.js';

/**
 * Server-side OpenRouter LLM Provider using direct native fetch.
 * Does not require external SDK dependencies. Uses process.env.OPENROUTER_API_KEY.
 * Targets the verified stable Flash model: google/gemini-2.5-flash.
 */
export class OpenRouterProvider implements LLMProvider {
  name = 'OpenRouter (Gemini)';
  private apiKey: string;
  private modelName: string;

  constructor(apiKey?: string, modelName?: string) {
    const globalProcess = (globalThis as unknown as { process?: { env?: Record<string, string> } }).process;
    this.apiKey = apiKey || globalProcess?.env?.OPENROUTER_API_KEY || '';
    this.modelName = modelName || globalProcess?.env?.OPENROUTER_MODEL || 'google/gemini-2.5-flash';
  }

  public getModelName(): string {
    return this.modelName;
  }

  async generateResponse(
    messages: ChatMessagePayload[],
    systemPrompt: string,
    signal?: AbortSignal
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY is not configured on the server.');
    }

    const url = 'https://openrouter.ai/api/v1/chat/completions';

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const body = {
      model: this.modelName,
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 800,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.akashsuresh.me',
        'X-Title': 'Akash Suresh Portfolio AI Companion',
      },
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Upstream Provider HTTP ${response.status}`);
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new Error('Malformed response structure from upstream LLM provider.');
    }

    const typedData = data as {
      choices?: Array<{
        message?: {
          content?: unknown;
        };
      }>;
    };

    if (
      !typedData ||
      typeof typedData !== 'object' ||
      !Array.isArray(typedData.choices) ||
      typedData.choices.length === 0
    ) {
      throw new Error('Malformed response structure from upstream LLM provider.');
    }

    const firstChoice = typedData.choices[0];
    if (!firstChoice || typeof firstChoice !== 'object' || !firstChoice.message) {
      throw new Error('Malformed response structure from upstream LLM provider.');
    }

    const content = firstChoice.message.content;
    if (typeof content !== 'string' || content.trim().length === 0) {
      throw new Error('Malformed response structure from upstream LLM provider.');
    }

    return content.trim();
  }
}

