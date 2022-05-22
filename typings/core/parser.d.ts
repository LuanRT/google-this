export = Parser;
declare class Parser {
    constructor(data: any);
    data: any;
    $: Cheerio.CheerioAPI;
    get organic_results(): {
        title: string;
        description: string;
        url: string;
        favicons: {
            high_res: string;
            low_res: string;
        };
    }[];
    get knowledge_graph(): {
        title: string;
        description: string;
        url: string;
        type: string;
        books: {
            title: string;
            year: string;
        }[];
        tv_shows_and_movies: {
            title: string;
            year: string;
        }[];
        lyrics: string;
        ratings: any[];
        available_on: string[];
        images: {
            url: string;
            source: string;
        }[];
        songs: {
            title: string;
            album: string;
        }[];
        demonstration: string;
    };
    get videos(): {
        id: string;
        url: string;
        title: string;
        author: string;
        duration: string;
    }[];
    get featured_snippet(): {
        title: string;
        description: string;
        url: string;
    };
    get did_you_mean(): string;
    get top_stories(): {
        description: string;
        url: string;
    }[];
    get time(): {
        hours: string;
        date: string;
    };
    get weather(): {
        location: string;
        forecast: string;
        precipitation: string;
        humidity: string;
        temperature: string;
        wind: string;
    };
    get location(): {
        title: string;
        distance: string;
        map: string;
    };
    get translation(): {
        source_language: string;
        target_language: string;
        source_text: string;
        target_text: string;
    };
    get dictionary(): {
        word: string;
        phonetic: string;
        audio: string;
        definitions: string[];
        examples: string[];
    };
    get converters(): {
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
        formula?: undefined;
    };
    get paa(): any[];
    get pas(): {
        title: string;
        thumbnail: string;
    }[];
    #private;
}
import Cheerio = require("cheerio");
