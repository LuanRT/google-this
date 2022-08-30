'use strict';

const Constants = require('../../utils/constants');

class OrganicResult {
  /** @type {string} */
  title;
  
  /** @type {string} */
  description;
  
  /** @type {string} */
  url;
  
  /** @type {{ high_res: string; low_res: string; }} */
  favicons;
  
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.url = data.url;
    this.favicons = data.favicons;
  }
}

class OrganicResults {
  /**
   * @returns {{
      title: string;
      description: string;
      url: string;
      favicons: {
        high_res: string;
        low_res: string;
      }
   }[]}
   */
  static parse(data, $) {
    const titles = $(Constants.SELECTORS.TITLE)
      .map((i, el) => {
        if (el.parent.attribs.style != '-webkit-line-clamp:2') // ignore ad titles
          return $(el.children).text().trim();
      }).get();

    const descriptions = $(Constants.SELECTORS.DESCRIPTION)
      .map((i, el) => {
        if (el.parent.attribs.class != 'w1C3Le') // ignore ad descriptions
          return $(el).text().trim();
      }).get();

    const urls = $(Constants.SELECTORS.URL)
      .map((i, el) => $(el).attr('href')).get();
      
    // Refine results
    if (titles.length < urls.length && titles.length < descriptions.length) {
      urls.shift();
    }
    
    if (urls.length > titles.length) {
      urls.shift();
    }
    
    const is_innacurate_data = descriptions.length < urls.slice(1).length;
    
    urls.forEach((item, index) => {
      // Why YouTube? Because video results usually don't have a description.
      if (item.includes('m.youtube.com') && is_innacurate_data) {
        urls.splice(index, 1);
        titles.splice(index, 1);
        index--;
      }
    });
    
    const results = [];
    
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const description = descriptions[i];
      const url = urls[i];
      
      const high_res_favicon = `${Constants.URLS.FAVICONKIT}/${new URL(url || Constants.URLS.GOOGLE).hostname}/192`;
      const low_res_favicon = `${Constants.URLS.W_GOOGLE}s2/favicons?sz=64&domain_url=${new URL(url || Constants.URLS.GOOGLE).hostname}`;
         
      if (titles[i] && descriptions[i] && urls[i]) {
        results.push(new OrganicResult({
          title,
          description,
          url,
          favicons: {
            high_res: high_res_favicon,
            low_res: low_res_favicon
          }
        }));
      }
    }
    
    return results;
  }
}

module.exports = OrganicResults;