export = OrganicResults;
declare class OrganicResults {
    /**
     * @returns {{
        title: string;
        description: string;
        url: string;
        favicons: {
          high_res: string;
          low_res: string;
        }
     }[]}
     */
    static parse(data: any, $: any): {
        title: string;
        description: string;
        url: string;
        favicons: {
            high_res: string;
            low_res: string;
        };
    }[];
}
