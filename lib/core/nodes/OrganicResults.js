'use strict';

const Constants = require('../../utils/constants');

class OrganicResult {
  /** @type {string} */
  title;
  
  /** @type {string} */
  description;
  
  /** @type {string} */
  url;

  /** @type {boolean} */
  is_sponsored;
  
  /** @type {{ high_res: string; low_res: string; }} */
  favicons;
  
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.url = data.url;
    this.is_sponsored = data.is_sponsored;
    this.favicons = data.favicons;
  }
}

class OrganicResults {
  /**
   * @returns {{
   *   title: string;
   *   description: string;
   *   url: string;
   *   is_sponsored: boolean;
   *   favicons: {
   *     high_res: string;
   *     low_res: string;
   *   }
   *  }[]}
   */
  static parse($, parse_ads = false, is_mobile = true) {
    // Stores advert indexes so we can identify them later
    const ad_indexes = [];

    const titles = $(Constants.SELECTORS.TITLE)
      .map((_i, el) => {
        const is_ad = 
          el.parent.attribs.style == '-webkit-line-clamp:2' ||
          (!is_mobile && el.parent.attribs.class.startsWith('vdQmEd'));
        
        // Ignore ad titles if parse_ads is false
        if (!parse_ads && is_ad)
          return null;

        return is_mobile ? 
          $(el).text().trim() : $(el).find('h3').text().trim() || $(el).find('a > div > span').first().text().trim();
      }).get();

    const descriptions = $(Constants.SELECTORS.DESCRIPTION)
      .map((_i, el) => {
        const is_ad = el.parent.attribs.class == 'w1C3Le' || 
          (!is_mobile && !Object.keys(el.parent.attribs).length);
       
        // Ignore ad descriptions if parse_ads is false
        if (!parse_ads && is_ad) {
          return null;
        } else if (is_ad) {
          ad_indexes.push(_i);
        }

        return $(el).text().trim();
      }).get();

    const urls = $(is_mobile ? Constants.SELECTORS.URL : `${Constants.SELECTORS.TITLE} > a`)
      .map((_i, el) => {
        const is_ad = el.parent?.parent?.attribs?.class?.startsWith('vdQmEd');
        
        /**
         * Since the selector for URLs is the same as the one for titles on desktop,
         * we need to check if the element is an ad. If we're parsing the mobile page,
         * then ads are simply stripped out of the results.
         */
        if (!is_mobile && !parse_ads && is_ad) {
          return null;
        }

        return $(el).attr('href');
      }).get();
    
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
      
      let url = urls[i];

      // Some results have a different URL format (AMP and ad results).
      if (url?.startsWith('/aclk') || url?.startsWith('/amp/s')) {
        url = `${Constants.URLS.W_GOOGLE}${url.substring(1)}`;
      }
      
      const high_res_favicon = `${Constants.URLS.FAVICONKIT}/${new URL(url || Constants.URLS.W_GOOGLE).hostname}/192`;
      const low_res_favicon = `${Constants.URLS.W_GOOGLE}s2/favicons?sz=64&domain_url=${new URL(url || Constants.URLS.W_GOOGLE).hostname}`;
         
      if (titles[i] && descriptions[i] && urls[i]) {
        results.push(new OrganicResult({
          title,
          description,
          url,
          is_sponsored: ad_indexes.includes(i),
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