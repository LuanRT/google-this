'use strict';

const Constants = require('../../utils/constants');

class Query {
  /** @type {string} */
  title;
  
  /** @type {string} */
  thumbnail;
  
  constructor (data) {
    this.title = data.title;
    this.thumbnail = data.thumbnail;
  }
}

class PAS {
  static parse($) {
    /** @type {{ title: string; thumbnail: string }[]} */
    const items = [];
    
    $(Constants.SELECTORS.PASF).each((i, el) => {
      if ($(el).attr('data-src')) {
        items.push(new Query({ title: $(el).attr('alt'), thumbnail: `https:${$(el).attr('data-src')}` }));
      }
    });
    
    return items;
  }
}

module.exports = PAS;