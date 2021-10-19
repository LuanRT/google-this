'use strict';

const Axios = require('axios');
const Utils = require('./utils');
const Cheerio = require('cheerio');
const Constants = require('./constants');
const NormalizeText = require('replace-special-characters');

let debugging = false;
let filtered_domains = ['gstatic.com'];

async function search (search_query, options = { ris: false, page: 0, match_all_images: false, debugging: false, additional_params: null }) {
  debugging = options.debugging;

  const page = options.page * 10;
  const query = search_query.trim().split(/ +/).join('+').toLowerCase();
  const url = encodeURI(options.ris ? `${Constants.URLS.W_GOOGLE}searchbyimage?image_url=${search_query}`: `${Constants.URLS.GOOGLE}search?q=${query}&aqs=chrome..69i57.1685j0j4&client=ms-android-motorola-rev2&sourceid=chrome-mobile&ie=UTF-8&aomd=1${options.safe ? '&safe=active': ''}&start=${page || 0}`);

  const response = await Axios.get(url, { params: options.additional_params, headers: Utils.getHeaders(true) }).catch((error) => error);
  if (response instanceof Error) throw new Error(`Could not search on Google: ${response.message}`);
  
  const $ = Cheerio.load(Utils.formatHtml(response.data));
  
  const final_data = {
    results: [],
    did_you_mean: '',
    knowledge_panel: {},
    featured_snippet: {},
    top_stories: [],
    people_also_ask: [],
    people_also_search_for: []
  };

  final_data.results = getOrganicResults($);
  final_data.knowledge_panel = getKnowledgeGraph($, response.data);
  final_data.featured_snippet = getFeaturedSnippet($);

  const did_you_mean = $(Constants.SELECTORS.DID_YOU_MEAN).text();
  did_you_mean && (final_data.did_you_mean = did_you_mean) || (delete final_data.did_you_mean);

  const unit_converter = getConverters($);
  unit_converter && (final_data.unit_converter = unit_converter);

  const weather_forecast = getWeather($);
  weather_forecast && (final_data.weather = weather_forecast);

  const time = getTime($);
  time && (final_data.current_time = time);

  const location = getLocation($, time);
  location && (final_data.location = location);

  const dictionary = getDictionary($);
  dictionary && (final_data.dictionary = dictionary);

  const translation = getTranslation($);
  translation && (final_data.translation = translation);

  const top_stories = getTopStories($);
  final_data.top_stories = top_stories;

  const people_also_ask = getPaa($);
  final_data.people_also_ask = people_also_ask;

  const people_also_search_for = getPas($);
  final_data.people_also_search_for = people_also_search_for;
  
  return final_data;
}

function getPaa($) {
  let people_also_ask = [];
  Constants.SELECTORS.PAA.forEach((item) => $(item).each((i, el) => people_also_ask.push($(el).text())));
  people_also_ask.shift();
  return people_also_ask;
}

function getPas($) {
  return $(Constants.SELECTORS.PASF).map((i, el) => {
    if (!$(el).attr('data-src')) return;
    return {
      title: $(el).attr('alt'),
      thumbnail: `https:${$(el).attr('data-src')}`
    };
  }).get();
}

function getTime($) {
  const hours = $(Constants.SELECTORS.CURRENT_TIME_HOUR).text();
  const date = $(Constants.SELECTORS.CURRENT_TIME_DATE).map((i, el) => $(el).text()).get()[1];

  if (date) {
    return {
      hours: hours.trim(),
      date: date.trim()
    };
  }
}

function getWeather($) {
  const weather_location = $(Constants.SELECTORS.WEATHER_LOCATION).text();
  const weather_forecast = $(Constants.SELECTORS.WEATHER_FORECAST).text();
  const precipitation = $(Constants.SELECTORS.PRECIPITATION).text();
  const air_humidity = $(Constants.SELECTORS.AIR_HUMIDITY).text();
  const temperature = $(Constants.SELECTORS.TEMPERATURE).text();
  const wind_speed = $(Constants.SELECTORS.WIND_SPEED).text();

  if (weather_location && weather_forecast) {
    return {
      location: weather_location,
      forecast: weather_forecast,
      precipitation,
      humidity: air_humidity,
      temperature: temperature,
      wind: wind_speed
    };
  }
}

function getLocation($, date) {
  const location_title = $(Constants.SELECTORS.LOCATION_TITLE).text();
  const location_distance = $(Constants.SELECTORS.LOCATION_DISTANCE).text();
  const location_image = $(Constants.SELECTORS.LOCATION_IMAGE).attr('src');

  if (location_title && location_distance && !date) {
    return {
      title: location_title,
      distance: location_distance,
      map: 'https://google.com'+location_image
    };
  }
}

function getTranslation($) {
  const source_language = $(Constants.SELECTORS.TR_SOURCE_LANGUAGE).text();
  const target_language = $(Constants.SELECTORS.TR_TARGET_LANGUAGE).text();

  const source_text = $(Constants.SELECTORS.TR_SOURCE_TEXT).text();
  const target_text = $(Constants.SELECTORS.TR_TARGET_TEXT).text();

  if (source_text.length > 0) {
    return {
      source_language,
      target_language,
      source_text,
      target_text
    };
  }
}

function getDictionary($) {
  const word = $(Constants.SELECTORS.GD_WORD).text();
  const phonetic = $(Constants.SELECTORS.GD_PHONETIC).text();
  const audio = $(Constants.SELECTORS.GD_AUDIO).attr('src');

  if (word) {
    return {
      word: word || 'N/A',
      phonetic: phonetic || 'N/A',
      audio: audio ? `https:${audio}`: 'N/A',
      definitions: $(Constants.SELECTORS.GD_DEFINITIONS).map((i, el) => $(el).text()).get(),
      examples: $(Constants.SELECTORS.GD_EXAMPLES).map((i, el) => $(el).text()).get()
    };
  }
}

function getConverters($) {
  const unit_converter_input = $(Constants.SELECTORS.UNIT_CONVERTER_INPUT).attr('value');
  const unit_converter_output = $(Constants.SELECTORS.UNIT_CONVERTER_OUTPUT).attr('value');
  const unit_converter_formula = $(Constants.SELECTORS.UNIT_CONVERTER_FORMULA).text();

  const input_currency_name = $(Constants.SELECTORS.INPUT_CURRENCY_NAME).attr('data-name');
  const output_currency_name = $(Constants.SELECTORS.OUTPUT_CURRENCY_NAME).attr('data-name');
  const currency_converter_input = $(Constants.SELECTORS.CURRENCY_CONVERTER_INPUT).text();
  const currency_converter_output = $(Constants.SELECTORS.CURRENCY_CONVERTER_OUTPUT).text();

  if (unit_converter_input && unit_converter_output) {
    return {
      input: unit_converter_input,
      output: unit_converter_output,
      formula: unit_converter_formula
    };
  } else if (currency_converter_input && currency_converter_output) {
    return {
      input: {
        name: input_currency_name,
        value: currency_converter_input
      },
      output: {
        name: output_currency_name,
        value: currency_converter_output
      }
    };
  }
}

function getTopStories($) {
  // Removes unnecessary texts from the short description
  $(`${Constants.SELECTORS.TOP_STORIES_DESCRIPTION[0]} > div.CEMjEf`).each((i, el) => $(el).remove());
  $(`${Constants.SELECTORS.TOP_STORIES_DESCRIPTION[0]} > div > p`).each((i, el) => $(el).remove());
  
  const top_stories_descriptions = Constants.SELECTORS.TOP_STORIES_DESCRIPTION.map((selector) => $(selector).map((i, el) => $(el).text().slice(1)).get()).filter((descs) => descs.length > 0)[0];
  const top_stories_urls = $(Constants.SELECTORS.TOP_STORIES_URL).map((i, el) => $(el).attr('href')).get();

  return top_stories_urls.map((item, i) => {
    if (!top_stories_descriptions) return;
    return {
      description: top_stories_descriptions[i],
      url: item,
    };
  }).filter((story) => story);
}

function getFeaturedSnippet($) {
  const featured_snippet_title = $(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[0]).text() || $(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[1]).text() || $(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[2]).text() || undefined;
  const featured_snippet_url = $(Constants.SELECTORS.FEATURED_SNIPPET_URL).map((i, el) => $(el).attr('href')).get()[0];
  const featured_snippet = Constants.SELECTORS.FEATURED_SNIPPET_DESC.map((selector) => {
    if ($(selector)[0] && selector != Constants.SELECTORS.FEATURED_SNIPPET_DESC[2]) {
      const text = $(selector).html().replace(/<\/li>|<\/b>|<b>/g, '').replace(/&amp;/g, '&').split('<li class="TrT0Xe">').join('\n').trim();
      return text;
    } else if (selector == Constants.SELECTORS.FEATURED_SNIPPET_DESC[2]) {
      const text = $(selector).text();
      return text;
    } else {
      return undefined;
    }
  }).filter(text => text != undefined && text.length != 0)[0];

  return {
    title: featured_snippet_title || 'N/A',
    description: featured_snippet || 'N/A',
    url: featured_snippet_url || 'N/A'
  };
}

function getKnowledgeGraph($, data) {
  const knowledge_panel = {};

  knowledge_panel.title = $(Constants.SELECTORS.KNO_PANEL_TITLE[0]).first().text() || $(Constants.SELECTORS.KNO_PANEL_TITLE[1]).text() || 'N/A';
  knowledge_panel.description = $(Constants.SELECTORS.KNO_PANEL_DESCRIPTION).first().text() || 'N/A';
  knowledge_panel.url = $(Constants.SELECTORS.KNO_PANEL_URL).attr('href') || 'N/A';

  // Extracts metadata from the knowledge graph
  $(Constants.SELECTORS.KNO_PANEL_METADATA).each((i, el) => {
    const key = $(el).text().trim().slice(0, -1);
    const value = $(el).next().text().trim();
    knowledge_panel[NormalizeText(key.toLowerCase().replace(/ /g, '_'))] = value.trim();
  });

  const knowledge_panel_type = $(Constants.SELECTORS.KNO_PANEL_TYPE).last().text();
  if (knowledge_panel_type && knowledge_panel_type !== knowledge_panel.title) {
    knowledge_panel.type = knowledge_panel_type;
  }

  knowledge_panel.books = $(Constants.SELECTORS.KNO_PANEL_BOOKS).map((i, el) => {
    if ($(el).next().text().trim() == '') return;
    return {
      title: $(el).first().text().trim(),
      year: $(el).next().text().trim()
    };
  }).get();
  knowledge_panel.books.length == 0 && delete knowledge_panel.books;

  knowledge_panel.tv_shows_and_movies = $(Constants.SELECTORS.KNO_PANEL_TV_SHOWS_AND_MOVIES).map((i, el) => {
    if ($(el).next().text().trim() == '') return;
    return {
      title: $(el).first().text().trim(),
      year: $(el).next().text().trim()
    };
  }).get();
  knowledge_panel.tv_shows_and_movies.length == 0 && delete knowledge_panel.tv_shows_and_movies;

  const song_lyrics = $(Constants.SELECTORS.KNO_PANEL_SONG_LYRICS).map((i, el) => $($(el).html().replace(/<\/span><\/div><div jsname="u8s5sf" class="ujudub"><span jsname="ys01ge">/g, '\n\n').replace(/<br>/g, '\n')).text()).get();
  song_lyrics.length > 0 && (knowledge_panel.lyrics = song_lyrics.join('\n\n'));

  const google_users_rating = $(Constants.SELECTORS.KNO_PANEL_FILM_GOOGLEUSERS_RATING)[0];
  if (google_users_rating) {
    const rating = $(google_users_rating.children[0].children[0]).text() || 'N/A';
    knowledge_panel.ratings = [];
    knowledge_panel.ratings.push({
      name: 'Google Users', rating: rating
    });
  }

  $(Constants.SELECTORS.KNO_PANEL_FILM_RATINGS[0]).each((i, el) => {
    knowledge_panel.ratings = knowledge_panel.ratings || [];
    const name = $($(Constants.SELECTORS.KNO_PANEL_FILM_RATINGS[1])[i]).attr('title');
    const rating = $(el).text();
    knowledge_panel.ratings.push({
      name: name, rating: rating
    });
  });

  knowledge_panel.available_on = $(Constants.SELECTORS.KNO_PANEL_AVAILABLE_ON).map((i, el) => $(el).text());
  knowledge_panel.available_on.length == 0 && delete knowledge_panel.available_on;

  knowledge_panel.images = $(Constants.SELECTORS.KNO_PANEL_IMAGES).map((i, elem) => {
    return {
      url: $(elem).attr('data-src'),
      source: $(elem).parent().parent().parent().attr('data-lpage'),
    };
  }).get().filter((img) => img.url !== undefined);
  knowledge_panel.images.length == 0 && delete knowledge_panel.images;

  const animal_preview = Utils.getStringBetweenStrings(data, 'source src\\x3d\\x22', '.mp4');
  animal_preview && (knowledge_panel.demonstration = animal_preview +'.mp4');

  return knowledge_panel;
}

function getOrganicResults($) {
  const titles = $(Constants.SELECTORS.TITLE).map((i, el) => {
    if (el.parent.attribs.style != '-webkit-line-clamp:2') // ignores ad titles
      return $(el.children).text().trim();
  }).get();
  const descriptions = $(Constants.SELECTORS.DESCRIPTION).map((i, el) => {
    if (el.parent.attribs.class != 'w1C3Le') // ignores ad descriptions
      return $(el).text().trim();
  }).get();
  const urls = $(Constants.SELECTORS.URL).map((i, el) => $(el).attr('href')).get();

  correctFuzzyData(titles, descriptions, urls);

  return titles.map((title, index) => {
    return {
      title: title || 'N/A',
      description: descriptions[index] || 'N/A',
      url: urls[index] || 'N/A',
      favicons: {
        high_res: `https://api.faviconkit.com/${new URL(urls[index] || 'https://google.com').hostname}/192`,
        low_res: `https://www.google.com/s2/favicons?sz=64&domain_url=${new URL(urls[index] || 'https://google.com').hostname}`
      }
    };
  });
}

function correctFuzzyData (titles, descriptions, urls) {
  // Correcting wrongly parsed data, this is quite rare tho.
  if (titles.length < Constants.URLS.length && titles.length < descriptions.length) {
    urls.shift();
  } else if (Constants.URLS.length > titles.length) {
    urls.shift();
  }

  const innacurate_data = descriptions.length > urls.slice(1).length ? false: true;

  urls.forEach((item, index) => {
    // Why YouTube? Because video results usually don't have a description.
    if (item.includes('m.youtube.com') && innacurate_data && Constants.URLS.length > 1) {
      debug('Removing malformed block containing the link: ' + item);

      urls.splice(index, 1);
      titles.splice(index, 1);
      index--;
    }
  });
}

async function image (query, options = { safe: false, exclude_domains: [], additional_params: null }) {
  let search_query = query.trim().split(/ +/).join('+').toLowerCase();
  let formatted_search_url = `${Constants.URLS.GIS}search?tbm=isch${options.safe ? '&safe=active': ''}&q=${search_query}`;

  filtered_domains = filtered_domains.concat(options.exclude_domains);
  if (options.exclude_domains) {
    formatted_search_url += ' ' + filtered_domains.map((site) => '-site:'+site).join('');
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

function parseImageOriginData (data) {
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

async function getTopNews () {
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

function debug (text) {
  if (debugging) return typeof text === 'object' ? console.table(text): console.debug('[INFO]:', text);
}

module.exports = {
  getTopNews,
  search,
  image
};