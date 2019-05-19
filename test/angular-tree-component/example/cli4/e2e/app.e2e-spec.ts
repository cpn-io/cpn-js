import { Cli4Page } from './app.po';

describe('cli4 App', () => {
  let page: Cli4Page;

  beforeEach(() => {
    page = new Cli4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
