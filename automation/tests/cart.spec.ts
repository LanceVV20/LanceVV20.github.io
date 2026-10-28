import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Cart', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user');
    inventory = new InventoryPage(page);
  });

  test('TC-013 adding items updates the cart badge', async () => {
    await inventory.addToCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toHaveText('1');
    await inventory.addToCart('sauce-labs-bike-light');
    await expect(inventory.cartBadge).toHaveText('2');
  });

  test('TC-014 removing an item updates the cart badge', async () => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.removeFromCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toBeHidden();
  });

  test('TC-015 cart keeps items after a page reload', async ({ page }) => {
    await inventory.addToCart('sauce-labs-onesie');
    await page.reload();
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('TC-016 cart page lists added items', async ({ page }) => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.addToCart('sauce-labs-fleece-jacket');
    await inventory.cartLink.click();
    await expect(page.getByTestId('inventory-item-name')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
    ]);
  });
});
