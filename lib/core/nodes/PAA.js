'use strict';

const unraw = require('unraw').default;
const Utils = require('../../utils/utils');
const Constants = require('../../utils/constants');

class PAA {
  static parse($, data) {
    /** @type {string[]} */
    const items = [];

    Constants.SELECTORS.PAA.forEach((item) =>
      $(item).each((i, el) => items.push($(el).text())));

    items.shift();

    const extra_data = JSON.parse(unraw(Utils.getStringBetweenStrings(data, 'var c=\'', '\';google') || '{}'));
    const rfs = extra_data?.sb_wiz?.rfs;

    if (rfs) {
      rfs.forEach((el) => items.push(el.replace(/<b>|<\/b>/g, '')));
    }
    
    return items;
  }
}

module.exports = PAA;