import { GojsGraphPage } from './app.po';

describe('gojs-graph App', () => {
  let page: GojsGraphPage;

  beforeEach(() => {
    page = new GojsGraphPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
