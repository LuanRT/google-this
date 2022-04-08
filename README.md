<h1 align="center">Google This</h1>
<p align="center"><i>A simple yet powerful module to retrieve organic search results and much more from Google.</i><p>

<p align="center">
<img src="https://github.com/LuanRT/google-this/actions/workflows/node.js.yml/badge.svg">
<img src="https://img.shields.io/npm/v/googlethis?color=%232">
<a href="https://www.codefactor.io/repository/github/luanrt/google-this">
<img src="https://www.codefactor.io/repository/github/luanrt/google-this/badge" alt="CodeFactor"/>
</a>
<img src="https://img.shields.io/npm/dm/googlethis?style=flat">
<a href="https://saythanks.io/to/LuanRT">
<img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg">
</a>
</p>

<p align="center">
<a href="#installation">Installation</a> -
<a href="#usage">Getting Started</a> -
<a href="#image-search">Image Search</a> -
<a href="#related-projects">Related Projects</a> -
<a href="#see-also">See Also</a>
</p>


## Installation

```bash
npm install googlethis
```

## Usage

```js
const google = require('googlethis');

async function start() {
  const options = {
    page: 0, 
    safe: false, // hide explicit results?
    additional_params: { 
      // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
      hl: 'en' 
    }
  }
  
  const response = await google.search('TWDG', options);
  console.log(response); 
}

start();
```
<details>
<summary>Output</summary>
<p>

```js
{
   "results":[
      {
         "title":"The Walking Dead (Video Game)",
         "description":"The Walking Dead, also known as The Walking Dead: A Telltale Games ...",
         "url":"https://walkingdead.fandom.com/wiki/The_Walking_Dead_(Video_Game)",
         "favicons":{
            "high_res":"https://api.faviconkit.com/walkingdead.fandom.com/192",
            "low_res":"https://www.google.com/s2/favicons?sz=64&domain_url=walkingdead.fandom.com"
         }
      },
      {
         "title":"The Walking Dead (video game) - Wikipedia",
         "description":"The Walking Dead is an episodic adventure video game developed and ...",
         "url":"https://en.m.wikipedia.org/wiki/The_Walking_Dead_(video_game)",
         "favicons":{
            "high_res":"https://api.faviconkit.com/en.m.wikipedia.org/192",
            "low_res":"https://www.google.com/s2/favicons?sz=64&domain_url=en.m.wikipedia.org"
         }
      },
      {
         "title":"The Walking Dead (video game series) - Wikipedia",
         "description":"The Walking Dead is an episodic, graphic adventure video game series developed and published by Telltale Games and Skybound Games, based on The Walking Dead ...",
         "url":"https://en.m.wikipedia.org/wiki/The_Walking_Dead_(video_game_series)",
         "favicons":{
            "high_res":"https://api.faviconkit.com/en.m.wikipedia.org/192",
            "low_res":"https://www.google.com/s2/favicons?sz=64&domain_url=en.m.wikipedia.org"
         }
      },
      {
         "title":"The Walking Dead: The Telltale Definitive Series on Steam",
         "description":"Oct 29, 2020 — The Walking Dead: The Telltale Definitive Series contains all 4 Seasons, 400 Days, and The Walking Dead: Michonne, which includes over 50 ...",
         "url":"https://store.steampowered.com/app/1449690/The_Walking_Dead_The_Telltale_Definitive_Series/",
         "favicons":{
            "high_res":"https://api.faviconkit.com/store.steampowered.com/192",
            "low_res":"https://www.google.com/s2/favicons?sz=64&domain_url=store.steampowered.com"
         }
      },
      {
         "title":"The Walking Dead: The Final Season on Steam",
         "description":"All this creates the most engaging The Walking Dead game yet. Striking New ...",
         "url":"https://store.steampowered.com/app/866800/The_Walking_Dead_The_Final_Season/",
         "favicons":{
            "high_res":"https://api.faviconkit.com/store.steampowered.com/192",
            "low_res":"https://www.google.com/s2/favicons?sz=64&domain_url=store.steampowered.com"
         }
      },
      {
         "title":"The Walking Dead (Video Game 2012) - IMDb",
         "description":"The Walking Dead: Directed by Sean Ainsworth, Nick Herman, Dennis Lenart, Eric Parsons, Jake Rodkin, Sean Vanaman. ...",
         "url":"https://m.imdb.com/title/tt2006890/",
         "favicons":{
            "high_res":"https://api.faviconkit.com/m.imdb.com/192",
            "low_res":"https://www.google.com/s2/favicons?sz=64&domain_url=m.imdb.com"
         }
      },
      {
         "title":"Telltale's The Walking Dead - Season 1 - Skybound Entertainment",
         "description":"The Walking Dead is a five-part game series set in the same universe as Robert Kirkman's award-winning comic book series. Play as Lee Everett, a convicted ...",
         "url":"https://www.skybound.com/telltales-the-walking-dead-season-1",
         "favicons":{
            "high_res":"https://api.faviconkit.com/www.skybound.com/192",
            "low_res":"https://www.google.com/s2/favicons?sz=64&domain_url=www.skybound.com"
         }
      },
      {
         "title":"The Walking Dead (TWD) - Games - Skybound Entertainment",
         "description":"Get The Latest News on The Walking Dead (TWD) Games! TWD Video & Board Games from Skybound.",
         "url":"https://www.skybound.com/the-walking-dead/games",
         "favicons":{
            "high_res":"https://api.faviconkit.com/www.skybound.com/192",
            "low_res":"https://www.google.com/s2/favicons?sz=64&domain_url=www.skybound.com"
         }
      }
   ],
   "knowledge_panel": {
      "title": "The Walking Dead",
      "description": "The Walking Dead is an episodic adventure video game developed and published by Telltale Games. It is the first game in the series, which consists of 4 seasons. Based on The Walking Dead comic book series, the game consists of five episodes, released between April and November 2012.",
      "url": "https://en.m.wikipedia.org/wiki/The_Walking_Dead_(video_game)",
      "initial_release_date": "2012",
      "series": "The Walking Dead",
      "developer": "Telltale Games",
      "platforms": "PlayStation 4, Android, Xbox One, PlayStation 3, Xbox 360, Nintendo Switch, More",
      "awards": "VGX Award for Game of the Year, VGX Award for Best Performance by a Human Female,  More",
      "genres": "Graphic adventure game, Interactive film, Adventure",
      "publishers": "Telltale Games, Skybound Games, Howyaknow, LLC",
      "type": "Video game",
      "ratings":[
         {
            "name":"Steam",
            "rating":"10/10"
         }
      ],
      "images": [
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmU64CRh5_wsF4S-DbpH_C9ozWVRlvZJmguQ&s",
            "source":"https://www.pinterest.com/pin/769693392545268465/"
         },
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNTRozFnQgRKDsC5aaXj31HvLkcKvroHqExA&s",
            "source":"https://store.steampowered.com/app/866800/The_Walking_Dead_The_Final_Season/"
         },
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITB1paL8GBaYHyw5HlPU60pFdnGV09ygGsw&s",
            "source":"https://en.wikipedia.org/wiki/The_Walking_Dead:_A_New_Frontier"
         },
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtcUSzCxQ6AKjV_hNFSyixXoo0No7bUpvnhw&s",
            "source":"https://store.playstation.com/?resolve=EP2026-CUSA12026_00-TWDS400000000EP3"
         },
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpoOQkbxKJEboeavLycSjFV5OfGEJaOUsEow&s",
            "source":"https://store.steampowered.com/app/261030/The_Walking_Dead_Season_Two/"
         },
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVKcTnZC-Y9HW_E37tgu6vTEZSM4lb0F_DHw&s",
            "source":"https://en.wikipedia.org/wiki/The_Walking_Dead_(video_game)"
         },
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZHmljt0G_-YgOMOkO4XC0L2VQGsRpgGWoNA&s",
            "source":"https://www.polygon.com/comics/2020/10/11/21509393/walking-dead-game-clementine-new-story-robert-kirkman-invincible-skybound"
         },
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPvrFr-3o2yTiA8DUXgo-53uvBN07NionfQg&s",
            "source":"https://telltale--games.fandom.com/wiki/Minerva_(The_Walking_Dead)"
         }
      ]
   },
   "featured_snippet": {
      "title":"N/A",
      "description":"N/A",
      "url":"N/A"
   },
   "top_stories": [],
   "people_also_ask": [
      "What race is Clementine TWDG?",
      "How long is TWDG season 2?",
      "Which Walking Dead game is the first?",
      "Who does Clementine kill?",
      "The Walking Dead: The Final Season",
      "The Walking Dead: a new frontier",
      "The Walking Dead game characters",
      "The Walking Dead game Season 1"
   ],
   "people_also_search_for": [
      {
         "title":"The Wolf Among Us",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJgFs6sTHHGkGGNIRhQGZDGcWPHe58clsY5PYJ-DcruOlBj6ZdM-NA&s=0"
      },
      {
         "title":"The Walking D...",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdnHz1lzulmMOk9Og95ZIOtZYeE7hICpFjLiw6TPLeCk4rmWGi7KQz&s=0"
      },
      {
         "title":"400 Days",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHFROcUnJIcJ1wZ6NWKoI8HWd8Sc7Bit44nO-Lt6GsOCIITgYgiXu8&s=0"
      },
      {
         "title":"The Walking D...",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN0iib2gjyjjcQn695ce3hXB4BssAj-lOmXIbp__--QB9Gk-ahA5qB&s=0"
      }
   ]
}
```

</p>
</details>  

## What else can it do?

As you can see, the library returns a lot of data. Currently it can parse everything from the knowledge graph, featured snippets and much more such as Google Dictionary, Google Translate and song lyrics. 
All you have to do is search something along the lines of; ```“define xyz”```, ```“translate x to y”``` or ```“xyz song lyrics”``` and the appropriated fields will appear in the response.

#### Examples:

> Knowledge Graph:

![Knowledge Graph](https://raw.githubusercontent.com/LuanRT/google-this/main/images/knowledge_panel.png "Google's Knowledge Graph")

Will look like:

```js
{
   //....
   "knowledge_panel":{
      "title":"Stephen Hawking",
      "description":"Stephen William Hawking CH CBE FRS FRSA was an English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology at the University of Cambridge at the time of his death.",
      "url":"https://en.m.wikipedia.org/wiki/Stephen_Hawking",
      "born":"January 8, 1942, Oxford, United Kingdom",
      "died":"March 14, 2018, Cambridge, United Kingdom",
      "spouse":"Elaine Mason (m. 1995–2006), Jane Hawking (m. 1965–1995)",
      "children":"Timothy Hawking, Robert Hawking, Lucy Hawking",
      "type":"English theoretical physicist",
      "books":[
         {
            "title":"A Brief History of Time",
            "year":"1988"
         },
         //...
      ],
      "tv_shows_and_movies":[
         {
            "title":"A Brief History of Time",
            "year":"1991"
         },
         {
            "title":"Into the Universe With Stephen Hawking",
            "year":"2010"
         }, 
         //...
      ],
      "images":[
         {
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT802HAtAk2bvdBUxv_9kx01sK6n-kfi3_Y5g&s",
            "source":"https://veja.abril.com.br/ciencia/5-livros-escritos-por-stephen-hawking-que-voce-precisa-conhecer/"
         },
         //...
      ]
   }
}
```

>   Google Translator:

![Google Translator](https://raw.githubusercontent.com/LuanRT/google-this/main/images/google_translator.png "Google Translator")

Will be:

```js
{
   //...
   "translation": {
      "source_language":"English - detected",
      "target_language":"German",
      "source_text":"this is a test",
      "target_text":"das ist ein Test"
   }
}
```

> Google Dictionary:

![Google Dictionary](https://raw.githubusercontent.com/LuanRT/google-this/b25bc842de3e8b791b265d3ca6b12cb25ce06772/images/google_dictionary.png "Google Dictionary")

↓↓↓

```js
{
   //...
   "dictionary":{
      "word":"a·maz·ing",
      "phonetic":"/əˈmāziNG/",
      "audio":"https://ssl.gstatic.com/dictionary/static/sounds/20200429/amazing--_us_1.mp3",
      "definitions":[
         "causing great surprise or wonder; astonishing.",
         "startlingly impressive."
      ],
      "examples":[
         "\"an amazing number of people registered\"",
         "\"she makes the most amazing cakes\""
      ]
   }
}
```

Pretty amazing, isn't it? :D

For more info check out the [examples](https://github.com/LuanRT/google-this/blob/03672c9716557e1048da0deef29326a79f30251e/examples/index.js) file.

## Image Search

It is also possible to search for images and even do reverse image search:

Check it out:

 ```js
const google = require('googlethis');

async function start() {
  // Image Search
  const images = await google.image('The Wolf Among Us', { safe: false });
  console.log(images); 
  
  // Reverse Image Search
  const reverse = await google.search('https://i.pinimg.com/236x/92/16/d9/9216d9a222ef65eb6eabfff1970180d1.jpg', { ris: true });
  console.log(reverse.results);
}

start();
```
 
<details>
<summary>Image Search output</summary>
<p>

```js
[
   {
      "url":"https://steamcdn-a.akamaihd.net/steam/apps/250320/capsule_616x353.jpg?t\\u003d1593722673",
      "width":"353",
      "height":"616",
      "origin":{
         "title":"The Wolf Among Us on Steam",
         "website":"https://store.steampowered.com/app/250320/The_Wolf_Among_Us/"
      }
   },
   {
      "url":"https://store-images.s-microsoft.com/image/apps.5089.13510798887517413.56778ce8-0de1-44ba-89b1-769ebb2fa5e1.fd83647a-219d-49e2-bc3c-105b1f33be77",
      "width":"1080",
      "height":"720",
      "origin":{
         "title":"Buy The Wolf Among Us - A Telltale Games Series - Microsoft Store en-IN",
         "website":"https://www.microsoft.com/en-in/p/the-wolf-among-us-a-telltale-games-series/9nblggh4w0td"
      }
   },
   {
      "url":"https://cdn.vox-cdn.com/thumbor/Zp1L6Vji2NEk0sxmeYmbThbq4CY\\u003d/0x0:1280x720/1200x800/filters:focal(538x258:742x462)/cdn.vox-cdn.com/uploads/chorus_image/image/65898028/69262385_408272906381786_5376154085030363136_n.0.png",
      "width":"800",
      "height":"1200",
      "origin":{
         "title":"The Wolf Among Us 2 back in development at Telltale - Polygon",
         "website":"https://www.polygon.com/game-awards-tga/2019/12/12/21011644/the-wolf-among-us-2-telltale-windows-trailer-tga-2019"
      }
   },
   {
      "url":"https://media.telltale.com/content/2019/08/15202452/twau_screenshot_1.jpg",
      "width":"562",
      "height":"1000",
      "origin":{
         "title":"The Wolf Among Us – Telltale Games",
         "website":"https://www.telltale.com/the-wolf-among-us/"
      }
   },
   {
      "url":"https://cdn.vox-cdn.com/thumbor/zF-gSuNaZbRvSyxuIOjQw2rRag0\\u003d/155x0:1842x1125/2050x1367/cdn.vox-cdn.com/uploads/chorus_image/image/36052600/fight-bigby_2000px.0.jpg",
      "width":"1367",
      "height":"2050",
      "origin":{
         "title":"The Wolf Among Us' season one review: a terrifying fairy tale | The Verge",
         "website":"https://www.theverge.com/2014/7/25/5931015/the-wolf-among-us-season-one-review"
      }
   },
   {
      "url":"https://images-na.ssl-images-amazon.com/images/I/91GP8qHLRvL.jpg",
      "width":"2560",
      "height":"1659",
      "origin":{
         "title":"Fables: The Wolf Among Us Vol. 2: Sturges, Matthew, Nguyen, Eric:  9781401261375: Amazon.com: Books",
         "website":"https://www.amazon.com/Fables-Wolf-Among-Us-Vol/dp/140126137X"
      }
   },
   {
      "url":"https://d2skuhm0vrry40.cloudfront.net/2019/articles/2019-12-13-04-26/-1576211173089.jpg/EG11/resize/1200x-1/-1576211173089.jpg",
      "width":"673",
      "height":"1200",
      "origin":{
         "title":"Telltale's The Wolf Among Us 2 just got re-announced • Eurogamer.net",
         "website":"https://www.eurogamer.net/articles/2019-12-13-telltales-the-wolf-among-us-2-just-got-re-announced"
      }
   },
   {
      "url":"https://cdn.vox-cdn.com/thumbor/-VoSq1f8QmFu5VR0f7lh6z3IQGM\\u003d/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/68492490/ss_be6d5010313dae1668d150f1da64802be0a37a06.0.jpg",
      "width":"800",
      "height":"1200",
      "origin":{
         "title":"Telltale Games updates fans on The Wolf Among Us 2 and more - Polygon",
         "website":"https://www.polygon.com/2020/12/10/22168137/telltale-games-december-2020-update-wolf-among-us-2-development"
      }
   },
   {
      "url":"https://bloody-disgusting.com/wp-content/uploads/2019/12/wolfamongus.jpg",
      "width":"535",
      "height":"830",
      "origin":{
         "title":"Development on 'The Wolf Among Us 2' Starting From Scratch With New  Technology, Says LCG Entertainment - Bloody Disgusting",
         "website":"https://bloody-disgusting.com/video-games/3598711/development-wolf-among-us-2-starting-scratch-new-technology-says-lcg-entertainment/"
      }
   },
   {
      "url":"https://m.media-amazon.com/images/I/71a8K4ndPqL._SL1111_.jpg",
      "width":"1111",
      "height":"894",
      "origin":{
         "title":"Amazon.com: The Wolf Among Us - Xbox One: Ui Entertainment: Video Games",
         "website":"https://www.amazon.com/Wolf-Among-Us-Xbox-One/dp/B00K2O54W8"
      }
   },
   {
      "url":"https://www.nerdmuch.com/wp-content/uploads/2020/08/the-wolf-among-us-season-2.jpg",
      "width":"720",
      "height":"1280",
      "origin":{
         "title":"The Wolf Among Us: 5 Questions We Need Answered for Season 2",
         "website":"https://www.nerdmuch.com/the-wolf-among-us-questions-season-2/"
      }
   },
   {
      "url":"https://cdn.gamer-network.net/2017/articles/2017-07-19-17-08/telltale-announces-the-wolf-among-us-season-two-days-after-telling-fans-not-to-get-hopes-up-1500480538390.jpg/EG11/thumbnail/1920x1275/format/jpg/quality/80",
      "width":"1275",
      "height":"1920",
      "origin":{
         "title":"Telltale announces The Wolf Among Us season two, days after telling fans  not to get hopes up • Eurogamer.net",
         "website":"https://www.eurogamer.net/articles/2017-07-19-telltale-announces-the-wolf-among-us-season-two-days-after-telling-fans-not-to-get-hopes-up"
      }
   },
   {
      "url":"https://images-na.ssl-images-amazon.com/images/I/91LxQ01hcLL.jpg",
      "width":"2560",
      "height":"1642",
      "origin":{
         "title":"Fables: The Wolf Among Us Vol. 1: Sturges, Matthew, Justus, Dave, McManus,  Shawn: 9781401256845: Amazon.com: Books",
         "website":"https://www.amazon.com/Fables-Wolf-Among-Us-Vol/dp/1401256848"
      }
   },
   {
      "url":"https://cdn.vox-cdn.com/thumbor/AMBox6ZhB1r3KtOscpicO9lD4Ww\\u003d/85x0:1014x619/2050x1367/cdn.vox-cdn.com/assets/3367723/BigbyCigaretteFable.jpg",
      "width":"1367",
      "height":"2050",
      "origin":{
         "title":"Can the developers of 'The Walking Dead' make a great crime drama? | The  Verge",
         "website":"https://www.theverge.com/2013/10/11/4825254/the-wolf-among-us-episode-one-review"
      }
   },
   {
      "url":"https://gearnuke.com/wp-content/uploads/2018/07/the-wolf-among-us-season-2-demo-images-1.jpg",
      "width":"1080",
      "height":"1920",
      "origin":{
         "title":"The Wolf Among Us Season 2 Early Screenshots Leaked (Update)",
         "website":"https://gearnuke.com/the-wolf-among-us-season-2-early-tech-demo-screenshots/"
      }
   }
]
```

</p>
</details>  

<details>
<summary>Reverse Image Search output</summary>
<p>

```js
[
   {
      "title":"Guess I'll Just Die | Meme Generator",
      "description":"401 × 401 · Oct 1, 2016 — Create your own images with the Guess I'll Just Die meme generator.",
      "url":"https://memegenerator.net/Guess-ILl-Just-Die"
   },
   {
      "title":"I Guess I Ll Just Die - Love Meme",
      "description":"401 × 401 · Apr 23, 2020 — 4 6k points 1 year ago. Upload your own image. Guess i ll die meme generator the fastest meme generator on the planet. A stock photo of a white ...",
      "url":"https://lovememepic.blogspot.com/2020/04/i-guess-i-ll-just-die.html"
   },
   {
      "title":"šarvátka pistole zarovnání ddlc guess i'll die Barma vědět bit",
      "description":"553 × 457 — šarvátka pistole zarovnání ddlc guess i'll die Barma vědět bit. ... Yandere-DDLC-RP blaze the blaziken Memes & GIFs - Imgflip ...",
      "url":"https://www.theweddingtraveler.com/ddlc-guess-i%27ll-die-k.html"
   },
   {
      "title":"Guess I'll Just Die - Caption | Meme Generator",
      "description":"401 × 401 — Bypass this CAPTCHA with a Meme Generator Premium account. Generate! Guess I'll Just Die.",
      "url":"https://memegenerator.net/Guess-ILl-Just-Die/caption"
   },
   {
      "title":"had a coughing fit - Guess Ill die | Meme Generator",
      "description":"401 × 401 — Guess Ill die. 0. comments. Comment. Report image. Note: Only personal attacks are removed, otherwise if it's just content you find offensive, ...",
      "url":"https://memegenerator.net/instance/71709681/guess-ill-die-had-a-coughing-fit"
   }
]
```

</p>
</details>  

## See Also

- [YouTube.js](https://github.com/LuanRT/YouTube.js): Full-featured wrapper around YouTube's private API.
- [PlaystoreScraper](https://github.com/luanrt/playstore-scraper): A simple module to get search results and app info from Google Play Store.

## Related Projects
- [GoogleThis by Tokipudi](https://github.com/Tokipudi/GoogleThis): A Discord bot meant to integrate features from this library.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)