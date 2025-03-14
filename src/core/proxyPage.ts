import {Locator, Page} from 'playwright';

// List of locator-related methods on Page
const locatorMethods = [
  'locator',
  'getByText',
  'getByRole',
  'getByLabel',
  'getByPlaceholder',
  'getByAltText',
  'getByTitle',
  'getByTestId'
];

const locatorActions = ['click', 'fill', 'hover', 'dblclick'];

async function highlightElement(locator: Locator): Promise<void> {
  await locator.evaluate((element: HTMLElement) => {
    const colors = [
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFA500',
      '#800080',
      '#008080',
      '#FF69B4',
      '#4B0082',
      '#FF4500',
      '#2E8B57',
      '#DC143C',
      '#4682B4'
    ];

    const baseColor = colors[Math.floor(Math.random() * colors.length)];
    const backgroundColor = baseColor + '1A'; // 10% opacity version of the color
    element.style.border = `2px solid ${baseColor}`;
    element.style.backgroundColor = backgroundColor;
    element.style.boxSizing = 'border-box';
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTimeout(() => {
          element.style.border = '';
          element.style.backgroundColor = '';
        }, 500);
        resolve();
      }, 200);
    });
  });
}

const locatorHandler: ProxyHandler<Locator> = {
  get(target: Locator, prop: string | symbol, receiver: any) {
    const value = Reflect.get(target, prop, receiver);

    if (typeof value !== 'function' || !locatorActions.includes(String(prop))) {
      return value;
    }

    return async (...args: any[]) => {
      // console.log(`Calling Locator method: ${String(prop)} with args:`, args);
      await highlightElement(target);
      return value.apply(target, args);
    };
  }
};

export const pageProxyHandler: ProxyHandler<Page> = {
  get(target: Page, prop: string | symbol, receiver: any) {
    const value = Reflect.get(target, prop, receiver);

    if (typeof value !== 'function' || !locatorMethods.includes(String(prop))) {
      return value;
    }

    return (...args: any[]): Locator => {
      // console.log(`Calling Page method: ${String(prop)} with args:`, args);
      const result = value.apply(target, args);
      return new Proxy(result, locatorHandler);
    };
  }
};
