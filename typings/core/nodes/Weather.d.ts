export = Weather;
declare class Weather {
    constructor($: any, data: any);
    /** @type {string | null} */
    location: string | null;
    /** @type {string | null} */
    forecast: string | null;
    /** @type {string | null} */
    precipitation: string | null;
    /** @type {string | null} */
    humidity: string | null;
    /** @type {string | null} */
    temperature: string | null;
    /** @type {string | null} */
    wind: string | null;
    /** @type {string | null} */
    image: string | null;
}
