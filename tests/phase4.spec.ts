import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Phase 4: Custom 404 + Offline Experience', () => {
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
  });

  test('A & B: Homepage and Valid Hash Navigation', async ({ page }) => {
    // A. Homepage load
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Akash Suresh/i }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: '404' })).not.toBeVisible();

    // B. Valid hash navigation
    await page.goto('/#projects');
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.getByRole('heading', { name: '404' })).not.toBeVisible();
  });

  test('C & C2: Invalid Route Detection and Deep-Route Refresh', async ({ page }) => {
    // C. Invalid route
    await page.goto('/this-route-does-not-exist');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByText('Looks like this route wandered off.')).toBeVisible();
    await expect(page.getByRole('button', { name: /Back to Portfolio/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /View Projects/i })).toBeVisible();

    // Capture 404 Desktop screenshot
    await page.screenshot({ path: path.resolve(process.cwd(), 'docs/screenshots/404-page.png') });

    // Verify no uncaught console errors
    const unexpectedErrors = consoleErrors.filter(
      (err) => !err.includes('Failed to load resource') && !err.includes('favicon')
    );
    expect(unexpectedErrors).toEqual([]);

    // C2. Deep-route refresh test
    await page.reload();
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByText('Looks like this route wandered off.')).toBeVisible();
  });

  test('B2: Valid Hash Reload Test', async ({ page }) => {
    await page.goto('/#projects');
    await expect(page.locator('#projects')).toBeVisible();

    // Reload on valid hash
    await page.reload();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.getByText('Looks like this route wandered off.')).not.toBeVisible();
  });

  test('D: 404 Navigation Buttons (Back to Portfolio & View Projects)', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();

    // Click "Back to Portfolio"
    await page.getByRole('button', { name: /Back to Portfolio/i }).click();
    await expect(page.locator('#main-content')).toBeVisible();
    expect(new URL(page.url()).pathname).toBe('/');

    // Navigate back to invalid route and click "View Projects"
    await page.goto('/this-route-does-not-exist');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();

    await page.getByRole('button', { name: /View Projects/i }).click();
    await expect(page.locator('#projects')).toBeVisible({ timeout: 5000 });
    expect(new URL(page.url()).pathname).toBe('/');
    expect(new URL(page.url()).hash).toBe('#projects');
  });

  test('E & F & Dismissal: Offline State, Session Dismissal & Online Recovery', async ({ page, context }) => {
    await page.goto('/');
    await page.keyboard.press('Space');
    await expect(page.locator('#main-content')).toBeVisible();

    // E. Simulate offline
    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event('offline')));

    const offlineBanner = page.getByRole('status');
    await expect(offlineBanner).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("You're offline.")).toBeVisible();
    await expect(
      page.getByText('Some external resources may be unavailable, but the locally loaded portfolio is still here.')
    ).toBeVisible();

    // Capture Offline Notification screenshot
    await page.screenshot({ path: path.resolve(process.cwd(), 'docs/screenshots/offline-notification.png') });

    // Session Dismissal test: Dismiss banner while offline
    await page.getByRole('button', { name: /Dismiss offline notification/i }).click();
    await expect(offlineBanner).not.toBeVisible();

    // F. Online recovery: Set online -> dismissal state resets
    await context.setOffline(false);
    await page.evaluate(() => window.dispatchEvent(new Event('online')));
    await expect(offlineBanner).not.toBeVisible();

    // Trigger offline again -> notification should reappear (reset confirmed)
    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event('offline')));
    await expect(offlineBanner).toBeVisible({ timeout: 5000 });

    // Restore network
    await context.setOffline(false);
    await page.evaluate(() => window.dispatchEvent(new Event('online')));
    await expect(offlineBanner).not.toBeVisible();
  });

  test('G: Mobile Viewport Responsiveness (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Test mobile 404
    await page.goto('/this-route-does-not-exist');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();

    // Check zero horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(overflow).toBe(false);

    // Capture Mobile 404 screenshot
    await page.screenshot({ path: path.resolve(process.cwd(), 'docs/screenshots/mobile-404.png') });

    // Test mobile homepage
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeVisible();

    const homeOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(homeOverflow).toBe(false);
  });
});
