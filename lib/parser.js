'use strict';

const Utils = require('./utils');
const Constants = require('./constants');
const NormalizeText = require('replace-special-characters');

class Parser {
  constructor($, raw_data) {
    this.$ = $;
    this.raw_data = raw_data;
  }

  getOrganicResults() {
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

    const urls = this.$(Constants.SELECTORS.URL).map((i, el) => this.$(el).attr('href')).get();

    this.#correctFuzzyData(titles, descriptions, urls);

    return titles.map((title, index) => ({
      title: title || 'N/A',
      description: descriptions[index] || 'N/A',
      url: urls[index] || 'N/A',
      favicons: {
        high_res: `${Constants.URLS.FAVICONKIT}/${new URL(urls[index] || Constants.URLS.GOOGLE).hostname}/192`,
        low_res: `${Constants.URLS.W_GOOGLE}s2/favicons?sz=64&domain_url=${new URL(urls[index] || Constants.URLS.GOOGLE).hostname}`
      }
    }));
  }

  getKnowledgeGraph() {
    const knowledge_panel = {};

    knowledge_panel.title = this.$(Constants.SELECTORS.KNO_PANEL_TITLE[0]).first().text() || this.$(Constants.SELECTORS.KNO_PANEL_TITLE[1]).text() || 'N/A';
    knowledge_panel.description = this.$(Constants.SELECTORS.KNO_PANEL_DESCRIPTION).first().text() || 'N/A';
    knowledge_panel.url = this.$(Constants.SELECTORS.KNO_PANEL_URL).attr('href') || 'N/A';

    // Extracts metadata from the knowledge graph
    this.$(Constants.SELECTORS.KNO_PANEL_METADATA).each((i, el) => {
      const key = this.$(el).first().text().trim().slice(0, -1);
      const value = this.$(el).next().text().trim();
      value.length && (knowledge_panel[NormalizeText(key.toLowerCase().replace(/ /g, '_'))] = value.trim());
    });

    const knowledge_panel_type = this.$(Constants.SELECTORS.KNO_PANEL_TYPE).last().text();
    if (knowledge_panel_type && knowledge_panel_type !== knowledge_panel.title) {
      knowledge_panel.type = knowledge_panel_type;
    }

    knowledge_panel.books = this.$(Constants.SELECTORS.KNO_PANEL_BOOKS).map((i, el) => {
      if (this.$(el).next().text().trim() == '') return;
      return {
        title: this.$(el).first().text().trim(),
        year: this.$(el).next().text().trim()
      };
    }).get();

    knowledge_panel.tv_shows_and_movies = this.$(Constants.SELECTORS.KNO_PANEL_TV_SHOWS_AND_MOVIES).map((i, el) => {
      if (this.$(el).next().text().trim() == '') return;
      return {
        title: this.$(el).first().text().trim(),
        year: this.$(el).next().text().trim()
      };
    }).get();

    const song_lyrics = this.$(Constants.SELECTORS.KNO_PANEL_SONG_LYRICS)
      .map((i, el) =>
        this.$(this.$(el).html()
          .replace(/<\/span><\/div><div jsname="u8s5sf" class="ujudub"><span jsname="ys01ge">/g, '\n\n')
          .replace(/<br>/g, '\n')).text()).get();

    song_lyrics.length > 0 && (knowledge_panel.lyrics = song_lyrics.join('\n\n'));

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
        source: this.$(elem).parent().parent().parent().attr('data-lpage'),
      };
    }).get().filter((img) => img.url !== undefined);

    const demo = Utils.getStringBetweenStrings(this.raw_data, 'source src\\x3d\\x22', '.mp4');
    demo && (knowledge_panel.demonstration = demo + '.mp4');

    knowledge_panel.books.length == 0 &&
      delete knowledge_panel.books;
    knowledge_panel.tv_shows_and_movies.length == 0 &&
      delete knowledge_panel.tv_shows_and_movies;
    knowledge_panel.available_on.length == 0 &&
      delete knowledge_panel.available_on;
    knowledge_panel.images.length == 0 &&
      delete knowledge_panel.images;

    return knowledge_panel;
  }

  getFeaturedSnippet() {
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

  getTopStories() {
    // Removes unnecessary text from the description
    this.$(`${Constants.SELECTORS.TOP_STORIES_DESCRIPTION[0]} > div.CEMjEf`).each((i, el) => this.$(el).remove());
    this.$(`${Constants.SELECTORS.TOP_STORIES_DESCRIPTION[0]} > div > p`).each((i, el) => this.$(el).remove());

    const top_stories_descriptions = Constants.SELECTORS.TOP_STORIES_DESCRIPTION.map((selector) =>
      this.$(selector).map((i, el) => this.$(el).text().slice(1)).get()).filter((descs) => descs.length > 0)[0];
    const top_stories_urls = this.$(Constants.SELECTORS.TOP_STORIES_URL).map((i, el) => this.$(el).attr('href')).get();

    return top_stories_urls.map((item, i) => {
      if (!top_stories_descriptions) return;
      return {
        description: top_stories_descriptions[i],
        url: item,
      };
    }).filter((story) => story);
  }

  getPaa() {
    let people_also_ask = [];
    Constants.SELECTORS.PAA.forEach((item) =>
      this.$(item).each((i, el) => people_also_ask.push(this.$(el).text())));
    people_also_ask.shift();
    return people_also_ask;
  }

  getPas() {
    return this.$(Constants.SELECTORS.PASF).map((i, el) => {
      if (!this.$(el).attr('data-src')) return;
      return {
        title: this.$(el).attr('alt'),
        thumbnail: `https:${this.$(el).attr('data-src')}`
      };
    }).get();
  }

  getTime() {
    const hours = this.$(Constants.SELECTORS.CURRENT_TIME_HOUR).text();
    const date = this.$(Constants.SELECTORS.CURRENT_TIME_DATE).map((i, el) => this.$(el).text()).get()[1];

    if (date) {
      return {
        hours: hours.trim(),
        date: date.trim()
      };
    }
  }

  getWeather() {
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
        temperature: temperature,
        wind: wind_speed
      };
    }
  }

  getLocation(date) {
    const location_title = this.$(Constants.SELECTORS.LOCATION_TITLE).text();
    const location_distance = this.$(Constants.SELECTORS.LOCATION_DISTANCE).text();
    const location_image = this.$(Constants.SELECTORS.LOCATION_IMAGE).attr('src');

    if (location_title && location_distance && !date) {
      return {
        title: location_title,
        distance: location_distance,
        map: 'https://google.com' + location_image
      };
    }
  }

  getTranslation() {
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

  getDictionary() {
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

  getConverters() {
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

  #correctFuzzyData(titles, descriptions, urls) {
    titles.length < urls.length && titles.length < descriptions.length && urls.shift();
    urls.length > titles.length && urls.shift();

    const innacurate_data = descriptions.length > urls.slice(1).length ? false : true;

    urls.forEach((item, index) => {
      // Why YouTube? Because video results usually don't have a description.
      if (item.includes('m.youtube.com') && innacurate_data && Constants.URLS.length > 1) {
        urls.splice(index, 1);
        titles.splice(index, 1);
        index--;
      }
    });
  }
}

module.exports = Parser;