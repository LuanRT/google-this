'use strict';

const Constants = require('../../utils/constants');

class Dictionary {
  /** @type {string | null} */
  word;
 
  /** @type {string | null} */
  phonetic;
 
  /** @type {string | null} */
  audio;
 
  /** @type {string[]} */
  definitions;
  
  /** @type {string[]} */
  examples;
  
  constructor($) {
    const word = $(Constants.SELECTORS.GD_WORD).text();
    const phonetic = $(Constants.SELECTORS.GD_PHONETIC).text();
    const audio = $(Constants.SELECTORS.GD_AUDIO).attr('src');
    
    this.word = word || null;
    this.phonetic = word ? phonetic || 'N/A' : null;
    this.audio = word && audio ? `https:${audio}` : null;
    this.definitions = word ? $(Constants.SELECTORS.GD_DEFINITIONS).map((i, el) => $(el).text()).get() : [];
    this.examples = word ? $(Constants.SELECTORS.GD_EXAMPLES).map((i, el) => $(el).text()).get() : [];
  }
}

module.exports = Dictionary;