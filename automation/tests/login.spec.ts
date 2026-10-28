import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('TC-001 standard user can log in', async ({ page }) => {
    await login.login('standard_user');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('TC-002 locked out user sees an error', async () => {
    await login.login('locked_out_user');
    await expect(login.error).toContainText('Sorry, this user has been locked out.');
  });

  test('TC-003 wrong password is rejected', async () => {
    await login.login('standard_user', 'wrong_password');
    await expect(login.error).toContainText('Username and password do not match');
  });

  test('TC-004 username is required', async () => {
    await login.loginButton.click();
    await expect(login.error).toContainText('Username is required');
  });

  test('TC-005 password is required', async () => {
    await login.username.fill('standard_user');
    await login.loginButton.click();
    await expect(login.error).toContainText('Password is required');
  });

  test('TC-006 inventory is protected when logged out', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(login.error).toContainText("You can only access '/inventory.html' when you are logged in.");
  });

  test('TC-007 user can log out', async ({ page }) => {
    await login.login('standard_user');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByTestId('logout-sidebar-link').click();
    await expect(login.loginButton).toBeVisible();
  });
});
