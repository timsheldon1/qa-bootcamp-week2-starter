import { expect, type Locator, type Page } from '@playwright/test';

const DEMOBLAZE_URL = 'https://www.demoblaze.com';

export class DemoblazeCartPage {
  readonly page: Page;
  readonly cartRows: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('#tbodyid tr');
    this.totalPrice = page.locator('#totalp');
  }

  async openStore() {
    await this.page.goto(DEMOBLAZE_URL);
  }

  async addProduct(productName: string) {
    await this.page.goto(DEMOBLAZE_URL);
    await this.page.getByRole('link', { name: productName, exact: false }).click();

    const dialogPromise = this.page.waitForEvent('dialog');
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
    const dialog = await dialogPromise;

    try {
      expect(dialog.message()).toBe('Product added');
    } finally {
      await dialog.accept();
    }
  }

  async openCart() {
    await this.page.goto(`${DEMOBLAZE_URL}/cart.html`);
  }

  productRow(productName: string) {
    return this.cartRows.filter({ hasText: productName });
  }

  async deleteProduct(productName: string) {
    await this.productRow(productName)
      .getByRole('link', { name: 'Delete' })
      .click();
  }

  async clearCart() {
    await this.openCart();

    while (await this.cartRows.count() > 0) {
      const rowsBeforeDelete = await this.cartRows.count();
      await this.cartRows.first().getByRole('link', { name: 'Delete' }).click();
      await expect(this.cartRows).toHaveCount(rowsBeforeDelete - 1);
    }
  }
}
