'use strict';

const Constants = require('../../utils/constants');

class Video {
  /** @type {string} */
  id;
  
  /** @type {string} */
  url;
  
  /** @type {string} */
  title;
  
  /** @type {string} */
  author;
  
  /** @type {string} */
  duration;
  
  constructor(data) {
    this.id = data.id;
    this.url = data.url;
    this.title = data.title;
    this.author = data.author;
    this.duration = data.duration;
  }
}

class Videos {
  static parse($) {
    const data = $(Constants.SELECTORS.VIDEOS);

    /**
     * @type {{
     *  id: string;
     *  url: string;
     *  title: string;
     *  author: string;
     *  duration: string;
     * }[]}
     */
    const videos = [];
    
    for (const elem of data) {
      const id = $(elem).find('a').attr('href')?.split('v=')?.[1];
      const url = $(elem).find('a').attr('href');
      const title = $(elem).children().find('a > div > div').prev().text().trim();
      const author = $(elem).children().find('a > div > div > span').next().next().prev().text().replace(/·/g, '').trim();
      const duration = $(elem).children().find('div[role="presentation"]').first().text();

      if (id && url && title && author && duration) {
        videos.push(new Video({ id, url, title, author, duration }));
      }
    }
    
    return videos;
  }
}

module.exports = Videos;