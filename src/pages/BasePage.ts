import {type Page} from '@playwright/test';
import {pageProxyHandler} from 'src/core/proxyPage';

export default abstract class BasePage {
  readonly rootPage: Page;

  constructor(rootPage: Page) {
    this.rootPage = new Proxy<Page>(rootPage, pageProxyHandler);
  }
}
