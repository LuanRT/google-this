'use strict';

const google = require('..');

describe('GoogleThis Tests', () => {
  it('Should search a query', async () => {
    const search = await google.search('Stephen Hawking');
    expect(search.results).not.toHaveLength(0);
  });

  it('Should search using a desktop user agent', async () => {
    const search = await google.search('Stephen Hawking', { use_mobile_ua: false });
    expect(search.results).not.toHaveLength(0);
  });

  it('Should search images', async () => {
    const search = await google.image('Supermassive Blackhole');
    expect(search).not.toHaveLength(0);
  });

  it('Should retrieve top news', async () => {
    const news = await google.getTopNews('en', 'AU');
    expect(news.headline_stories).not.toHaveLength(0);
  });
});