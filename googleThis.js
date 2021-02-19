const request = require('request');
const cheerio = require('cheerio');
const htmlEntities = require('html-entities').XmlEntities;
const entities = new htmlEntities();

const googleThis = (query) => {
    let options = {
        url: `https://google.com/search?q=${query}`,
        headers: {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
        },
        method: 'GET'
    };
    return new Promise((resolve, reject) => {
        request(options, function(response, error, responseBody) {
            try {
                resultsPage = cheerio.load(responseBody);

                const resultTitle = resultsPage('.yuRUbf h3');
                const resultUrl = resultsPage('.yuRUbf');
                const resultDescription = resultsPage('.IsZvec');

                let parsedResults = new Array(resultTitle.length).fill(0).map((v, i) => ({
                    title: entities.decode(resultTitle.eq(i).html().split('<span>')[1].split('</span>')[0]),
                    url: entities.decode(resultUrl.eq(i).html().split('<a href="')[1].split('"')[0]),
                    description: entities.decode(resultDescription.eq(i).html().split('<span>')[1].split('</span>')[0].replace(/<em>|<\/em>/gi, ""))
                }));
                resolve(parsedResults);
            } catch (err) {
                reject(err);
            }
        });
    });
};

module.exports = googleThis;
