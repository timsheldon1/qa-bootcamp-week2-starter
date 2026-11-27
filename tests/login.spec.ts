import { test, expect } from '@playwright/test';

test('invalid login is rejected', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByLabel('Email').fill('invalid@example.com');
  await page.locator('[data-test="password"]').fill('wrongpassword');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});
