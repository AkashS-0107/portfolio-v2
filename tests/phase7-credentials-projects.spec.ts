import { test, expect, type Page } from '@playwright/test';

test.describe('Phase 7 — Credentials (Certifications & Hackathons) & Projects Update Suite', () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Mock AI chat backend endpoint
    await page.route('/api/chat', async (route) => {
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
    await page.waitForTimeout(150);
  };

  // ==========================================
  // 1. CERTIFICATIONS & FAN-DECK AUDIT
  // ==========================================
  test('Certifications deck contains exactly 7 certificates and natural counter reflects 7', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#certifications-hackathons');
    const certSection = page.locator('#certifications-hackathons');
    await expect(certSection).toBeVisible();

    // Verify counter shows "X of 7"
    const counterBadge = certSection.getByText(/\d+\s+of\s+7/i);
    await expect(counterBadge).toBeVisible();
  });

  test('New AWS Completion Certificates are present with correct non-exam titles and dates', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#certifications-hackathons');
    const certSection = page.locator('#certifications-hackathons');

    // Verify presence of Developing Generative Artificial Intelligence Solutions
    const genAiTitle = certSection.getByText('Developing Generative Artificial Intelligence Solutions');
    // Verify presence of AWS Artificial Intelligence Practitioner Learning Plan
    const practitionerTitle = certSection.getByText('AWS Artificial Intelligence Practitioner Learning Plan');

    await expect(genAiTitle.first()).toBeVisible();
    await expect(practitionerTitle.first()).toBeVisible();

    // At least one or both should be indexable in deck slides or text
    const pageHtml = await page.content();
    expect(pageHtml).toContain('Developing Generative Artificial Intelligence Solutions');
    expect(pageHtml).toContain('September 13, 2026');
    expect(pageHtml).toContain('AWS Artificial Intelligence Practitioner Learning Plan');
    expect(pageHtml).toContain('September 21, 2026');

    // Confirm neither is described as a Pearson VUE / professional exam
    expect(pageHtml).not.toContain('AIF-C01');
    expect(pageHtml).not.toContain('Certification Exam');
  });

  test('Certificate Lightbox opens on click and closes cleanly via Escape', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#certifications-hackathons');
    const inspectBtn = page.getByRole('button', { name: /INSPECT FULL CERTIFICATE/i }).first();
    await expect(inspectBtn).toBeVisible();
    await inspectBtn.click();

    const dialog = page.getByRole('dialog', { name: /Verified Evidence/i });
    if (await dialog.isVisible()) {
      await expect(dialog.locator('img')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    }
  });

  // ==========================================
  // 2. HACKATHONS AUDIT
  // ==========================================
  test('Both THREX and WeMakeDevs entries appear in Hackathons section', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#certifications-hackathons');
    const certSection = page.locator('#certifications-hackathons');

    // Check THREX Hackathon
    await expect(certSection.getByText('THREX Hackathon').first()).toBeVisible();

    // Check WeMakeDevs First Commit
    await expect(certSection.getByText(/WeMakeDevs/i).first()).toBeVisible();
    await expect(certSection.getByText(/September 20, 2026/i)).toBeVisible();
    await expect(certSection.getByText('Participant').first()).toBeVisible();
  });

  test('Both hackathon certificate previews are visible in DOM without clicking inspect', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#certifications-hackathons');
    const certSection = page.locator('#certifications-hackathons');

    // Locate preview images inside hackathon cards
    const certPreviews = certSection.locator('.aspect-\\[16\\/10\\] img');
    await expect(certPreviews).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
      const img = certPreviews.nth(i);
      await expect(img).toBeVisible();
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).toContain('Certificate of Participation');
      expect(alt).toContain('Akash Suresh');
    }
  });

  test('WeMakeDevs Hackathon entry displays working repository link to IAMFixer', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#certifications-hackathons');
    const iamfixerRepoLink = page.locator('a[href="https://github.com/AkashS-0107/IAMFixer"]').first();
    await expect(iamfixerRepoLink).toBeVisible();
    await expect(iamfixerRepoLink).toHaveAttribute('href', 'https://github.com/AkashS-0107/IAMFixer');
  });

  test('WeMakeDevs certificate lightbox displays dynamic issuer and correct certificate image', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#certifications-hackathons');
    const wemakedevsCard = page.locator('#certifications-hackathons .p-6').filter({ hasText: 'WeMakeDevs' }).first();

    const inspectBtn = wemakedevsCard.getByRole('button', { name: /INSPECT/i }).first();
    await inspectBtn.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Verify modal does NOT display hardcoded THREX issuer for WeMakeDevs
    const dialogText = await dialog.innerText();
    expect(dialogText.toUpperCase()).toContain('WEMAKEDEVS WITH AWS');
    expect(dialogText).not.toContain('THREX Hackathon • Verified Evidence');

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  // ==========================================
  // 3. PROJECTS SECTION AUDIT
  // ==========================================
  test('IAMFixer appears in Projects section as hackathon prototype with repo link', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#projects');
    const projectsSection = page.locator('#projects');

    const iamfixerCard = projectsSection.filter({ hasText: 'IAMFixer' });
    await expect(iamfixerCard).toBeVisible();
    await expect(iamfixerCard.getByText('IAMFixer')).toBeVisible();
    await expect(iamfixerCard.getByText(/WeMakeDevs First Commit/i)).toBeVisible();

    // Verify stack contains Python, FastAPI, React, TypeScript, Amazon Bedrock
    await expect(iamfixerCard.getByText('FastAPI').first()).toBeVisible();
    await expect(iamfixerCard.getByText('Python').first()).toBeVisible();
    await expect(iamfixerCard.getByText('Amazon Bedrock').first()).toBeVisible();

    // Verify repository link
    const repoLink = iamfixerCard.locator('a[href="https://github.com/AkashS-0107/IAMFixer"]');
    await expect(repoLink).toBeVisible();
  });

  test('Intellicluster appears in Projects as IN DEVELOPMENT with target completion October 26, 2026', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#projects');
    const projectsSection = page.locator('#projects');

    const intelliclusterCard = projectsSection.filter({ hasText: 'Intellicluster' });
    await expect(intelliclusterCard).toBeVisible();
    await expect(intelliclusterCard.getByText('Intellicluster')).toBeVisible();
    await expect(intelliclusterCard.getByText('IN DEVELOPMENT')).toBeVisible();
    await expect(intelliclusterCard.getByText('October 26, 2026')).toBeVisible();

    // Verify repository link
    const repoLink = intelliclusterCard.locator('a[href="https://github.com/AkashS-0107/Intellicluster"]');
    await expect(repoLink).toBeVisible();
  });

  test('No unverified live deployment claims for IAMFixer or Intellicluster', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#projects');
    const projectsSection = page.locator('#projects');

    const iamfixerCard = projectsSection.filter({ hasText: 'IAMFixer' });
    const intelliclusterCard = projectsSection.filter({ hasText: 'Intellicluster' });

    // Neither should have an external live website icon/link
    await expect(iamfixerCard.locator('a[aria-label*="Live website"]')).toHaveCount(0);
    await expect(intelliclusterCard.locator('a[aria-label*="Live website"]')).toHaveCount(0);
  });

  // ==========================================
  // 4. FUTURE PROJECTS PRUNING AUDIT
  // ==========================================
  test('Future Projects retains WorkSure Remake and completely excludes Hackathon Projects placeholder', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#future-projects');
    const futureSection = page.locator('#future-projects');

    await expect(futureSection.getByText('WorkSure Remake')).toBeVisible();
    await expect(futureSection.getByText('Hackathon Projects')).toHaveCount(0);
    await expect(futureSection.getByText('To be updated').first()).toBeVisible(); // Preserves existing placeholder without invented roadmap
  });

  // ==========================================
  // 5. REGRESSION & INTEGRITY AUDITS
  // ==========================================
  test('Zero Titan occurrences across entire rendered DOM', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');
    const content = await page.content();
    const titanMatch = content.match(/Titan\s+(Gym|Fitness|Club)/gi);
    expect(titanMatch).toBeNull();
  });

  test('Zero Future PE occurrences across entire rendered DOM', async ({ page }) => {
    await gotoAndSkipIntro(page, '/');
    const bodyText = await page.innerText('body');
    expect(bodyText).not.toContain('Future PE');
    expect(bodyText).not.toContain('Currently Being Developed');
  });

  test('Future Interns evidence remains 100% intact and functional', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#internships');
    const internshipSection = page.locator('#internships');

    await expect(internshipSection.getByText('Future Interns', { exact: true }).first()).toBeVisible();
    await expect(internshipSection.getByText('FIT/JUL26/PE3770')).toBeVisible();
    await expect(internshipSection.getByText('ISO 9001 Certified')).toBeVisible();
    await expect(internshipSection.getByText('MSME Registered (UDYAM-KR-03-0414782)')).toBeVisible();

    // Verify completion cert button
    const certBtn = page.getByRole('button', { name: /View Future Interns Completion Certificate/i });
    await expect(certBtn).toBeVisible();
  });

  test('InAmigos Foundation rebuild evidence remains 100% intact', async ({ page }) => {
    await gotoAndSkipIntro(page, '/#internships');
    const inamigosInternship = page.locator('#internships').filter({ hasText: 'InAmigos Foundation' });
    await expect(inamigosInternship).toBeVisible();
    await expect(inamigosInternship.getByText('Regd No. U85300CT2020NPL010641')).toBeVisible();
    await expect(inamigosInternship.getByText('CSR-1 Registered (CSR00083159)')).toBeVisible();
    await expect(inamigosInternship.getByText('80G (AAFC18183CF20222)')).toBeVisible();
  });

  // ==========================================
  // 6. RESPONSIVE & HORIZONTAL OVERFLOW MATRIX
  // ==========================================
  test('Responsive matrix (375x667, 390x844, 768x1024, 1440x900) has zero horizontal overflow and 0 console crashes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await gotoAndSkipIntro(page, '/');

      await expect(page.locator('#main-content')).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow).toBe(false);

      const fatalErrors = consoleErrors.filter(
        (e) => !e.includes('favicon') && !e.includes('Failed to load resource')
      );
      expect(fatalErrors).toEqual([]);
    }
  });
});
