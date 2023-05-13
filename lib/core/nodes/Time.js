'use strict';

const Constants = require('../../utils/constants');

class Time {
  /** @type {string | null} */
  hours;
  
  /** @type {string | null} */
  date;
  
  constructor($) {
    const hours = $(Constants.SELECTORS.CURRENT_TIME_HOUR).first().prop('innerText') || "";
    const date = $(Constants.SELECTORS.CURRENT_TIME_DATE).map((i, el) => $(el).prop('innerText')).get()[1];
    
    this.hours = date ? hours.trim() : null;
    this.date = date ? date.trim() : null;
  }
}

module.exports = Time;