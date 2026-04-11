import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';

test.describe('Application is loaded', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test.afterEach(async ({ page }) => {
    if (!page.isClosed()) {
      await page.close();
    }
  });

  test('Login page is displayed', async () => {
    await test.step('Login header "Project Board Login" is visible', async () => {
      await expect(homePage.heading).toBeVisible();
    });

    await test.step('Login form is visible', async () => {
      await expect(homePage.signInForm).toBeVisible();
    });
  });
});
