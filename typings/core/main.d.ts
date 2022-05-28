/**
 * Retrieves news from Google.
 *
 * @param {string} [language] - two digits language code.
 * @param {string} [region] - two digits region code.
 *
 * @returns {Promise.<{ headline_stories: { title: string; url: string; image: string; published: string; by: string; }[] }>}
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
 *
 * @param {string} query - Search query
 * @param {object} [options] Search options
 * @param {boolean} [options.ris] - Use reverse image search
 * @param {boolean} [options.safe] - Safe search
 * @param {number} [options.page] - Pagination
 * @param {object} [options.additional_params] - Parameters that will be passed to Google
 *
 * @returns {Promise.<{ results: { title: string; description: string; url: string; favicons: { high_res: string; low_res: string } }[];
 * videos: { id: string; url: string; title: string; author: string; duration: string; }[]; did_you_mean?: string; knowledge_panel: { title: string; description: string; url: string; };
 * featured_snippet: { title: string; description: string; url: string; }; top_stories: { description: string; url: string; }[]; people_also_ask: string[]; people_also_search_for: { title: string; thumbnail: string; }[];
 * unit_converter?: { input: string; output: string; formula: string; } | { input: { name: string; value: string; }; output: { name: string; value: string } };
 * dictionary?: { word: string; phonetic: string; audio: string; definitions: string[]; examples: string[]; };
 * translation?: { source_language: string; target_language: string; source_text: string; target_text: string; };
 * weather?: { location: string; forecast: string; precipitation: string; humidity: string; temperature: string; wind: string; };
 * location?: { title: string; distance: string; map: string; };
 * time?: { date: string; hours: string; }; }>}
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
    did_you_mean?: string;
    knowledge_panel: {
        title: string;
        description: string;
        url: string;
    };
    featured_snippet: {
        title: string;
        description: string;
        url: string;
    };
    top_stories: {
        description: string;
        url: string;
    }[];
    people_also_ask: string[];
    people_also_search_for: {
        title: string;
        thumbnail: string;
    }[];
    unit_converter?: {
        input: string;
        output: string;
        formula: string;
    } | {
        input: {
            name: string;
            value: string;
        };
        output: {
            name: string;
            value: string;
        };
    };
    dictionary?: {
        word: string;
        phonetic: string;
        audio: string;
        definitions: string[];
        examples: string[];
    };
    translation?: {
        source_language: string;
        target_language: string;
        source_text: string;
        target_text: string;
    };
    weather?: {
        location: string;
        forecast: string;
        precipitation: string;
        humidity: string;
        temperature: string;
        wind: string;
    };
    location?: {
        title: string;
        distance: string;
        map: string;
    };
    time?: {
        date: string;
        hours: string;
    };
}>;
/**
 * Google image search.
 *
 * @param {string} query - search query
 * @param {object} [options] - search options
 * @param {boolean} [options.safe] - safe search
 * @param {object} [options.additional_params] - additional parameters
 *
 * @returns {Promise.<{ id: string; url: string; width: number; height: number; color: number;
 * preview: { url: string; width: number; height: number; }, origin: { title: string;
 * website: { name: string; domain: string; url: string; } } }[]>}
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
