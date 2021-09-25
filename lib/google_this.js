'use strict';

const { urls, regex, selectors } = require('./constants');

const utils = require('./utils');
const axios = require('axios');
const cheerio = require('cheerio');
const normalizeText = require('replace-special-characters');

let debugging = false;
let filtered_domains = [ 'gstatic.com' ];

function search (query, options = { ris: false, page: 0, match_all_images: false, debugging: false, additional_params: null }) {
  debugging = options.debugging;

  const page = options.page * 10;
  const search_query = query.trim().split(/ +/).join("+").toLowerCase();
  const formatted_search_url = encodeURI(options.ris ? `${urls.w_google_base_url}searchbyimage?image_url=${query}`: `${urls.google_base_url}search?q=${search_query}&aqs=chrome..69i57.1685j0j4&client=ms-android-motorola-rev2&sourceid=chrome-mobile&ie=UTF-8&aomd=1${options.safe ? '&safe=active': ''}&start=${page || 0}`);

  return new Promise(async (resolve, reject) => {
    const res = await axios.get(formatted_search_url, {
      params: options.additional_params,
      headers: utils.getHeaders(true)
    }).catch((error) => error);
    if (res instanceof Error) return resolve ({ error: res.message });
    
    const start = Date.now();
    const data = utils.formatHtml(res.data);
    const $ = cheerio.load(data);
    const final_data = { results: [] };
    
    // Organic search results
    const titles = $(selectors.title_selector).map((i, el) => {
      if (el.parent.attribs.style != '-webkit-line-clamp:2') // ignores ad titles
        return $(el.children).text().trim();
    }).get();
    const descriptions = $(selectors.description_selector).map((i, el) => {
      if (el.parent.attribs.class != 'w1C3Le') // ignores ad descriptions
        return $(el).text().trim();
    }).get();
    const urls = $(selectors.url_selector).map((i, el) => $(el).attr('href')).get();

    correctFuzzyData(titles, descriptions, urls);

    final_data.results = titles.map((title, index) => {
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

    // “did you mean”
    const did_you_mean = $(selectors.did_you_mean_selector).text();
    did_you_mean && (final_data.did_you_mean = did_you_mean);
 
    // Knowledge Panel
    const knowledge_panel_title = $(selectors.kno_panel_title_selector[0]).first().text() || $(selectors.kno_panel_title_selector[1]).text() || 'N/A';
    const knowledge_panel_desc = $(selectors.kno_panel_description_selector).first().text() || 'N/A';
    const knowledge_panel_url = $(selectors.kno_panel_url_selector).attr('href') || 'N/A';
    final_data.knowledge_panel = { title: knowledge_panel_title, description: knowledge_panel_desc, url: knowledge_panel_url };

    // Extracts metadata from the knowledge panel
    $(selectors.kno_panel_metadata_selector).each((i, el) => {
      const key = $(el).text().trim().slice(0, -1);
      const value = $(el).next().text().trim();
      final_data.knowledge_panel[normalizeText(key.toLowerCase().replace(/ /g, '_'))] = value.trim();
    });

    const knowledge_panel_type = $(selectors.kno_panel_type_selector).last().text();
    if (knowledge_panel_type && knowledge_panel_type !== knowledge_panel_title) {
      final_data.knowledge_panel.type = knowledge_panel_type;
    }
    
    final_data.knowledge_panel.books = $(selectors.kno_panel_books_selector).map((i, el) => {
      if ($(el).next().text().trim() == '') return;
      return {
        title: $(el).first().text().trim(),
        year: $(el).next().text().trim()
      };
    }).get();
    final_data.knowledge_panel.books.length == 0 && delete final_data.knowledge_panel.books;
    
    final_data.knowledge_panel.tv_shows_and_movies = $(selectors.kno_panel_tv_shows_and_movies_selector).map((i, el) => {
      if ($(el).next().text().trim() == '') return;
      return {
        title: $(el).first().text().trim(),
        year: $(el).next().text().trim()
      };
    }).get();
    final_data.knowledge_panel.tv_shows_and_movies.length == 0 && delete final_data.knowledge_panel.tv_shows_and_movies;
    
    const song_lyrics = $(selectors.kno_panel_song_lyrics_selector).map((i, el) => $($(el).html().replace(/<\/span><\/div><div jsname="u8s5sf" class="ujudub"><span jsname="ys01ge">/g, "\n\n").replace(/<br>/g, "\n")).text()).get();
    song_lyrics.length > 0 && (final_data.knowledge_panel.lyrics = song_lyrics.join('\n\n'));

    const google_users_rating = $(selectors.kno_panel_film_googleusers_rating_selector)[0];
    if (google_users_rating) {
      const rating = $(google_users_rating.children[0].children[0]).text() || "N/A";
      final_data.knowledge_panel.ratings = [];
      final_data.knowledge_panel.ratings.push({ name: "Google Users", rating: rating });
    }

    $(selectors.kno_panel_film_ratings_selector[0]).each((i, el) => {
      final_data.knowledge_panel.ratings = final_data.knowledge_panel.ratings || [];
      const name = $($(selectors.kno_panel_film_ratings_selector[1])[i]).attr('title');
      const rating = $(el).text();
      final_data.knowledge_panel.ratings.push({ name: name, rating: rating });
    });
    
    final_data.knowledge_panel.available_on = $(selectors.kno_panel_available_on_selector).map((i, el) => $(el).text());
    final_data.knowledge_panel.available_on.length == 0 && delete final_data.knowledge_panel.available_on;
     
    final_data.knowledge_panel.images = $(selectors.kno_panel_images_selector).map((i, elem) => {
      return {
        url: $(elem).attr('data-src'),
        source: $(elem).parent().parent().parent().attr('data-lpage'),
      };
    }).get().filter((img) => img.url !== undefined);
    final_data.knowledge_panel.images.length == 0 && delete final_data.knowledge_panel.images;

    // Featured Snippet
    const featured_snippet_title = $(selectors.featured_snippet_title_selector[0]).text() || $(selectors.featured_snippet_title_selector[1]).text() || $(selectors.featured_snippet_title_selector[2]).text() || undefined;
    const featured_snippet_url = $(selectors.featured_snippet_url_selector).map((i, el) => $(el).attr('href')).get()[0];
    const featured_snippet = selectors.featured_snippet_desc_selector.map((selector) => {
      if ($(selector)[0] && selector != selectors.featured_snippet_desc_selector[2]) {
        const text = $(selector).html().replace(/<\/li>|<\/b>|<b>/g, '').replace(/&amp;/g, '&').split('<li class="TrT0Xe">').join("\n").trim();
        return text;
      } else if (selector == selectors.featured_snippet_desc_selector[2]) {
        const text = $(selector).text();
        return text;
      } else {
        return undefined;
      }
    }).filter(text => text != undefined && text.length != 0)[0];
    final_data.featured_snippet = { title: featured_snippet_title || 'N/A', description: featured_snippet || 'N/A', url: featured_snippet_url || 'N/A' };

    // This usually appears if you search for an animal.
    const animal_preview = utils.getStringBetweenStrings(data, 'source src\\x3d\\x22', '.mp4');
    animal_preview && (final_data.knowledge_panel.demonstration = animal_preview +'.mp4');
    
    // Unit converter
    const unit_converter_input = $(selectors.unit_converter_input_selector).attr('value');
    const unit_converter_output = $(selectors.unit_converter_output_selector).attr('value');
    const unit_converter_formula = $(selectors.unit_converter_formula_selector).text();

    const input_currency_name = $(selectors.input_currency_name_selector).attr('data-name');
    const output_currency_name = $(selectors.output_currency_name_selector).attr('data-name');
    const currency_converter_input = $(selectors.currency_converter_input_selector).text();
    const currency_converter_output = $(selectors.currency_converter_output_selector).text();
  
    unit_converter_input && unit_converter_output 
    && (
      final_data.unit_converter = { 
        input: unit_converter_input, 
        output: unit_converter_output, 
        formula: unit_converter_formula 
      }
    );
    
    currency_converter_input && currency_converter_output
    && (
        final_data.unit_converter = {
          input: {
            name: input_currency_name,
            value: currency_converter_input
          },
          output: {
            name: output_currency_name,
            value: currency_converter_output
          }
        }
      );
    
    // Weather forecast
    const weather_location = $(selectors.weather_location_selector).text();
    const weather_forecast = $(selectors.weather_forecast_selector).text();
    const precipitation = $(selectors.precipitation_selector).text();
    const air_humidity = $(selectors.air_humidity_selector).text();
    const temperature = $(selectors.temperature_selector).text();
    const wind_speed = $(selectors.wind_speed_selector).text();

    weather_location && weather_forecast 
    && (
      final_data.weather = {
        location: weather_location,
        forecast: weather_forecast,
        precipitation,
        humidity: air_humidity,
        temperature: temperature,
        wind: wind_speed
      }
    );

    // Current Time
    const hours = $(selectors.current_time_hour_selector).text();
    const date = $(selectors.current_time_date_selector).map((i, el) => $(el).text()).get()[1];

    date &&
    (
      final_data.current_time = {
        hours: hours.trim(),
        date: date.trim()
      }
    );

    // Location
    const location_title = $(selectors.location_title_selector).text();
    const location_distance = $(selectors.location_distance_selector).text();
    const location_image = $(selectors.location_image_selector).attr('src');

    location_title && location_distance && !date &&
    (
      final_data.location = {
        title: location_title,
        distance: location_distance,
        map: 'https://google.com'+location_image
      }
    );

    // Google Dictionary
    const word = $(selectors.gd_word_selector).text();
    const phonetic = $(selectors.gd_phonetic_selector).text();
    const audio = $(selectors.gd_audio_selector).attr('src');
  
    word &&
    (
      final_data.dictionary = {
        word: word || 'N/A',
        phonetic: phonetic || 'N/A',
        audio: audio ? `https:${audio}`: 'N/A',
      }
    );
    
    if (word) {
      final_data.dictionary.definitions = $(selectors.gd_definitions_selector).map((i, el) => $(el).text()).get();
      final_data.dictionary.examples = $(selectors.gd_examples_selector).map((i, el) => $(el).text()).get();
    }
    
    // Google Translator
    const source_language = $(selectors.tr_source_language).text();
    const target_language = $(selectors.tr_target_language).text();

    const source_text = $(selectors.tr_source_text_selector).text();
    const target_text = $(selectors.tr_target_text_selector).text();

    source_text.length > 0 &&
    (
      final_data.translation = {
        source_language,
        target_language,
        source_text,
        target_text
      }
    );

    // Top Stories (this usually only returns 2 stories, it's still a work in progress and can be kinda buggy sometimes)
    const top_stories_descriptions = selectors.top_stories_description_selector.map((selector) => $(selector).map((i, el) => $(el).text().slice(1)).get()).filter((descs) => descs.length > 0)[0];
    const top_stories_urls = $(selectors.top_stories_url_selector).map((i, el) => $(el).attr('href')).get();

    top_stories_urls.forEach((item, i) => {
      if (!final_data.top_stories && top_stories_descriptions) {
        final_data.top_stories = [];
      } else return;

      final_data.top_stories.push({
        description: top_stories_descriptions[i],
        url: item,
      });
    });

    // Matches all high quality images in the page (it's also very very slow)
    if (options.match_all_images) {
      const images = getPageImages(data);
      if (images.length != 0) {
        final_data.related_images = images;
      }
    }

    // “People also ask”
    final_data.people_also_ask = [];
    
    selectors.paa_selector.forEach((item) => {
      $(item).each((i, el) => final_data.people_also_ask.push($(el).text()));
    });
    
    final_data.people_also_ask.shift();
    final_data.people_also_ask.length == 0 && delete final_data.people_also_ask;
    
    // “People also search for”
    final_data.people_also_search_for = $(selectors.pasf_selector).map((i, el) => {
      if (!$(el).attr('data-src')) return;
      return {
        title: $(el).attr('alt'),
        thumbnail: `https:${$(el).attr('data-src')}`
      };
    }).get();
    final_data.people_also_search_for.length == 0 && delete final_data.people_also_search_for;
   
    let end = Date.now();
    let debug_data = {};
    
    debug_data.execution_time = (end - start)+' ms';
    debug_data.titles = titles.length;
    debug_data.descriptions = descriptions.length;
    debug_data.urls = urls.length;
    debug(debug_data);

    resolve(final_data);
  });
}

function correctFuzzyData (titles, descriptions, urls) {
  // Correcting wrongly parsed data, this is quite rare tho.
  if (titles.length < urls.length && titles.length < descriptions.length) {
    urls.shift();
  } else if (urls.length > titles.length) {
    urls.shift();
  }

  const innacurate_data = descriptions.length > urls.slice(1).length ? false: true;

  urls.forEach((item, index) => {
    // Why YouTube? Because video results usually don't have a description.
    if (item.includes("m.youtube.com") && innacurate_data && urls.length > 1) {
      debug('Removing malformed block containing the link: ' + item);

      urls.splice(index, 1);
      titles.splice(index, 1);
      index--;
    }
  });
}

function getPageImages (data) {
  /* Man, this shit looks ugly asf. TODO: find a simpler and more efficient expression. */
  const regex = /\],\[\\x22(.*?)\\x22,(.*?),(.*?)\],null,0,\\x22rgb\((.+?),(.+?),(.+?)\)\\x22,null,0,{\\x222000\\x22:\[null,\\x22(.*?)\\x22,\\x22(.*?)\\x22]/g;

  let parsed_data = regex.exec(data);
  let processed_data = [];

  while (parsed_data != null) {
    processed_data.push({
      url: parsed_data[1],
      origin: parsed_data[7],
      metadata: {
        width: parsed_data[2],
        height: parsed_data[3],
        size: parsed_data[8]
      }
    });
    parsed_data = regex.exec(data);
  }
  return processed_data.slice(1);
}

/***** Google Image Search ******/
function image (query, options = { safe: false, exclude_domains: [], additional_params: null }) {
  let search_query = query.trim().split(/ +/).join('+').toLowerCase();
  let formatted_search_url = `${urls.gis_base_url}search?tbm=isch${options.safe ? '&safe=active': ''}&q=${search_query}`;

  filtered_domains = filtered_domains.concat(options.exclude_domains);
  if (options.exclude_domains) {
    formatted_search_url += ' ' + filtered_domains.map((site) => '-site:'+site).join('');
  }

  return new Promise(async (resolve, reject) => {
    const res = await axios.get(encodeURI(formatted_search_url), {
      params: options.additional_params,
      headers: utils.getHeaders(false)
    }).catch((error) => error);
    if (res instanceof Error) return reject({ error: res.message });
    
    const image_search_regex = regex.IMAGE_SEARCH;
    const data = res.data;

    let index = 0;
    let final_data = [];
    let origin = parseImageOriginData(data);

    let parsed_data = image_search_regex.exec(data);

    while (parsed_data != null && index != 15) {
      if (!parsed_data[1].includes(filtered_domains[0])) {
        final_data.push({
          url: parsed_data[1],
          width: parsed_data[2],
          height: parsed_data[3],       
          origin: origin[index++],
        });
      }
      parsed_data = image_search_regex.exec(data);
    }
    
    resolve(final_data);
  });
}

function parseImageOriginData (data) {
  const image_origin_regex = regex.IMAGE_ORIGIN;

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

/***** Google News *******/
function getTopNews () {
  const formatted_url = `${urls.google_news_url}topstories?tab=in&hl=en-US&gl=US&ceid=US:en`;
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(formatted_url, {
      headers: utils.getHeaders(true)
    }).catch((error) => error);
    if (res instanceof Error) return resolve({ error: res.message });
    
    const $ = cheerio.load(res.data);

    const final_data = { headline_stories: [] };
    
    const headline_stories_publishers = $(selectors.publisher_selector).map((i, el) => $(el).text()).get();
    const headline_stories_imgs = $(selectors.story_img_selector).map((i, el) => $(el).attr('src')).get();
    const headline_stories_time = $(selectors.story_time_selector).map((i, el) => $(el).text()).get();

    $('a[class="DY5T1d RZIKme"]').each((i, el) => {
      const headline_stories_title = $(el).text();
      const headline_stories_url = $(el).attr('href');

      final_data.headline_stories.push({
        title: headline_stories_title,
        url: `${urls.google_news_url}${headline_stories_url.slice(2)}`,
        image: headline_stories_imgs[i],
        published: headline_stories_time[i],
        by: headline_stories_publishers[i]
      });
    });

    resolve(final_data);
  });
}

function debug (text) {
  if (debugging) return typeof text === 'object' ? console.table(text): console.debug('[INFO]:', text);
}

module.exports = {
  getTopNews,
  search,
  image
};