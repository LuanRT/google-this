"use strict";

var axios = require("axios");
var cheerio = require("cheerio");
var utils = require("./utils.js");

var gis_base_url = "http://images.google.com/";
var google_base_url = "http://google.com/";
var google_news_url = "https://news.google.com/";
var filtered_domains = ["gstatic.com"];

var MOBILE_USERAGENT =
"Mozilla/5.0 (Linux; Android 10; moto g(8) play) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36";
var IMAGE_SEARCH_USERAGENT =
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
var debugging = false;

const search = (
  query,
  options = {
    page: 0,
    debugging: false,
  }
) => {
  debugging = options.debugging;

  var page = options.page * 10;
  var search_query = query.trim().split(/ +/).join("+").toLowerCase();
  var formatted_search_url = `${google_base_url}search?q=${search_query}&aqs=chrome..69i57.1685j0j4&client=ms-android-motorola-rev2&sourceid=chrome-mobile&ie=UTF-8${
  page != 0 ? `&start=${page}`: ``
  }`;

  return new Promise((resolve, reject) => {
    debug("[INFO] Making request..");
    axios
    .get(encodeURI(formatted_search_url), {
      headers: {
        "User-Agent": MOBILE_USERAGENT,
        Referer: "https://www.google.com/",
        Accept: "text/html",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip",
      },
    })
    .then((res) => {
      debug("[INFO] Parsing data..");
      var data = utils.formatHtml(res.data);
      var $ = cheerio.load(data);

      var final_data = [];
      var titles = [];
      var descriptions = [];
      var urls = [];

      final_data.results = [];

      /* “Did you mean” */
      var did_you_mean = $(utils.did_you_mean_selector)[0];
      if (did_you_mean) {
        final_data.did_you_mean = $(did_you_mean).text();
      }

      final_data.knowledge_panel = [];
      final_data.featured_snippet = [];

      /* Search Results  */
      $(utils.title_selector).each(function (i, el) {
        titles.push($(el.children).text());
      });

      $(utils.description_selector).each(function (i, el) {
        descriptions.push($(el).text());
      });

      $("a").each(function (i, el) {
        var a_class = $(el).attr("class");
        switch (a_class) {
          case utils.url_selector[0]:
            urls.push($(el).attr("href"));
            break;
          case utils.url_selector[1]:
            urls.push($(el).attr("href"));
            break;
          case utils.url_selector[2]:
            urls.push($(el).attr("href"));
            break;
          case utils.url_selector[3]:
            urls.push($(el).attr("href"));
            break;
          case utils.url_selector[4]:
            urls.push($(el).attr("href"));
            break;
          case utils.url_selector[5]:
            urls.push($(el).attr("href"));
            break;
          default:
            break;
        }
      });

      /* Gotta keep everything even */
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
      var knowledge_panel_title = $(utils.kno_panel_title_selector)[0]
      ? $($(utils.kno_panel_title_selector)).text(): "n/a";

      var knowledge_panel_desc =
      $($(utils.kno_panel_description_selector)[0]).text() || "n/a";

      var knowledge_panel_url = $(utils.kno_panel_url_selector)[0]
      ? $(utils.kno_panel_url_selector)[0].attribs.href: "n/a";

      var knowledge_panel_type = $(utils.kno_panel_type_selector)[0]
      ? $($(utils.kno_panel_type_selector)[0]).text(): "n/a";

      final_data.knowledge_panel.title = knowledge_panel_title;
      final_data.knowledge_panel.description = knowledge_panel_desc;
      final_data.knowledge_panel.url = knowledge_panel_url;
      final_data.knowledge_panel.type = knowledge_panel_type;

      $(utils.kno_panel_available_on_selector).each(function (i, el) {
        if (!final_data.knowledge_panel.available_on) {
          final_data.knowledge_panel.available_on = [];
        }
        final_data.knowledge_panel.available_on.push($(el).text());
      });

      var born_date = $(utils.kno_panel_born_date_selector)[0] || undefined;
      if (born_date) {
        final_data.knowledge_panel.born = $(born_date)
        .text()
        .split(":")[1]
        .trim();
      }

      var videogame_release_date =
      $(utils.kno_panel_videogame_release_date_selector)[0] || undefined;
      if (videogame_release_date) {
        final_data.knowledge_panel.release_date = $(videogame_release_date)
        .text()
        .split(":")[1]
        .trim();
      }

      var developer =
      $(utils.kno_panel_videogame_developer_selector)[0] || undefined;
      if (developer) {
        final_data.knowledge_panel.developer = $(developer).text();
      }

      var videogame_composer =
      $(utils.kno_panel_videogame_composer_selector)[0] || undefined;
      if (videogame_composer) {
        final_data.knowledge_panel.composer = $(videogame_composer).text();
      }

      var series =
      $(utils.kno_panel_webfacts_series_selector)[0] || undefined;
      if (series) {
        final_data.knowledge_panel.series = $(series).text();
      }

      var song_lyrics =
      $(utils.kno_panel_song_lyrics_selector)[0] || undefined;
      if (song_lyrics) {
        final_data.knowledge_panel.lyrics =
        $(
          $(song_lyrics)
          .html()
          .replace(
            /<\/span><\/div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">/g,
            "\n\n"
          )
          .replace(/<br>/g, "\n")
        )
        .text()
        .split("… ")[1] || "n/a";
      }

      var director =
      $(utils.kno_panel_film_director_selector)[0] || undefined;
      if (director) {
        final_data.knowledge_panel.director = $(director).text();
      }

      var budget = $(utils.kno_panel_film_budget_selector) || undefined;
      if (budget && budget != "") {
        final_data.knowledge_panel.budget = $(budget)
        .text()
        .split(":")[1]
        .trim();
      }

      var box_office =
      $(utils.kno_panel_film_boxoffice_selector) || undefined;
      if (box_office && box_office != "") {
        final_data.knowledge_panel.box_office = $(box_office)
        .text()
        .split(":")[1]
        .trim();
      }

      var google_users_rating =
      $(utils.kno_panel_film_googleusers_rating_selector)[0] || undefined;
      if (google_users_rating) {
        var rating =
        $(google_users_rating.children[0].children[0]).text() || "n/a";
        final_data.knowledge_panel.ratings = [];
        final_data.knowledge_panel.ratings.push({
          name: "Google Users",
          rating: rating,
        });
      }

      $(utils.kno_panel_film_ratings_selector[0]).each(function (i, el) {
        final_data.knowledge_panel.ratings =
        final_data.knowledge_panel.ratings || [];
        var name = $($(utils.kno_panel_film_ratings_selector[1])[i]).attr(
          "title"
        );
        var rating = $(el).text();
        final_data.knowledge_panel.ratings.push({
          name: name,
          rating: rating,
        });
      });

      var platforms =
      $(utils.kno_panel_videogame_platforms_selector) || undefined;
      if (platforms && platforms != "") {
        final_data.knowledge_panel.platforms = $(platforms)
        .text()
        .split(":")[1]
        .trim();
      }

      $(utils.kno_panel_images_selector).each(function (i, el) {
        if (el.attribs["data-src"]) {
          if (!final_data.knowledge_panel.images) {
            final_data.knowledge_panel.images = [];
          }
          final_data.knowledge_panel.images.push($(el).attr("data-src"));
        }
      });

      var organization_ceo = $(utils.kno_panel_organization_ceo)[0];
      if (organization_ceo || organization_ceo === "") {
        final_data.knowledge_panel.ceo = $(organization_ceo)
        .text()
        .split(":")[1]
        .trim();
      }

      var founded_date = $(utils.kno_panel_organization_founded_date)[0];
      if (founded_date) {
        final_data.knowledge_panel.founded = $(founded_date)
        .text()
        .split(":")[1]
        .trim();
      }

      var parent_organization = $(utils.kno_panel_organization_parent)[0];
      if (parent_organization) {
        final_data.knowledge_panel.parent_organization = $(
          parent_organization
        )
        .text()
        .split(":")[1]
        .trim();
      }

      var headquarters = $(utils.kno_panel_organization_headquarters)[0];
      if (headquarters) {
        final_data.knowledge_panel.headquarters = $(headquarters)
        .text()
        .split(":")[1]
        .trim();
      }

      var subsidiaries = $(utils.kno_panel_organization_subsidiaries)[0];
      if (subsidiaries) {
        final_data.knowledge_panel.subsidiaries = $(subsidiaries)
        .text()
        .split(":")[1]
        .trim();
      }

      var founders = $(utils.kno_panel_organization_founders)[0];
      if (founders) {
        final_data.knowledge_panedatl.founders = $(founders)
        .text()
        .split(":")[1];
      }

      /* Featured Snippet */
      var featured_snippet_title =
      $($(utils.featured_snippet_title_selector[0])).text() ||
      $($(utils.featured_snippet_title_selector[1])).text() ||
      $($(utils.featured_snippet_title_selector[2])).text() ||
      undefined;

      var featured_snippet = $(utils.featured_snippet_desc_selector[0])[0]
      ? $($(utils.featured_snippet_desc_selector[0])[0])
      .html()
      .replace(/<\/li>|<\/b>|<b>/g, "")
      .replace(/&amp;/g, "&")
      .split('<li class="TrT0Xe">')
      .join("\n")
      .trim(): $(utils.featured_snippet_desc_selector[1])[0]
      ? $($(utils.featured_snippet_desc_selector[1])[0])
      .html()
      .replace(/<\/li>|<\/b>|<b>/g, "")
      .replace(/&amp;/g, "&")
      .split('<li class="TrT0Xe">')
      .join("\n")
      .trim(): $(utils.featured_snippet_desc_selector[2])[0]
      ? $($(utils.featured_snippet_desc_selector[2])[0]).text(): undefined;

      var featured_snippet_url =
      $(utils.featured_snippet_url_selector[0]).attr("href") ||
      $(utils.featured_snippet_url_selector[1]).attr("href") ||
      $(utils.featured_snippet_url_selector[2]).attr("href");

      final_data.featured_snippet.title = featured_snippet_title || "n/a";
      final_data.featured_snippet.description = featured_snippet || "n/a";
      final_data.featured_snippet.url = featured_snippet_url || "n/a";

      /** Word Definition **/
      var word = $(utils.gd_word_selector);
      var phonetic = $(utils.gd_phonetic_selector);
      var audio = $(utils.gd_audio_selector).attr("src");

      if (word != "") {
        final_data.dictionary = [];

        final_data.dictionary.word = $(word).text();
        final_data.dictionary.phonetic =
        phonetic === "" ? "n/a": $(phonetic).text();
        final_data.dictionary.audio = audio ? `https:${audio}`: "n/a";
        final_data.dictionary.definitions = [];

        $(utils.gd_definitions_selector).each(function (i, el) {
          final_data.dictionary.definitions.push($(el).text());
        });
      }

      /* Top stories (this usually only returns 2 stories) */
      $(utils.top_stories_snippet_selector).each(function (i, el) {
        if (!final_data.top_stories) {
          final_data.top_stories = [];
        }

        var story_website = $($(utils.top_stories_website_selector)[i]).attr(
          "alt"
        );
        var story_snippet = $(el).text().trim();
        var story_url = $($(utils.top_stories_url_selector)[i]).attr(
          "data-amp"
        );

        final_data.top_stories.push({
          website: story_website,
          snippet: story_snippet,
          url: story_url,
        });
      });

      /* “People also ask” */
      $(utils.paa_selector[0]).each(function (i, el) {
        if (!final_data.people_also_ask) {
          final_data.people_also_ask = [];
        }
        final_data.people_also_ask.push($(el).text());
      });

      $(utils.paa_selector[1]).each(function (i, el) {
        if (!final_data.people_also_ask) {
          final_data.people_also_ask = [];
        }
        final_data.people_also_ask.push($(el).text());
      });

      /* “People also search for” */
      $(utils.pasf_selector).each(function (i, el) {
        if (!final_data.people_also_search_for) {
          final_data.people_also_search_for = [];
        }
        final_data.people_also_search_for.push({
          title: $(el).attr("alt"),
          img_url: `https:${$(el).attr("data-src")}`,
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
};

/***** Google Image Search ******/
const image = (query, exclude_domains) => {
  var search_query = query.trim().split(/ +/).join("+").toLowerCase();
  var formatted_search_url = `${gis_base_url}search?tbm=isch&q=${search_query}`;

  var exclude_site_prefix = (site) => {
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
        headers: {
          "User-Agent": IMAGE_SEARCH_USERAGENT,
          Referer: "https://www.google.com/",
          Accept: "text/html",
          "Accept-Language": "en-US",
          "Accept-Encoding": "gzip",
        },
      })
    .then((res) => {
      if (res.status != 200)
        return reject("Error status code: " + res.status);
      var data = res.data;

      var index = 0;
      var final_data = [];
      var origin = parseOriginData(data);
      var regex = /\["(http.*?)",(\d+),(\d+)]/g;

      var parsed_data = regex.exec(data);

      while (parsed_data != null && index != 15) {
        if (!parsed_data[1].includes(filtered_domains[0])) {
          final_data.push({
            url: parsed_data[1],
            width: parsed_data[2],
            height: parsed_data[3],
            origin: origin[index++],
          });
        }
        parsed_data = regex.exec(data);
      }
      resolve(final_data);
    })
    .catch((err) => reject(err));
  });
};

const parseOriginData = (data) => {
  var regex = /"(.+?)":\[null,"(.*?)","(.*?)","(.*?)",/g;
  var parsed_data = regex.exec(data);
  var processed_data = [];

  while (parsed_data != null) {
    processed_data.push({
      title: parsed_data[4],
      website: parsed_data[3],
    });
    parsed_data = regex.exec(data);
  }
  return processed_data;
};
/********************************/

/***** Google News *******/
const getTopNews = () => {
  var formatted_url = `${google_news_url}topstories?tab=in&hl=en-US&gl=US&ceid=US:en`;
  return new Promise((resolve, reject) => {
    axios
    .get(formatted_url, {
      headers: {
        "User-Agent": MOBILE_USERAGENT,
        Referer: "https://www.google.com/",
        Accept: "text/html",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip",
      },
    })
    .then((res) => {
      var $ = cheerio.load(res.data);

      var final_data = [];
      var headline_stories_publishers = [];
      var headline_stories_imgs = [];
      var headline_stories_time = [];

      final_data.headline_stories = [];

      $('a[data-n-tid="9"]').each(function (i, el) {
        headline_stories_publishers.push($(el).text());
      });

      $('img[class="tvs3Id QwxBBf"]').each(function (i, el) {
        var img_url = $(el).attr("src");
        headline_stories_imgs.push(img_url);
      });

      $("time").each(function (i, el) {
        var time = $(el).text();
        headline_stories_time.push(time);
      });

      $('a[class="DY5T1d RZIKme"]').each(function (i, el) {
        var headline_stories_title = $(el).text();
        var headline_stories_url = $(el).attr("href");
        final_data.headline_stories.push({
          title: headline_stories_title,
          url: `${google_news_url}${headline_stories_url.slice(2)}`,
          image: headline_stories_imgs[i],
          published: headline_stories_time[i],
          by: headline_stories_publishers[i],
        });
      });

      resolve(final_data);
    })
    .catch((err) => reject(err));
  });
};
/*************************/

/***** Debugging *****/
const debug = (text) => {
  if (debugging) return console.log(text);
};
/*********************/
const getDescriptions = (data) => {
  var regex = /<(.*?) class="MUxGbd (.*?)">(.+?)<\/div>/g;
  var parsed_data = regex.exec(data);
  var descriptions = [];

  while (parsed_data != null) {
    var description = (parsed_data[3].split('">')[1] || parsed_data[3])
    .replace(/<\/span>|<span>|<\/sup>|<sup>|&nbsp;/g, "")
    .trim();
    if (description) {
      if (!description.includes("</a>")) {
        if (parsed_data[2] != "lyLwlc") {
          descriptions.push(description);
        }
      }
    }
    parsed_data = regex.exec(data);
  }
  return descriptions;
};

module.exports = {
  getTopNews,
  search,
  image,
};