import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user');
    const inventory = new InventoryPage(page);
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.addToCart('sauce-labs-bolt-t-shirt');
    checkout = new CheckoutPage(page);
    await checkout.start();
  });

  test('TC-017 complete a purchase end to end', async ({ page }) => {
    await checkout.fillInfo('Juntue', 'Dela Fuente', '2432');
    await checkout.finishButton.click();
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
    await expect(page.getByTestId('shopping-cart-badge')).toBeHidden();
  });

  test('TC-018 order total equals subtotal plus tax', async () => {
    await checkout.fillInfo('Juntue', 'Dela Fuente', '2432');
    const money = async (label: typeof checkout.total) => Number((await label.textContent())!.split('$')[1]);
    const subtotal = await money(checkout.subtotal);
    const tax = await money(checkout.tax);
    expect(subtotal).toBeCloseTo(29.99 + 15.99, 2);
    expect(await money(checkout.total)).toBeCloseTo(subtotal + tax, 2);
  });

  test('TC-019 first name is required', async () => {
    await checkout.fillInfo('', 'Dela Fuente', '2432');
    await expect(checkout.error).toContainText('First Name is required');
  });

  test('TC-020 last name is required', async () => {
    await checkout.fillInfo('Juntue', '', '2432');
    await expect(checkout.error).toContainText('Last Name is required');
  });

  test('TC-021 postal code is required', async () => {
    await checkout.fillInfo('Juntue', 'Dela Fuente', '');
    await expect(checkout.error).toContainText('Postal Code is required');
  });
});
