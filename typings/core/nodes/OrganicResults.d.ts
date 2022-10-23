export = OrganicResults;
declare class OrganicResults {
    /**
     * @returns {{
     *   title: string;
     *   description: string;
     *   url: string;
     *   is_sponsored: boolean;
     *   favicons: {
     *     high_res: string;
     *     low_res: string;
     *   }
     *  }[]}
     */
    static parse($: any, parse_ads?: boolean): {
        title: string;
        description: string;
        url: string;
        is_sponsored: boolean;
        favicons: {
            high_res: string;
            low_res: string;
        };
    }[];
}
