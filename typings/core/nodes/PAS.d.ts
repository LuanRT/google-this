export = PAS;
declare class PAS {
    static parse($: any): {
        title: string;
        thumbnail: string;
    }[];
}
