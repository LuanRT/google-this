/**
 * Retrieves news from Google.
 *
 * @param {string} [language] - two digits language code.
 * @param {string} [region] - two digits region code.
 *
 * @returns {Promise.<{
     headline_stories: {
       title: string;
       url: string;
       image: string;
       published: string;
       by: string;
     }[]
   }>}
 */
export function getTopNews(language?: string, region?: string): Promise<{
    headline_stories: {
        title: string;
        url: string;
        image: string;
        published: string;
        by: string;
    }[];
}>;
/**
 * Search a given query on Google.
 * @param {string} query - search query
 * @param {object} [options] search options
 * @param {boolean} [options.ris] - use reverse image search
 * @param {boolean} [options.safe] - safe search
 * @param {number} [options.page] - pagination
 * @param {object} [options.additional_params] - parameters that will be passed to Google
 */
export function search(query: string, options?: {
    ris?: boolean;
    safe?: boolean;
    page?: number;
    additional_params?: object;
}): Promise<{
    results: {
        title: string;
        description: string;
        url: string;
        favicons: {
            high_res: string;
            low_res: string;
        };
    }[];
    videos: {
        id: string;
        url: string;
        title: string;
        author: string;
        duration: string;
    }[];
    knowledge_panel: KnowledgeGraph;
    featured_snippet: FeaturedSnippet;
    did_you_mean: string;
    weather: Weather;
    time: Time;
    location: Location;
    dictionary: Dictionary;
    translation: Translation;
    top_stories: {
        description: string;
        url: string;
    }[];
    unit_converter: Converters;
    people_also_ask: string[];
    people_also_search: {
        title: string;
        thumbnail: string;
    }[];
}>;
/**
 * Google image search.
 *
 * @param {string} query - search query
 * @param {object} [options] - search options
 * @param {boolean} [options.safe] - safe search
 * @param {object} [options.additional_params] - additional parameters
 *
 * @returns {Promise.<{
    id: string;
    url: string;
    width: number;
    height: number;
    color: number;
    preview: {
      url: string;
      width: number;
      height: number;
    },
    origin: {
      title: string;
      website: {
        name: string;
        domain: string;
        url: string;
      }
    }
 }[]>}
 */
export function image(query: string, options?: {
    safe?: boolean;
    additional_params?: object;
}): Promise<{
    id: string;
    url: string;
    width: number;
    height: number;
    color: number;
    preview: {
        url: string;
        width: number;
        height: number;
    };
    origin: {
        title: string;
        website: {
            name: string;
            domain: string;
            url: string;
        };
    };
}[]>;
import KnowledgeGraph = require("./nodes/KnowledgeGraph");
import FeaturedSnippet = require("./nodes/FeaturedSnippet");
import Weather = require("./nodes/Weather");
import Time = require("./nodes/Time");
import Location = require("./nodes/Location");
import Dictionary = require("./nodes/Dictionary");
import Translation = require("./nodes/Translation");
import Converters = require("./nodes/Converters");
