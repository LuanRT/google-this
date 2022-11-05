'use strict';

const Constants = require('../../utils/constants');

class Weather {
  /** @type {string | null} */
  location;

  /** @type {string | null} */
  forecast;

  /** @type {string | null} */
  precipitation;

  /** @type {string | null} */
  humidity;

  /** @type {string | null} */
  temperature;

  /** @type {string | null} */
  wind;

  /** @type {string | null} */
  image;

  constructor($, data) {
    const weather_location = $(Constants.SELECTORS.WEATHER_LOCATION).text();
    const weather_forecast = $(Constants.SELECTORS.WEATHER_FORECAST).text();
    const precipitation = $(Constants.SELECTORS.PRECIPITATION).text();
    const air_humidity = $(Constants.SELECTORS.AIR_HUMIDITY).text();
    const temperature = $(Constants.SELECTORS.TEMPERATURE).text();
    const wind_speed = $(Constants.SELECTORS.WIND_SPEED).text();

    const is_available = weather_location && weather_forecast;

    this.location = is_available ? weather_location : null;
    this.forecast = is_available ? weather_forecast : null;
    this.precipitation = is_available ? precipitation : null;
    this.humidity = is_available ? air_humidity : null;
    this.temperature = is_available ? temperature : null;
    this.wind = is_available ? wind_speed : null;

    // The image is under the format of data:image/png
    // More information in the pull request description *
    this.image =
      is_available ? data.match(/<script(.*)wob_tci/gim)[0].match(/var s='(.*)';/gmi)[0].replace('var s=\'', '').replace('\';', '') : null
  }
}

module.exports = Weather;