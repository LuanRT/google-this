'use strict';

const UserAgent = require('user-agents');

class SearchError extends Error {
  constructor (message, info) {
    super(message);
    
    info && (this.info = info);

    this.date = new Date();
    this.version = require('../../package.json').version;
  }
}

/**
 * Returns headers with a random user agent.
 *
 * @param {boolean} is_mobile 
 * @returns {string}
 */
function getHeaders(options = { mobile: false }) {
  return {
    'accept': 'text/html',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'en-US,en',
    'referer': 'https://www.google.com/',
    'upgrade-insecure-requests': 1,
    'user-agent': options.mobile && new UserAgent(/Android/).toString() || new UserAgent({ deviceCategory: 'desktop' }).toString()
  };
}

/**
 * Refines the html.
 *
 * @param {string} data - Raw html data.
 * @returns {string}
 */
function refineData (data) {
  return data
    // Removes classes we don't need: 
    .replace(/N6jJud MUxGbd lyLwlc/g, '')
    .replace(/YjtGef ExmHv MUxGbd/g, '')
    .replace(/MUxGbd lyLwlc aLF0Z/g, '')
    
    /*
    * Transforms all possible variations of some classes' name into a
    * fixed string so it's easier to get consistent results:
    **/
    
    // Descriptions: -> MUxGbd yDYNvb 
    .replace(/yDYNvb lEBKkf/g, 'yDYNvb')
    .replace(/VwiC3b MUxGbd yDYNvb/g, 'MUxGbd yDYNvb')
    
    // Urls: -> C8nzq BmP5tf 
    .replace(/cz3goc BmP5tf/g, 'C8nzq BmP5tf')
    
    // Titles: -> yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe 
    .replace(/yUTMj MBeuO ynAwRc PpBGzd YcUVQe/g, 'yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe')
    .replace(/oewGkc LeUQr/g, 'PpBGzd YcUVQe') 
    .replace(/q8U8x MBeuO/g, 'yUTMj MBeuO')
    .replace(/ynAwRc PpBGzd/g, 'ynAwRc gsrt PpBGzd');
}

/**
 * Gets a string between two delimiters.
 *
 * @param {string} data - The data.
 * @param {string} start_string - Start string.
 * @param {string} end_string - End string.
 * 
 * @returns {string}
 */
function getStringBetweenStrings (data, start_string, end_string) {
  const regex = new RegExp(`${escapeStringRegexp(start_string)}(.*?)${escapeStringRegexp(end_string)}`, 's');
  const match = data.match(regex);
  return match ? match[1] : undefined;
}

function escapeStringRegexp (string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}


/**
 * Generates a random string with a given length.
 * 
 * @param {number} length
 * @returns {string}
 */
function generateRandomString(length) {
  const result = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  for (let i = 0; i < length; i++) {
    result.push(alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
  }
  
  return result.join('');
}

/**
 * Gets a random integer between two values.
 * 
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports = { SearchError, getHeaders, getStringBetweenStrings, generateRandomString, getRandomInt, refineData };