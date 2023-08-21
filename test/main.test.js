'use strict';

const google = require('..');
const axios = require('axios');

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

  describe('custom axios instances', () => {
    it('should support a custom axios instance', async () => {
      const instance = axios.create();
      const getSpy = jest.spyOn(instance, 'get');
      const search = await google.search('Stephen Hawking', { axios_instance: instance });
      expect(search.results).not.toHaveLength(0);
      expect(getSpy).toHaveBeenCalledTimes(1);
    });
  });
});