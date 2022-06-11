'use strict';

const Axios = require('axios');
const Cheerio = require('cheerio');

const Utils = require('../utils/utils');
const Constants = require('../utils/constants');
const Parser = require('./parser');

/**
 * Search a given query on Google.
 *
 * @param {string} query - Search query
 * @param {object} [options] Search options
 * @param {boolean} [options.ris] - Use reverse image search
 * @param {boolean} [options.safe] - Safe search
 * @param {number} [options.page] - Pagination
 * @param {object} [options.additional_params] - Parameters that will be passed to Google
 *
 * @returns {Promise.<{ results: { title: string; description: string; url: string; favicons: { high_res: string; low_res: string } }[];
 * videos: { id: string; url: string; title: string; author: string; duration: string; }[]; did_you_mean?: string; knowledge_panel: { title: string; description: string; url: string; };
 * featured_snippet: { title: string; description: string; url: string; }; top_stories: { description: string; url: string; }[]; people_also_ask: string[]; people_also_search_for: { title: string; thumbnail: string; }[];
 * unit_converter?: { input: string; output: string; formula: string; } | { input: { name: string; value: string; }; output: { name: string; value: string } };
 * dictionary?: { word: string; phonetic: string; audio: string; definitions: string[]; examples: string[]; };
 * translation?: { source_language: string; target_language: string; source_text: string; target_text: string; };
 * weather?: { location: string; forecast: string; precipitation: string; humidity: string; temperature: string; wind: string; };
 * location?: { title: string; distance: string; map: string; };
 * time?: { date: string; hours: string; }; }>}
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

  const response = await Axios.get(url, { params: options.additional_params, headers: Utils.getHeaders({ mobile: true }) }).catch((err) => err);
  if (response instanceof Error) throw new Utils.SearchError('Could not execute search', { status_code: response?.status || 0, message: response?.message });
  
  const results = {
    results: [],
    videos: [],
    did_you_mean: '',
    knowledge_panel: {},
    featured_snippet: {},
    top_stories: [],
    people_also_ask: [],
    people_also_search_for: []
  };
  
  let parser = new Parser(response.data);

  results.results = parser.organic_results;
  results.videos = parser.videos;
  
  results.knowledge_panel = parser.knowledge_graph;
  results.featured_snippet = parser.featured_snippet;

  const did_you_mean = parser.did_you_mean;
  did_you_mean && (results.did_you_mean = did_you_mean) || (delete results.did_you_mean);

  const unit_converter = parser.converters;
  unit_converter && (results.unit_converter = unit_converter);

  const weather_forecast = parser.weather;
  weather_forecast && (results.weather = weather_forecast);

  const time = parser.time;
  time && (results.current_time = time);

  const location = parser.location;
  location && !time && (results.location = location);

  const dictionary = parser.dictionary;
  dictionary && (results.dictionary = dictionary);

  const translation = parser.translation;
  translation && (results.translation = translation);

  const top_stories = parser.top_stories;
  results.top_stories = top_stories;

  const people_also_ask = parser.paa;
  results.people_also_ask = people_also_ask;

  const people_also_search_for = parser.pas;
  results.people_also_search_for = people_also_search_for;
  
  parser = null;
  
  return results;
}

/**
 * Google image search.
 *
 * @param {string} query - search query
 * @param {object} [options] - search options
 * @param {boolean} [options.safe] - safe search
 * @param {object} [options.additional_params] - additional parameters
 *
 * @returns {Promise.<{ id: string; url: string; width: number; height: number; color: number;
 * preview: { url: string; width: number; height: number; }, origin: { title: string;
 * website: { name: string; domain: string; url: string; } } }[]>}
 */
async function image(query, options = {}) {
  options.safe = options.safe || false;
  options.additional_params = options.additional_params || {};
  
  const form_data = new URLSearchParams();
  
  const payload = [
    [
      [
        'HoAMBc',
        JSON.stringify([
          null, null, [
            0,null,2529,85,2396,
            [],[9429,9520],[194,194],
            false,null,null,9520
          ],
          null,null,null,null, null,null,null,null,
          null,null,null,null, null,null,null,null,
          null,null,null,null, null,null,null,null,
          null,[
            query,
          ],
          null,null,null,
          null,null,null,
          null,null,[
            null, 'CAE=', 'GGwgAA=='
          ],null,true
        ]),
        null, 'generic'
      ]
    ]
  ];
  
  form_data.append('f.req', JSON.stringify(payload));
  form_data.append('at', `${Utils.generateRandomString(29)}:${Date.now()}`);
  
  const params = { ...options.additional_params };
  options.safe && (params.safe = 'active');
  
  const response = await Axios.post(`${Constants.URLS.W_GOOGLE}_/VisualFrontendUi/data/batchexecute`, form_data, {
    params: {
      'rpcids': 'HoAMBc',
      'source-path': '/search',
      'f.sid': -Utils.getRandomInt(0, 9000000000000000000),
      'bl': 'boq_visualfrontendserver_20220505.05_p0',
      'hl': 'en',
      'authuser': 0,
      '_reqid': Utils.getRandomInt(1, 50000),
      ...params
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      ...Utils.getHeaders({ mobile: false })
    }
  }).catch((err) => err);
  
  if (response instanceof Error)
    throw new Utils.SearchError('Could not execute search', { status_code: response?.response?.status || 0, message: response?.message });
  
  const res = '[null'+(Utils.getStringBetweenStrings(response.data, '"[null', ']"') || '') + ']';
  const data = JSON.parse(res.replace(/\\"/g, '"').replace(/\\\\"/g, '\''));
  
  if (data.length <= 1)
    throw new Utils.SearchError('Got unexpected response from BatchExecute API', data);
  
  if (!data[31])
    throw new Utils.SearchError(data[53][1], data[53][2]);
  
  const items = data[31][0][12][2];
  
  const results = items.map((item) => {
    const image = item[1]?.[3];
    const preview = item[1]?.[2];
    const origin = item[1]?.[9];
    
    if (image && preview && origin)
      return {
        id: item[1][1],
        url: decodeURIComponent(JSON.parse('"' + image[0].replace(/"/g, '"') + '"')),
        width: image[1],
        height: image[2],
        color: item[1][6],
        preview: {
          url: decodeURIComponent(JSON.parse('"' + preview[0].replace(/"/g, '"') + '"')),
          width: preview[1],
          height: preview[2]
        },
        origin: {
          title: origin['2008'][1],
          website: {
            name: origin['2003'][12],
            domain: origin['2003'][17],
            url: origin['2003'][2]
          }
        }
      }
  }).filter((item) => item);
  
  return results;
}

/**
 * Retrieves news from Google.
 *
 * @param {string} [language] - two digits language code.
 * @param {string} [region] - two digits region code.
 * 
 * @returns {Promise.<{ headline_stories: { title: string; url: string; image: string; published: string; by: string; }[] }>}
 */
async function getTopNews(language = 'en', region = 'US') {
  const url = Constants.URLS.GOOGLE_NEWS + `topstories?tab=in&hl=${language.toLocaleLowerCase()}-${region.toLocaleUpperCase()}&gl=${region.toLocaleUpperCase()}&ceid=${region.toLocaleUpperCase()}:${language.toLocaleLowerCase()}`;

  const response = await Axios.get(url, { headers: Utils.getHeaders({ mobile: true }) }).catch((err) => err);
  if (response instanceof Error) throw new Error('Could not retrieve top news: ' + response.message);

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

module.exports = { getTopNews, search, image };