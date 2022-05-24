'use strict';

const google = require('..');

describe('GoogleThis Tests', () => { 
  it('Should search a query', async () => {
    const search = await google.search('Stephen Hawking');
    expect(search.results).not.toHaveLength(0);
  });
  
  it('Should search images', async () => {
    const search = await google.image('Supermassive Blackhole');
    expect(search).not.toHaveLength(0);
  });
  
  it('Should do reverse image search', async () => {
    const search = await google.search('https://i.pinimg.com/236x/92/16/d9/9216d9a222ef65eb6eabfff1970180d1.jpg', { ris: true });
    expect(search.results).not.toHaveLength(0);
  });
  
  it('Should retrieve top news', async () => {
    const news = await google.getTopNews('en', 'AU');
    expect(news.headline_stories).not.toHaveLength(0);
  });
});