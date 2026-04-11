import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly signInForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Project Board Login' });
    this.signInForm = page.locator('form');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }
}
