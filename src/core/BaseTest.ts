import {test as baseTest, Page} from '@playwright/test';
import {createMoveIndicator} from './mouseHelper';
import {HomePage} from '../pages/HomePage';
import {SearchResultPage} from '../pages/SearchResultsPage';

type pages = {
  homePage: HomePage;
  searchResultPage: SearchResultPage;
  page: Page;
};

export const test = baseTest.extend<pages>({
  homePage: async ({page}, use) => {
    await createMoveIndicator(page);
    const homePage = new HomePage(page);
    await homePage.goTo();
    await use(new HomePage(page));
  },
  searchResultPage: async ({page}, use) => {
    await createMoveIndicator(page);
    await use(new SearchResultPage(page));
  },
  page: async ({page}, use) => {
    await use(page);
    await page.close();
  }
});
export {expect} from '@playwright/test';
