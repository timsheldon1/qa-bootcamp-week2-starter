import { test, expect } from '@playwright/test';

test('homepage displays the expected title', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  await expect(page).toHaveTitle(
    'Practice Software Testing - Toolshop - v5.0'
  );
});