export = Videos;
declare class Videos {
    static parse($: any): {
        id: string;
        url: string;
        title: string;
        author: string;
        duration: string;
    }[];
}
