var axios = require("axios");
var cheerio = require("cheerio");

var gis_base_url = "http://images.google.com/";
var google_base_url = "http://google.com/";
var filtered_domains = ["gstatic.com"];

var MOBILE_USERAGENT = 'Mozilla/5.0 (Linux; Android 10; moto g(8) play) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36';
var IMAGE_SEARCH_USERAGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';

var debugging = false;

const search = (query, options) => {
  var search_query = query.trim().split(/ +/).join("+").toLowerCase();
  var formatted_search_url = `${google_base_url}search?q=${search_query}&aqs=chrome..69i57.1685j0j4&client=ms-android-motorola-rev2&sourceid=chrome-mobile&ie=UTF-8`;
  debugging = options ? options.debugging: false;

  return new Promise((resolve, reject) => {
    axios
    .get(encodeURI(formatted_search_url), {
      headers: {
        "User-Agent":
        MOBILE_USERAGENT,
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

      /* Let's get rid of the data we don't need */
      data = data
      .replace(/MUxGbd wuQ4Ob WZ8Tjf/g, "")
      .replace(/N6jJud MUxGbd lyLwlc/g, "")
      .replace(/YjtGef ExmHv MUxGbd/g, "")
      .replace(/MUxGbd lyLwlc aLF0Z/g, "");
      /*******************************************/

      var $ = cheerio.load(data);

      var urls = [];
      var paths = [];
      var titles = [];
      var final_data = [];

      final_data.results = [];
      final_data.knowledge_panel = [];
      final_data.featured_snippet = [];

      /* Titles  */
      $('div[class="V7Sr0 p5AXld gsrt PpBGzd YcUVQe"]').each(function (
        i,
        el
      ) {
        titles.push($(el.children).text());
      });
      /***********/

      /* Descriptions */
      var descriptions = getDescriptions(data);
      if (descriptions.length === 0) {
        descriptions = getDescriptions(data);
      }
      /****************/

      /* Links */
      $("a").each(function (i, el) {
        if ($(el).attr("class") == "C8nzq BmP5tf") {
          urls.push($(el).attr("href"));
        } else if ($(el).attr("class") == "C8nzq d5oMvf BmP5tf") {
          urls.push($(el).attr("href"));
        } else if ($(el).attr("class") == "C8nzq BmP5tf amp_r") {
          urls.push($(el).attr("href"));
        } else if ($(el).attr("class") == "w1C3Le dJMePd") {
          urls.push($(el).attr("href"));
        } else if ($(el).attr("class") == "sXtWJb gsrt amp_r") {
          urls.push($(el).attr("href"));
        }
      });
      /*********/

      /* Gotta keep everything even */
      if (
        titles.length < urls.length &&
        titles.length < descriptions.length
      ) {
        urls = urls.slice(1);
        descriptions.slice(1);
      }
      if (urls.length > titles.length) {
        urls = urls.slice(1);
      }
      /******************************/

      /* Knowledge Panel */
      var knowledge_panel_title = $(
        'div[data-attrid="title"] > span[role="heading"]'
      )[0]
      ? $($('div[data-attrid="title"] > span[role="heading"]')).text(): "n/a";
      var knowledge_panel_desc =
      $($('div[class="kno-rdesc"] > span')[0]).text() || "n/a";
      var knowledge_panel_url = $('div[class="kno-rdesc"] > span > a')[0]
      ? $('div[class="kno-rdesc"] > span > a')[0].attribs.href: "n/a";
      var knowledge_panel_type = $('div[data-attrid="subtitle"]')[0]
      ? $($('div[data-attrid="subtitle"]')[0]).text(): "n/a";

      final_data.knowledge_panel.title = knowledge_panel_title;
      final_data.knowledge_panel.description = knowledge_panel_desc;
      final_data.knowledge_panel.url = knowledge_panel_url;
      final_data.knowledge_panel.type = knowledge_panel_type;

      $('div[class="ellip bclEt"]').each(function (i, el) {
        if (!final_data.knowledge_panel.available_on) {
          final_data.knowledge_panel.available_on = [];
        }
        final_data.knowledge_panel.available_on.push($(el).text());
      });

      var born_date =
      $('div[data-attrid="kc:/people/person:born"]')[0] || undefined;
      if (born_date) {
        final_data.knowledge_panel.born = $(born_date)
        .text()
        .split(":")[1]
        .trim();
      }

      var videogame_release_date =
      $('div[data-attrid="kc:/cvg/computer_videogame:release date"]')[0] ||
      undefined;
      if (videogame_release_date) {
        final_data.knowledge_panel.release_date = $(videogame_release_date)
        .text()
        .split(":")[1]
        .trim();
      }

      var developer =
      $(
        'div[data-attrid="kc:/cvg/computer_videogame:developer"] > div > div > div > span > a'
      )[0] || undefined;
      if (developer) {
        final_data.knowledge_panel.developer = $(developer).text();
      }

      var videogame_composer =
      $(
        'div[data-attrid="kc:/cvg/computer_videogame:composer"] > div > div > div > span > a'
      )[0] || undefined;
      if (videogame_composer) {
        final_data.knowledge_panel.composer = $(videogame_composer).text();
      }

      var series =
      $(
        'div[data-attrid="ss:/webfacts:seri"] > div > div > div > span > a'
      )[0] || undefined;
      if (series) {
        final_data.knowledge_panel.series = $(series).text();
      }

      var song_lyrics =
      $(
        'div[data-attrid="kc:/music/recording_cluster:lyrics"] > div > g-expandable-container > div > div > div'
      )[0] || undefined;
      if (song_lyrics) {
        final_data.knowledge_panel.lyrics = $(
          $(song_lyrics)
          .html()
          .replace(
            /<\/span><\/div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">/g,
            "\n\n"
          )
          .replace(/<br>/g, "\n")
        ).text().split('... ')[1];
      }

      var director =
      $(
        'div[data-attrid="kc:/film/film:director"] > div > div > div > span > a'
      )[0] || undefined;
      if (director) {
        final_data.knowledge_panel.director = $(director).text();
      }

      var budget =
      $('div[ data-attrid="hw:/collection/films:budget"]') || undefined;
      if (budget && budget != "") {
        final_data.knowledge_panel.budget = $(budget)
        .text()
        .split(":")[1]
        .trim();
      }

      var box_office =
      $('div[data-attrid="hw:/collection/films:box office"]') || undefined;
      if (box_office && box_office != "") {
        final_data.knowledge_panel.box_office = $(box_office)
        .text()
        .split(":")[1]
        .trim();
      }

      var google_users_rating =
      $('div[data-attrid="kc:/ugc:thumbs_up"] > div > div > div')[0] ||
      undefined;
      if (google_users_rating) {
        var rating =
        $(google_users_rating.children[0].children[0]).text() || "n/a";
        final_data.knowledge_panel.ratings = [];
        final_data.knowledge_panel.ratings.push({
          name: "Google Users",
          rating: rating,
        });
      }

      $('span[class="gsrt KMdzJ"]').each(function (i, el) {
        final_data.knowledge_panel.ratings =
        final_data.knowledge_panel.ratings || [];
        var name = $('span[class="rhsB pVA7K"]')[i].attribs.title;
        var rating = $(el).text();
        final_data.knowledge_panel.ratings.push({
          name: name,
          rating: rating,
        });
      });

      var platforms =
      $(
        'div[data-attrid="kc:/cvg/computer_videogame:platform"] > div > div > div > span'
      ) || undefined;
      if (platforms && platforms != "") {
        final_data.knowledge_panel.platforms = $(platforms)
        .text()
        .split(":")[1]
        .trim();
      }

      var video = $('video[class="RYO4Xe"] > source')[0] || undefined;
      if (video) {
        final_data.knowledge_panel.video = `https://${$(video).attr("src")}`;
      }

      $('g-img[class="BA0A6c"] > img').each(function (i, el) {
        if (el.attribs["data-src"]) {
          if (!final_data.knowledge_panel.images) {
            final_data.knowledge_panel.images = [];
          }
          final_data.knowledge_panel.images.push($(el).attr("data-src"));
        }
      });

      /******************/

      /* Featured Snippet */
      var featured_snippet_title = $($('div[class="co8aDb gsrt"]')).text() || undefined;

      var featured_snippet_url =
      $('a[class="truncation-information"]').attr("href") ||
      $('a[class="sXtWJb gsrt"]').attr("href") ||
      $('a[class="sXtWJb gsrt amp_r"]').attr("href");

      var featured_snippet =
      $('ol[class="X5LH0c"]')[0]
      ? $($('ol[class="X5LH0c"]')[0])
      .html()
      .replace(/<\/li>|<\/b>|<b>/g,
        '')
      .replace(/&amp;/g,
        '&')
      .split('<li class="TrT0Xe">')
      .join("\n")
      .trim():
      $('ul[class="i8Z77e"]')[0]
      ? $($('ul[class="i8Z77e"]')[0])
      .html()
      .replace(/<\/li>|<\/b>|<b>/g,
        '')
      .replace(/&amp;/g,
        '&')
      .split('<li class="TrT0Xe">')
      .join("\n")
      .trim():
      $('div[data-attrid="wa:/description"]')[0]
      ? $($('div[data-attrid="wa:/description"]')[0]).text(): undefined;

      final_data.featured_snippet.title = featured_snippet_title || "n/a";
      final_data.featured_snippet.description = featured_snippet || "n/a";
      final_data.featured_snippet.url = featured_snippet_url || "n/a";
      /********************/

      /* Top stories (this usually only returns 2 stories) */
      $('div[class="g5wfEd"] > div[role="heading"]').each(function (i, el) {
        if (!final_data.top_stories) {
          final_data.top_stories = [];
        }

        var story_website = $(
          $('div[class="g5wfEd"] > div > g-img > img')[i]
        ).attr("alt");
        var story_snippet = $(el).text().trim();
        var story_url = $($('a[class="WlydOe amp_r"]')[i]).attr("data-amp");

        final_data.top_stories.push({
          website: story_website,
          snippet: story_snippet,
          url: story_url,
        });
      });
      /***************************************************"*/

      /* “People also ask” */
      $('div[class="wWOJcd"] > div > span').each(function (i, el) {
        if (!final_data.people_also_ask) {
          final_data.people_also_ask = [];
        }
        final_data.people_also_ask.push($(el).text());
      });

      $('div[class="s75CSd"]').each(function(i, el) {
        if (!final_data.people_also_ask) {
          final_data.people_also_ask = [];
        }
        final_data.people_also_ask.push($(el).text());
      });
      /*********************/

      /* Correcting fuzzy data */
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
      /***************************************/

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

  return new Promise((resolve, reject) => {
    axios
    .get(formatted_search_url, {
      headers: {
        "User-Agent":
        IMAGE_SEARCH_USERAGENT,
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
/************************/

/***** Debugging *****/
const debug = (text) => {
  if (debugging) return console.log(text);
};
/*********************/

module.exports = {
  search,
  image
};