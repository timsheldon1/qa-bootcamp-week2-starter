import { test, expect } from '@playwright/test';

test('search results contain the search term', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('textbox').fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  const productNames = page.locator('[data-test^="product-"] h5');

  await expect(productNames).toHaveCount(4);

  for (let i = 0; i < await productNames.count(); i++) {
    await expect(productNames.nth(i)).toContainText(/pliers/i);
  }
});
