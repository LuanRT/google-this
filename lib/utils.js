'use strict';

const UserAgent = require('user-agents');

function getHeaders (mobile) {
  return {
    'accept': 'text/html',
    'accept-encoding': 'gzip',
    'accept-language': 'en-US,en',
    'dnt': 1,
    'referer': 'https://www.google.com/',
    'upgrade-insecure-requests': 1,
    'user-agent': mobile ? new UserAgent(/Android/).toString() : new UserAgent({ deviceCategory: 'desktop' }).toString()
  };
}

function formatHtml (data) {
  return data
    /* Some garbage we don't need */
    .replace(/N6jJud MUxGbd lyLwlc/g, '')
    .replace(/YjtGef ExmHv MUxGbd/g, '')
    .replace(/MUxGbd lyLwlc aLF0Z/g, '')
    /* Renaming some classes in order to get consistent results. */
    .replace(/yDYNvb lEBKkf/g, 'yDYNvb')
    .replace(/VwiC3b MUxGbd yDYNvb/g, 'MUxGbd yDYNvb')
    .replace(/yUTMj MBeuO ynAwRc PpBGzd YcUVQe/g, 'yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe');
}

function getStringBetweenStrings (data, start_string, end_string) {
  const regex = new RegExp(`${escapeStringRegexp(start_string)}(.*?)${escapeStringRegexp(end_string)}`, "s");
  const match = data.match(regex);
  return match ? match[1] : undefined;
}

function escapeStringRegexp (string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

module.exports = {
  getHeaders,
  getStringBetweenStrings,
  formatHtml
};