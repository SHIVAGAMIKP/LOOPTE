import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProjectBoardPage } from '../Pages/ProjectStatusBoardPage';
import { credentials } from '../support/config';
import projectData from '../data/testdata.json';
import type { TestCase } from '../support/types';

for (const tc of projectData as TestCase[]) {
  test.describe(tc.TC, () => {
    let loginPage: LoginPage;
    let projectBoard: ProjectBoardPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      projectBoard = new ProjectBoardPage(page);
      await loginPage.navigate();
      await loginPage.login(credentials.username, credentials.password);
      await projectBoard.navigateToProject(tc.Project);
    });

    test.afterEach(async ({ page }) => {
      if (!page.isClosed()) {
        await page.close();
      }
    });

    test('Project dashboard is visible', async () => {
      await expect(projectBoard.getProjectHeader()).toBeVisible();
    });

    test(`Navigates to ${tc.Project}`, async () => {
      await expect(projectBoard.getProjectName()).toContainText(tc.Project);
    });

    test(`Column "${tc.ProjectDBCol}" exists`, async () => {
      await expect(projectBoard.getDBStatus(tc.ProjectDBCol)).toHaveText(
        new RegExp(`^${tc.ProjectDBCol}`)
      );
    });

    test(`"${tc.USNameCol}" is in "${tc.ProjectDBCol}"`, async () => {
      await expect(
        projectBoard.getDBStatusTitle(tc.ProjectDBCol, tc.USNameCol)
      ).toHaveText(tc.USNameCol);
    });

    
      test(`Confirm tags: ${tc.USTagsCol.join(', ')}`, async () => {
        for (const tag of tc.USTagsCol) {
        await expect(
          projectBoard.getDBTags(tc.ProjectDBCol, tag)
        ).toHaveText(tag);
      }
      });
    
  });
}
