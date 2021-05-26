"use strict";

const formatHtml = (data) => {
  return data
    .replace(/N6jJud MUxGbd lyLwlc/g, "")
    .replace(/YjtGef ExmHv MUxGbd/g, "")
    .replace(/MUxGbd lyLwlc aLF0Z/g, "")
    .replace(/yDYNvb lEBKkf/g, "yDYNvb");
};

/** Search Results **/
const title_selector = 'div[class="yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe"]';
const description_selector = 'div[class="MUxGbd yDYNvb"]';
const url_selector = [
  "C8nzq BmP5tf",
  "C8nzq d5oMvf BmP5tf",
  "C8nzq BmP5tf amp_r",
  "w1C3Le dJMePd",
  "sXtWJb gsrt amp_r",
  "HLLkSb",
];

/* “Did you mean” */
const did_you_mean_selector = 'a[class="gL9Hy"]';

/* Knowledge Panel */
const kno_panel_title_selector =
  'div[data-attrid="title"] > span[role="heading"]';
const kno_panel_description_selector = 'div[class="kno-rdesc"] > span';
const kno_panel_url_selector = 'div[class="kno-rdesc"] > span > a';
const kno_panel_type_selector = 'div[data-attrid="subtitle"]';

const kno_panel_available_on_selector = 'div[class="ellip bclEt"]';
const kno_panel_born_date_selector =
  'div[data-attrid="kc:/people/person:born"]';
const kno_panel_videogame_release_date_selector =
  'div[data-attrid="kc:/cvg/computer_videogame:release date"]';
const kno_panel_videogame_developer_selector =
  'div[data-attrid="kc:/cvg/computer_videogame:developer"] > div > div > div > span > a';
const kno_panel_videogame_composer_selector =
  'div[data-attrid="kc:/cvg/computer_videogame:composer"] > div > div > div > span > a';
const kno_panel_videogame_platforms_selector =
  'div[data-attrid="kc:/cvg/computer_videogame:platform"] > div > div > div > span';
const kno_panel_webfacts_series_selector =
  'div[data-attrid="ss:/webfacts:seri"] > div > div > div > span > a';

const kno_panel_song_lyrics_selector =
  'div[data-attrid="kc:/music/recording_cluster:lyrics"] > div > g-expandable-container > div > div > div';

const kno_panel_film_director_selector =
  'div[data-attrid="kc:/film/film:director"] > div > div > div > span > a';
const kno_panel_film_budget_selector =
  'div[ data-attrid="hw:/collection/films:budget"]';
const kno_panel_film_boxoffice_selector =
  'div[data-attrid="hw:/collection/films:box office"]';
const kno_panel_film_googleusers_rating_selector =
  'div[data-attrid="kc:/ugc:thumbs_up"] > div > div > div';
const kno_panel_film_ratings_selector = [
  'span[class="gsrt KMdzJ"]',
  'span[class="rhsB pVA7K"]',
];

const kno_panel_organization_ceo_selector =
  'div[data-attrid="kc:/organization/organization:ceo"]';
const kno_panel_organization_founded_date_selector =
  'div[data-attrid="kc:/organization/organization:founded"]';
const kno_panel_organization_founders_selector =
  'div[data-attrid="kc:/business/business_operation:founder"]';
const kno_panel_organization_parent_selector =
  'div[data-attrid="hw:/collection/organizations:parent"]';
const kno_panel_organization_headquarters_selector =
  'div[data-attrid="kc:/organization/organization:headquarters"]';
const kno_panel_organization_subsidiaries_selector =
  'div[data-attrid="hw:/collection/organizations:subsidiaries"]';

const kno_panel_images_selector = 'g-img[class="BA0A6c"] > img';

/* Featured Snippet */
const featured_snippet_title_selector = [
  'div[class="co8aDb gsrt"]',
  'a[class="sXtWJb gsrt"]',
  'div[class="Xv4xee"]',
];
const featured_snippet_desc_selector = [
  'ol[class="X5LH0c"]',
  'ul[class="i8Z77e"]',
  'div[data-attrid="wa:/description"]',
];
const featured_snippet_url_selector = [
  'a[class="truncation-information"]',
  'a[class="sXtWJb gsrt"]',
  'a[class="sXtWJb gsrt amp_r"]',
];

/* Google Dictionary */
const gd_word_selector = 'span[data-dobid="hdw"]';
const gd_phonetic_selector = 'span[class="L1jWkf"]';
const gd_audio_selector = "audio > source";
const gd_definitions_selector = 'div[data-dobid="dfn"]';

/* Top Stories */
const top_stories_snippet_selector =
  'div[class="g5wfEd"] > div[role="heading"]';
const top_stories_website_selector = 'div[class="g5wfEd"] > div > g-img > img';
const top_stories_url_selector = 'a[class="WlydOe amp_r"]';

/* “People also ask” */
const paa_selector = [
  'div[class="wWOJcd"] > div > span',
  'div[class="s75CSd"]',
];

/* “People also search for” */
const pasf_selector = 'div[class="IHdOHf"] > img';

module.exports = {
  /*******************/
  title_selector,
  description_selector,
  url_selector,
  /*******************/
  did_you_mean_selector,
  /*******************/
  kno_panel_title_selector,
  kno_panel_description_selector,
  kno_panel_url_selector,
  kno_panel_type_selector,
  kno_panel_available_on_selector,
  kno_panel_born_date_selector,
  kno_panel_videogame_release_date_selector,
  kno_panel_videogame_developer_selector,
  kno_panel_videogame_composer_selector,
  kno_panel_videogame_platforms_selector,
  kno_panel_webfacts_series_selector,
  /*******************/
  kno_panel_song_lyrics_selector,
  /*******************/
  kno_panel_film_director_selector,
  kno_panel_film_budget_selector,
  kno_panel_film_boxoffice_selector,
  kno_panel_film_googleusers_rating_selector,
  kno_panel_film_ratings_selector,
  /*******************/
  kno_panel_organization_ceo_selector,
  kno_panel_organization_founded_date_selector,
  kno_panel_organization_founders_selector,
  kno_panel_organization_parent_selector,
  kno_panel_organization_headquarters_selector,
  kno_panel_organization_subsidiaries_selector,
  /*******************/
  kno_panel_images_selector,
  /*******************/
  featured_snippet_title_selector,
  featured_snippet_desc_selector,
  featured_snippet_url_selector,
  /*******************/
  top_stories_snippet_selector,
  top_stories_website_selector,
  top_stories_url_selector,
  /*******************/
  gd_word_selector,
  gd_phonetic_selector,
  gd_audio_selector,
  gd_definitions_selector,
  /*******************/
  paa_selector,
  pasf_selector,
  /*******************/
  formatHtml,
};
