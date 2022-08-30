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
  
  constructor($) {
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
  }
}

module.exports = Weather;