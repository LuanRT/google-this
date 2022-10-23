export = KnowledgeGraph;
declare class KnowledgeGraph {
    constructor(data: any, $: any);
    /** @type {string | null} */
    type: string | null;
    /** @type {string | null} */
    title: string | null;
    /** @type {string | null} */
    description: string | null;
    /** @type {string | null} */
    url: string | null;
    /** @type {{ title: string; value: string }[]} */
    metadata: {
        title: string;
        value: string;
    }[];
    /** @type {{ title: string; year: string; }[]} */
    books: {
        title: string;
        year: string;
    }[];
    /** @type {{ title: string; year: string; }[]} */
    tv_shows_and_movies: {
        title: string;
        year: string;
    }[];
    ratings: any[];
    /** @type {string[]} */
    available_on: string[];
    /** @type {{ url: string; source: string }[]} */
    images: {
        url: string;
        source: string;
    }[];
    /** @type {{ title: string; album: string }[]} */
    songs: {
        title: string;
        album: string;
    }[];
    /** @type {Social[]} */
    socials: Social[];
    /** @type {string | null} */
    demonstration: string | null;
    /** @type {string | null} */
    lyrics: string | null;
}
declare class Social {
    constructor(data: any);
    /** @type {string} */
    name: string;
    /** @type {string} */
    url: string;
    /** @type {string} */
    icon: string;
}
