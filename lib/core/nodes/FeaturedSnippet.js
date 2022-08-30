'use strict';

const Constants = require('../../utils/constants');

class FeaturedSnippet {
  /** @type {string | null} */
  title;

  /** @type {string | null} */
  description;

  /** @type {string | null} */
  url;

  constructor($) {
    const featured_snippet_title =
      $(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[0]).text() ||
      $(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[1]).text() ||
      $(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[2]).text();

    const featured_snippet_url = $(Constants.SELECTORS.FEATURED_SNIPPET_URL).map((i, el) => $(el).attr('href')).get()[0];

    const featured_snippet = Constants.SELECTORS.FEATURED_SNIPPET_DESC.map((selector) => {
      if ($(selector)[0] && selector != Constants.SELECTORS.FEATURED_SNIPPET_DESC[2]) {
        return $(selector).html()
        .replace(/<\/li>|<\/b>|<b>/g, '')
        .replace(/&amp;/g, '&')
        .split('<li class="TrT0Xe">')
        .join('\n').trim();
      } else if (selector == Constants.SELECTORS.FEATURED_SNIPPET_DESC[2]) {
        return $(selector).text();
      }
    }).filter(text => text && text.length)[0];
    
    this.title = featured_snippet_title || null;
    this.description = featured_snippet || null;
    this.url = featured_snippet_url || null;
  }
}

module.exports = FeaturedSnippet;