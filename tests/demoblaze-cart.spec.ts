import { test, expect } from '@playwright/test';
import { DemoblazeCartPage } from '../pages/DemoblazeCartPage';

const samsung = 'Samsung galaxy s6';
const nokia = 'Nokia lumia 1520';

test('C2 Delete One Product and Update the Total', async ({ page }) => {
  const cartPage = new DemoblazeCartPage(page);

  try {
    await cartPage.openStore();
    await cartPage.addProduct(samsung);
    await cartPage.addProduct(nokia);
    await cartPage.openCart();

    const samsungRow = cartPage.productRow(samsung);
    const nokiaRow = cartPage.productRow(nokia);

    await expect(cartPage.cartRows).toHaveCount(2);
    await expect(samsungRow).toHaveCount(1);
    await expect(nokiaRow).toHaveCount(1);

    const nokiaPriceText = (await nokiaRow.locator('td').nth(2).innerText()).trim();
    const nokiaPrice = Number(nokiaPriceText);
    expect(Number.isFinite(nokiaPrice)).toBe(true);
    expect(nokiaPrice).toBeGreaterThan(0);

    await cartPage.deleteProduct(samsung);

    await expect(samsungRow).toHaveCount(0);
    await expect(cartPage.cartRows).toHaveCount(1);
    await expect(nokiaRow).toContainText(nokia);
    await expect(cartPage.totalPrice).toHaveText(String(nokiaPrice));
  } finally {
    await cartPage.clearCart();
  }
});
