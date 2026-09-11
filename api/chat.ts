import { buildSystemPrompt } from '../src/lib/chatbot/systemPrompt';
import { OpenRouterProvider } from '../src/lib/chatbot/provider';
import type { ChatMessagePayload } from '../src/lib/chatbot/types';

// In-memory rate limiter: IP -> Array of timestamps (ms)
const ipRateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRateLimitMap.get(ip) || [];

  // Filter out timestamps outside the window
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRateLimitMap.set(ip, validTimestamps);

  // Periodically clean up old IPs
  if (ipRateLimitMap.size > 1000) {
    for (const [key, tsList] of ipRateLimitMap.entries()) {
      if (tsList.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        ipRateLimitMap.delete(key);
      }
    }
  }

  return false;
}

interface ServerRequest {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

interface ServerResponse {
  statusCode?: number;
  headersSent?: boolean;
  setHeader?: (key: string, value: string) => void;
  end?: (data?: string) => void;
  status?: (code: number) => ServerResponse;
  json?: (data: unknown) => void;
}

/**
 * Standard Node.js Serverless Function / API handler for /api/chat
 */
export default async function handler(req: ServerRequest, res: ServerResponse) {
  // Helper functions for unified Node.js / Vercel response handling
  const sendJson = (statusCode: number, data: unknown) => {
    try {
      const setHeaderFn = res.setHeader;
      if (typeof setHeaderFn === 'function') {
        setHeaderFn.call(res, 'Content-Type', 'application/json');
      }

      const statusFn = res.status;
      const jsonFn = res.json;
      if (typeof statusFn === 'function' && typeof jsonFn === 'function') {
        const resObj = statusFn.call(res, statusCode);
        if (resObj && typeof resObj.json === 'function') {
          return resObj.json(data);
        }
      }
      res.statusCode = statusCode;
      const endFn = res.end;
      if (typeof endFn === 'function') {
        endFn.call(res, JSON.stringify(data));
      }
    } catch (err) {
      console.error('sendJson error:', err);
    }
  };

  try {
    // 1. HTTP OPTIONS & Method Check
    if (req.method === 'OPTIONS') {
      const fn = res.setHeader;
      if (typeof fn === 'function') {
        fn.call(res, 'Allow', 'POST, OPTIONS');
        fn.call(res, 'Content-Type', 'application/json');
      }
      const statusFn = res.status;
      if (typeof statusFn === 'function') {
        const resObj = statusFn.call(res, 204);
        if (resObj && typeof resObj.end === 'function') {
          return resObj.end();
        }
      }
      res.statusCode = 204;
      const endFn = res.end;
      if (typeof endFn === 'function') {
        endFn.call(res);
      }
      return;
    }

    if (req.method !== 'POST') {
      const fn = res.setHeader;
      if (typeof fn === 'function') {
        fn.call(res, 'Allow', 'POST, OPTIONS');
      }
      return sendJson(405, { error: 'Method Not Allowed. Only POST requests are supported.' });
    }

    // 2. IP Rate Limiting Check
    const rawIp =
      (req.headers && (req.headers['x-forwarded-for'] || req.headers['x-real-ip'])) ||
      req.socket?.remoteAddress ||
      '127.0.0.1';
    const ipStr = Array.isArray(rawIp) ? rawIp[0] : rawIp;
    const clientIp = ipStr ? ipStr.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return sendJson(429, { error: 'Rate limit exceeded. Please wait a minute before sending more messages.' });
    }

    // 3. Body Parsing & Payload Validation
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return sendJson(400, { error: 'Invalid JSON payload in request body.' });
      }
    } else if (!body && typeof (req as unknown as { on?: unknown }).on === 'function') {
      try {
        const raw = await new Promise<string>((resolve, reject) => {
          let acc = '';
          const reqStream = req as unknown as { on: (evt: string, fn: (chunk?: unknown) => void) => void };
          reqStream.on('data', (chunk?: unknown) => {
            acc += String(chunk || '');
            if (acc.length > 50000) {
              reject(new Error('Payload too large'));
            }
          });
          reqStream.on('end', () => resolve(acc));
          reqStream.on('error', (err?: unknown) => reject(err));
        });
        if (raw.trim()) {
          body = JSON.parse(raw);
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : '';
        if (errMsg === 'Payload too large') {
          return sendJson(400, { error: 'Payload size exceeds maximum allowed limit of 50KB.' });
        }
        return sendJson(400, { error: 'Invalid JSON payload in request body.' });
      }
    }

    if (!body || typeof body !== 'object') {
      return sendJson(400, { error: 'Request body must be a valid JSON object.' });
    }

    // Check payload size limit (50KB serialized boundary)
    const serializedBody = JSON.stringify(body);
    if (serializedBody.length > 50000) {
      return sendJson(400, { error: 'Payload size exceeds maximum allowed limit of 50KB.' });
    }

    const { messages } = body as { messages?: unknown };

    // 4. Validate `messages` array
    if (!messages || !Array.isArray(messages)) {
      return sendJson(400, { error: 'Request payload must contain a valid messages array.' });
    }

    if (messages.length === 0 || messages.length > 10) {
      return sendJson(400, { error: 'Messages array length must be between 1 and 10 items.' });
    }

    // 5. Validate individual messages
    const validatedMessages: ChatMessagePayload[] = [];
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i] as Record<string, unknown>;
      if (!msg || typeof msg !== 'object') {
        return sendJson(400, { error: `Message at index ${i} must be an object.` });
      }

      const { role, content } = msg;

      if (role !== 'user' && role !== 'assistant') {
        return sendJson(400, { error: `Message at index ${i} has invalid role '${String(role)}'. Expected 'user' or 'assistant'.` });
      }

      if (typeof content !== 'string') {
        return sendJson(400, { error: `Message at index ${i} must contain a string content field.` });
      }

      // Sanitize string (strip null control characters & trim)
      // eslint-disable-next-line no-control-regex
      const sanitized = content.replace(/\x00/g, '').trim();

      if (sanitized.length === 0) {
        return sendJson(400, { error: `Message at index ${i} content cannot be empty.` });
      }

      if (sanitized.length > 500) {
        return sendJson(400, { error: `Message at index ${i} exceeds maximum length of 500 characters.` });
      }

      validatedMessages.push({
        role: role as 'user' | 'assistant',
        content: sanitized,
      });
    }

    // 6. Construct System Prompt Server-Side
    const systemPrompt = buildSystemPrompt();

    // 7. Check Server Credential
    const provider = new OpenRouterProvider();

    // 8. Invoke LLM Provider with AbortController Timeout (10 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const responseText = await provider.generateResponse(
        validatedMessages,
        systemPrompt,
        controller.signal
      );
      clearTimeout(timeoutId);
      return sendJson(200, { message: responseText });
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof Error && err.name === 'AbortError') {
        return sendJson(504, { error: 'AI request timed out after 10 seconds. Please try again.' });
      }

      const errMsg = err instanceof Error ? err.message : '';

      if (errMsg.includes('OPENROUTER_API_KEY')) {
        return sendJson(503, {
          error: 'AI service is currently unavailable. Please try again later.',
        });
      }

      if (errMsg.includes('HTTP 429')) {
        return sendJson(429, { error: 'Rate limit exceeded. Please wait a minute before sending more messages.' });
      }

      return sendJson(502, { error: 'An unexpected error occurred while communicating with the AI service.' });
    }
  } catch (uncaughtErr: unknown) {
    console.error('Uncaught serverless handler error:', uncaughtErr);
    return sendJson(500, { error: 'An unexpected server error occurred.' });
  }
}

