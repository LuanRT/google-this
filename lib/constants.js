'use strict';

const urls = {
  google_base_url: 'https://google.com/',
  w_google_base_url: 'https://www.google.com/',
  google_news_url: 'https://news.google.com/',
  gis_base_url: 'https://images.google.com/'
};

const regex = {
  IMAGE_SEARCH: /\["(http.*?)",(\d+),(\d+)]/g,
  IMAGE_ORIGIN: /"(.+?)":\[null,"(.*?)","(.*?)","(.*?)",/g,
};

const selectors = {
  // Organic Search Results 
  title_selector: 'div[class="yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe"]',
  description_selector: 'div[class="MUxGbd yDYNvb"]',
  url_selector: 'a.C8nzq.BmP5tf',

  // Did You Mean 
  did_you_mean_selector: 'a[class="gL9Hy"]',

  // Knowledge Panel 
  kno_panel_title_selector: [ 'div.BkwXh > div', 'div > span.u9DLmf' ],
  kno_panel_description_selector: 'div[class="kno-rdesc"] > span',
  kno_panel_url_selector: 'div[class="kno-rdesc"] > span > a',
  kno_panel_metadata_selector: 'div.rVusze > span.GRkHZd.w8qArf',
  kno_panel_type_selector: 'div.BkwXh > div',
  kno_panel_song_lyrics_selector: 'div.ujudUb',
  kno_panel_available_on_selector: 'div[class="ellip bclEt"]',
  kno_panel_images_selector: 'div > g-scrolling-carousel > div > div > div > g-inner-card > g-img > img',
  kno_panel_books_selector: 'div[data-attrid="kc:/book/author:books only"] > a > div > div > div.Bo9xMe > div',
  kno_panel_tv_shows_and_movies_selector: 'div[data-attrid="kc:/people/person:tv-shows-and-movies"] > a > div > div > div.Bo9xMe > div',
  kno_panel_film_googleusers_rating_selector: 'div[data-attrid="kc:/ugc:thumbs_up"] > div > div > div',
  kno_panel_film_ratings_selector: ['span[class="gsrt KMdzJ"]', 'span[class="rhsB pVA7K"]'],

  // Featured Snippet 
  featured_snippet_title_selector: ['div[class="co8aDb gsrt"]', 'a[class="sXtWJb gsrt"]', 'div[class="Xv4xee"]'],
  featured_snippet_desc_selector: ['ol[class="X5LH0c"]', 'ul[class="i8Z77e"]', 'div[data-attrid="wa:/description"]'],
  featured_snippet_url_selector: 'h3[class="yuRUbf JtG40d V7Sr0"] > a',

  // Unit converter
  unit_converter_input_selector: 'div.rpnBye > input',
  unit_converter_output_selector: 'div[id="NotFQb"] > input',
  unit_converter_formula_selector: 'div.bjhkR',
  input_currency_name_selector: 'span.vLqKYe',
  output_currency_name_selector: 'span.MWvIVe',
  currency_converter_input_selector: 'span.DFlfde.eNFL1',
  currency_converter_output_selector: 'span.DFlfde.SwHCTb',
  
  // Weather forecast
  weather_location_selector: 'div.wob_hdr > div[id="wob_loc"]',
  weather_forecast_selector: 'div.wob_dsc',
  precipitation_selector: 'div.wob_dtf > div > span[id="wob_pp"]',
  air_humidity_selector: 'div.wob_dtf > div > span[id="wob_hm"]',
  temperature_selector: 'div > span[id="wob_tm"]',
  wind_speed_selector: 'span[id="wob_ws"]',
  
  // Time result, E.g: try searching “what time is it in Japan?”
  current_time_hour_selector: 'div.gsrt.vk_bk.dDoNo.FzvWSb.XcVN5d',
  current_time_date_selector: 'div.vk_gy.vk_sh',

  // Location result
  location_title_selector: 'div.vk_sh.vk_gy',
  location_distance_selector: 'div.dDoNo.FzvWSb.vk_bk',
  location_image_selector: 'div.vk_c > div > a > img',

  // Google Dictionary 
  gd_word_selector: 'span[data-dobid="hdw"]',
  gd_phonetic_selector: 'div[class="S23sjd"]',
  gd_audio_selector: 'audio > source',
  gd_definitions_selector: 'div[data-dobid="dfn"]',
  gd_examples_selector: 'div[class="ubHt5c"]',

  // Google Translator
  tr_source_language: 'div[class="j1iyq"] > span[class="source-language"]',
  tr_target_language: 'div[class="j1iyq"] > span[class="target-language"]',

  tr_source_text_selector: 'pre[id="tw-source-text"] > span[class="Y2IQFc"]',
  tr_target_text_selector: 'pre[id="tw-target-text"] > span[class="Y2IQFc"]',

  // Top Stories 
  top_stories_description_selector: ['div.g5wfEd', 'div.VeOk3'],
  top_stories_url_selector: 'a.WlydOe.amp_r',
  top_stories_snippet_selector: 'div[class="g5wfEd"] > div[role="heading"]',
  top_stories_website_selector: 'div[class="g5wfEd"] > div > g-img > img',

  // “People also ask” 
  paa_selector: ['div.wWOJcd > div > span', 'div[class="s75CSd"]', 'div.s75CSd.u60jwe.gduDCb > span'],

  // “People also search for” 
  pasf_selector: 'div[class="IHdOHf"] > img',

  // Top News
  publisher_selector: 'a[data-n-tid="9"]',
  story_img_selector: 'img[class="tvs3Id QwxBBf"]',
  story_time_selector: 'time'
};

module.exports = { urls, regex, selectors };