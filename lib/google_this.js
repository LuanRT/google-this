'use strict';

const Axios = require('axios');
const Utils = require('./utils');
const Parser = require('./parser');
const Cheerio = require('cheerio');
const Constants = require('./constants');

let filtered_domains = ['gstatic.com'];

async function search(search_query, options = { ris: false, page: 0, match_all_images: false, additional_params: null }) {
  const page = options.page * 10;
  const query = search_query.trim().split(/ +/).join('+').toLowerCase();
  const url = encodeURI(options.ris ? `${Constants.URLS.W_GOOGLE}searchbyimage?image_url=${search_query}` : `${Constants.URLS.GOOGLE}search?q=${query}&aqs=chrome..69i57.1685j0j4&client=ms-android-motorola-rev2&sourceid=chrome-mobile&ie=UTF-8&aomd=1${options.safe ? '&safe=active': ''}&start=${page || 0}`);

  const response = await Axios.get(url, { params: options.additional_params, headers: Utils.getHeaders(true) }).catch((error) => error);
  if (response instanceof Error) throw new Error(`Could not search on Google: ${response.message}`);

  const $ = Cheerio.load(Utils.formatHtml(response.data));
  const parser = new Parser($, response.data);

  const final_data = {
    results: [],
    did_you_mean: '',
    knowledge_panel: {},
    featured_snippet: {},
    top_stories: [],
    people_also_ask: [],
    people_also_search_for: []
  };

  final_data.results = parser.getOrganicResults();
  final_data.knowledge_panel = parser.getKnowledgeGraph();
  final_data.featured_snippet = parser.getFeaturedSnippet();

  const did_you_mean = $(Constants.SELECTORS.DID_YOU_MEAN).text();
  did_you_mean && (final_data.did_you_mean = did_you_mean) || (delete final_data.did_you_mean);

  const unit_converter = parser.getConverters();
  unit_converter && (final_data.unit_converter = unit_converter);

  const weather_forecast = parser.getWeather();
  weather_forecast && (final_data.weather = weather_forecast);

  const time = parser.getTime();
  time && (final_data.current_time = time);

  const location = parser.getLocation(time);
  location && (final_data.location = location);

  const dictionary = parser.getDictionary();
  dictionary && (final_data.dictionary = dictionary);

  const translation = parser.getTranslation();
  translation && (final_data.translation = translation);

  const top_stories = parser.getTopStories();
  final_data.top_stories = top_stories;

  const people_also_ask = parser.getPaa();
  final_data.people_also_ask = people_also_ask;

  const people_also_search_for = parser.getPas();
  final_data.people_also_search_for = people_also_search_for;

  return final_data;
}

async function image(query, options = { safe: false, exclude_domains: [], additional_params: null }) {
  let search_query = query.trim().split(/ +/).join('+').toLowerCase();
  let formatted_search_url = `${Constants.URLS.GIS}search?tbm=isch${options.safe ? '&safe=active': ''}&q=${search_query}`;

  filtered_domains = filtered_domains.concat(options.exclude_domains);
  if (options.exclude_domains) {
    formatted_search_url += ' ' + filtered_domains.map((site) => '-site:' + site).join('');
  }

  const response = await Axios.get(encodeURI(formatted_search_url), { params: options.additional_params, headers: Utils.getHeaders(false) }).catch((error) => error);
  if (response instanceof Error) throw new Error(`Could not search on Google: ${response.message}`);

  const image_search_regex = Constants.REGEX.IMAGE_SEARCH;

  let index = 0;
  let final_data = [];
  let origin = parseImageOriginData(response.data);

  let parsed_data = image_search_regex.exec(response.data);

  while (parsed_data != null && index != 15) {
    if (!parsed_data[1].includes(filtered_domains[0])) {
      final_data.push({
        url: parsed_data[1],
        width: parsed_data[2],
        height: parsed_data[3],
        origin: origin[index++],
      });
    }
    parsed_data = image_search_regex.exec(response.data);
  }

  return final_data;
}

function parseImageOriginData(data) {
  const image_origin_regex = Constants.REGEX.IMAGE_ORIGIN;

  let parsed_data = image_origin_regex.exec(data);
  let processed_data = [];

  while (parsed_data != null) {
    processed_data.push({
      title: parsed_data[4],
      website: parsed_data[3],
    });
    parsed_data = image_origin_regex.exec(data);
  }

  return processed_data;
}

async function getTopNews() {
  const formatted_url = `${Constants.URLS.GOOGLE_NEWS}topstories?tab=in&hl=en-US&gl=US&ceid=US:en`;

  const response = await Axios.get(formatted_url, { headers: Utils.getHeaders(true) }).catch((error) => error);
  if (response instanceof Error) throw new Error(`Could not get top news: ${response.message}`);

  const $ = Cheerio.load(response.data);

  const final_data = { headline_stories: [] };

  const headline_stories_publishers = $(Constants.SELECTORS.PUBLISHER).map((i, el) => $(el).text()).get();
  const headline_stories_imgs = $(Constants.SELECTORS.STORY_IMG).map((i, el) => $(el).attr('src')).get();
  const headline_stories_time = $(Constants.SELECTORS.STORY_TIME).map((i, el) => $(el).text()).get();

  $('a[class="DY5T1d RZIKme"]').each((i, el) => {
    const headline_stories_title = $(el).text();
    const headline_stories_url = $(el).attr('href');

    final_data.headline_stories.push({
      title: headline_stories_title,
      url: `${Constants.URLS.GOOGLE_NEWS}${headline_stories_url.slice(2)}`,
      image: headline_stories_imgs[i],
      published: headline_stories_time[i],
      by: headline_stories_publishers[i]
    });
  });

  return final_data;
}

module.exports = {
  getTopNews,
  search,
  image
};