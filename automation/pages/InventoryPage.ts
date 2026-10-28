import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly names: Locator;
  readonly prices: Locator;
  readonly images: Locator;
  readonly sort: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(readonly page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.names = page.getByTestId('inventory-item-name');
    this.prices = page.getByTestId('inventory-item-price');
    this.images = page.locator('.inventory_item_img img');
    this.sort = page.getByTestId('product-sort-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  addToCart(slug: string) {
    return this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  removeFromCart(slug: string) {
    return this.page.getByTestId(`remove-${slug}`).click();
  }

  async priceValues() {
    return (await this.prices.allTextContents()).map(p => Number(p.replace('$', '')));
  }
}
