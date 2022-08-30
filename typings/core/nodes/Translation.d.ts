export = Translation;
declare class Translation {
    constructor($: any);
    /** @type {string | null} */
    source_language: string | null;
    /** @type {string | null} */
    target_language: string | null;
    /** @type {string | null} */
    source_text: string | null;
    /** @type {string | null} */
    target_text: string | null;
}
