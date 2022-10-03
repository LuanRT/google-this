'use strict';

const Axios = require('axios');
const Cheerio = require('cheerio');
const Utils = require('../utils/utils');
const Constants = require('../utils/constants');

const OrganicResults = require('./nodes/OrganicResults');
const KnowledgeGraph = require('./nodes/KnowledgeGraph');
const FeaturedSnippet = require('./nodes/FeaturedSnippet');

const Location = require('./nodes/Location');
const Translation = require('./nodes/Translation');
const Dictionary = require('./nodes/Dictionary');
const Converters = require('./nodes/Converters');
const Videos = require('./nodes/Videos');
const TopStories = require('./nodes/TopStories');
const Weather = require('./nodes/Weather');
const Time = require('./nodes/Time');
const PAA = require('./nodes/PAA');
const PAS = require('./nodes/PAS');

const FormData = require('form-data');

/**
 * Search a given query on Google.
 * @param {string | object} query - search query
 * @param {object} [options] search options
 * @param {boolean} [options.ris] - use reverse image search
 * @param {boolean} [options.safe] - safe search
 * @param {number} [options.page] - pagination
 * @param {object} [options.additional_params] - parameters that will be passed to Google
 */
async function search(query, options = {}) {
  let response;
  
  const ris = options.ris || false;
  const safe = options.safe || false;
  const page = options.page ? options.page * 10 : 0;
  const additional_params = options.additional_params || null;
  
  if (typeof query === 'object' && ris) {
    response = await uploadImage(query);
  } else {
    const _query = query.trim().split(/ +/).join('+');
    
    const url = encodeURI(
      ris ?
        `${Constants.URLS.W_GOOGLE}searchbyimage?image_url=${_query}`:
        `${Constants.URLS.GOOGLE}search?q=${_query}&ie=UTF-8&aomd=1${(safe ? '&safe=active' : '')}&start=${page}`
    );
    
    response = await Axios.get(url, {
      params: additional_params,
      headers: Utils.getHeaders({ mobile: true })
    }).catch((err) => err);
  }

  if (response instanceof Error)
    throw new Utils.SearchError('Could not execute search', {
    status_code: response?.status || 0, message: response?.message
  });
  
  const $ = Cheerio.load(Utils.refineData(response.data));

  const results = {};

  results.results = OrganicResults.parse(response.data, $);
  results.videos = Videos.parse($);

  results.knowledge_panel = new KnowledgeGraph(response.data, $);
  results.featured_snippet = new FeaturedSnippet($);

  const did_you_mean = $(Constants.SELECTORS.DID_YOU_MEAN).text();
  results.did_you_mean = did_you_mean ? did_you_mean: null;

  // These use the same selectors, so we have to check before parsing.
  results.weather = new Weather($);
  results.time = !results.weather.location ? new Time($): null;
  results.location = !results.time?.hours ? new Location($): null;

  results.dictionary = new Dictionary($);
  results.translation = new Translation($);
  results.top_stories = TopStories.parse($);
  results.unit_converter = new Converters($);
  results.people_also_ask = PAA.parse($, response.data);
  results.people_also_search = PAS.parse($);

  return results;
}

async function uploadImage(buffer) {
  const form_data = new FormData();

  form_data.append('encoded_image', buffer);
  
  const response = await Axios.post(`${Constants.URLS.GIS}searchbyimage/upload`, form_data, {
    headers: {
      ...form_data.getHeaders(),
      ...Utils.getHeaders({ mobile: true })
    }
  });
  
  return response;
}

/**
 * Google image search.
 *
 * @param {string} query - search query
 * @param {object} [options] - search options
 * @param {boolean} [options.safe] - safe search
 * @param {object} [options.additional_params] - additional parameters
 *
 * @returns {Promise.<{ 
    id: string; 
    url: string; 
    width: number; 
    height: number;
    color: number;
    preview: {
      url: string; 
      width: number; 
      height: number;
    }, 
    origin: {
      title: string;
      website: {
        name: string; 
        domain: string; 
        url: string;
      } 
    } 
 }[]>}
 */
async function image(query, options = {}) {
  const safe = options.safe || false;
  const additional_params = options.additional_params || {};
  
  const form_data = new URLSearchParams();

  const payload = [
    [
      [
        'HoAMBc',
        JSON.stringify([
          null, null, [
            0, null, 2529, 85, 2396,
            [], [9429, 9520], [194, 194],
            false, null, null, 9520
          ],
          null, null, null, null, null, null, null, null,
          null, null, null, null, null, null, null, null,
          null, null, null, null, null, null, null, null,
          null, [
            query,
          ],
          null, null, null,
          null, null, null,
          null, null, [
            null, 'CAE=', 'GGwgAA=='
          ], null, true
        ]),
        null,
        'generic'
      ]
    ]
  ];

  form_data.append('f.req', JSON.stringify(payload));
  form_data.append('at', `${Utils.generateRandomString(29)}:${Date.now()}`);

  const params = {
    ...additional_params
  };
  
  if (safe) {
    params.safe = 'active';
  }
  
  const response = await Axios.post(`${Constants.URLS.W_GOOGLE}_/VisualFrontendUi/data/batchexecute`, form_data, {
    params: {
      'rpcids': 'HoAMBc',
      'source-path': '/search',
      'f.sid': -Utils.getRandomInt(0, 9e10),
      'bl': 'boq_visualfrontendserver_20220505.05_p0',
      'hl': 'en',
      'authuser': 0,
      '_reqid': -Utils.getRandomInt(0, 9e5),
      ...params
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      ...Utils.getHeaders({ mobile: false })
    }
  }).catch((err) => err);

  if (response instanceof Error)
    throw new Utils.SearchError('Could not execute search', {
    status_code: response?.response?.status || 0, message: response?.message
  });

  const res = '[null'+(Utils.getStringBetweenStrings(response.data, '"[null', ']"') || '') + ']';
  const data = JSON.parse(res.replace(/\\"/g, '"').replace(/\\\\"/g, '\''));

  if (data.length <= 1)
    throw new Utils.SearchError('Got unexpected response from BatchExecute API', data);
    
  if (!data[56]?.[1])
    throw new Utils.SearchError(data[53]?.[1] || 'Unexpected response structure', data[53]?.[2] || data);
    
  const items = data[56]?.[1]?.[0]?.[0]?.[1]?.[0];
  
  if (!items)
    throw new Utils.SearchError('Unexpected response structure', data);
    
  const results = items.map((el) => {
    const item = el[0]?.[0]?.['444383007']; // TODO: refactor this
    
    if (!item?.[1])
      return;
    
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
 * @returns {Promise.<{
     headline_stories: {
       title: string; 
       url: string; 
       image: string; 
       published: string; 
       by: string; 
     }[] 
   }>}
 */
async function getTopNews(language = 'en', region = 'US') {
  const url = Constants.URLS.GOOGLE_NEWS + `topstories?tab=in&hl=${language.toLocaleLowerCase()}-${region.toLocaleUpperCase()}&gl=${region.toLocaleUpperCase()}&ceid=${region.toLocaleUpperCase()}:${language.toLocaleLowerCase()}`;

  const response = await Axios.get(url,
    {
      headers: Utils.getHeaders({
        mobile: true
      })
    }).catch((err) => err);
  if (response instanceof Error) throw new Error('Could not retrieve top news: ' + response.message);

  const $ = Cheerio.load(response.data);

  const results = {
    headline_stories: []
  };

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
