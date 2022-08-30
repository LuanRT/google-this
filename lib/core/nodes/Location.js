'use strict';

const Constants = require('../../utils/constants');

class Location {
  /** @type {string | null} */
  title;
  
  /** @type {string | null} */
  distance;
  
  /** @type {string | null} */
  map;
  
  constructor($) {
    const location_title = $(Constants.SELECTORS.LOCATION_TITLE).text();
    const location_distance = $(Constants.SELECTORS.LOCATION_DISTANCE).text();
    const location_image = $(Constants.SELECTORS.LOCATION_IMAGE).attr('src');
    
    const is_available = location_title && location_distance;
    
    this.title = is_available ? location_title : null;
    this.distance = is_available ? location_distance : null;
    this.map = is_available ? `https://google.com/${location_image}` : null;
  }
}

module.exports = Location;