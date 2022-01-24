'use strict';

const Axios = require('axios');
const Utils = require('./utils');
const Parser = require('./parser');
const Cheerio = require('cheerio');
const Constants = require('./constants');

/**
 * Searches a given query on Google.
 *
 * @param {string} query Query.
 * @param {object} options Search options.
 */
async function search(query, options = {}) {
  query = query.trim().split(/ +/).join('+');

  options.ris = options.ris || false;
  options.safe = options.safe || false;
  options.page = options.page && options.page * 10 || 0;
  options.match_all_images = options.match_all_images || false;
  options.additional_params = options.additional_params || null;

  const url = encodeURI(options.ris &&
    Constants.URLS.W_GOOGLE + 'searchbyimage?image_url=' + query ||
    Constants.URLS.GOOGLE + 'search?q=' + query + '&ie=UTF-8&aomd=1' + (options.safe && '&safe=active' || '') +
    '&start=' + options.page);

  const response = await Axios.get(url, { params: options.additional_params, headers: Utils.getHeaders(true) }).catch((err) => err);
  if (response instanceof Error) throw new Error('Could not search on Google: ' + response.message);

  const $ = Cheerio.load(Utils.refineData(response.data));
  const parser = new Parser($, response.data);

  const results = {
    results: [],
    did_you_mean: '',
    knowledge_panel: {},
    featured_snippet: {},
    top_stories: [],
    people_also_ask: [],
    people_also_search_for: []
  };

  results.results = parser.getOrganicResults();
  results.knowledge_panel = parser.getKnowledgeGraph();
  results.featured_snippet = parser.getFeaturedSnippet();

  const did_you_mean = $(Constants.SELECTORS.DID_YOU_MEAN).text();
  did_you_mean && (results.did_you_mean = did_you_mean) || (delete results.did_you_mean);

  const unit_converter = parser.getConverters();
  unit_converter && (results.unit_converter = unit_converter);

  const weather_forecast = parser.getWeather();
  weather_forecast && (results.weather = weather_forecast);

  const time = parser.getTime();
  time && (results.current_time = time);

  const location = parser.getLocation(time);
  location && (results.location = location);

  const dictionary = parser.getDictionary();
  dictionary && (results.dictionary = dictionary);

  const translation = parser.getTranslation();
  translation && (results.translation = translation);

  const top_stories = parser.getTopStories();
  results.top_stories = top_stories;

  const people_also_ask = parser.getPaa();
  results.people_also_ask = people_also_ask;

  const people_also_search_for = parser.getPas();
  results.people_also_search_for = people_also_search_for;

  return results;
}

/**
 * Searches images on Google.
 *
 * @param {string} query Search query.
 * @param {object} options Search options.
 */
async function image(query, options = {}) {
  query = query.trim().split(/ +/).join('+');

  options.safe = options.safe || false;
  options.exclude_domains = options.exclude_domains || [];
  options.additional_params = options.additional_params || null;
  options.exclude_domains.push('gstatic.com');

  const url = encodeURI(Constants.URLS.GIS + 'search?tbm=isch' + (options.safe && '&safe=active' || '') + '&q=' + query) +
    ' ' + options.exclude_domains.map((site) => '-site:' + site);

  const response = await Axios.get(url, { params: options.additional_params, headers: Utils.getHeaders(false) }).catch((err) => err);
  if (response instanceof Error) throw new Error('Could not search on Google: ' + response.message);

  const results = [];
  const origin = parseImageOriginData(response.data);

  let index = 0;
  let parsed_results = Constants.REGEX.IMAGE_SEARCH.exec(response.data);

  while (parsed_results != null && index != 15) {
    if (!parsed_results[1].includes(options.exclude_domains[0])) {
      results.push({
        url: parsed_results[1],
        width: parsed_results[2],
        height: parsed_results[3],
        origin: origin[index++],
      });
    }
    parsed_results = Constants.REGEX.IMAGE_SEARCH.exec(response.data);
  }

  return results;
}

/**
 * Gets image origin data
 *
 * @param {string} data Raw html.
 */
function parseImageOriginData(data) {
  let results = [];
  let parsed_results = Constants.REGEX.IMAGE_ORIGIN.exec(data);

  while (parsed_results != null) {
    results.push({
      title: parsed_results[4],
      website: parsed_results[3],
    });
    parsed_results = Constants.REGEX.IMAGE_ORIGIN.exec(data);
  }

  return results;
}

/**
 * Retrieves news from Google.
 */
async function getTopNews() {
  const url = Constants.URLS.GOOGLE_NEWS + 'topstories?tab=in&hl=en-US&gl=US&ceid=US:en';

  const response = await Axios.get(url, { headers: Utils.getHeaders(true) }).catch((err) => err);
  if (response instanceof Error) throw new Error('Could not get top news: ' + response.message);

  const $ = Cheerio.load(response.data);

  const results = { headline_stories: [] };

  const headline_stories_publishers = $(Constants.SELECTORS.PUBLISHER).map((i, el) => $(el).text()).get();
  const headline_stories_imgs = $(Constants.SELECTORS.STORY_IMG).map((i, el) => $(el).attr('src')).get();
  const headline_stories_time = $(Constants.SELECTORS.STORY_TIME).map((i, el) => $(el).text()).get();

  $(Constants.SELECTORS.STORY_TITLE).each((i, el) => {
    const headline_stories_title = $(el).text();
    const headline_stories_url = $(el).attr('href');

    results.headline_stories.push({
      title: headline_stories_title,
      url: `${Constants.URLS.GOOGLE_NEWS}${headline_stories_url.slice(2)}`,
      image: headline_stories_imgs[i],
      published: headline_stories_time[i],
      by: headline_stories_publishers[i]
    });
  });

  return results;
}

module.exports = {
  getTopNews,
  search,
  image
};