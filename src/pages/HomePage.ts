import {Page} from 'playwright';
import {expect} from 'playwright/test';
import {SearchInput} from '../components/SearchInput';
import BasePage from './BasePage';

export class HomePage extends BasePage {
  readonly searchInput: SearchInput;

  constructor(rootPage: Page) {
    super(rootPage);
    this.searchInput = new SearchInput(this.rootPage);
  }

  async goTo() {
    await this.rootPage.goto(`${process.env.BASE_URL}`);
  }

  async queryContent(query: string) {
    await this.searchInput.searchInputLocator().click();
    await this.searchInput.searchInputLocator().fill(query);
  }

  async verifyBoxToHaveText(content: string) {
    const allValues = await this.searchInput.allItemsLocator().allTextContents();
    expect.soft(allValues[0]).toContain(content.toLowerCase());
  }
}
