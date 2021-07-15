"use strict";

const urls = {
  gis_base_url: "https://images.google.com/",
  google_base_url: "https://google.com/",
  w_google_base_url: "https://www.google.com/",
  google_news_url: "https://news.google.com/"
};

const regex = {
  IMAGE_SEARCH: /\["(http.*?)",(\d+),(\d+)]/g,
  IMAGE_ORIGIN: /"(.+?)":\[null,"(.*?)","(.*?)","(.*?)",/g,
};

/* Yes! We're scraping the mobile version of Google :) */
const userAgents = {
  MOBILE_USERAGENT: 'Mozilla/5.0 (Linux; Android 10; moto g(8) play) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36',
  DESKTOP_USERAGENT: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
};

const formatHtml = (data) => {
  return data
  /* Some garbage we don't need */
  .replace(/N6jJud MUxGbd lyLwlc/g, "")
  .replace(/YjtGef ExmHv MUxGbd/g, "")
  .replace(/MUxGbd lyLwlc aLF0Z/g, "")
  /* Renaming some important classes */
  .replace(/yDYNvb lEBKkf/g, "yDYNvb")
  .replace(/VwiC3b MUxGbd yDYNvb/g, "MUxGbd yDYNvb")
  .replace(/yUTMj MBeuO ynAwRc PpBGzd YcUVQe/g, "yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe");
};

const selectors = {
  /** Search Results **/
  title_selector: 'div[class="yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe"]',
  description_selector: 'div[class="MUxGbd yDYNvb"]',
  url_selector: [
    'C8nzq BmP5tf',
    'C8nzq d5oMvf BmP5tf',
    'C8nzq BmP5tf amp_r',
    'w1C3Le dJMePd',
    'sXtWJb gsrt amp_r',
    'HLLkSb'
  ],

  /** Did You Mean **/
  did_you_mean_selector: 'a[class="gL9Hy"]',

  /** Knowledge Panel **/
  kno_panel_title_selector: 'div[data-attrid="title"] > span[role="heading"]',
  kno_panel_description_selector: 'div[class="kno-rdesc"] > span',
  kno_panel_url_selector: 'div[class="kno-rdesc"] > span > a',
  kno_panel_type_selector: 'div[data-attrid="subtitle"]',

  kno_panel_available_on_selector: 'div[class="ellip bclEt"]',
  kno_panel_born_date_selector: 'div[data-attrid="kc:/people/person:born"]',

  kno_panel_videogame_release_date_selector: 'div[data-attrid="kc:/cvg/computer_videogame:release date"]',

  kno_panel_videogame_developer_selector: [
    'div[data-attrid="kc:/cvg/computer_videogame:developer"] > div > div > div > span > a[class="fl"]',
    'div[data-attrid="kc:/cvg/game_series:developer"] > div > div > div > span > a[class="fl"]'
  ],
  kno_panel_videogame_publisher_selector: [
    'div[data-attrid="kc:/cvg/computer_videogame:publisher"] > div > div > div > span > a[class="fl"]',
    'div[data-attrid="kc:/cvg/game_series:publisher"] > div > div > div > span > a[class="fl"]'
  ],
  kno_panel_videogame_designer_selector: [
    'div[data-attrid="kc:/cvg/computer_videogame:designer"] > div > div > div > span > a[class="fl"]',
    'div[data-attrid="kc:/cvg/game_series:designer"] > div > div > div > span > a[class="fl"]'
  ],
  kno_panel_videogame_composer_selector: [
    'div[data-attrid="kc:/cvg/computer_videogame:composer"] > div > div > div > span > a',
    'div[data-attrid="kc:/cvg/game_series:composer"] > div > div > div > span > a'
  ],
  kno_panel_videogame_engine_selector: 'div[data-attrid="hw:/collection/games:engine"] > div > div > div > span > a[class="fl"]',
  kno_panel_videogame_platforms_selector: 'div[data-attrid="kc:/cvg/computer_videogame:platform"] > div > div > div > span',
  kno_panel_videogame_awards_selector: 'div[data-attrid="kc:/award/award_winner:awards"] > div > div > div > span > a[class="fl"]',
  kno_panel_webfacts_series_selector: 'div[data-attrid="ss:/webfacts:seri"] > div > div > div > span > a',

  kno_panel_award_nominations_selector: 'div[data-attrid="kc:/award/award_winner:nominations"] > div > div > div > span > a[class="fl"]',

  kno_panel_song_lyrics_selector: 'div[data-attrid="kc:/music/recording_cluster:lyrics"] > div > g-expandable-container > div > div > div',
  kno_panel_song_artist_selector: 'div[data-attrid="kc:/music/recording_cluster:artist"] > div > div > div > span > a[class="fl"]',
  kno_panel_song_ft_artist_selector: 'div[data-attrid="kc:/music/recording_cluster:featured artist"] > div > div > div > span > a[class="fl"]',
  kno_panel_song_album_selector: 'div[data-attrid="kc:/music/recording_cluster:first album"] > div > div > div > span > a[class="fl"]',
  kno_panel_song_release_date_selector: 'div[data-attrid="kc:/music/recording_cluster:release date"] > div > div > div',

  kno_panel_film_director_selector: 'div[data-attrid="kc:/film/film:director"] > div > div > div > span > a',
  kno_panel_film_screenplay_selector: 'div[data-attrid="kc:/film/film:screenplay"] > div > div > div > span > a',
  kno_panel_film_budget_selector: 'div[ data-attrid="hw:/collection/films:budget"]',
  kno_panel_film_boxoffice_selector: 'div[data-attrid="hw:/collection/films:box office"]',
  kno_panel_film_release_date_selector: 'div[data-attrid="kc:/film/film:theatrical region aware release date"]',
  kno_panel_film_googleusers_rating_selector: 'div[data-attrid="kc:/ugc:thumbs_up"] > div > div > div',
  kno_panel_film_ratings_selector: [
    'span[class="gsrt KMdzJ"]',
    'span[class="rhsB pVA7K"]'
  ],

  kno_panel_organization_ceo_selector: 'div[data-attrid="kc:/organization/organization:ceo"]',
  kno_panel_organization_founded_date_selector: 'div[data-attrid="kc:/organization/organization:founded"]',
  kno_panel_organization_founders_selector: 'div[data-attrid="kc:/business/business_operation:founder"]',

  kno_panel_organization_parent_selector: [
    'div[data-attrid="hw:/collection/organizations:parent"]',
    'div[data-attrid="hw:/collection/organizations:parent"] > div > a'
  ],

  kno_panel_organization_headquarters_selector: 'div[data-attrid="kc:/organization/organization:headquarters"]',
  kno_panel_organization_subsidiaries_selector: 'div[data-attrid="hw:/collection/organizations:subsidiaries"]',

  kno_panel_images_selector: 'g-img[class="BA0A6c"] > img',

  /** Featured Snippet **/
  featured_snippet_title_selector: [
    'div[class="co8aDb gsrt"]',
    'a[class="sXtWJb gsrt"]',
    'div[class="Xv4xee"]'
  ],
  featured_snippet_desc_selector: [
    'ol[class="X5LH0c"]',
    'ul[class="i8Z77e"]',
    'div[data-attrid="wa:/description"]'
  ],
  featured_snippet_url_selector: [
    'a[class="truncation-information"]',
    'a[class="sXtWJb gsrt"]',
    'a[class="sXtWJb gsrt amp_r"]'
  ],

  /** Google Dictionary **/
  gd_word_selector: 'span[data-dobid="hdw"]',
  gd_phonetic_selector: 'div[class="S23sjd"]',
  gd_audio_selector: 'audio > source',
  gd_definitions_selector: 'div[data-dobid="dfn"]',
  gd_examples_selector: 'div[class="ubHt5c"]',

  /** Google Translator **/
  tr_source_language: 'div[class="j1iyq"] > span[class="source-language"]',
  tr_target_language: 'div[class="j1iyq"] > span[class="target-language"]',

  tr_source_text_selector: 'pre[id="tw-source-text"] > span[class="Y2IQFc"]',
  tr_target_text_selector: 'pre[id="tw-target-text"] > span[class="Y2IQFc"]',

  /** Top Stories **/
  top_stories_snippet_selector: 'div[class="g5wfEd"] > div[role="heading"]',
  top_stories_website_selector: 'div[class="g5wfEd"] > div > g-img > img',
  top_stories_url_selector: 'a[class="WlydOe amp_r"]',

  /** “People also ask” **/
  paa_selector: [
    'div[class="wWOJcd"] > div > span',
    'div[class="s75CSd"]',
    'div[class="s75CSd u60jwe gduDCb"] > span'
  ],

  /** “People also search for” **/
  pasf_selector: 'div[class="IHdOHf"] > img'
};

const getStringBetweenStrings = (data, start_string, end_string) => {
  const regex = new RegExp(
    `${escapeStringRegexp(start_string)}(.*?)${escapeStringRegexp(end_string)}`,
    "s"
  );
  const match = data.match(regex);
  return match ? match[1]: undefined;
};

const escapeStringRegexp = (string) => {
  return string
  .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
  .replace(/-/g, '\\x2d');
};

module.exports = {
  getStringBetweenStrings,
  userAgents,
  formatHtml,
  selectors,
  regex,
  urls
};