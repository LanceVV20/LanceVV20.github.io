import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user');
    inventory = new InventoryPage(page);
  });

  test('TC-008 shows six products', async () => {
    await expect(inventory.items).toHaveCount(6);
  });

  test('TC-009 sort by price low to high', async () => {
    await inventory.sort.selectOption('lohi');
    const prices = await inventory.priceValues();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-010 sort by price high to low', async () => {
    await inventory.sort.selectOption('hilo');
    const prices = await inventory.priceValues();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC-011 sort by name Z to A', async () => {
    await inventory.sort.selectOption('za');
    const names = await inventory.names.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('TC-012 every product has a unique image', async () => {
    await expect(inventory.images).toHaveCount(6);
    const srcs = await inventory.images.evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});
