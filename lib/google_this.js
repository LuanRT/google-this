"use strict";

const { urls, regex, selectors, userAgents, formatHtml, getStringBetweenStrings } = require('./utils');

const axios = require("axios");
const cheerio = require("cheerio");
const normalizeText = require('replace-special-characters');

let debugging = false;
let filtered_domains = ["gstatic.com"];

function search (query, options = { ris: false, page: 0, match_all_images: false, debugging: false, additional_params: null }) {
  debugging = options.debugging;

  const page = options.page * 10;
  const search_query = query.trim().split(/ +/).join("+").toLowerCase();
  const formatted_search_url = options.ris ? `${urls.w_google_base_url}searchbyimage?image_url=${query}`: `${urls.google_base_url}search?q=${search_query}&aqs=chrome..69i57.1685j0j4&client=ms-android-motorola-rev2&sourceid=chrome-mobile&ie=UTF-8${options.safe ? '&safe=active': ''}${page != 0 ? `&start=${page}`: ""}`;

  return new Promise((resolve, reject) => {
    debug('[INFO] Making request..');
    
    axios.get(encodeURI(formatted_search_url), {
      params: options.additional_params,
      headers: {
        "User-Agent": userAgents.MOBILE_USERAGENT,
        "Referer": "https://www.google.com/",
        "Accept": "text/html",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip",
        "Upgrade-Insecure-Requests": 1
      }
    }).then((res) => {
      debug('[INFO] Parsing data..');

      const start = Date.now();
      const data = formatHtml(res.data);
      const $ = cheerio.load(data);
      const final_data = {};

      final_data.results = [];
      
      // organic search results
      const titles = $(selectors.title_selector).map((i, el) => {
        if (el.parent.attribs.style != '-webkit-line-clamp:2')
        return $(el.children).text().trim();
      }).get();
      
      const descriptions = $(selectors.description_selector).map((i, el) =>{
        if (el.parent.attribs.class != 'w1C3Le')
        return $(el).text().trim();
      }).get();
      
      const urls = $(selectors.url_selector).map((i, el) => $(el).attr('href')).get();
      
      correctFuzzyData(titles, descriptions, urls);
      
      final_data.results = titles.map((title, index) => {
        return { title : title || 'n/a', description: descriptions[index] || 'n/a', url: urls[index] || 'n/a' };
      });
      
      // “did you mean” 
      const did_you_mean = $(selectors.did_you_mean_selector).text();
      if (did_you_mean) {
        final_data.did_you_mean = did_you_mean;
      }
      
      // Knowledge Panel
      const knowledge_panel_title = $(selectors.kno_panel_title_selector[0]).text() || $(selectors.kno_panel_title_selector[1]).text() || 'n/a';
      const knowledge_panel_desc = $(selectors.kno_panel_description_selector).text() || 'n/a';
      const knowledge_panel_url = $(selectors.kno_panel_url_selector).attr('href') || 'n/a';

      final_data.knowledge_panel = {
        title: knowledge_panel_title,
        description: knowledge_panel_desc,
        url: knowledge_panel_url 
      };
      
      // fetches the knowledge panel metadata
      $(selectors.kno_panel_metadata_selector).each((i, el) => {
        const key = $(el).text().replace(/：/g, ':').split(':')[0];
        const value = $(el).text().replace(/：/g, ':').split(':')[1];
        final_data.knowledge_panel[normalizeText(key.toLowerCase().replace(/ /g, '_'))] = value.trim();
      });

      const knowledge_panel_type = $(selectors.kno_panel_type_selector).text();
      if (knowledge_panel_type) {
        final_data.knowledge_panel.type = knowledge_panel_type;
      }
      
      const song_lyrics = $(selectors.kno_panel_song_lyrics_selector).map((i, el) => $($(el).html().replace(/<\/span><\/div><div jsname="u8s5sf" class="ujudub"><span jsname="ys01ge">/g, "\n\n").replace(/<br>/g, "\n")).text()).get();
      if (song_lyrics.length > 0) {
        final_data.knowledge_panel.lyrics = song_lyrics.join('\n\n');
      }

      const google_users_rating = $(selectors.kno_panel_film_googleusers_rating_selector)[0];
      if (google_users_rating) {
        const rating = $(google_users_rating.children[0].children[0]).text() || "n/a";

        final_data.knowledge_panel.ratings = [];
        final_data.knowledge_panel.ratings.push({ name: "Google Users", rating: rating });
      }

      $(selectors.kno_panel_film_ratings_selector[0]).each((i, el) => {
        final_data.knowledge_panel.ratings = final_data.knowledge_panel.ratings || [];

        const name = $($(selectors.kno_panel_film_ratings_selector[1])[i]).attr('title');
        const rating = $(el).text();

        final_data.knowledge_panel.ratings.push({ name: name, rating: rating });
      });
      
      $(selectors.kno_panel_available_on_selector).each((i, el) => {
        if (!final_data.knowledge_panel.available_on) {
          final_data.knowledge_panel.available_on = [];
        }
        final_data.knowledge_panel.available_on.push($(el).text());
      });
      
      final_data.knowledge_panel.images = $(selectors.kno_panel_images_selector).map((i, el) => $(el).attr('data-src')).get();
      if (final_data.knowledge_panel.images.length == 0) {
        delete final_data.knowledge_panel.images;
      }
      
      const animal_preview = getStringBetweenStrings(data, "source src\\x3d\\x22", ".mp4");
      if (animal_preview) {
        final_data.knowledge_panel.demonstration = animal_preview + ".mp4";
      }
      
      // Featured Snippet 
      const featured_snippet_title =
      $(selectors.featured_snippet_title_selector[0]).text() ||
      $(selectors.featured_snippet_title_selector[1]).text() ||
      $(selectors.featured_snippet_title_selector[2]).text() || undefined;
      
      const featured_snippet = selectors.featured_snippet_desc_selector.map((selector) => {
        if($(selector)[0] && selector != selectors.featured_snippet_desc_selector[2]) {
          const text = $(selector).html().replace(/<\/li>|<\/b>|<b>/g, '').replace(/&amp;/g, '&').split('<li class="TrT0Xe">').join("\n").trim();
          return text;
        } else if (selector == selectors.featured_snippet_desc_selector[2]) {
          const text = $(selector).text();
          return text;
        } else {
          return undefined;
        }
      }).filter(text => text != undefined && text.length != 0)[0];
      
      const featured_snippet_url =
      $(selectors.featured_snippet_url_selector[0]).attr("href") ||
      $(selectors.featured_snippet_url_selector[1]).attr("href") ||
      $(selectors.featured_snippet_url_selector[2]).attr("href");

      final_data.featured_snippet = {
        title: featured_snippet_title || 'n/a',
        description: featured_snippet || 'n/a',
        url: featured_snippet_url || 'n/a'
      };
      
      // Current Time
      const hours = $(selectors.current_time_hour_selector).text();
      const date = $(selectors.current_time_date_selector).map((i, el) => $(el).text()).get()[1];
      if (date) {
        final_data.current_time = { hours : hours.trim(), date: date.trim() };
      }
      
      // Google Dictionary
      const word = $(selectors.gd_word_selector).text();
      const phonetic = $(selectors.gd_phonetic_selector).text();
      const audio = $(selectors.gd_audio_selector).attr('src');

      if (word) {
        final_data.dictionary = {
          word: word || 'n/a',
          phonetic: phonetic || 'n/a',
          audio: audio ? `https:${audio}`: 'n/a',
        };

        final_data.dictionary.definitions = [];
        $(selectors.gd_definitions_selector).each(function(i, el) {
          final_data.dictionary.definitions.push($(el).text());
        });

        final_data.dictionary.examples = [];
        $(selectors.gd_examples_selector).each(function(i, el) {
          final_data.dictionary.examples.push($(el).text());
        });
      }

      // Google Translator
      const source_language = $(selectors.tr_source_language).text();
      const target_language = $(selectors.tr_target_language).text();

      const source_text = $(selectors.tr_source_text_selector).text();
      const target_text = $(selectors.tr_target_text_selector).text();

      if (source_text.length > 0) {
        final_data.translation = {
          source_language,
          target_language,
          source_text,
          target_text
        };
      }
      
      // Top Stories (this usually only returns 2 stories, it's still a work in progress and can be kinda buggy sometimes) 
      const top_stories_descriptions = selectors.top_stories_description_selector.map((selector) => $(selector).map((i, el) => $(el).text().slice(1)).get()).filter((descs) => descs.length > 0)[0];
      const top_stories_urls = $(selectors.top_stories_url_selector).map((i, el) => $(el).attr('href')).get();
      
      top_stories_urls.forEach((item, i) => {
        if (!final_data.top_stories & top_stories_descriptions) {
          final_data.top_stories = [];
        }
        
        final_data.top_stories.push({
          description: top_stories_descriptions[i],
          url: item,
        });
      });
      
      // matches all high quality images in the page (it's also very very slow)
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
      
      if (final_data.people_also_ask.length == 0) {
        delete final_data.people_also_ask;
      }
     
      // “People also search for” 
      $(selectors.pasf_selector).each((i, el) => {
        if (!final_data.people_also_search_for) {
          final_data.people_also_search_for = [];
        }
        const thumbnail = $(el).attr('data-src');
        if (thumbnail) {
          final_data.people_also_search_for.push({
            title: $(el).attr('alt'),
            thumbnail: `https:${thumbnail}`
          });
        }
      });

      let end = Date.now();

      debug(`[INFO] Execution time: ${end - start} ms`);
      
      resolve(final_data);
    });
  });
}

function correctFuzzyData (titles, descriptions, urls) {
  // correcting wrongly parsed data, this is quite rare tho.
  if (titles.length < urls.length && titles.length < descriptions.length) {
    urls.shift();
  } else if (urls.length > titles.length) {
    urls.shift();
  }

  const innacurate_data = descriptions.length > urls.slice(1).length ? false : true;
  
  urls.forEach((item, index) => {
    if (item.includes("m.youtube.com") && innacurate_data && urls.length > 1) {
      debug("[INFO] Removing malformed block containing the link: " + item);

      urls.splice(index, 1);
      titles.splice(index, 1);
      index--;
    }
  });
}

function getPageImages (data) {
  const regex = /\],\[\\x22(.*?)\\x22,(.*?),(.*?)\],null,0,\\x22rgb\((.+?),(.+?),(.+?)\)\\x22,null,0,{\\x222000\\x22:\[null,\\x22(.*?)\\x22,\\x22(.*?)\\x22]/g;

  var parsed_data = regex.exec(data);
  var processed_data = [];

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
  const search_query = query.trim().split(/ +/).join("+").toLowerCase();
  var formatted_search_url = `${urls.gis_base_url}search?tbm=isch${options.safe ? '&safe=active': ''}&q=${search_query}`;

  const exclude_site_prefix = (site) => {
    return "-site:" + site;
  };

  filtered_domains = filtered_domains.concat(options.exclude_domains);
  formatted_search_url += " " + filtered_domains.map(exclude_site_prefix).join(" ");

  return new Promise((resolve, reject) => {
    axios.get(encodeURI(formatted_search_url), {
      params: options.additional_params,
      headers: {
        "User-Agent": userAgents.DESKTOP_USERAGENT,
        "Referer": "https://www.google.com/",
        "Accept": "text/html",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip",
         "Upgrade-Insecure-Requests": 1
      },
    }).then((res) => {
      const image_search_regex = regex.IMAGE_SEARCH;
      const data = res.data;

      var index = 0;
      var final_data = [];
      var origin = parseImageOriginData(data);

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
    })
    .catch((err) => reject(err));
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
  return new Promise((resolve, reject) => {
    axios.get(formatted_url, {
      headers: {
        "User-Agent": userAgents.MOBILE_USERAGENT,
        "Referer": "https://www.google.com/",
        "Accept": "text/html",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip",
      },
    }).then((res) => {
      const $ = cheerio.load(res.data);

      const final_data = {};
      final_data.headline_stories = [];
      
      const headline_stories_publishers = $('a[data-n-tid="9"]').map((i, el) => $(el).text()).get();
      const headline_stories_imgs = $('img[class="tvs3Id QwxBBf"]').map((i, el) => $(el).attr('src')).get();
      const headline_stories_time = $('time').map((i, el) => $(el).text()).get();

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
    }).catch((err) => reject(err));
  });
}

function debug (text) {
  if (debugging) return console.log(text);
}

module.exports = {
  getTopNews,
  search,
  image
};
