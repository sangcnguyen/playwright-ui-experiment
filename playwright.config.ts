import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'src/tests',
  use: {
    // Browser options
    headless: true,
    launchOptions: {
      slowMo: 50
    },
    // Context options
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,

    // Artifacts
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['html', {open: 'never'}]]
};
export default config;