'use strict';

const Constants = require('../../utils/constants');

class Item {
  /** @type {string} */
  description;

  /** @type {url} */
  url;

  constructor(data) {
    this.description = data.description;
    this.url = data.url;
  }
}

class TopStories {
  static parse($) {
    // Removes unwanted text from the description
    $(`${Constants.SELECTORS.TOP_STORIES_DESCRIPTION[0]} > div.CEMjEf`).each((el) => $(el).remove());
    $(`${Constants.SELECTORS.TOP_STORIES_DESCRIPTION[0]} > div > p`).each((el) => $(el).remove());

    const top_stories_descriptions = Constants.SELECTORS.TOP_STORIES_DESCRIPTION.map((selector) => 
      $(selector).map((el) => $(el).text()).get()).filter((descs) => descs.length > 0)[0];
    const top_stories_urls = $(Constants.SELECTORS.TOP_STORIES_URL).map((el) => $(el).attr('href')).get();
    
    /** @type {{
      description: string;
      url: string;
    }[]} */
    const items = [];

    if (top_stories_descriptions) {
      for (let i = 0; i < top_stories_urls.length; i++) {
        items.push(new Item({
          description: top_stories_descriptions[i], url: top_stories_urls[i]
        }));
      }
    }

    return items;
  }
}

module.exports = TopStories;