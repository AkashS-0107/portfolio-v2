import type { LLMProvider, ChatMessagePayload } from './types';

/**
 * Server-side Gemini LLM Provider using direct native fetch.
 * Does not require external SDK dependencies. Uses process.env.GEMINI_API_KEY.
 * Targets the verified stable Flash model: gemini-3.8-flash.
 */
export class GeminiProvider implements LLMProvider {
  name = 'Google Gemini (REST)';
  private apiKey: string;
  private modelName: string;

  constructor(apiKey?: string, modelName = 'gemini-3.8-flash') {
    const globalProcess = (globalThis as unknown as { process?: { env?: Record<string, string> } }).process;
    this.apiKey = apiKey || globalProcess?.env?.GEMINI_API_KEY || '';
    this.modelName = modelName;
  }

  public getModelName(): string {
    return this.modelName;
  }

  async generateResponse(
    messages: ChatMessagePayload[],
    systemPrompt: string
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured on the server.');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;

    // Map roles: 'assistant' -> 'model', 'user' -> 'user'
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Upstream Provider HTTP ${response.status}: ${errText.slice(0, 100)}`);
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || typeof text !== 'string') {
      throw new Error('Malformed response structure from upstream LLM provider.');
    }

    return text.trim();
  }
}
