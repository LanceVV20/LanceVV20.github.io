import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Regression checks for defects found during exploratory testing.
// Each is marked test.fail() so the suite stays green while the bug is open.
// When a bug gets fixed, its test "unexpectedly passes" and flags the ticket for closure.

async function loginAs(page: Page, user: string) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(user);
  return new InventoryPage(page);
}

test.describe('Known bugs: problem_user', () => {
  test('BUG-001 all products show the same image', async ({ page }) => {
    test.fail();
    const inventory = await loginAs(page, 'problem_user');
    await expect(inventory.images).toHaveCount(6);
    const srcs = await inventory.images.evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
    expect(new Set(srcs).size).toBe(srcs.length);
  });

  test('BUG-002 sorting products has no effect', async ({ page }) => {
    test.fail();
    const inventory = await loginAs(page, 'problem_user');
    await inventory.sort.selectOption('za');
    const names = await inventory.names.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('BUG-003 some Add to cart buttons do nothing', async ({ page }) => {
    test.fail();
    const inventory = await loginAs(page, 'problem_user');
    await inventory.addToCart('sauce-labs-bolt-t-shirt');
    await expect(inventory.cartBadge).toHaveText('1', { timeout: 2000 });
  });

  test('BUG-004 typing a last name overwrites the first name', async ({ page }) => {
    test.fail();
    const inventory = await loginAs(page, 'problem_user');
    await inventory.addToCart('sauce-labs-backpack');
    const checkout = new CheckoutPage(page);
    await checkout.start();
    await checkout.firstName.fill('Juntue');
    await checkout.lastName.fill('Dela Fuente');
    await expect(checkout.lastName).toHaveValue('Dela Fuente', { timeout: 2000 });
  });
});

test.describe('Known bugs: performance_glitch_user', () => {
  test('BUG-005 login takes longer than 3 seconds', async ({ page }) => {
    test.fail();
    const start = Date.now();
    const inventory = await loginAs(page, 'performance_glitch_user');
    await expect(inventory.title).toHaveText('Products', { timeout: 15000 });
    expect(Date.now() - start).toBeLessThan(3000);
  });
});

test.describe('Known bugs: error_user', () => {
  test('BUG-006 Finish button does not complete the order', async ({ page }) => {
    test.fail();
    const inventory = await loginAs(page, 'error_user');
    await inventory.addToCart('sauce-labs-backpack');
    const checkout = new CheckoutPage(page);
    await checkout.start();
    await checkout.fillInfo('Juntue', 'Dela Fuente', '2432');
    await checkout.finishButton.click();
    await expect(checkout.completeHeader).toBeVisible({ timeout: 2000 });
  });

  test('BUG-007 last name field ignores input but checkout still continues', async ({ page }) => {
    test.fail();
    const inventory = await loginAs(page, 'error_user');
    await inventory.addToCart('sauce-labs-backpack');
    const checkout = new CheckoutPage(page);
    await checkout.start();
    await checkout.lastName.fill('Dela Fuente');
    await expect(checkout.lastName).toHaveValue('Dela Fuente', { timeout: 2000 });
  });
});
