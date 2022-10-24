'use strict';

const userAgents = require('./user-agents.json');

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
  const available_agents = userAgents[options.mobile ? 'mobile' : 'desktop'];
  const ua = available_agents[Math.floor(Math.random() * available_agents.length)];
  
  return {
    'accept': 'text/html',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'en-US,en',
    'referer': 'https://www.google.com/',
    'upgrade-insecure-requests': 1,
    'user-agent': ua
  };
}

/**
 * Refines the html.
 *
 * @param {string} data - Raw html data.
 * @param {boolean} parse_ads - Whether to parse ads or not.
 * @returns {string}
 */
function refineData (data, parse_ads = false, is_mobile = true) {
  let result = data
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
   
    // Titles: -> ynAwRc q8U8x MBeuO gsrt oewGkc LeUQr
    .replace(/ynAwRc q8U8x MBeuO oewGkc LeUQr/g, 'ynAwRc q8U8x MBeuO gsrt oewGkc LeUQr')
    .replace(/MBeuO oewGkc/g, 'MBeuO gsrt oewGkc');
 
  // Transform desktop title/urls classes. Everything else is the same.
  if (!is_mobile) {
    result = result
      .replace(/yuRUbf|v5yQqb/g, 'ynAwRc q8U8x MBeuO gsrt oewGkc LeUQr')
  }
  
  // Transform ad title classes.
  if (parse_ads) {
    result = result
      .replace(/cz3goc v5yQqb BmP5tf/g, 'C8nzq BmP5tf')
  }

  return result;
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
 * Returns a random integer between two values.
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