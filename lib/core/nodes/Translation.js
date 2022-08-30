'use strict';

const Constants = require('../../utils/constants');

class Translation {
  /** @type {string | null} */
  source_language;
 
  /** @type {string | null} */
  target_language;
 
  /** @type {string | null} */
  source_text;
 
  /** @type {string | null} */
  target_text;
  
  constructor($) {
    const source_language = $(Constants.SELECTORS.TR_SOURCE_LANGUAGE).text();
    const target_language = $(Constants.SELECTORS.TR_TARGET_LANGUAGE).text();

    const source_text = $(Constants.SELECTORS.TR_SOURCE_TEXT).text();
    const target_text = $(Constants.SELECTORS.TR_TARGET_TEXT).text();
    
    this.source_language = source_text.length ? source_language : null;
    this.target_language = source_text.length ? target_language : null;
    this.source_text = source_text.length ? source_text : null;
    this.target_text = target_text.length ? target_text : null;
  }
}

module.exports = Translation;