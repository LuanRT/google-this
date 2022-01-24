'use strict';

const google = require('..');
let failed_tests = 0;

async function start() {
    const search = await google.search('Stephen Hawking').catch((err) => err);
    assert(!(search instanceof Error) && !!search.results.length, 'should search a query on google.', search);

    const image = await google.image('Supermassive Blackhole').catch((err) => err);
    assert(!(image instanceof Error) && !!image.length, 'should do image search.', image);

    const news = await google.getTopNews().catch((err) => err);
    assert(!(news instanceof Error) && !!news.headline_stories.length, 'should get top news from google.', news);

    const reverse = await google.search('https://i.pinimg.com/236x/92/16/d9/9216d9a222ef65eb6eabfff1970180d1.jpg', { ris: true });
    assert(!(reverse instanceof Error) && !!reverse.results.length, 'should do reverse image search.', search);

    if (failed_tests > 0)
        throw new Error('Some tests have failed');
}

function assert(outcome, description, data) {
    const pass_fail = outcome ? 'pass' : 'fail';

    !outcome && (failed_tests += 1);
    !outcome && console.error(data);

    console.info(pass_fail, ':', description);

    return outcome;
}

start();