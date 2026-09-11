import { test, expect } from '@playwright/test';
import { OpenRouterProvider } from '../src/lib/chatbot/provider';
import * as fs from 'fs';

test.describe('Phase 5.1 — OpenRouter Provider Migration', () => {
  test('Provider configuration resolves to google/gemini-2.5-flash', async () => {
    const provider = new OpenRouterProvider();
    expect(provider.getModelName()).toBe('google/gemini-2.5-flash');
    expect(provider.name).toBe('OpenRouter (Gemini)');
  });

  test('OpenRouterProvider rejects when OPENROUTER_API_KEY is missing', async () => {
    const provider = new OpenRouterProvider();
    await expect(
      provider.generateResponse([{ role: 'user', content: 'hello' }], 'system')
    ).rejects.toThrow('OPENROUTER_API_KEY is not configured on the server.');
  });

  test('OpenRouterProvider rejects malformed JSON response', async () => {
    const provider = new OpenRouterProvider('fake-key');

    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => {
      return new Response('invalid json', { status: 200 });
    }) as typeof fetch;

    try {
      await expect(
        provider.generateResponse([{ role: 'user', content: 'hello' }], 'system')
      ).rejects.toThrow('Malformed response structure from upstream LLM provider.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test('OpenRouterProvider rejects response with empty choices array', async () => {
    const provider = new OpenRouterProvider('fake-key');

    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({ choices: [] }), { status: 200 });
    }) as typeof fetch;

    try {
      await expect(
        provider.generateResponse([{ role: 'user', content: 'hello' }], 'system')
      ).rejects.toThrow('Malformed response structure from upstream LLM provider.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test('OpenRouterProvider rejects response with empty content', async () => {
    const provider = new OpenRouterProvider('fake-key');

    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({ choices: [{ message: { content: '   ' } }] }), {
        status: 200,
      });
    }) as typeof fetch;

    try {
      await expect(
        provider.generateResponse([{ role: 'user', content: 'hello' }], 'system')
      ).rejects.toThrow('Malformed response structure from upstream LLM provider.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test('OpenRouterProvider handles upstream HTTP 401 error safely', async () => {
    const provider = new OpenRouterProvider('fake-key');

    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => {
      return new Response('Unauthorized', { status: 401 });
    }) as typeof fetch;

    try {
      await expect(
        provider.generateResponse([{ role: 'user', content: 'hello' }], 'system')
      ).rejects.toThrow('Upstream Provider HTTP 401');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test('Regression Check: Active provider code contains ZERO GEMINI_API_KEY references', async () => {
    const providerCode = fs.readFileSync('src/lib/chatbot/provider.ts', 'utf-8');
    const apiCode = fs.readFileSync('api/chat.ts', 'utf-8');
    expect(providerCode).not.toContain('GEMINI_API_KEY');
    expect(apiCode).not.toContain('GEMINI_API_KEY');
  });
});

test.describe('Phase 5 — Mini Open-Ended AI Chatbot UI & Integration', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept POST /api/chat with deterministic mock response
    await page.route('/api/chat', async (route) => {
      const request = route.request();

      if (request.method() !== 'POST') {
        return route.fulfill({ status: 405, json: { error: 'Method Not Allowed' } });
      }

      let lastUserMsg = '';
      try {
        const postData = JSON.parse(request.postData() || '{}') as {
          messages?: Array<{ role?: string; content?: string }>;
        };
        if (postData.messages && postData.messages.length > 0) {
          lastUserMsg = postData.messages[postData.messages.length - 1]?.content || '';
        }
      } catch {
        return route.fulfill({ status: 400, json: { error: 'Invalid JSON payload.' } });
      }

      let mockResponse = "I'm Akash's AI companion. I can answer questions about his portfolio, full-stack work, or general tech!";

      if (lastUserMsg.toLowerCase().includes('girlfriend') || lastUserMsg.toLowerCase().includes('gf')) {
        mockResponse = "I process portfolio data and code architectures, not Akash's private relationship department!";
      } else if (lastUserMsg.toLowerCase().includes('projects') || lastUserMsg.toLowerCase().includes('design haven')) {
        mockResponse = "Akash has built Design Haven (Spatial UI showcase) and WorkSure (Employment platform).";
      } else if (lastUserMsg.toLowerCase().includes('react')) {
        mockResponse = "React is a popular JavaScript library for building user interfaces based on components.";
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: mockResponse }),
      });
    });
  });

  test('Desktop (1440x900) — Launcher opens panel, focus moves to input, Escape closes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const launcher = page.getByRole('button', { name: /Open AI Companion Chat/i });
    await expect(launcher).toBeVisible();

    // Click launcher
    await launcher.click();

    // Chat panel opens
    const panel = page.getByRole('dialog', { name: /AI Companion Chat Window/i });
    await expect(panel).toBeVisible();

    // Input receives focus
    const input = page.getByRole('textbox', { name: /Message input/i });
    await expect(input).toBeFocused();

    // Press Escape key
    await page.keyboard.press('Escape');

    // Panel closes
    await expect(panel).not.toBeVisible();

    // Focus returns to launcher
    await expect(launcher).toBeFocused();
  });

  test('Desktop (1440x900) — Sends message via Enter & Button click, renders replies', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await page.getByRole('button', { name: /Open AI Companion Chat/i }).click();
    const panel = page.getByRole('dialog', { name: /AI Companion Chat Window/i });
    const input = page.getByRole('textbox', { name: /Message input/i });

    // Type portfolio question & press Enter
    await input.fill('What projects has Akash built?');
    await page.keyboard.press('Enter');

    // Assert user bubble and assistant mock reply render inside panel
    await expect(panel.getByText('What projects has Akash built?')).toBeVisible();
    await expect(panel.getByText(/Design Haven/i)).toBeVisible();

    // Send technical question via Send button click
    await input.fill('Explain React');
    await page.getByRole('button', { name: /Send message/i }).click();

    await expect(panel.getByText('Explain React')).toBeVisible();
    await expect(panel.getByText(/JavaScript library/i)).toBeVisible();
  });

  test('Desktop (1440x900) — Private question receives privacy-safe response', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await page.getByRole('button', { name: /Open AI Companion Chat/i }).click();
    const input = page.getByRole('textbox', { name: /Message input/i });

    await input.fill("Who is Akash's gf?");
    await page.keyboard.press('Enter');

    await expect(page.getByText(/private relationship department/i)).toBeVisible();
  });

  test('Desktop (1440x900) — Empty submission is blocked', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await page.getByRole('button', { name: /Open AI Companion Chat/i }).click();
    const sendBtn = page.getByRole('button', { name: /Send message/i });

    // Send button disabled when empty
    await expect(sendBtn).toBeDisabled();
  });

  test('Mobile (375x667) — Panel fits viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const launcher = page.getByRole('button', { name: /Open AI Companion Chat/i });
    await expect(launcher).toBeVisible();
    await launcher.click();

    const panel = page.getByRole('dialog', { name: /AI Companion Chat Window/i });
    await expect(panel).toBeVisible();

    // Check no horizontal scrollbar on body
    const bodyScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const bodyClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth);
  });

  test('Offline Mode — Bypasses /api/chat and uses local fallback engine', async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.keyboard.press('Space');

    const launcher = page.getByRole('button', { name: /Open AI Companion Chat/i });
    await expect(launcher).toBeVisible();

    // Track API calls
    let apiCalled = false;
    await page.route('/api/chat', async (route) => {
      apiCalled = true;
      route.fulfill({ status: 200, json: { message: 'API Call' } });
    });

    // Simulate offline status
    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event('offline')));

    await launcher.click();
    await expect(page.getByText(/LOCAL MODE/i)).toBeVisible();

    const input = page.getByRole('textbox', { name: /Message input/i });
    await input.fill('What projects exist?');
    await page.keyboard.press('Enter');

    // Local response renders
    await expect(page.getByText(/Akash has built public projects/i)).toBeVisible();
    expect(apiCalled).toBe(false);

    // Restore online
    await context.setOffline(false);
  });

  test('API failure produces safe retryable UI', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Override route to fail with 500 error
    await page.route('/api/chat', async (route) => {
      route.fulfill({ status: 500, json: { error: 'Server Error' } });
    });

    await page.getByRole('button', { name: /Open AI Companion Chat/i }).click();
    const input = page.getByRole('textbox', { name: /Message input/i });

    await input.fill('Trigger failure');
    await page.keyboard.press('Enter');

    // Retry banner renders
    await expect(page.getByRole('button', { name: /Retry/i })).toBeVisible();
  });

  test('Non-JSON HTML 500 server error does not expose Unexpected token to user', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Intercept route to respond with HTML 500 error page from server/gateway
    await page.route('/api/chat', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'text/html',
        body: '<html><body>A server error occurred</body></html>',
      });
    });

    await page.getByRole('button', { name: /Open AI Companion Chat/i }).click();
    const input = page.getByRole('textbox', { name: /Message input/i });

    await input.fill('Test HTML server error');
    await page.keyboard.press('Enter');

    // UI should display clean server error note without SyntaxError parsing text
    const errorNote = page.getByText(/Server error \(HTTP 500\)/i);
    await expect(errorNote).toBeVisible();

    // Crucially: UI MUST NOT expose "Unexpected token" or "is not valid JSON"
    const content = await page.content();
    expect(content).not.toContain('Unexpected token');
    expect(content).not.toContain('is not valid JSON');

    // Retry button renders
    await expect(page.getByRole('button', { name: /Retry/i })).toBeVisible();
  });
});

test.describe('Phase 5 — Server API Validation (/api/chat)', () => {

  test('Method check: GET /api/chat returns 405 Method Not Allowed', async ({ request }) => {
    const res = await request.get('/api/chat');
    expect(res.status()).toBe(405);
    const json = (await res.json()) as { error: string };
    expect(json.error).toContain('Method Not Allowed');
  });

  test('Method check: OPTIONS /api/chat returns 204 with Allow header', async ({ request }) => {
    const res = await request.fetch('/api/chat', { method: 'OPTIONS' });
    expect([200, 204]).toContain(res.status());
    const allowHeader = res.headers()['allow'] || res.headers()['access-control-allow-methods'];
    expect(allowHeader).toContain('POST');
  });

  test('Validation: Missing messages returns 400 Bad Request', async ({ request }) => {
    const res = await request.post('/api/chat', {
      data: {},
    });
    expect(res.status()).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toContain('messages array');
  });

  test('Validation: Empty messages array returns 400 Bad Request', async ({ request }) => {
    const res = await request.post('/api/chat', {
      data: { messages: [] },
    });
    expect(res.status()).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toContain('length must be between 1 and 10');
  });

  test('Validation: Invalid role returns 400 Bad Request', async ({ request }) => {
    const res = await request.post('/api/chat', {
      data: {
        messages: [{ role: 'admin', content: 'hello' }],
      },
    });
    expect(res.status()).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toContain("invalid role 'admin'");
  });

  test('Validation: Empty string content returns 400 Bad Request', async ({ request }) => {
    const res = await request.post('/api/chat', {
      data: {
        messages: [{ role: 'user', content: '   ' }],
      },
    });
    expect(res.status()).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toContain('cannot be empty');
  });

  test('Validation: Over 500 characters content returns 400 Bad Request', async ({ request }) => {
    const longString = 'a'.repeat(501);
    const res = await request.post('/api/chat', {
      data: {
        messages: [{ role: 'user', content: longString }],
      },
    });
    expect(res.status()).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toContain('exceeds maximum length of 500');
  });

  test('Validation: More than 10 messages returns 400 Bad Request', async ({ request }) => {
    const messages = Array.from({ length: 11 }, (_, i) => ({
      role: 'user',
      content: `msg ${i}`,
    }));
    const res = await request.post('/api/chat', {
      data: { messages },
    });
    expect(res.status()).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toContain('length must be between 1 and 10');
  });

  test('Missing OPENROUTER_API_KEY returns 503 Service Unavailable JSON', async ({ request }) => {
    const res = await request.post('/api/chat', {
      data: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    });
    expect(res.status()).toBe(503);
    const json = (await res.json()) as { error?: string };
    expect(json.error).toBe('AI service is currently unavailable. Please try again later.');
  });
});

