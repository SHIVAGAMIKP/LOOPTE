import { Page, Locator } from '@playwright/test';

export class ProjectBoardPage {
  private readonly page: Page;
  private readonly projectHeader: Locator;
  private readonly projectSelectButtons: Locator;
  private readonly projectName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectHeader = page.getByRole('heading', { name: 'Projects' });
    this.projectSelectButtons = page.locator('nav').getByRole('button');
    this.projectName = page.getByRole('banner');
  }

  getProjectHeader(): Locator {
    return this.projectHeader;
  }

  getProjectName(): Locator {
    return this.projectName;
  }

  async navigateToProject(projectName: string): Promise<void> {
    for (const button of await this.projectSelectButtons.all()) {
      if ((await button.textContent())?.includes(projectName)) {
        await button.click();
        break;
      }
    }
  }

  getDBStatus(columnName: string): Locator {
    //return this.page.locator('h2', { hasText: columnName }); 
    return this.page.getByRole('heading',{name : new RegExp(`^${columnName }`)})
  }

  getDBStatusTitle(columnName: string, columnLogs: string): Locator {
   // return (this.getDBStatus(columnName).locator('..').locator('h3', { hasText: columnLogs }));
    return this.getDBStatus(columnName).locator('..').getByRole('heading', { name: columnLogs });
    
  }

  getDBTags(columnName: string, columnTag: string): Locator {
    //return this.getDBStatus(columnName).locator('..').locator('span.px-2', { hasText: columnTag });
    return this.getDBStatus(columnName).locator('..').locator('span', { hasText: new RegExp(`^${columnTag }$`) })
    //return this.getDBStatus(columnName).locator('..').getByText(columnTag, { exact: true });
}
}
