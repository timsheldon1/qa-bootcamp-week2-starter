
import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/CataloguePage';

test('search results contain the search term', async ({ page }) => {
  const cataloguePage = new CataloguePage(page);

  await cataloguePage.open();
  await cataloguePage.searchFor('pliers');

  await expect(cataloguePage.productNames).toHaveCount(4);

  for (let i = 0; i < 4; i++) {
    await expect(cataloguePage.productNames.nth(i)).toContainText(/pliers/i);
  }
});
