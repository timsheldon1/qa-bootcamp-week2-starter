import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/CataloguePage';

test('catalogue page object returns search results for the search term', async ({ page }) => {
  const cataloguePage = new CataloguePage(page);

  await cataloguePage.open();
  await cataloguePage.searchFor('pliers');

  const productCount = await cataloguePage.productNames.count();
  expect(productCount).toBeGreaterThan(0);

  for (let i = 0; i < productCount; i++) {
    await expect(cataloguePage.productNames.nth(i)).toContainText(/pliers/i);
  }
});
