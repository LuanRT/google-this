export = Parser;
declare class Parser {
    constructor(data: any);
    data: any;
    $: Cheerio.CheerioAPI;
    getOrganicResults(): {
        title: string;
        description: string;
        url: string;
        favicons: {
            high_res: string;
            low_res: string;
        };
    }[];
    getKnowledgeGraph(): {
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
        demonstration: string;
    };
    getFeaturedSnippet(): {
        title: string;
        description: string;
        url: string;
    };
    getDidYouMean(): string;
    getTopStories(): {
        description: string;
        url: string;
    }[];
    getTime(): {
        hours: string;
        date: string;
    };
    getWeather(): {
        location: string;
        forecast: string;
        precipitation: string;
        humidity: string;
        temperature: string;
        wind: string;
    };
    getLocation(date: any): {
        title: string;
        distance: string;
        map: string;
    };
    getTranslation(): {
        source_language: string;
        target_language: string;
        source_text: string;
        target_text: string;
    };
    getDictionary(): {
        word: string;
        phonetic: string;
        audio: string;
        definitions: string[];
        examples: string[];
    };
    getConverters(): {
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
    getPaa(): any[];
    getPas(): {
        title: string;
        thumbnail: string;
    }[];
    #private;
}
import Cheerio = require("cheerio");
