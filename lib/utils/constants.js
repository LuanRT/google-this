'use strict';

module.exports = {
  URLS: {
    GIS: 'https://images.google.com/',
    GOOGLE: 'https://google.com/',
    W_GOOGLE: 'https://www.google.com/',
    GOOGLE_NEWS: 'https://news.google.com/',
    FAVICONKIT: 'https://api.faviconkit.com'
  },
  SELECTORS: {
    // Organic Search Results 
    TITLE: 'div.ynAwRc.q8U8x.MBeuO.gsrt.oewGkc.LeUQr',
    DESCRIPTION: 'div.MUxGbd.yDYNvb',
    URL: 'a.C8nzq.BmP5tf',

    // Did You Mean 
    DID_YOU_MEAN: 'a.gL9Hy',

    // Knowledge Panel 
    KNO_PANEL_TITLE: [ 'div.BkwXh > div', 'div > span.u9DLmf' ],
    KNO_PANEL_DESCRIPTION: ['div[class="kno-rdesc"] > span', 'div[data-attrid="VisualDigestDescription"]' ],
    KNO_PANEL_URL: 'div[class="kno-rdesc"] > span > a',
    KNO_PANEL_METADATA: 'div.rVusze > span',
    KNO_PANEL_TYPE: 'div.BkwXh > div',
    KNO_PANEL_SONG_LYRICS: 'div.ujudUb',
    KNO_PANEL_AVAILABLE_ON: 'div[class="ellip bclEt"]',
    KNO_PANEL_IMAGES: 'g-inner-card > div > div > img',
    KNO_PANEL_SONGS: 'a > div > div > div > div[class="title"]',
    KNO_PANEL_BOOKS: 'div[data-attrid="kc:/book/author:books only"] > a > div > div > div',
    KNO_PANEL_TV_SHOWS_AND_MOVIES: 'div[data-attrid="kc:/people/person:tv-shows-and-movies"] > a > div > div > div',
    KNO_PANEL_FILM_GOOGLEUSERS_RATING: 'div[data-attrid="kc:/ugc:thumbs_up"] > div > div > div',
    KNO_PANEL_FILM_RATINGS: ['span[class="gsrt KMdzJ"]', 'span[class="rhsB pVA7K"]'],
    KNO_PANEL_SOCIALS: 'div[data-attrid="kc:/common/topic:social media presence"] > div > kp-carousel > g-scrolling-carousel > div > div > kp-carousel-item > div > g-link > a',
    
    VIDEOS: 'div > div > div > div > video-voyager > div',
    
    // Featured Snippet 
    FEATURED_SNIPPET_TITLE: ['div[class="co8aDb gsrt"]', 'a[class="sXtWJb gsrt"]', 'div[class="Xv4xee"]'],
    FEATURED_SNIPPET_DESC: ['ol[class="X5LH0c"]', 'ul[class="i8Z77e"]', 'div[data-attrid="wa:/description"]'],
    FEATURED_SNIPPET_URL: 'div > div > h3 > a',
    
    // Unit converter
    UNIT_CONVERTER_INPUT: 'div.rpnBye > input',
    UNIT_CONVERTER_OUTPUT: 'div[id="NotFQb"] > input',
    UNIT_CONVERTER_FORMULA: 'div.bjhkR',
    INPUT_CURRENCY_NAME: 'span.vLqKYe',
    OUTPUT_CURRENCY_NAME: 'span.MWvIVe',
    CURRENCY_CONVERTER_INPUT: 'span.DFlfde.eNFL1',
    CURRENCY_CONVERTER_OUTPUT: 'span.DFlfde.SwHCTb',
  
    // Weather forecast
    WEATHER_LOCATION: 'div.wob_hdr > div[id="wob_loc"]',
    WEATHER_FORECAST: 'div.wob_dsc',
    PRECIPITATION: 'div.wob_dtf > div > span[id="wob_pp"]',
    AIR_HUMIDITY: 'div.wob_dtf > div > span[id="wob_hm"]',
    TEMPERATURE: 'div > span[id="wob_tm"]',
    WIND_SPEED: 'span[id="wob_ws"]',
  
    // Time result, E.g: try searching “what time is it in Japan?”
    CURRENT_TIME_HOUR: 'div > div[role="heading"]',
    CURRENT_TIME_DATE: 'div.vk_gy.vk_sh',

    // Location result
    LOCATION_TITLE: 'div.vk_sh.vk_gy',
    LOCATION_DISTANCE: 'div.dDoNo.FzvWSb.vk_bk',
    LOCATION_IMAGE: 'div.vk_c > div > a > img',

    // Google Dictionary 
    GD_WORD: 'span[data-dobid="hdw"]',
    GD_PHONETIC: 'div.qexShd',
    GD_AUDIO: 'audio > source',
    GD_DEFINITIONS: 'div[data-dobid="dfn"]',
    GD_EXAMPLES: 'div[class="ubHt5c"]',

    // Google Translator
    TR_SOURCE_LANGUAGE: 'div[class="j1iyq"] > span[class="source-language"]',
    TR_TARGET_LANGUAGE: 'div[class="j1iyq"] > span[class="target-language"]',

    TR_SOURCE_TEXT: 'pre[id="tw-source-text"] > span[class="Y2IQFc"]',
    TR_TARGET_TEXT: 'pre[id="tw-target-text"] > span[class="Y2IQFc"]',

    // Top Stories 
    TOP_STORIES_DESCRIPTION: ['div.g5wfEd', 'div.VeOk3'],
    TOP_STORIES_URL: 'a.WlydOe.amp_r',
    TOP_STORIES_SNIPPET: 'div[class="g5wfEd"] > div[role="heading"]',
    TOP_STORIES_WEBSITE: 'div[class="g5wfEd"] > div > g-img > img',

    // “People also ask” 
    PAA: [ 'div.s75CSd.u60jwe.gduDCb > span', 'div.gbCQS.u60jwe.gduDCb > div > span', 'div.JlqpRe > span' ],
    
    // “People also search for” 
    PASF: 'div[class="IHdOHf"] > img',

    // Top News
    PUBLISHER: 'a[data-n-tid="9"]',
    STORY_TITLE: 'a[class="DY5T1d RZIKme"]',
    STORY_IMG: 'img[class="tvs3Id QwxBBf"]',
    STORY_TIME: 'time'
  }
};