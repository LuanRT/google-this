'use strict';

const Unraw = require('unraw').default;
const Cheerio = require('cheerio');
const NormalizeText = require('replace-special-characters');

const Utils = require('../utils/utils');
const Constants = require('../utils/constants');

class Parser {
  constructor(data) {
    this.data = data;
    this.$ = Cheerio.load(Utils.refineData(data));
  }
  
  get organic_results() {
    const titles = this.$(Constants.SELECTORS.TITLE)
      .map((i, el) => {
        if (el.parent.attribs.style != '-webkit-line-clamp:2') // ignores ad titles
          return this.$(el.children).text().trim();
      }).get();

    const descriptions = this.$(Constants.SELECTORS.DESCRIPTION)
      .map((i, el) => {
        if (el.parent.attribs.class != 'w1C3Le') // ignores ad descriptions
          return this.$(el).text().trim();
      }).get();

    const urls = this.$(Constants.SELECTORS.URL)
      .map((i, el) => this.$(el).attr('href')).get();

    this.#refineResults(titles, descriptions, urls);

    return titles.map((title, index) => ({
      title: title,
      description: descriptions[index],
      url: urls[index],
      favicons: {
        high_res: `${Constants.URLS.FAVICONKIT}/${new URL(urls[index] || Constants.URLS.GOOGLE).hostname}/192`,
        low_res: `${Constants.URLS.W_GOOGLE}s2/favicons?sz=64&domain_url=${new URL(urls[index] || Constants.URLS.GOOGLE).hostname}`
      }
    })).filter((item) => item.title && item.description && item.url);
  }
  
  get knowledge_graph() {
    const knowledge_panel = {};

    knowledge_panel.title = this.$(Constants.SELECTORS.KNO_PANEL_TITLE[0]).first().text() || this.$(Constants.SELECTORS.KNO_PANEL_TITLE[1]).text() || 'N/A';
    knowledge_panel.description = this.$(Constants.SELECTORS.KNO_PANEL_DESCRIPTION).first().text() || 'N/A';
    knowledge_panel.url = this.$(Constants.SELECTORS.KNO_PANEL_URL).attr('href') || 'N/A';

    // Extracts metadata from the knowledge graph
    this.$(Constants.SELECTORS.KNO_PANEL_METADATA).each((i, el) => {
      const key = this.$(el).first().text().trim().slice(0, -1);
      const value = this.$(el).next().text().trim();
      value.length && (knowledge_panel[NormalizeText(key.toLowerCase().replace(/ /g, '_').replace(/\(|\)/g, ''))] = value.trim());
    });

    const knowledge_panel_type = this.$(Constants.SELECTORS.KNO_PANEL_TYPE).last().text();
    if (knowledge_panel_type && knowledge_panel_type !== knowledge_panel.title) {
      knowledge_panel.type = knowledge_panel_type;
    }

    knowledge_panel.books = this.$(Constants.SELECTORS.KNO_PANEL_BOOKS).map((i, el) => {
      if (this.$(el).next().text().trim().length)
        return {
          title: this.$(el).first().text().trim(),
          year: this.$(el).next().text().trim()
        };
    }).get();

    knowledge_panel.tv_shows_and_movies = this.$(Constants.SELECTORS.KNO_PANEL_TV_SHOWS_AND_MOVIES).map((i, el) => {
      if (this.$(el).next().text().trim().length)
        return {
          title: this.$(el).first().text().trim(),
          year: this.$(el).next().text().trim()
        };
    }).get();

    const song_lyrics = this.$(Constants.SELECTORS.KNO_PANEL_SONG_LYRICS)
      .map((i, el) =>
        this.$(this.$(el).html()
          .replace(/<\/span><\/div><div jsname="{0,7}" class="{0,7}"><span jsname="{0,10}">/g, '\n\n')
          .replace(/<br>/g, '\n')).text()).get();

    song_lyrics.length && (knowledge_panel.lyrics = song_lyrics.join('\n\n'));

    const google_users_rating = this.$(Constants.SELECTORS.KNO_PANEL_FILM_GOOGLEUSERS_RATING)[0];
    if (google_users_rating) {
      const rating = this.$(google_users_rating.children[0].children[0]).text() || 'N/A';
      knowledge_panel.ratings = [];
      knowledge_panel.ratings.push({
        name: 'Google Users',
        rating: rating
      });
    }

    this.$(Constants.SELECTORS.KNO_PANEL_FILM_RATINGS[0]).each((i, el) => {
      knowledge_panel.ratings = knowledge_panel.ratings || [];
      const name = this.$(this.$(Constants.SELECTORS.KNO_PANEL_FILM_RATINGS[1])[i]).attr('title');
      const rating = this.$(el).text();
      knowledge_panel.ratings.push({
        name: name,
        rating: rating
      });
    });
    
    knowledge_panel.available_on = this.$(Constants.SELECTORS.KNO_PANEL_AVAILABLE_ON).map((i, el) => this.$(el).text()).get();

    knowledge_panel.images = this.$(Constants.SELECTORS.KNO_PANEL_IMAGES).map((i, elem) => {
      return {
        url: this.$(elem).attr('data-src'),
        source: this.$(elem).parent().parent().parent().parent().parent().attr('data-lpage'),
      };
    }).get().filter((img) => img.url);
    
    knowledge_panel.songs = this.$(Constants.SELECTORS.KNO_PANEL_SONGS).map((i, el) => ({
      title: this.$(el).text().trim(),
      album: this.$(el).next().find('span').first().text().trim(),
    })).get();
     
    const demo = Utils.getStringBetweenStrings(this.data, 'source src\\x3d\\x22', '.mp4');
    demo && (knowledge_panel.demonstration = demo + '.mp4');

    !knowledge_panel.books.length &&
      delete knowledge_panel.books;
    !knowledge_panel.songs.length &&
      delete knowledge_panel.songs;
    !knowledge_panel.tv_shows_and_movies.length &&
      delete knowledge_panel.tv_shows_and_movies;
    !knowledge_panel.available_on.length &&
      delete knowledge_panel.available_on;
    !knowledge_panel.images.length &&
      delete knowledge_panel.images;

    return knowledge_panel;
  }
  
  get videos() {
    const videos = this.$(Constants.SELECTORS.VIDEOS).map((i, elem) => {
      return {
        id: this.$(elem).attr('data-vid'),
        url: this.$(elem).attr('data-surl'),
        title: this.$(elem).children().find('a > div > div').prev().text().trim(),
        author: this.$(elem).children().find('a > div > div > span').next().next().prev().text().replace(/·/g, '').trim(),
        duration: this.$(elem).children().find('div[role="presentation"]').first().text(),
      }
    }).get().filter((item) => item.id && item.url);
    
    return videos;
  }

  get featured_snippet() {
    const featured_snippet_title =
      this.$(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[0]).text() ||
      this.$(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[1]).text() ||
      this.$(Constants.SELECTORS.FEATURED_SNIPPET_TITLE[2]).text() ||
      undefined;

    const featured_snippet_url = this.$(Constants.SELECTORS.FEATURED_SNIPPET_URL).map((i, el) => this.$(el).attr('href')).get()[0];

    const featured_snippet = Constants.SELECTORS.FEATURED_SNIPPET_DESC.map((selector) => {
      if (this.$(selector)[0] && selector != Constants.SELECTORS.FEATURED_SNIPPET_DESC[2]) {
        const text =
          this.$(selector).html()
            .replace(/<\/li>|<\/b>|<b>/g, '')
            .replace(/&amp;/g, '&')
            .split('<li class="TrT0Xe">')
            .join('\n').trim();
        return text;
      } else if (selector == Constants.SELECTORS.FEATURED_SNIPPET_DESC[2]) {
        const text = this.$(selector).text();
        return text;
      }
    }).filter(text => text && text.length)[0];

    return {
      title: featured_snippet_title || 'N/A',
      description: featured_snippet || 'N/A',
      url: featured_snippet_url || 'N/A'
    };
  }

  get did_you_mean() {
    return this.$(Constants.SELECTORS.DID_YOU_MEAN).text();
  }

  get top_stories() {
    // Removes unwanted text from the description
    this.$(`${Constants.SELECTORS.TOP_STORIES_DESCRIPTION[0]} > div.CEMjEf`).each((el) => this.$(el).remove());
    this.$(`${Constants.SELECTORS.TOP_STORIES_DESCRIPTION[0]} > div > p`).each((el) => this.$(el).remove());

    const top_stories_descriptions = Constants.SELECTORS.TOP_STORIES_DESCRIPTION.map((selector) =>
      this.$(selector).map((el) => this.$(el).text()).get()).filter((descs) => descs.length > 0)[0];
    const top_stories_urls = this.$(Constants.SELECTORS.TOP_STORIES_URL).map((el) => this.$(el).attr('href')).get();

    return top_stories_urls.map((item, i) => {
      if (top_stories_descriptions)
        return {
          description: top_stories_descriptions[i],
          url: item
        };
    }).filter((story) => story);
  }

  get time() {
    const hours = this.$(Constants.SELECTORS.CURRENT_TIME_HOUR).first().text();
    const date = this.$(Constants.SELECTORS.CURRENT_TIME_DATE).map((i, el) => this.$(el).text()).get()[1];

    if (date) {
      return {
        hours: hours.trim(),
        date: date.trim()
      };
    }
  }

  get weather() {
    const weather_location = this.$(Constants.SELECTORS.WEATHER_LOCATION).text();
    const weather_forecast = this.$(Constants.SELECTORS.WEATHER_FORECAST).text();
    const precipitation = this.$(Constants.SELECTORS.PRECIPITATION).text();
    const air_humidity = this.$(Constants.SELECTORS.AIR_HUMIDITY).text();
    const temperature = this.$(Constants.SELECTORS.TEMPERATURE).text();
    const wind_speed = this.$(Constants.SELECTORS.WIND_SPEED).text();

    if (weather_location && weather_forecast) {
      return {
        location: weather_location,
        forecast: weather_forecast,
        precipitation,
        humidity: air_humidity,
        temperature,
        wind: wind_speed
      };
    }
  }

  get location() {
    const location_title = this.$(Constants.SELECTORS.LOCATION_TITLE).text();
    const location_distance = this.$(Constants.SELECTORS.LOCATION_DISTANCE).text();
    const location_image = this.$(Constants.SELECTORS.LOCATION_IMAGE).attr('src');

    if (location_title && location_distance) {
      return {
        title: location_title,
        distance: location_distance,
        map: 'https://google.com' + location_image
      };
    }
  }

  get translation() {
    const source_language = this.$(Constants.SELECTORS.TR_SOURCE_LANGUAGE).text();
    const target_language = this.$(Constants.SELECTORS.TR_TARGET_LANGUAGE).text();

    const source_text = this.$(Constants.SELECTORS.TR_SOURCE_TEXT).text();
    const target_text = this.$(Constants.SELECTORS.TR_TARGET_TEXT).text();

    if (source_text.length > 0) {
      return {
        source_language,
        target_language,
        source_text,
        target_text
      };
    }
  }

  get dictionary() {
    const word = this.$(Constants.SELECTORS.GD_WORD).text();
    const phonetic = this.$(Constants.SELECTORS.GD_PHONETIC).text();
    const audio = this.$(Constants.SELECTORS.GD_AUDIO).attr('src');

    if (word) {
      return {
        word: word || 'N/A',
        phonetic: phonetic || 'N/A',
        audio: audio ? `https:${audio}` : 'N/A',
        definitions: this.$(Constants.SELECTORS.GD_DEFINITIONS).map((i, el) => this.$(el).text()).get(),
        examples: this.$(Constants.SELECTORS.GD_EXAMPLES).map((i, el) => this.$(el).text()).get()
      };
    }
  }

  get converters() {
    const unit_converter_input = this.$(Constants.SELECTORS.UNIT_CONVERTER_INPUT).attr('value');
    const unit_converter_output = this.$(Constants.SELECTORS.UNIT_CONVERTER_OUTPUT).attr('value');
    const unit_converter_formula = this.$(Constants.SELECTORS.UNIT_CONVERTER_FORMULA).text();

    const input_currency_name = this.$(Constants.SELECTORS.INPUT_CURRENCY_NAME).attr('data-name');
    const output_currency_name = this.$(Constants.SELECTORS.OUTPUT_CURRENCY_NAME).attr('data-name');
    const currency_converter_input = this.$(Constants.SELECTORS.CURRENCY_CONVERTER_INPUT).text();
    const currency_converter_output = this.$(Constants.SELECTORS.CURRENCY_CONVERTER_OUTPUT).text();

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

  get paa() {
    const people_also_ask = [];
    
    Constants.SELECTORS.PAA.forEach((item) =>
      this.$(item).each((i, el) => people_also_ask.push(this.$(el).text())));
   
    people_also_ask.shift();
    
    const extra_data = JSON.parse(Unraw(Utils.getStringBetweenStrings(this.data, 'var c=\'', '\';google') || '{}'));
    const rfs = extra_data?.sb_wiz?.rfs;
  
    rfs && rfs.forEach((el) => {
      const item = el.replace(/<b>|<\/b>/g, '');
      people_also_ask.push(item);
    });
    
    return people_also_ask;
  }

  get pas() {
    return this.$(Constants.SELECTORS.PASF).map((i, el) => {
      if (this.$(el).attr('data-src'))
        return {
          title: this.$(el).attr('alt'),
          thumbnail: `https:${this.$(el).attr('data-src')}`
        };
    }).get();
  }

  #refineResults(titles, descriptions, urls) {
    titles.length < urls.length && titles.length < descriptions.length && urls.shift();
    urls.length > titles.length && urls.shift();

    const is_innacurate_data = descriptions.length < urls.slice(1).length;
    
    urls.forEach((item, index) => {
      // Why YouTube? Because video results usually don't have a description.
      if (item.includes('m.youtube.com') && is_innacurate_data) {
        urls.splice(index, 1);
        titles.splice(index, 1);
        index--;
      }
    });
  }
}

module.exports = Parser;