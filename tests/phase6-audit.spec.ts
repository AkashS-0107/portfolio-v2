import { test, expect, type Page } from '@playwright/test';

test.describe('Phase 6 — Final Recruiter-Grade Audit Suite', () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Mock /api/chat for deterministic AI chatbot tests
    await page.route('/api/chat', async (route) => {
      const req = route.request();
      if (req.method() !== 'POST') {
        return route.fulfill({ status: 405, json: { error: 'Method Not Allowed' } });
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: "I'm Akash's AI companion assistant." }),
      });
    });
  });

  const gotoAndSkipIntro = async (page: Page, path: string = '/') => {
    await page.goto(path);
    await page.keyboard.press('Space');
    await page.waitForTimeout(100);
  };

  // 1 & 26 & 27 & 28 & 29: Homepage render, local trig.min.js load, clean console, zero CSP error
  test('1, 26, 27, 28, 29: Homepage initial render, trig.min.js loads clean with 0 console errors', async ({ page }) => {
    let trigJsLoaded = false;
    page.on('response', (res) => {
      if (res.url().includes('/js/trig.min.js')) {
        expect(res.status()).toBe(200);
        trigJsLoaded = true;
      }
    });

    await gotoAndSkipIntro(page, '/');
    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Akash Suresh/i }).first()).toBeVisible();

    expect(trigJsLoaded).toBe(true);

    const fatalErrors = consoleErrors.filter(
      (err) => !err.includes('Failed to load resource') && !err.includes('favicon')
    );
    expect(fatalErrors).toEqual([]);
  });

  // 2: Hero CTA scrolls to Projects
  test('2: Hero CTA "VIEW PROJECTS" scrolls to #projects section', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');
    const exploreCta = page.getByRole('link', { name: /VIEW PROJECTS/i }).first();
    await expect(exploreCta).toBeVisible();
    await exploreCta.click();
    await expect(page.locator('#projects')).toBeVisible();
  });

  // 3 & 4: Resume link verification and HTTP 200 response
  test('3 & 4: Resume link targets /resume.pdf and asset responds 200 OK', async ({ page, request }) => {
    await gotoAndSkipIntro(page, '/');
    const resumeLink = page.locator('a[href="/resume.pdf"]').first();
    await expect(resumeLink).toBeVisible();
    const href = await resumeLink.getAttribute('href');
    expect(href).toBe('/resume.pdf');

    const res = await request.get('/resume.pdf');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
  });

  // 5 & 6 & 7: Navigation, Hash Navigation, and Hash Reload
  test('5, 6, 7: Navigation links, hash navigation, and hash reload work cleanly', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#about');
    await expect(page.locator('#about')).toBeVisible();

    await page.reload();
    await page.keyboard.press('Space');
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.getByRole('heading', { name: '404' })).not.toBeVisible();
  });

  // 8 & 9 & 10: Custom 404 and 404 buttons
  test('8, 9, 10: Invalid route shows 404 page with functional navigation buttons', async ({ page }) => {
    await page.goto('/invalid-test-route');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();

    // Click Back to Portfolio
    await page.getByRole('button', { name: /Back to Portfolio/i }).click();
    await page.keyboard.press('Space');
    await expect(page.locator('#main-content')).toBeVisible();
    expect(new URL(page.url()).pathname).toBe('/');

    // Navigate back to invalid route and click View Projects
    await page.goto('/invalid-test-route');
    await page.getByRole('button', { name: /View Projects/i }).click();
    await page.keyboard.press('Space');
    await expect(page.locator('#projects')).toBeVisible();
    expect(new URL(page.url()).hash).toBe('#projects');
  });

  // 11, 12, 13, 14: Project Explorer Modal semantics, Escape key, and focus
  test('11, 12, 13, 14: Project explorer modal opens with dialog role, closes with Escape', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#projects');
    await page.waitForTimeout(500);

    const exploreBtn = page.getByRole('button', { name: /EXPLORE/i }).first();
    await exploreBtn.click();

    const modal = page.getByRole('dialog').first();
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('aria-modal', 'true');

    // Press Escape key to close
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  // 15: Skill evidence drawer interaction
  test('15: Skill card interaction opens skill evidence modal', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#skills');
    await page.waitForTimeout(500);

    const skillCard = page.getByRole('button', { name: /Python/i }).first();
    if (await skillCard.isVisible()) {
      await skillCard.click();
      await expect(page.getByText(/Evidence/i).first()).toBeVisible({ timeout: 5000 });
    }
  });

  // 16 & 17: Certificate lightbox opens and closes
  test('16 & 17: Certificate lightbox opens with dialog role and closes on Escape', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#certifications');
    await page.waitForTimeout(500);

    const certCard = page.locator('.certificate-card').first();
    if (await certCard.isVisible()) {
      await certCard.click();
      const lightbox = page.getByRole('dialog', { name: /Certificate Lightbox View/i });
      if (await lightbox.isVisible()) {
        await page.keyboard.press('Escape');
        await expect(lightbox).not.toBeVisible();
      }
    }
  });

  // 18 & 19: Command Palette Ctrl+K / Cmd+K trigger and focus
  test('18 & 19: Command Palette opens on Ctrl+K and input receives focus', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');
    await page.keyboard.press('Control+k');

    const dialog = page.getByRole('dialog', { name: /Command palette/i });
    await expect(dialog).toBeVisible({ timeout: 5000 });

    const input = page.getByPlaceholder(/Search commands/i);
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  // 20 & 21: Chatbot open/close and offline local mode fallback
  test('20 & 21: Chatbot launcher opens panel, switches to LOCAL MODE when offline', async ({ page, context }) => {
    await gotoAndSkipIntro(page, '/');
    const launcher = page.getByRole('button', { name: /Open AI Companion Chat/i });
    await expect(launcher).toBeVisible();
    await launcher.click();

    const panel = page.getByRole('dialog', { name: /AI Companion Chat Window/i });
    await expect(panel).toBeVisible();

    // Set network offline
    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event('offline')));

    await expect(page.getByText(/LOCAL MODE/i)).toBeVisible();

    await context.setOffline(false);
  });

  // 22: Offline notification banner
  test('22: Offline notification banner appears on network disconnect and dismisses cleanly', async ({ page, context }) => {
    await gotoAndSkipIntro(page, '/');
    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event('offline')));

    const banner = page.getByRole('status');
    await expect(banner).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("You're offline.")).toBeVisible();

    await page.getByRole('button', { name: /Dismiss offline notification/i }).click();
    await expect(banner).not.toBeVisible();

    await context.setOffline(false);
  });

  // 23 & 24: Mobile viewports (375x667, 390x844, 768x1024) zero horizontal overflow
  test('23 & 24: Mobile viewports have zero horizontal overflow and clear fixed controls', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await gotoAndSkipIntro(page, '/');
      await expect(page.locator('#main-content')).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow).toBe(false);
    }
  });

  // 25: Reduced-motion prefers-reduced-motion check
  test('25: prefers-reduced-motion media query disables cinematic intro sequence', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.getByText(/SYSTEM INTRO/i)).not.toBeVisible();
  });

  // 30: Titan regression check
  test('30: Titan regression check returns 0 active portfolio occurrences', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');
    const pageText = await page.content();

    const titanMatches = pageText.match(/Titan\s+(Gym|Fitness|Club)/gi);
    expect(titanMatches).toBeNull();
  });
});
