'use strict';

const fs = require('fs');
const google = require('..');

describe('GoogleThis Tests', () => {
  it('Should search a query', async () => {
    const search = await google.search('Stephen Hawking');
    expect(search.results).not.toHaveLength(0);
  });

  it('Should reverse search an image', async () => {
    const image = fs.readFileSync(`${__dirname}/fixtures/stephen-hawking.jpg`);
    const search = await google.search(image, { ris: true });
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
