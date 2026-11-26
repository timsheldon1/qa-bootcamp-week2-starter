
import { type Page, type Locator } from '@playwright/test';

export class CataloguePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.productNames = page.locator('[data-test^="product-"] h5');
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async searchFor(product: string) {
    await this.searchInput.fill(product);
    await this.searchButton.click();
  }
}
