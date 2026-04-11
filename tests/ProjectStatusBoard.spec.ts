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
    });

    test.afterEach(async ({ page }) => {
      if (!page.isClosed()) {
        await page.close();
      }
    });

    test(`Verify "${tc.TC}"`, async () => {
      await test.step('Verify project dashboard is visible', async () => {
        await expect(projectBoard.getProjectHeader()).toBeVisible();
      });

      await test.step(`Navigate to ${tc.Project}`, async () => {
        await projectBoard.navigateToProject(tc.Project);
        await expect(projectBoard.getProjectName()).toContainText(tc.Project);
      });

      await test.step(`Verify "${tc.USNameCol}" is in "${tc.ProjectDBCol}" column`, async () => {
        await expect(
          projectBoard.getDBStatusTitle(tc.ProjectDBCol, tc.USNameCol)
        ).toHaveText(tc.USNameCol);
      });

      await test.step(`Confirm tags: ${tc.USTagsCol.join(', ')}`, async () => {
        for (const tag of tc.USTagsCol) {
          await expect(
            projectBoard.getDBTags(tc.ProjectDBCol, tag)
          ).toHaveText(tag);
        }
      });
    });
  });
}
