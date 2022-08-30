export = TopStories;
declare class TopStories {
    static parse($: any): {
        description: string;
        url: string;
    }[];
}
