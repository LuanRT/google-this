# google-this

[![Build](https://github.com/LuanRT/google-this/actions/workflows/node.js.yml/badge.svg)](https://github.com/LuanRT/google-this/actions/workflows/node.js.yml)

A module to retrieve search results and much more from Google.

### Similar projects

- [playstore-scraper](https://github.com/luanrt/playstore-scraper): a scraper to get search results from Google Play Store.
- [lexico-dictionary](https://github.com/LuanRT/lexico-dictionary): a module that scrapes lexico.com to get the definition of words, examples and pronunciation.

## Installation

```bash
npm install googlethis
```

## Usage

```js
var google = require("googlethis");

google.search("Best NodeJs practices").then((res) => {
  console.log(res.results);
});
```

Output:

```js
[
   {
      "title":"goldbergyoni/nodebestpractices: The Node.js best practices why a good setup ...",
      "description":"3. Code Style Practices · ✓ 3.1 Use ESLint · ✓ 3.2 Node. · ✓ 3.3 Start a Codeblock's Curly Braces on the Same Line · ✓ 3.4 ..",
      "url":"https://github.com/goldbergyoni/nodebestpractices"
   },
   {
      "title":"Node.js Architecture and 12 Best Practices for Node.js Development ...",
      "description":"Aug 20, 2020 — An in-depth walkthrough of the inner working of Node.js, Node.js best practices, why a good setup ...",
      "url":"https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development"
   },
   {
      "title":"Best Practices Every Node Developer Should Follow",
      "description":"Oct 12, 2020 — Save the exact package version to package. · Use a tool to restart your app after every code change · Use ...",
      "url":"https://livecodestream.dev/post/best-practices-every-node-developer-should-follow/"
   },
   {
      "title":"Node.js Best Practices | Codementor",
      "description":"Aug 29, 2016 — Let's save the world of Node.js projects together! Here are the top 14 Node.js best practices that Node ...",
      "url":"https://www.codementor.io/@mattgoldspink/nodejs-best-practices-du1086jja"
   },
   {
      "title":"24 development practices our NodeJS developers follow - Peerbits",
      "description":"Start all projects with npm init. Create a new project in Node.js using npm init. Setup . npmrc. Use environment variables. Use environment variables in Node. Use a style guide. Say no to synchronous functions. Handle Errors. Confirm your app automatically restarts. Acquaint yourself with JavaScript best practices.",
      "url":"https://www.peerbits.com/blog/development-practices-for-nodejs-developers.html/amp"
   },
   //...
]
```

You can also go to the next page for more results:

```js
google
  .search("NodeJs best practices", {
    page: 2,
  })
  .then((res) => {
    console.log(res.results);
  });
```

### If you need more than just the search results:

google-this has the ability to retrieve almost everything a Google search can offer, from featured snippets to knowledge panels, even song lyrics can be retrieved.

P.s.
Fields like `title`, `description` and `url` will always return “n/a” if it is not available. However, fields like `people_also_ask`, `top_stories`, `dictionary`, `lyrics`, `images` and some others will simply not be included in the response.

Here is what a full response from google-this might look like:

```js
{
   "results":[
      {
         "title":"..",
         "description":"...",
         "url":".."
      },
      //...
   ],
   "did_you_mean":"..",
   "knowledge_panel":{
      "title":"..",
      "description":"...",
      "url":"..",
      "type":"..",
      "lyrics":"..",
      "available_on":[
         ".."
      ],
      "platforms":[
         ".."
      ],
      "images":[
         ".."
      ]
      // there are more, but I won't list them here for the sake of simplicity, refer to the code for more info.
   },
   "featured_snippet":{
      "title":"..",
      "description":"...",
      "url":".."
   },
   "dictionary":{
      "word":"..",
      "phonetic":"..",
      "audio":"..",
      "definitions":[
         ".."
      ]
   },
   "top_stories":{
      "website":"..",
      "snippet":"...",
      "url":".."
   },
   "people_also_ask":[
      ".."
   ],
   "people_also_search_for":[
      ".."
   ]
}
```

### What else?

Well, you can also search images with this module :)

Example:

```js
var { search, image } = require('googlethis');

// Simple search:
image('The Wolf Among Us').then((res) => {
    console.log(res);
});

// If you don't want results from specific websites:
var blocked_domains = {
  'medibang.com',
  'pinterest.com'
}

image('The Wolf Among Us', blocked_domains).then((res) => {
    console.log(res);
});

```

It can return up to 15 images. Here's what it looks like:

```js
[
   {
      "title":"goldbergyoni/nodebestpractices: The Node.js best practices why a good setup ...",
      "description":"3. Code Style Practices · ✓ 3.1 Use ESLint · ✓ 3.2 Node. · ✓ 3.3 Start a Codeblock's Curly Braces on the Same Line · ✓ 3.4 ..",
      "url":"https://github.com/goldbergyoni/nodebestpractices"
   },
   {
      "title":"Node.js Architecture and 12 Best Practices for Node.js Development ...",
      "description":"Aug 20, 2020 — An in-depth walkthrough of the inner working of Node.js, Node.js best practices, why a good setup ...",
      "url":"https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development"
   },
   {
      "title":"Best Practices Every Node Developer Should Follow",
      "description":"Oct 12, 2020 — Save the exact package version to package. · Use a tool to restart your app after every code change · Use ...",
      "url":"https://livecodestream.dev/post/best-practices-every-node-developer-should-follow/"
   },
   {
      "title":"Node.js Best Practices | Codementor",
      "description":"Aug 29, 2016 — Let's save the world of Node.js projects together! Here are the top 14 Node.js best practices that Node ...",
      "url":"https://www.codementor.io/@mattgoldspink/nodejs-best-practices-du1086jja"
   },
   {
      "title":"24 development practices our NodeJS developers follow - Peerbits",
      "description":"Start all projects with npm init. Create a new project in Node.js using npm init. Setup . npmrc. Use environment variables. Use environment variables in Node. Use a style guide. Say no to synchronous functions. Handle Errors. Confirm your app automatically restarts. Acquaint yourself with JavaScript best practices.",
      "url":"https://www.peerbits.com/blog/development-practices-for-nodejs-developers.html/amp"
   },
   //...
]
```

For more information check out the examples file.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
