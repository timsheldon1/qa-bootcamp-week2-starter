
import { test, expect } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

test('flaky drill: Save displays a confirmation', async ({ page }) => {
  const filePath = path.join(__dirname, 'index.html');
  const fileUrl = pathToFileURL(filePath).href;

  await page.goto(fileUrl);
  await page.locator('#save').click();

  // Wait for the actual message instead of guessing the delay
  await expect(page.locator('#status')).toHaveText('Saved');
});
