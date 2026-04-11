import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProjectBoardPage } from '../Pages/ProjectStatusBoardPage';
import { credentials } from '../support/config';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;
  let projectBoard: ProjectBoardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    projectBoard = new ProjectBoardPage(page);
    await loginPage.navigate();
  });

  test.afterEach(async ({ page }) => {
    if (!page.isClosed()) {
      await page.close();
    }
  });

  test('should login with valid credentials', async () => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(projectBoard.getProjectHeader()).toBeVisible();
  });
});
