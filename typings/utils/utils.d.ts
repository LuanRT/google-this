export class SearchError extends Error {
    constructor(message: any, info: any);
    info: any;
    date: Date;
    version: any;
}
/**
 * Returns headers with a random user agent.
 *
 * @param {boolean} is_mobile
 * @returns {string}
 */
export function getHeaders(options?: {
    mobile: boolean;
}): string;
/**
 * Gets a string between two delimiters.
 *
 * @param {string} data - The data.
 * @param {string} start_string - Start string.
 * @param {string} end_string - End string.
 *
 * @returns {string}
 */
export function getStringBetweenStrings(data: string, start_string: string, end_string: string): string;
/**
 * Refines the html.
 *
 * @param {string} data - Raw html data.
 * @returns {string}
 */
export function refineData(data: string): string;
