export = Dictionary;
declare class Dictionary {
    constructor($: any);
    /** @type {string | null} */
    word: string | null;
    /** @type {string | null} */
    phonetic: string | null;
    /** @type {string | null} */
    audio: string | null;
    /** @type {string[]} */
    definitions: string[];
    /** @type {string[]} */
    examples: string[];
}
