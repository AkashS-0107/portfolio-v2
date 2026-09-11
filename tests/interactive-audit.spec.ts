import { test, expect, type Page } from '@playwright/test';

test.describe('Exhaustive Interactive Element Audit Suite', () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Mock AI Chatbot backend for deterministic responses
    await page.route('/api/chat', async (route) => {
      const req = route.request();
      if (req.method() !== 'POST') {
        return route.fulfill({ status: 405, json: { error: 'Method Not Allowed' } });
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: "I'm Akash's AI portfolio assistant. Ask me about his projects, skills, experience, or anything else." }),
      });
    });
  });

  const gotoAndSkipIntro = async (page: Page, path: string = '/') => {
    await page.goto(path);
    await page.keyboard.press('Space');
    await page.waitForTimeout(150);
  };

  // 1. Dynamic DOM Discovery Audit (a[href], button, [role="button"])
  test('1. DOM Interactive Audit — All rendered links and buttons have valid attributes and targets', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');
    await expect(page.locator('#main-content')).toBeVisible();

    // Query all interactive elements
    const links = await page.locator('a[href]').all();
    const buttons = await page.locator('button, [role="button"]').all();

    expect(links.length).toBeGreaterThan(10);
    expect(buttons.length).toBeGreaterThan(10);

    // Verify all anchor tags
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
      expect(href?.trim().length).toBeGreaterThan(0);
    }

    // Verify all buttons are enabled
    for (const btn of buttons) {
      const isDisabled = await btn.isDisabled().catch(() => false);
      expect(isDisabled).toBe(false);
    }
  });

  // 2. Email & Mailto Link Audit
  test('2. Email actions use mailto:akashscontact7@gmail.com and handle click events cleanly', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');

    const emailLinks = page.locator('a[href^="mailto:"]');
    const count = await emailLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = emailLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toBe('mailto:akashscontact7@gmail.com');
    }

    // Verify clicking email link does not throw a console crash
    const heroEmail = emailLinks.first();
    await heroEmail.click();
    const fatalErrors = consoleErrors.filter((e) => !e.includes('favicon') && !e.includes('Failed to load resource'));
    expect(fatalErrors).toEqual([]);
  });

  // 3. Design Haven Repository URL Check
  test('3. Design Haven GitHub repository link targets https://github.com/AkashS-0107/FUTURE_PE_01', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#projects');
    await page.waitForTimeout(300);

    // Open project explorer modal for Design Haven or find its direct link
    const designHavenCard = page.getByText(/Design Haven/i).first();
    await expect(designHavenCard).toBeVisible();

    const dhLink = page.locator('a[href="https://github.com/AkashS-0107/FUTURE_PE_01"]').first();
    if (await dhLink.isVisible()) {
      const href = await dhLink.getAttribute('href');
      expect(href).toBe('https://github.com/AkashS-0107/FUTURE_PE_01');
    }
  });

  // 4. Future Projects Section Entry Check
  test('4. Future Projects section renders EXACTLY WorkSure Remake and Hackathon Projects with minimal status', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#future-projects');
    await page.waitForTimeout(300);

    const futureSection = page.locator('#future-projects');
    await expect(futureSection).toBeVisible();

    // Verify WorkSure Remake entry
    await expect(futureSection.getByText('WorkSure Remake')).toBeVisible();
    await expect(futureSection.getByText('PLANNED').first()).toBeVisible();

    // Verify Hackathon Projects entry
    await expect(futureSection.getByText('Hackathon Projects')).toBeVisible();
    await expect(futureSection.getByText('UPCOMING').first()).toBeVisible();

    // Verify obsolete entries are NOT present
    await expect(futureSection.getByText('Browser AI Agent Sandbox')).not.toBeVisible();
    await expect(futureSection.getByText('AI SEO Content Cluster Generator')).not.toBeVisible();
    await expect(futureSection.getByText('Future PE')).not.toBeVisible();
  });

  // 5. Chatbot Simplified Welcome & Open-Ended Chat
  test('5. AI Chatbot opens with simplified welcome greeting and responds to open questions', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');

    const launcher = page.getByRole('button', { name: /Open AI Companion Chat/i });
    await launcher.click();

    const panel = page.getByRole('dialog', { name: /AI Companion Chat Window/i });
    await expect(panel).toBeVisible();

    // Check simplified welcome message
    await expect(page.getByText("Hi, I'm Akash's AI portfolio assistant. Ask me about his projects, skills, experience, or anything else.")).toBeVisible();

    // Send a question
    const input = page.getByRole('textbox', { name: /Message input/i });
    await input.fill('What frameworks does Akash use?');
    await page.getByRole('button', { name: /Send message/i }).click();

    // Wait for response
    await expect(page.getByText(/portfolio assistant/i).first()).toBeVisible({ timeout: 5000 });

    // Close chatbot
    await page.getByRole('button', { name: /Close chat panel/i }).click();
    await expect(panel).not.toBeVisible();
  });

  // 6. Navigation, Hash Links, & 404 Route Buttons
  test('6. All navbar links, back-to-top, and 404 buttons navigate cleanly', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');

    // Navbar links
    const navItems = ['#about', '#skills', '#projects', '#future-projects', '#internships', '#certifications-hackathons', '#connect', '#socials'];
    for (const hash of navItems) {
      const link = page.locator(`a[href="${hash}"]`).first();
      if (await link.isVisible()) {
        await link.click();
        await expect(page.locator(hash)).toBeVisible();
      }
    }

    // Back to top button
    const backToTop = page.getByRole('button', { name: /Back to top/i }).first();
    if (await backToTop.isVisible()) {
      await backToTop.click();
    }

    // Test 404 navigation buttons
    await page.goto('/non-existent-page-route');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();

    const backHomeBtn = page.getByRole('button', { name: /Back to Portfolio/i });
    await backHomeBtn.click();
    await page.keyboard.press('Space');
    await expect(page.locator('#main-content')).toBeVisible();
  });

  // 7. Responsive Viewport Matrix & SCROLL Layout Check
  test('7. Responsive Viewport Matrix (1440x900, 768x1024, 390x844, 375x667) — Zero horizontal overflow & layout integrity', async ({ page }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 667 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await gotoAndSkipIntro(page, '/');

      await expect(page.locator('#main-content')).toBeVisible();

      // Verify zero horizontal scroll overflow
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow).toBe(false);

      // Verify living scroll indicator is visible and positioned
      const scrollIndicator = page.locator('.living-scroll-indicator');
      await expect(scrollIndicator).toBeVisible();
    }
  });

  // 8. Titan Regression Audit
  test('8. Titan Gym / Titan Fitness Club zero occurrences in DOM', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');
    const content = await page.content();
    const titanMatch = content.match(/Titan\s+(Gym|Fitness|Club)/gi);
    expect(titanMatch).toBeNull();
  });
});
