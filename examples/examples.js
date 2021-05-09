var { search, image } = require('../lib/google_this');

// Normal search:
search('PewDiePie').then((res) => {
    console.log(res);
});

// Image Search
image('The Wolf Among Us').then((res) => {
    console.log(res);
});