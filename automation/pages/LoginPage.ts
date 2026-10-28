import { Page, Locator } from '@playwright/test';

export const PASSWORD = 'secret_sauce';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(readonly page: Page) {
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, password = PASSWORD) {
    await this.username.fill(user);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
