import {Page} from '@playwright/test';

export class SearchInput {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  searchInputLocator = () => this.page.locator(`textarea[name='q']`);

  allItemsLocator = () => this.page.locator('//div[@aria-description]/div[1]/span');

  async clickOnSearchByImage(srcImg: string) {
    await this.page.getByLabel('Search by image').click();
    await this.page.locator(`//input[@name="encoded_image"]`).setInputFiles(srcImg);
  }

  async verifyListBoxVisible() {
    await this.page.getByRole('listbox').isVisible();
  }
}
