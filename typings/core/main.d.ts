/**
 * Retrieves news from Google.
 *
 * @param {string} [language] - two digits language code.
 * @param {string} [region] - two digits region code.
 *
 * @returns {Promise.<{
 *   headline_stories: {
 *     title: string;
 *     url: string;
 *     image: string;
 *     published: string;
 *     by: string;
 *  }[]
 * }>}
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
 * Searches a given query on Google.
 * @param {string | object} query - The query to search for.
 * @param {object} [options] - Search options.
 * @param {boolean} [options.ris] - Weather this is a reverse image search or not.
 * @param {boolean} [options.safe] - Weather to use safe search or not.
 * @param {number} [options.page] - Page number.
 * @param {boolean} [options.parse_ads] - Weather or not to parse ads.
 * @param {boolean} [options.use_mobile_ua] - Weather or not to use a mobile user agent.
 * @param {object} [options.additional_params] - Additional parameters that will be passed to Google.
 * @param {Axios.AxiosRequestConfig} [options.axios_config] - Config that will be passed to Axios.
 */
export function search(query: string | object, options?: {
    ris?: boolean;
    safe?: boolean;
    page?: number;
    parse_ads?: boolean;
    use_mobile_ua?: boolean;
    additional_params?: object;
    axios_config?: Axios.AxiosRequestConfig;
}): Promise<{
    results: {
        title: string;
        description: string;
        url: string;
        is_sponsored: boolean;
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
 * @param {string} query - The query to search for.
 * @param {object} [options] - Search options.
 * @param {boolean} [options.safe] - Weather to use safe search or not.
 * @param {object} [options.additional_params] - Additional parameters that will be passed to Google.
 * @param {Axios.AxiosRequestConfig} [options.axios_config] - Config that will be passed to Axios.
 * @returns {Promise.<{
 *  id: string;
 *  url: string;
 *  width: number;
 *  height: number;
 *  color: number;
 *  preview: {
 *    url: string;
 *    width: number;
 *    height: number;
 *  },
 *  origin: {
 *    title: string;
 *    website: {
 *      name: string;
 *      domain: string;
 *      url: string;
 *    }
 *  }
 *}[]>}
 */
export function image(query: string, options?: {
    safe?: boolean;
    additional_params?: object;
    axios_config?: Axios.AxiosRequestConfig;
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
import Axios = require("axios");
import KnowledgeGraph = require("./nodes/KnowledgeGraph");
import FeaturedSnippet = require("./nodes/FeaturedSnippet");
import Weather = require("./nodes/Weather");
import Time = require("./nodes/Time");
import Location = require("./nodes/Location");
import Dictionary = require("./nodes/Dictionary");
import Translation = require("./nodes/Translation");
import Converters = require("./nodes/Converters");
