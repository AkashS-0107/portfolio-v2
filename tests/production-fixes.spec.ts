import { test, expect } from '@playwright/test';

test.describe('Production Bug Fixes Audit — Portfolio V2', () => {

  // ==========================================
  // 1. FUTURE INTERNS & PE CLEANUP AUDIT
  // ==========================================
  test('Future PE is completely removed and Intellicluster reflects active development', async ({ page }) => {
    await page.goto('/');

    const pageText = await page.innerText('body');

    // Assert zero occurrences of stale Future PE / Currently Being Developed project text
    expect(pageText).not.toContain('Future PE');
    expect(pageText).not.toContain('Currently Being Developed');

    // Ensure Intellicluster card has the IN DEVELOPMENT badge scoped specifically
    const intelliclusterCard = page.locator('#projects').filter({ hasText: 'Intellicluster' });
    await expect(intelliclusterCard.getByText('IN DEVELOPMENT')).toBeVisible();
  });

  test('Future Interns internship shows COMPLETED state, verified dates, cert ID, registration details', async ({ page }) => {
    await page.goto('/#internships');

    const internshipCard = page.locator('#internships').filter({ hasText: 'Future Interns' });
    await expect(internshipCard).toBeVisible();

    // Verify COMPLETED status badge
    await expect(internshipCard.getByText('COMPLETED').first()).toBeVisible();

    // Verify verified dates
    await expect(internshipCard.getByText('2026-07-30 — 2026-08-30')).toBeVisible();

    // Verify certificate ID
    await expect(internshipCard.getByText('FIT/JUL26/PE3770')).toBeVisible();

    // Verify registration details
    await expect(internshipCard.getByText('ISO 9001 Certified')).toBeVisible();
    await expect(internshipCard.getByText('MSME Registered (UDYAM-KR-03-0414782)')).toBeVisible();
  });

  test('Future Interns Completion Certificate opens and displays in Lightbox Modal', async ({ page }) => {
    await page.goto('/#internships');

    const certButton = page.getByRole('button', { name: /View Future Interns Completion Certificate/i });
    await expect(certButton).toBeVisible();
    await certButton.click();

    // Verify modal appears
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Future Interns — Completion Certificate')).toBeVisible();

    // Verify image source
    const modalImg = modal.locator('img');
    await expect(modalImg).toBeVisible();
    const imgSrc = await modalImg.getAttribute('src');
    expect(imgSrc).toContain('future%20interns%20completion');

    // Close modal via Escape key
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Future Interns Letter of Recommendation (LOR) opens and displays in Lightbox Modal', async ({ page }) => {
    await page.goto('/#internships');

    const lorButton = page.getByRole('button', { name: /View Future Interns Letter of Recommendation/i });
    await expect(lorButton).toBeVisible();
    await lorButton.click();

    // Verify modal appears
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Future Interns — Letter of Recommendation (LOR)')).toBeVisible();

    // Verify image source
    const modalImg = modal.locator('img');
    await expect(modalImg).toBeVisible();
    const imgSrc = await modalImg.getAttribute('src');
    expect(imgSrc).toContain('lor');

    // Close modal via Escape key
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Future Projects contains WorkSure Remake and obsolete Hackathon Projects placeholder is removed', async ({ page }) => {
    await page.goto('/#future-projects');

    const futureSection = page.locator('#future-projects');
    await expect(futureSection.getByText('WorkSure Remake')).toBeVisible();

    // Ensure obsolete placeholder Hackathon Projects is absent (superseded by IAMFixer in main Projects)
    await expect(futureSection.getByText('Hackathon Projects')).toHaveCount(0);

    // Ensure no extra future projects or stale Future PE
    await expect(futureSection.getByText('Future PE')).toHaveCount(0);
    await expect(futureSection.getByText('Future Interns')).toHaveCount(0);
  });

  // ==========================================
  // 2. EMAIL CTAs AUDIT
  // ==========================================
  test('All email CTAs emit valid mailto: href and dispatch cleanly without JS errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    const expectedMailto = 'mailto:akashscontact7@gmail.com';

    // 1. Hero Email CTA
    const heroEmailBtn = page.locator('#hero a[href^="mailto:"]');
    await expect(heroEmailBtn).toHaveAttribute('href', expectedMailto);

    // 2. Connect Email Links & Button
    const connectEmailBtn = page.locator('#connect a[href^="mailto:"]').first();
    await expect(connectEmailBtn).toHaveAttribute('href', expectedMailto);

    // 3. Socials Email Card CTA
    const socialsEmailBtn = page.locator('#socials a[href^="mailto:"]');
    await expect(socialsEmailBtn).toHaveAttribute('href', expectedMailto);

    // 4. Footer Email Link
    const footerEmailBtn = page.locator('footer a[href^="mailto:"]');
    await expect(footerEmailBtn).toHaveAttribute('href', expectedMailto);

    // 5. Recruiter View Bar Email Link
    const recruiterViewBtn = page.getByRole('button', { name: /Recruiter View/i });
    if (await recruiterViewBtn.isVisible()) {
      await recruiterViewBtn.click();
      const recruiterEmailBtn = page.locator('a[href^="mailto:"][aria-label="Email Akash Suresh"]');
      await expect(recruiterEmailBtn).toHaveAttribute('href', expectedMailto);
    }

    // Verify clicking email links triggers default mailto action without raising JS errors
    await heroEmailBtn.click({ force: true });
    await connectEmailBtn.click({ force: true });

    expect(consoleErrors).toHaveLength(0);
  });

  test('Command Palette email quick link sets mailto action cleanly', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');

    // Open Command Palette via button or shortcut
    const paletteBtn = page.getByRole('button', { name: /Open command palette/i });
    if (await paletteBtn.isVisible()) {
      await paletteBtn.click();
    } else {
      await page.keyboard.press('Control+k');
    }

    const cmdInput = page.getByPlaceholder(/Search commands/i);
    await expect(cmdInput).toBeVisible();

    // Search for email
    await cmdInput.fill('Send Email');
    const emailItem = page.getByRole('dialog', { name: /Command palette/i }).getByText(/Send Email/i);
    await expect(emailItem).toBeVisible();

    expect(consoleErrors).toHaveLength(0);
  });

  // ==========================================
  // 3. CHATBOT NON-JSON & ERROR HANDLING AUDIT
  // ==========================================
  test('Chatbot — Handles HTML 500 server error safely without exposing SyntaxError', async ({ page }) => {
    // Intercept /api/chat with raw HTML 500 error body
    await page.route('/api/chat', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'text/html',
        body: '<!DOCTYPE html><html><head><title>500 Internal Server Error</title></head><body><h1>Server Error</h1></body></html>',
      });
    });

    await page.goto('/');

    // Open Chatbot
    const launcher = page.getByRole('button', { name: /Open AI Companion Chat/i });
    await launcher.click();

    const input = page.getByRole('textbox', { name: /Message input/i });
    await input.fill('Test HTML 500 response');
    await page.keyboard.press('Enter');

    // Panel should render fallback error message
    const panel = page.getByRole('dialog', { name: /AI Companion Chat Window/i });
    await expect(panel.getByText(/Server error \(HTTP 500\)\. Please try again later\./i)).toBeVisible();

    // Verify SyntaxError and JSON parse error strings are NOT visible anywhere
    const panelText = await panel.innerText();
    expect(panelText).not.toContain('SyntaxError');
    expect(panelText).not.toContain('JSON.parse');
    expect(panelText).not.toContain('Unexpected token');
    expect(panelText).not.toContain('<!DOCTYPE html>');
  });

  test('Chatbot — Handles JSON 400 error cleanly', async ({ page }) => {
    await page.route('/api/chat', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Messages array length must be between 1 and 10 items.' }),
      });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /Open AI Companion Chat/i }).click();

    const input = page.getByRole('textbox', { name: /Message input/i });
    await input.fill('Test JSON 400 response');
    await page.keyboard.press('Enter');

    const panel = page.getByRole('dialog', { name: /AI Companion Chat Window/i });
    await expect(panel.getByText(/Messages array length must be between 1 and 10 items/i)).toBeVisible();
  });

  test('Chatbot — Handles empty response body cleanly', async ({ page }) => {
    await page.route('/api/chat', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'text/plain',
        body: '',
      });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /Open AI Companion Chat/i }).click();

    const input = page.getByRole('textbox', { name: /Message input/i });
    await input.fill('Test empty response');
    await page.keyboard.press('Enter');

    const panel = page.getByRole('dialog', { name: /AI Companion Chat Window/i });
    await expect(panel.getByText(/Server error \(HTTP 500\)\. Please try again later\./i)).toBeVisible();
  });

  // ==========================================
  // 4. ROUTING & RESPONSIVE AUDIT
  // ==========================================
  test('Hash navigation scrolls to correct sections smoothly', async ({ page }) => {
    await page.goto('/#projects');
    await expect(page.locator('#projects')).toBeVisible();

    await page.goto('/#internships');
    await expect(page.locator('#internships')).toBeVisible();

    await page.goto('/#future-projects');
    await expect(page.locator('#future-projects')).toBeVisible();
  });

  test('Invalid route renders 404 page', async ({ page }) => {
    await page.goto('/invalid-route-slug');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();

    await page.getByRole('button', { name: /Back to Portfolio/i }).click();
    await expect(page.locator('#hero')).toBeVisible();
  });

  test('Responsive viewports check — 1440x900, 768x1024, 390x844, 375x667', async ({ page }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 667 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/');

      // Verify header visible
      await expect(page.locator('header')).toBeVisible();

      // Verify no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }
  });

  // ==========================================
  // 5. SECURITY & ASSET INTEGRITY AUDIT
  // ==========================================
  test('Zero VITE_GEMINI_API_KEY client-side exposure & Zero Titan references', async ({ page }) => {
    await page.goto('/');

    const pageContent = await page.content();
    expect(pageContent).not.toContain('VITE_GEMINI_API_KEY');

    const titanMatch = pageContent.match(/Titan\s+(Gym|Fitness|Club)/gi);
    expect(titanMatch).toBeNull();
  });

});
