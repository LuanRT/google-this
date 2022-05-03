/**
 * Retrieves news from Google.
 */
export function getTopNews(): Promise<{
    headline_stories: any[];
}>;
/**
 * Search a given query on Google.
 *
 * @param {string} query - Search query
 * @param {object} [options] Search options
 * @param {boolean} [options.ris] - Use reverse image search
 * @param {boolean} [options.safe] - Safe search
 * @param {number} [options.page] - Pagination
 * @param {object} [options.additional_params] - Parameters that will be passed to Google
 */
export function search(query: string, options?: {
    ris?: boolean;
    safe?: boolean;
    page?: number;
    additional_params?: object;
}): Promise<{
    results: any[];
    did_you_mean: string;
    knowledge_panel: {};
    featured_snippet: {};
    top_stories: any[];
    people_also_ask: any[];
    people_also_search_for: any[];
}>;
/**
 * Google image search.
 *
 * @param {string} query - Search query
 * @param {object} [options] - Search options
 * @param {boolean} [options.safe] - Safe search
 * @param {object} [options.additional_params] - Parameters that will be passed to Google
 * @param {Array.<string>} [options.exclude_domains] - Domains that should be blocked
 */
export function image(query: string, options?: {
    safe?: boolean;
    additional_params?: object;
    exclude_domains?: Array<string>;
}): Promise<{
    url: string;
    width: string;
    height: string;
    origin: {
        title: string;
        source: string;
    };
}[]>;
