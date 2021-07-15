"use strict";

const axios = require("axios");
const cheerio = require("cheerio");

const {
  urls,
  regex,
  selectors,
  userAgents,
  formatHtml,
  getStringBetweenStrings
} = require('./utils');

let debugging = false;
let filtered_domains = ["gstatic.com"];

function search (query, options = {
  ris: false, page: 0, match_all_images: false, debugging: false, additional_params: null
}) {
  debugging = options.debugging;

  const page = options.page * 10;
  const search_query = query.trim().split(/ +/).join("+").toLowerCase();

  const formatted_search_url =
  options.ris ?
  `${urls.w_google_base_url}searchbyimage?image_url=${query}`:
  `${urls.google_base_url}search?q=${search_query}&aqs=chrome..69i57.1685j0j4&client=ms-android-motorola-rev2&sourceid=chrome-mobile&ie=UTF-8${options.safe ? '&safe=active': ''}${page != 0 ? `&start=${page}`: ""}`;

  return new Promise((resolve, reject) => {
    debug('[INFO] Making request..');
    axios
    .get(encodeURI(formatted_search_url), {
      params: options.additional_params,
      headers: {
        "User-Agent": userAgents.MOBILE_USERAGENT,
        Referer: "https://www.google.com/",
        Accept: "text/html",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip",
      },
    })
    .then((res) => {
      debug('[INFO] Parsing data..');

      let start = Date.now();

      let data = formatHtml(res.data);
      let $ = cheerio.load(data);

      var final_data = {};
      var titles = [];
      var descriptions = [];
      var urls = [];

      final_data.results = [];

      /* “Did you mean” */
      const did_you_mean = $(selectors.did_you_mean_selector)[0];
      if (did_you_mean) {
        final_data.did_you_mean = $(did_you_mean).text();
      }

      /* Search Results  */
      $(selectors.title_selector).each(function(i, el) {
        titles.push($(el.children).text().trim());
      });

      $(selectors.description_selector).each(function(i, el) {
        descriptions.push($(el).text().trim());
      });

      $("a").each(function (i, el) {
        const a_class = $(el).attr("class");
        switch (a_class) {
          case selectors.url_selector[0]:
            urls.push($(el).attr("href"));
            break;
          case selectors.url_selector[1]:
            urls.push($(el).attr("href"));
            break;
          case selectors.url_selector[2]:
            urls.push($(el).attr("href"));
            break;
          case selectors.url_selector[3]:
            urls.push($(el).attr("href"));
            break;
          case selectors.url_selector[4]:
            urls.push($(el).attr("href"));
            break;
          case selectors.url_selector[5]:
            urls.push($(el).attr("href"));
            break;
          default:
            break;
        }
      });

      /*
      * Sometimes the Knowledge Panel's url may pop up here, so if there are more links than necessary we remove the first one, since it's likely to be the Knowledge Panel's url.
      **/
      if (
        titles.length < urls.length &&
        titles.length < descriptions.length
      ) {
        urls = urls.slice(1);
      }
      if (urls.length > titles.length) {
        urls = urls.slice(1);
      }

      /* Knowledge Panel */
      const knowledge_panel_title = $(selectors.kno_panel_title_selector)[0];
      const knowledge_panel_desc = $(selectors.kno_panel_description_selector)[0];
      const knowledge_panel_url = $(selectors.kno_panel_url_selector)[0];

      final_data.knowledge_panel = {
        title: knowledge_panel_title ? $(knowledge_panel_title).text(): 'n/a',
        description: knowledge_panel_desc ? $(knowledge_panel_desc).text(): 'n/a',
        url: knowledge_panel_url ? $(knowledge_panel_url).attr('href'): 'n/a'
      };

      const knowledge_panel_type = $(selectors.kno_panel_type_selector)[0];
      if (knowledge_panel_type) {
        final_data.knowledge_panel.type = $(knowledge_panel_type).text();
      }

      const born_date = $(selectors.kno_panel_born_date_selector)[0];
      if (born_date) {
        final_data.knowledge_panel.born = $(born_date)
        .text()
        .split(":")[1]
        .trim();
      }

      const song_lyrics = $(selectors.kno_panel_song_lyrics_selector)[0];
      if (song_lyrics) {
        final_data.knowledge_panel.lyrics = $(
          $(song_lyrics)
          .html()
          .replace(
            /<\/span><\/div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">/g,
            "\n\n"
          )
          .replace(/<br>/g, "\n")
        ).text().split('… ')[1] || 'n/a';
      }

      const song_artist = $(selectors.kno_panel_song_artist_selector);
      if (song_artist[0]) {
        final_data.knowledge_panel.artist = [];
        song_artist.map((i, el) => {
          final_data.knowledge_panel.artist.push($(el).text().trim());
        });
      }

      const song_ft_artist = $(selectors.kno_panel_song_ft_artist_selector);
      if (song_ft_artist[0]) {
        final_data.knowledge_panel.featured_artist = [];
        song_ft_artist.map((i, el) => {
          final_data.knowledge_panel.featured_artist.push($(el).text().trim());
        });
      }

      const song_album = $(selectors.kno_panel_song_album_selector)[0];
      if (song_album) {
        final_data.knowledge_panel.album = $(song_album).text().trim();
      }

      const song_release_date = $(selectors.kno_panel_song_release_date_selector)[0];
      if (song_release_date) {
        final_data.knowledge_panel.release_date = $(song_release_date).text().split(':')[1].trim();
      }

      $(selectors.kno_panel_available_on_selector).each(function (i, el) {
        if (!final_data.knowledge_panel.available_on) {
          final_data.knowledge_panel.available_on = [];
        }
        final_data.knowledge_panel.available_on.push($(el).text());
      });

      // Games:
      const videogame_release_date = $(selectors.kno_panel_videogame_release_date_selector)[0];
      if (videogame_release_date) {
        final_data.knowledge_panel.release_date = $(videogame_release_date)
        .text()
        .split(":")[1]
        .trim();
      }

      const developer = $(selectors.kno_panel_videogame_developer_selector[0]);
      if (developer[0]) {
        final_data.knowledge_panel.developer = [];
        developer.map((i, el) => {
          final_data.knowledge_panel.developer.push($(el).text());
        });
      } else {
        const developer = $(selectors.kno_panel_videogame_developer_selector[1]);
        final_data.knowledge_panel.developer = [];
        developer.map((i, el) => {
          final_data.knowledge_panel.developer.push($(el).text());
        });
        if (final_data.knowledge_panel.developer.length == 0)  delete final_data.knowledge_panel.developer;
      }

      const publisher = $(selectors.kno_panel_videogame_publisher_selector[0]);
      if (publisher[0]) {
        final_data.knowledge_panel.publisher = [];
        publisher.map((i, el) => {
          final_data.knowledge_panel.publisher.push($(el).text());
        });
      } else {
        const publisher = $(selectors.kno_panel_videogame_publisher_selector[1]);
        final_data.knowledge_panel.publisher = [];
        publisher.map((i, el) => {
          final_data.knowledge_panel.publisher.push($(el).text());
        });
        if (final_data.knowledge_panel.publisher.length == 0)  delete final_data.knowledge_panel.publisher;
      }

      const designer = $(selectors.kno_panel_videogame_designer_selector[0]);
      if (designer[0]) {
        final_data.knowledge_panel.designer = [];
        designer.map((i, el) => {
          final_data.knowledge_panel.designer.push($(el).text());
        });
      } else {
        const designer = $(selectors.kno_panel_videogame_designer_selector[1]);
        final_data.knowledge_panel.designer = [];
        designer.map((i, el) => {
          final_data.knowledge_panel.designer.push($(el).text());
        });
        if (final_data.knowledge_panel.designer.length == 0)  delete final_data.knowledge_panel.designer;
      }

      const videogame_composer = $(selectors.kno_panel_videogame_composer_selector[0])[0] || $(selectors.kno_panel_videogame_composer_selector[1])[0];
      if (videogame_composer) {
        final_data.knowledge_panel.composer = $(videogame_composer).text();
      }

      const series = $(selectors.kno_panel_webfacts_series_selector)[0];
      if (series) {
        final_data.knowledge_panel.series = $(series).text();
      }

      const engine = $(selectors.kno_panel_videogame_engine_selector)[0];
      if (engine) {
        final_data.knowledge_panel.engine = $(engine).text();
      }

      const platforms = $(selectors.kno_panel_videogame_platforms_selector) || undefined;
      if (platforms && platforms != "") {
        final_data.knowledge_panel.platforms = $(platforms)
        .text()
        .split(":")[1]
        .trim();
      }

      const awards = $(selectors.kno_panel_videogame_awards_selector);
      if (awards[0]) {
        final_data.knowledge_panel.awards = [];
        awards.map((i, el) => {
          final_data.knowledge_panel.awards.push($(el).text());
        });
      }

      const award_nominations = $(selectors.kno_panel_award_nominations_selector);
      if (award_nominations[0]) {
        final_data.knowledge_panel.nominations = [];
        award_nominations.map((i, el) => {
          final_data.knowledge_panel.nominations.push($(el).text());
        });
      }

      // Movies:
      const director = $(selectors.kno_panel_film_director_selector);
      if (director[0]) {
        final_data.knowledge_panel.director = [];
        director.map((i, el) => {
          final_data.knowledge_panel.director.push($(el).text().trim());
        });
      }

      const budget = $(selectors.kno_panel_film_budget_selector) || undefined;
      if (budget && budget != "") {
        final_data.knowledge_panel.budget = $(budget)
        .text()
        .split(":")[1]
        .trim();
      }

      const box_office = $(selectors.kno_panel_film_boxoffice_selector) || undefined;
      if (box_office && box_office != "") {
        final_data.knowledge_panel.box_office = $(box_office)
        .text()
        .split(":")[1]
        .trim();
      }

      const film_release_date = $(selectors.kno_panel_film_release_date_selector)[0];
      if (film_release_date) {
        final_data.knowledge_panel.release_date = $(film_release_date).text().split(':')[1].trim();
      }

      const google_users_rating = $(selectors.kno_panel_film_googleusers_rating_selector)[0];
      if (google_users_rating) {
        const rating = $(google_users_rating.children[0].children[0]).text() || "n/a";

        final_data.knowledge_panel.ratings = [];
        final_data.knowledge_panel.ratings.push({
          name: "Google Users",
          rating: rating,
        });
      }

      $(selectors.kno_panel_film_ratings_selector[0]).each(function (i, el) {
        final_data.knowledge_panel.ratings =
        final_data.knowledge_panel.ratings || [];

        const name = $($(selectors.kno_panel_film_ratings_selector[1])[i]).attr('title');
        const rating = $(el).text();

        final_data.knowledge_panel.ratings.push({
          name: name,
          rating: rating,
        });
      });

      $(selectors.kno_panel_images_selector).each(function (i, el) {
        if (el.attribs["data-src"]) {
          if (!final_data.knowledge_panel.images) {
            final_data.knowledge_panel.images = [];
          }
          final_data.knowledge_panel.images.push($(el).attr("data-src"));
        }
      });

      // Organizations:
      const organization_ceo = $(selectors.kno_panel_organization_ceo_selector)[0];
      if (organization_ceo || organization_ceo === "") {
        final_data.knowledge_panel.ceo = $(organization_ceo).text().split(':')[1].trim();
      }

      const founded_date = $(selectors.kno_panel_organization_founded_date_selector)[0];
      if (founded_date) {
        final_data.knowledge_panel.founded = $(founded_date).text().split(':')[1].trim();
      }

      const parent_organization = $(selectors.kno_panel_organization_parent_selector[0])[0];
      if (parent_organization) {
        final_data.knowledge_panel.parent_organization = ($(parent_organization).text().split(':')[1] || $($(selectors.kno_panel_organization_parent_selector[1])).text()).trim();
      }

      const headquarters = $(selectors.kno_panel_organization_headquarters_selector)[0];
      if (headquarters) {
        final_data.knowledge_panel.headquarters = $(headquarters).text().split(':')[1].trim();
      }

      const subsidiaries = $(selectors.kno_panel_organization_subsidiaries_selector)[0];
      if (subsidiaries) {
        final_data.knowledge_panel.subsidiaries = $(subsidiaries).text().split(':')[1].trim();
      }

      const founders = $(selectors.kno_panel_organization_founders_selector)[0];
      if (founders) {
        final_data.knowledge_panel.founders = $(founders).text().split(':')[1].trim();
      }

      // Animals:
      const animal_preview = getStringBetweenStrings(data, "source src\\x3d\\x22", ".mp4");
      if (animal_preview) {
        final_data.knowledge_panel.demonstration = animal_preview + ".mp4";
      }

      /* Featured Snippet */
      const featured_snippet_title =
      $($(selectors.featured_snippet_title_selector[0])).text() ||
      $($(selectors.featured_snippet_title_selector[1])).text() ||
      $($(selectors.featured_snippet_title_selector[2])).text() || undefined;

      const featured_snippet =
      // First selector:
      $(selectors.featured_snippet_desc_selector[0])[0]
      ? $($(selectors.featured_snippet_desc_selector[0])[0])
      .html()
      .replace(/<\/li>|<\/b>|<b>/g,
        '')
      .replace(/&amp;/g,
        '&')
      .split('<li class="TrT0Xe">')
      .join("\n")
      .trim():
      // Second selector:
      $(selectors.featured_snippet_desc_selector[1])[0]
      ? $($(selectors.featured_snippet_desc_selector[1])[0])
      .html()
      .replace(/<\/li>|<\/b>|<b>/g,
        '')
      .replace(/&amp;/g,
        '&')
      .split('<li class="TrT0Xe">')
      .join("\n")
      .trim():
      //Third selector:
      $(selectors.featured_snippet_desc_selector[2])[0]
      ? $($(selectors.featured_snippet_desc_selector[2])[0]).text(): undefined;

      const featured_snippet_url =
      $(selectors.featured_snippet_url_selector[0]).attr("href") ||
      $(selectors.featured_snippet_url_selector[1]).attr("href") ||
      $(selectors.featured_snippet_url_selector[2]).attr("href");

      final_data.featured_snippet = {
        title: featured_snippet_title || 'n/a',
        description: featured_snippet || 'n/a',
        url: featured_snippet_url || 'n/a'
      };

      /** Word Definition **/
      const word = $(selectors.gd_word_selector);
      const phonetic = $(selectors.gd_phonetic_selector);
      const audio = $(selectors.gd_audio_selector).attr('src');

      if (word != '') {
        final_data.dictionary = {
          word: $(word).text(),
          phonetic: $(phonetic).length == 0 ? 'n/a': $(phonetic).text(),
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

      /** Translation **/
      const source_language = $($(selectors.tr_source_language)).text();
      const target_language = $($(selectors.tr_target_language)).text();

      const source_text = $($(selectors.tr_source_text_selector)).text();
      const target_text = $($(selectors.tr_target_text_selector)).text();

      if (source_text.length > 0) {
        final_data.translation = {
          source_language,
          target_language,
          source_text,
          target_text
        };
      }

      /* Top stories (this usually only returns 2 stories) */
      $(selectors.top_stories_snippet_selector).each(function (i, el) {
        if (!final_data.top_stories) {
          final_data.top_stories = [];
        }

        const story_website = $($(selectors.top_stories_website_selector)[i]).attr("alt");
        const story_snippet = $(el).text().trim();
        const story_url = $($(selectors.top_stories_url_selector)[i]).attr("data-amp");

        final_data.top_stories.push({
          snippet: story_snippet,
          url: story_url,
          website: story_website === '' ? 'n/a': story_website,
        });
      });

      /* Matches all images in the page */
      if (options.match_all_images) {
        const images = getPageImages(data);
        if (images.length != 0) {
          final_data.related_images = images;
        }
      }

      /* “People also ask” */
      $(selectors.paa_selector[0]).each(function (i, el) {
        if (!final_data.people_also_ask) {
          final_data.people_also_ask = [];
        }
        final_data.people_also_ask.push($(el).text());
      });

      $(selectors.paa_selector[1]).each(function(i, el) {
        if (!final_data.people_also_ask) {
          final_data.people_also_ask = [];
        }
        final_data.people_also_ask.push($(el).text());
      });

      $(selectors.paa_selector[2]).each(function(i, el) {
        if (!final_data.people_also_ask) {
          final_data.people_also_ask = [];
        }
        final_data.people_also_ask.push($(el).text());
      });

      /* “People also search for” */
      $(selectors.pasf_selector).each(function(i, el) {
        if (!final_data.people_also_search_for) {
          final_data.people_also_search_for = [];
        }
        final_data.people_also_search_for.push({
          title: $(el).attr('alt'),
          img_url: `https:${$(el).attr('data-src')}`
        });
      });

      /* Correcting fuzzy data */
      var innacurate_data = false;
      if (descriptions.length > urls.slice(1).length) {
        debug("[INFO] No blocks without description found.");
        innacurate_data = false;
      } else {
        debug("[INFO] Blocks without description found!");
        innacurate_data = true;
      }

      for (var index = 0; index < urls.length; index++) {
        if (
          urls[index].includes("m.youtube.com") &&
          innacurate_data &&
          urls.length > 1
        ) {
          debug(
            "[INFO] Removing malformed block containing the link: " +
            urls[index]
          );

          urls.splice(index, 1);
          titles.splice(index, 1);
          index--;
        }
      }

      debug("[INFO] Titles: " + titles.length);
      debug("[INFO] Descriptions: " + descriptions.length);
      debug("[INFO] Urls: " + urls.length);

      let end = Date.now();

      debug(`[INFO] Execution time: ${end - start} ms`);

      titles.forEach(function (title, index) {
        final_data.results.push({
          title: title || "n/a",
          description: descriptions[index] || "n/a",
          url: urls[index] || "n/a",
        });
      });

      resolve(final_data);
    });
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
function image (query, options = {
  safe: false, additional_params: null
}, exclude_domains = []) {
  var search_query = query.trim().split(/ +/).join("+").toLowerCase();
  var formatted_search_url = `${urls.gis_base_url}search?tbm=isch${options.safe ? '&safe=active': ''}&q=${search_query}`;

  const exclude_site_prefix = (site) => {
    return "-site:" + site;
  };

  filtered_domains = filtered_domains.concat(exclude_domains);

  formatted_search_url += encodeURIComponent(
    " " + filtered_domains.map(exclude_site_prefix).join(" ")
  );

  return new Promise((resolve,
    reject) => {
    axios
    .get(formatted_search_url,
      {
        params: options.additional_params,
        headers: {
          "User-Agent": userAgents.DESKTOP_USERAGENT,
          Referer: "https://www.google.com/",
          Accept: "text/html",
          "Accept-Language": "en-US",
          "Accept-Encoding": "gzip",
        },
      })
    .then((res) => {
      const image_search_regex = regex.IMAGE_SEARCH;

      let data = res.data;

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
/********************************/

/***** Google News *******/
function getTopNews () {
  const formatted_url = `${urls.google_news_url}topstories?tab=in&hl=en-US&gl=US&ceid=US:en`;
  return new Promise((resolve, reject) => {
    axios
    .get(formatted_url, {
      headers: {
        "User-Agent": userAgents.MOBILE_USERAGENT,
        Referer: "https://www.google.com/",
        Accept: "text/html",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip",
      },
    })
    .then((res) => {
      let $ = cheerio.load(res.data);

      var final_data = {};
      var headline_stories_publishers = [];
      var headline_stories_imgs = [];
      var headline_stories_time = [];

      final_data.headline_stories = {};

      $('a[data-n-tid="9"]').each(function(i, el) {
        headline_stories_publishers.push($(el).text());
      });

      $('img[class="tvs3Id QwxBBf"]').each(function(i, el) {
        const img_url = $(el).attr('src');
        headline_stories_imgs.push(img_url);
      });

      $('time').each(function(i, el) {
        const time = $(el).text();
        headline_stories_time.push(time);
      });

      $('a[class="DY5T1d RZIKme"]').each(function(i, el) {
        const headline_stories_title = $(el).text();
        const headline_stories_url = $(el).attr('href');

        final_data.headline_stories.push({
          title: headline_stories_title,
          url: `${urls.google_news_url} ${headline_stories_url.slice(2)}`,
          image: headline_stories_imgs[i],
          published: headline_stories_time[i],
          by: headline_stories_publishers[i]
        });
      });

      resolve(final_data);
    }).catch((err) => reject(err));
  });
}
/*************************/

/***** Debugging *****/
function debug (text) {
  if (debugging) return console.log(text);
}
/*********************/

/******************/
module.exports = {
  getTopNews,
  search,
  image
};