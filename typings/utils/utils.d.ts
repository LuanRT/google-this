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
 * Generates a random string with a given length.
 * @param {number} length
 * @returns {string}
 */
export function generateRandomString(length: number): string;
/**
 * Returns a random integer between two values.
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
export function getRandomInt(min: number, max: number): number;
/**
 * Refines the html.
 *
 * @param {string} data - Raw html data.
 * @param {boolean} parse_ads - Whether to parse ads or not.
 * @returns {string}
 */
export function refineData(data: string, parse_ads?: boolean, is_mobile?: boolean): string;
