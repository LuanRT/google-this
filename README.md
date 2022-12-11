<!-- BADGE LINKS -->
[npm]: https://www.npmjs.com/package/googlethis
[versions]: https://www.npmjs.com/package/googlethis?activeTab=versions
[codefactor]: https://www.codefactor.io/repository/github/luanrt/google-this
[actions]: https://github.com/LuanRT/google-this/actions
[say-thanks]: https://saythanks.io/to/LuanRT
[ko-fi]:https://ko-fi.com/luanrt
[ghsponsors]: https://github.com/sponsors/LuanRT

<!-- OTHER LINKS -->
[project]: https://github.com/LuanRT/google-this
[twitter]: https://twitter.com/lrt_nooneknows

<!-- INTRODUCTION -->
<h1 align="center">
  Google This
</h1>

<p align="center">A simple yet powerful module to retrieve organic search results and much more from Google.<p>

<!-- BADGES -->
<div align="center">
  
  [![Tests](https://github.com/LuanRT/google-this/actions/workflows/node.js.yml/badge.svg)][actions]
  [![Latest version](https://img.shields.io/npm/v/googlethis?color=%232)][versions]
  [![Codefactor](https://www.codefactor.io/repository/github/luanrt/google-this/badge)][codefactor]
  [![Monthly downloads](https://img.shields.io/npm/dm/googlethis?style=flat)][npm]
  [![Say thanks](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)][say-thanks] 
  <br>
  [![Donate](https://img.shields.io/badge/donate-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white)][ghsponsors]
 
</div>

<p align="center">
  <a href="#installation">Installation</a> -
  <a href="#usage">Getting Started</a> -
  <a href="#image-search">Image Search</a> -
  <a href="#related-projects">Related Projects</a> -
  <a href="#see-also">See Also</a>
</p>


## Installation

```bash
# NPM
npm install googlethis@latest

# Yarn
yarn add googlethis@latest

# Git 
npm install LuanRT:google-this
```

## Usage

```js
// const google = require('googlethis');
import google from 'googlethis';

const options = {
  page: 0, 
  safe: false, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed
  additional_params: { 
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: 'en' 
  }
}
  
const response = await google.search('TWDG', options);
console.log(response); 
```
<details>
<summary>Output</summary>
<p>

```js
{
  "results": [
    {
      "title": "The Walking Dead (video game) - Wikipedia",
      "description": "The Walking Dead is an episodic adventure video game developed and ...",
      "url": "https://en.m.wikipedia.org/wiki/The_Walking_Dead_(video_game)",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/en.m.wikipedia.org/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=en.m.wikipedia.org"
      }
    },
    {
      "title": "The Walking Dead (video game series) - Wikipedia",
      "description": "The Walking Dead is an episodic graphic adventure game series developed and published by Telltale Games and Skybound Games. It is based on the comic book ...",
      "url": "https://en.m.wikipedia.org/wiki/The_Walking_Dead_(video_game_series)",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/en.m.wikipedia.org/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=en.m.wikipedia.org"
      }
    },
    {
      "title": "The Walking Dead (Video Game)",
      "description": "The Walking Dead, also known as The Walking Dead: A Telltale Games ...",
      "url": "https://walkingdead.fandom.com/wiki/The_Walking_Dead_(Video_Game)",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/walkingdead.fandom.com/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=walkingdead.fandom.com"
      }
    },
    {
      "title": "The Walking Dead on Steam",
      "description": "Apr 24, 2012 — The Walking Dead is a five-part game series set in the ...",
      "url": "https://store.steampowered.com/app/207610/The_Walking_Dead/",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/store.steampowered.com/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=store.steampowered.com"
      }
    },
    {
      "title": "The Walking Dead: The Telltale Definitive Series on Steam",
      "description": "Oct 29, 2020 — The Walking Dead: The Telltale Definitive Series ...",
      "url": "https://store.steampowered.com/app/1449690/The_Walking_Dead_The_Telltale_Definitive_Series/",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/store.steampowered.com/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=store.steampowered.com"
      }
    },
    {
      "title": "The Walking Dead (Video Game 2012) - IMDb",
      "description": "The Walking Dead: Directed by Sean Ainsworth, Nick Herman, Dennis Lenart, Eric Parsons, Jake Rodkin, Sean Vanaman. With Dave Fennoy, Melissa Hutchison, ...",
      "url": "https://m.imdb.com/title/tt2006890/",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/m.imdb.com/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=m.imdb.com"
      }
    },
    {
      "title": "The Walking Dead: A New Frontier (Video Game 2016) - IMDb",
      "description": "The Walking Dead: A New Frontier: Directed by Rebekah Gamin, Jason Latino, Chris Rebbert, Jason Pyke. With Jeff Schine, ...",
      "url": "https://m.imdb.com/title/tt5785978/",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/m.imdb.com/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=m.imdb.com"
      }
    },
    {
      "title": "The Walking Dead (Telltale) (Video Game) - TV Tropes",
      "description": "The Walking Dead: The Game is an episodic series by Telltale Games that began in 2012. As in Jurassic Park: The Game, you guide your character in an ...",
      "url": "https://tvtropes.org/pmwiki/pmwiki.php/VideoGame/TheWalkingDead",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/tvtropes.org/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=tvtropes.org"
      }
    },
    {
      "title": "Assistir | The Walking Dead | Star+ - Star Plus",
      "description": "The Walking Dead. A série acompanha um grupo de sobreviventes durante um apocalipse zumbi. Às vezes, os conflitos interpessoais geram tanto perigo que ...",
      "url": "https://www.starplus.com/pt-br/series/the-walking-dead/6FPLfTcQrTpy",
      "is_sponsored": false,
      "favicons": {
        "high_res": "https://api.faviconkit.com/www.starplus.com/192",
        "low_res": "https://www.google.com/s2/favicons?sz=64&domain_url=www.starplus.com"
      }
    }
  ],
  "videos": [],
  "knowledge_panel": {
    "type": "Video game",
    "title": "The Walking Dead",
    "description": "The Walking Dead is an episodic adventure video game developed and published by Telltale Games. It is the first game in the series, which consists of 4 seasons and a spin-off game based on Michonne.",
    "url": "https://en.m.wikipedia.org/wiki/The_Walking_Dead_(video_game)",
    "metadata": [
      {
        "title": "Series",
        "value": "The Walking Dead"
      },
      {
        "title": "Developer",
        "value": "Telltale Games"
      },
      {
        "title": "Initial release date",
        "value": "2012"
      },
      {
        "title": "Platforms",
        "value": "Android, PlayStation 4, Xbox One, Nintendo Switch, Xbox 360, PlayStation 3, more"
      },
      {
        "title": "Genres",
        "value": "Interactive film, Graphic adventure game, Adventure"
      },
      {
        "title": "Composer",
        "value": "Jared Emerson-Johnson"
      },
      {
        "title": "Developer",
        "value": "Telltale Games"
      }
    ],
    "books": [],
    "tv_shows_and_movies": [],
    "ratings": [
      {
        "name": "Steam",
        "rating": "10/10"
      },
      {
        "name": "IMDb",
        "rating": "9.2/10"
      }
    ],
    "available_on": [],
    "images": [
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpoOQkbxKJEboeavLycSjFV5OfGEJaOUsEow&s",
        "source": "https://store.steampowered.com/app/261030/The_Walking_Dead_Season_Two/"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUtInvx4Jj5kTmXUCpJKiwsFwf8LdgzmFa3A&s",
        "source": "https://walkingdead.fandom.com/pt-br/wiki/The_Walking_Dead_(Videogame)"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmMl5yCFIryUsbYN2wt0wCnMVJXMSdjHVriw&s",
        "source": "https://play.google.com/store/apps/details?id=com.telltalegames.walkingdead300&hl=pt&gl=US"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuwJA94PfF_7Hvy-9OH3QuOYje1U-B4Cd8bg&s",
        "source": "https://store.steampowered.com/app/261030/The_Walking_Dead_Season_Two/"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4iHcqSh0pXQddH1EpJYfD7g6Qn69fd2M5g&s",
        "source": "https://walkingdead.fandom.com/pt-br/wiki/2%C2%AA_Temporada_(Videogame)"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6xUDRt1VU8nQnx2_mM7tESJ5CemDlf5LBA&s",
        "source": "https://store.steampowered.com/app/536220/The_Walking_Dead_A_New_Frontier/"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-tvBUafKU2LtipNbiQsnlzmTiTfwCh3aHcw&s",
        "source": "https://walkingdead.fandom.com/wiki/Season_3_(Video_Game)"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS36f_nMhFvGCOOG8L7bdv-oP2hDgjBQsEOuQ&s",
        "source": "https://store.steampowered.com/app/261030/The_Walking_Dead_Season_Two/"
      }
    ],
    "songs": [],
    "demonstration": null,
    "lyrics": null
  },
  "featured_snippet": {
    "title": null,
    "description": null,
    "url": null
  },
  "did_you_mean": null,
  "weather": {
    "location": null,
    "forecast": null,
    "precipitation": null,
    "humidity": null,
    "temperature": null,
    "wind": null
  },
  "time": {
    "hours": null,
    "date": null
  },
  "location": {
    "title": null,
    "distance": null,
    "map": null
  },
  "dictionary": {
    "word": null,
    "phonetic": null,
    "audio": null,
    "definitions": [],
    "examples": []
  },
  "translation": {
    "source_language": null,
    "target_language": null,
    "source_text": null,
    "target_text": null
  },
  "top_stories": [],
  "unit_converter": {},
  "people_also_ask": [
    "the walking dead: the final season",
    "The Walking Dead game Season 4",
    "Twdg characters",
    "The Walking Dead game Season 5",
    "The Walking Dead game download",
    "The Walking Dead Game wiki",
    "The Walking Dead: 400 Days",
    "the walking dead: the telltale definitive series",
    "The Walking Dead: Michonne",
    "The Walking Dead game PC",
    "the walking dead: a new frontier",
    "The Walking Dead Telltale",
    "the walking dead: season two",
    "How long does it take to play TWDG?",
    "What genre is TWDG?",
    "Is there going to be a season 5 of TWDG?",
    "How long is TWDG Season 2?",
    "twdg clementine",
    "the walking dead: the final season",
    "twdg characters",
    "the walking dead game season 4",
    "the walking dead game wiki",
    "the walking dead game season 5",
    "the walking dead: the telltale definitive series",
    "the walking dead game download"
  ],
  "people_also_search": []
}
```

</p>
</details>  

## What else can it do?

As you can see, the library returns a lot of data.
Currently, it can retrieve and parse almost everything you can get from a google search! From knowledge graph and featured snippets to Google Dictionary, Google Translate, song lyrics and more.
All you have to do is search something along the lines of ```“define xyz”```, ```“translate x to y”``` or ```“xyz song lyrics”``` and their respective fields will appear in the response.

#### Examples:

> Knowledge Graph:

![Knowledge Graph](https://raw.githubusercontent.com/LuanRT/google-this/main/images/knowledge_panel.png "Google's Knowledge Graph")

Will look like:

```js
{
   //....
  "knowledge_panel": {
    "type": "English theoretical physicist",
    "title": "Stephen Hawking",
    "description": "Stephen William Hawking CH CBE FRS FRSA was an English theoretical physicist, cosmologist, and author who, at the time of his death, was director of research at the Centre for Theoretical Cosmology at the University of Cambridge.",
    "url": "https://en.m.wikipedia.org/wiki/Stephen_Hawking",
    "metadata": [
      {
        "title": "Born",
        "value": "January 8, 1942, Oxford, United Kingdom"
      },
      {
        "title": "Died",
        "value": "March 14, 2018, Cambridge, United Kingdom"
      },
      {
        "title": "Spouse",
        "value": "Jane Hawking (m. 1965–1995)"
      },
      {
        "title": "Children",
        "value": "Lucy Hawking, Robert Hawking, Timothy Hawking"
      },
      {
        "title": "Grandchild",
        "value": "William Smith"
      }
    ],
    "books": [
      {
        "title": "A Brief History of Time",
        "year": "1988"
      },
      {
        "title": "The Theory of Everything",
        "year": "2002"
      },
      {
        "title": "Brief Answers to the Big Questions",
        "year": "2018"
      },
      // ...
    ],
    "tv_shows_and_movies": [
      {
        "title": "The Big Bang Theory",
        "year": "2007 – 2019"
      },
      {
        "title": "Hawking",
        "year": "2013"
      },
      {
        "title": "Pope Francis: A Man of His Word",
        "year": "2018"
      },
      // ...
    ],
    "ratings": [],
    "available_on": [],
    "images": [
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxAnWUfynMEzPWZ6HW_dgPBrTofkvL0HxJhA&s",
        "source": "https://www.youtube.com/watch?v=uAs_QMIzGMY"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjge7YZaQDXprEsagPMmyKDeO75vpm4EHbsA&s",
        "source": "https://revistagalileu.globo.com/Ciencia/Espaco/noticia/2018/03/stephen-hawking-morre-aos-76-anos-conheca-seu-legado.html"
      },
      {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAWF8OW59cueqlC1QECwrr5Eds5vrAPIQBsA&s",
        "source": "https://www.tecmundo.com.br/ciencia/235370-stephen-hawking-veja-5-livros-conhecer-obra-cientista.htm"
      },
      // ...
    ],
    "songs": [],
    "demonstration": null,
    "lyrics": null
  }
}
```

>   Google Translate:

![Google Translate](https://raw.githubusercontent.com/LuanRT/google-this/main/images/google_translator.png "Google Translator")

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

The library also supports image search & reverse image search.

Check it out:

 ```js
// const google = require('googlethis');
import google from 'googlethis';

// Image Search
const images = await google.image('The Wolf Among Us', { safe: false });
console.log(images); 
  
// Reverse Image Search
const my_awesome_image = fs.readFileSync('./wow.png');
const reverse = await google.search(my_awesome_image, { ris: true });

console.log(reverse.results);
```
 
<details>
<summary>Image Search output</summary>
<p>

```js
[
    {
        "id": "RaYA496bczTp6M",
        "url": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/795df35c-c17f-4e38-9160-51e9a3494f38/dbb10vn-71d66d22-6f59-42ad-96dc-128f0996b950.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc5NWRmMzVjLWMxN2YtNGUzOC05MTYwLTUxZTlhMzQ5NGYzOFwvZGJiMTB2bi03MWQ2NmQyMi02ZjU5LTQyYWQtOTZkYy0xMjhmMDk5NmI5NTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ZdUDJS25Y49UgSv7wtMXN-vTxKuIVsJ5HUYZo6Ljqr0",
        "width": 2150,
        "height": 3940,
        "color": "rgb(73,76,73)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqelQRD4LqgmfqqU5V5zPWCPGv9GjI_w9t0Q&usqp=CAU",
            "width": 166,
            "height": 304
        },
        "origin": {
            "title": "The Wolf Among Us Pt 1 by AKandrov on ...",
            "website": {
                "name": "deviantart.com",
                "domain": "DeviantArt",
                "url": "https://www.deviantart.com/akandrov/art/The-Wolf-Among-Us-Pt-1-683651507"
            }
        }
    },
    {
        "id": "ZMRrXBmgIPw3xM",
        "url": "http://pa1.narvii.com/6658/52042e4e389c00e13c5d273e17b9f2cb7f76b9f6_00.gif",
        "width": 268,
        "height": 250,
        "color": "rgb(40,11,21)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYGKlj2nDdCAG-SbqynhdJFCIXcRCoNATpaw&usqp=CAU",
            "width": 232,
            "height": 217
        },
        "origin": {
            "title": "The Wolf Among Us | Wiki | Comics ...",
            "website": {
                "name": "aminoapps.com",
                "domain": "Amino Apps",
                "url": "https://aminoapps.com/c/comics-portugues/page/item/the-wolf-among-us/XBjE_bYhXIgr4kGYeovbP8LWzlm7Ml7744"
            }
        }
    },
    {
        "id": "1i3FRFkTfXw2BM",
        "url": "https://carrefourbr.vtexassets.com/arquivos/ids/6894399/MP24044565_USADO---Jogo-The-Wolf-Among-Us---PS3_3_Zoom.jpg?v=637347472989800000",
        "width": 675,
        "height": 1200,
        "color": "rgb(184,101,62)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_wOe5XVqNhlvYNDunRaSsuAlNYpyIcS85ug&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "USADO - Jogo The Wolf Among Us - PS3 ...",
            "website": {
                "name": "carrefour.com.br",
                "domain": "Carrefour",
                "url": "https://www.carrefour.com.br/usado-jogo-the-wolf-among-us-ps3-mp24044565/p"
            }
        }
    },
    {
        "id": "VVCZkdYuXwhE5M",
        "url": "https://assets.reedpopcdn.com/139712617579.jpg/BROK/thumbnail/1600x900/quality/100/139712617579.jpg",
        "width": 900,
        "height": 1600,
        "color": "rgb(176,163,118)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBUbo6GzRbc-bzhcb-N5vJ9TMv7QHM6-lEEw&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us: Episódio 3 - Análise ...",
            "website": {
                "name": "eurogamer.pt",
                "domain": "Eurogamer",
                "url": "https://www.eurogamer.pt/the-wolf-among-us-episodio-3-analise"
            }
        }
    },
    {
        "id": "QP-XbgcQYtezVM",
        "url": "https://i.pinimg.com/736x/94/2e/d4/942ed4115f3fff0f88e3c233c6d2971f--the-wolf-among-us-awesome-games.jpg",
        "width": 923,
        "height": 600,
        "color": "rgb(34,14,40)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg3XRvIV0JKQkosvb00DddfhcJPUY5lTLDdA&usqp=CAU",
            "width": 279,
            "height": 181
        },
        "origin": {
            "title": "Wolf, Medieval artwork",
            "website": {
                "name": "pinterest.com",
                "domain": "Pinterest",
                "url": "https://www.pinterest.com/pin/405605510170657610/"
            }
        }
    },
    {
        "id": "so6UHD6nHz4GCM",
        "url": "https://xboxpower-wp.s3.amazonaws.com/wp-content/uploads/2019/12/The-Wolf-Amoung-Us-2-1.jpg",
        "width": 516,
        "height": 1078,
        "color": "rgb(45,51,96)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRR-i6SN3w0kUq1aZVCKqnvQ3ZpEU9njGudQ&usqp=CAU",
            "width": 155,
            "height": 325
        },
        "origin": {
            "title": "The Wolf Among Us 2 recebe trailer e ...",
            "website": {
                "name": "xboxpower.com.br",
                "domain": "Xbox Power",
                "url": "https://www.xboxpower.com.br/2019/12/13/the-wolf-among-us-2-recebe-trailer-e-direciona-sua-historia/"
            }
        }
    },
    {
        "id": "B3qvwLBWJ3E-nM",
        "url": "https://i.imgur.com/ppDYTpT.png",
        "width": 801,
        "height": 1362,
        "color": "rgb(46,59,104)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS33zv0iMvlqhgTUnhLocKoalB760hwqFcS0A&usqp=CAU",
            "width": 172,
            "height": 293
        },
        "origin": {
            "title": "The Wolf Among Us 2 ...",
            "website": {
                "name": "psxbrasil.com.br",
                "domain": "PSX Brasil",
                "url": "https://psxbrasil.com.br/veja-alguns-novos-detalhes-de-the-wolf-among-us-2-e-da-telltale-games/"
            }
        }
    },
    {
        "id": "IfxUsjTzQu4CUM",
        "url": "https://img.ibxk.com.br/2019/12/17/17131723655126.jpg?ims=328x",
        "width": 405,
        "height": 720,
        "color": "rgb(16,10,3)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVq8jcU8_pA6C2RgkaNQeuTyy3bRmBM0wntQ&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us 2: produção foi ...",
            "website": {
                "name": "tecmundo.com.br",
                "domain": "TecMundo",
                "url": "https://www.tecmundo.com.br/voxel/185592-the-wolf-among-us-2-producao-reiniciada-telltale.htm"
            }
        }
    },
    {
        "id": "6VQl0iJHvRpS2M",
        "url": "https://gamespot.com/a/uploads/screen_small/1365/13658182/2515855-trailer_wolfamongusep3_20140424.jpg",
        "width": 180,
        "height": 320,
        "color": "rgb(120,82,120)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfg4EnWqjdoUkRlEQvQko3KUXtiHmmjtWTg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us for PC Reviews ...",
            "website": {
                "name": "metacritic.com",
                "domain": "Metacritic",
                "url": "https://www.metacritic.com/game/pc/the-wolf-among-us"
            }
        }
    },
    {
        "id": "dTmFJS2eXxqDmM",
        "url": "https://media.telltale.com/content/2022/03/04211121/TWAU-Phone-wallpaper.png",
        "width": 2532,
        "height": 1170,
        "color": "rgb(37,24,88)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfXm6s3-OuG1Z_4GObdOhbQruM7JZkiTHyTA&usqp=CAU",
            "width": 330,
            "height": 152
        },
        "origin": {
            "title": "Telltale Games (@telltalegames) / Twitter",
            "website": {
                "name": "mobile.twitter.com",
                "domain": "Twitter",
                "url": "https://mobile.twitter.com/telltalegames"
            }
        }
    },
    {
        "id": "roLCz0mkx0HjqM",
        "url": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/795df35c-c17f-4e38-9160-51e9a3494f38/dbb10zi-82837405-2f27-4ec6-932a-b78f13457ff4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc5NWRmMzVjLWMxN2YtNGUzOC05MTYwLTUxZTlhMzQ5NGYzOFwvZGJiMTB6aS04MjgzNzQwNS0yZjI3LTRlYzYtOTMyYS1iNzhmMTM0NTdmZjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uq7zUDXlyTpSl-veRXBKrn_IcXCO-RAQlKsr0chcxn8",
        "width": 2180,
        "height": 3957,
        "color": "rgb(72,72,72)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKCirp-y3HTI4DQtTStXWZjc-fYcjAxfwrpg&usqp=CAU",
            "width": 167,
            "height": 303
        },
        "origin": {
            "title": "The Wolf Among Us Pt 2 by AKandrov on ...",
            "website": {
                "name": "deviantart.com",
                "domain": "DeviantArt",
                "url": "https://www.deviantart.com/akandrov/art/The-Wolf-Among-Us-Pt-2-683651646"
            }
        }
    },
    {
        "id": "71OzNw7tAnpR8M",
        "url": "https://http2.mlstatic.com/D_NQ_NP_839808-MLB45297339218_032021-O.jpg",
        "width": 317,
        "height": 500,
        "color": "rgb(128,118,96)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl9l3zTuwStL1GrVmJSdFwW-4Dlrlxhwmb-Q&usqp=CAU",
            "width": 179,
            "height": 282
        },
        "origin": {
            "title": "Jogo The Wolf Among Us - Xbox One ...",
            "website": {
                "name": "produto.mercadolivre.com.br",
                "domain": "Mercado Livre",
                "url": "https://produto.mercadolivre.com.br/MLB-1831307478-jogo-the-wolf-among-us-xbox-one-usado-_JM"
            }
        }
    },
    {
        "id": "tXxu19vv7pzv2M",
        "url": "https://meuxbox.com.br/wp-content/uploads/2020/11/The-Wolf-Among-Us.jpg",
        "width": 683,
        "height": 1300,
        "color": "rgb(64,51,32)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2DWQ1w04ELWGm0hxdCcdtdcpFdrviX1ItA&usqp=CAU",
            "width": 163,
            "height": 310
        },
        "origin": {
            "title": "Telltale Games pode divulgar a data de ...",
            "website": {
                "name": "meuxbox.com.br",
                "domain": "Meu Xbox",
                "url": "https://meuxbox.com.br/noticias/telltale-games-pode-divulgar-a-data-de-lancamento-de-the-wolf-among-us/"
            }
        }
    },
    {
        "id": "YX6eUwjd2EEusM",
        "url": "https://psverso.com.br/wp-content/uploads/2022/02/The-Wolf-Among-Us-2-A-Telltale-Series-transmissao-bastidores-9-fevereiro.jpg",
        "width": 405,
        "height": 720,
        "color": "rgb(96,32,58)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9U1efFHGfbsZ_FYKTHkFJyPO8o0UvR_YsLA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us 2: A Telltale Series ...",
            "website": {
                "name": "psverso.com.br",
                "domain": "PS Verso",
                "url": "https://psverso.com.br/noticias/the-wolf-among-us-2-a-telltale-series-transmissao-bastidores-9-fevereiro/"
            }
        }
    },
    {
        "id": "A13tuQj9Sumt8M",
        "url": "https://store-images.s-microsoft.com/image/apps.4947.13510798887517413.3f777ecf-4365-41f3-ade0-eeacad114b0b.d3c682ef-73da-4f2d-8b53-7bb27a51c48b?w=672&h=378&q=80&mode=letterbox&background=#FFE4E4E4&format=jpg",
        "width": 378,
        "height": 672,
        "color": "rgb(50,46,120)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLh-TgeZNoC_SRnDDtQGOpw0wLfolbbiTLQ&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "Comprar The Wolf Among Us - A Telltale ...",
            "website": {
                "name": "microsoft.com",
                "domain": "Microsoft",
                "url": "https://www.microsoft.com/pt-br/p/the-wolf-among-us-a-telltale-games-series/9nblggh4w0td"
            }
        }
    },
    {
        "id": "Y21EUabaALGAVM",
        "url": "https://sportshub.cbsistatic.com/i/2022/03/24/f35f5c10-d283-4ac7-ac65-cbe7466026a2/the-wolf-among-us-2-edit.png",
        "width": 675,
        "height": 1200,
        "color": "rgb(98,91,136)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvyyF6W_Ux5As_v1KaXRVDX_4OapFqYJc8dA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us 2 Developer Teases ...",
            "website": {
                "name": "comicbook.com",
                "domain": "ComicBook.com",
                "url": "https://comicbook.com/gaming/news/the-wolf-among-us-2-episode-one-release-tease/"
            }
        }
    },
    {
        "id": "CZMongIm-tXY_M",
        "url": "https://static.wikia.nocookie.net/fables/images/d/de/FablesTWAU32.jpg/revision/latest/top-crop/width/360/height/450?cb=20150702053358",
        "width": 450,
        "height": 360,
        "color": "rgb(40,21,27)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKwyls7fR55QfxdBgPctWFg5ld1Qr2-kRlBQ&usqp=CAU",
            "width": 251,
            "height": 201
        },
        "origin": {
            "title": "Wolf Among Us 32 | Fables Wiki | Fandom",
            "website": {
                "name": "fables.fandom.com",
                "domain": "Fables Wiki - Fandom",
                "url": "https://fables.fandom.com/wiki/Fables:_The_Wolf_Among_Us_32"
            }
        }
    },
    {
        "id": "kVaDSSrS0GDprM",
        "url": "https://cf.shopee.com.br/file/6da3ece9ac1bed7a9f058e813cdb5a21",
        "width": 800,
        "height": 800,
        "color": "rgb(200,158,98)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl9-QzRfaPOeO7OoRGiSXFRWOuJIv-TMoI0g&usqp=CAU",
            "width": 225,
            "height": 225
        },
        "origin": {
            "title": "The Wolf Among Us (NOVO e LACRADO ...",
            "website": {
                "name": "shopee.com.br",
                "domain": "Shopee",
                "url": "https://shopee.com.br/The-Wolf-Among-Us-%28NOVO-e-LACRADO%29--Jogo-Original-para-Playstation-4--PS4-i.426438664.3085523666"
            }
        }
    },
    {
        "id": "yt5--7TyTB1NyM",
        "url": "https://fextralife.com/wp-content/uploads/2022/02/The-Wolf-Among-Us-2-Reveal-Event-February-9th-750x422.jpg",
        "width": 422,
        "height": 750,
        "color": "rgb(27,18,40)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUYKErYNHjNpkfbIxITvkb9NU5vSRkiTJaQ&usqp=CAU",
            "width": 168,
            "height": 299
        },
        "origin": {
            "title": "The Wolf Among Us 2 Reveal Event is ...",
            "website": {
                "name": "fextralife.com",
                "domain": "Fextralife",
                "url": "https://fextralife.com/the-wolf-among-us-2-reveal-event-is-happening-february-9th/"
            }
        }
    },
    {
        "id": "uHGk3NGyTEWAWM",
        "url": "https://pbs.twimg.com/media/BrYiHezIUAASKyQ?format=jpg&name=small",
        "width": 383,
        "height": 680,
        "color": "rgb(18,60,50)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPTlvZfGDtWuQAcfNnV4NPPh-FeiUwgLPFQ&usqp=CAU",
            "width": 168,
            "height": 299
        },
        "origin": {
            "title": "Último episódio do jogo 'Wolf Among Us ...",
            "website": {
                "name": "purebreak.com.br",
                "domain": "Purebreak",
                "url": "https://www.purebreak.com.br/noticias/ultimo-episodio-do-jogo-wolf-among-us-chega-no-final-do-ano/5755"
            }
        }
    },
    {
        "id": "qdJETpwbE5NjFM",
        "url": "https://i.pinimg.com/originals/17/39/37/1739371a50d4888005a76dd5ed5c156e.jpg",
        "width": 752,
        "height": 1024,
        "color": "rgb(83,96,224)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxYKMSnZ_W9Ydp4rR00UmdH4QfVrWLzeJhw&usqp=CAU",
            "width": 192,
            "height": 262
        },
        "origin": {
            "title": "The Wolf Among Us | The wolf among us ...",
            "website": {
                "name": "pinterest.com",
                "domain": "Pinterest",
                "url": "https://www.pinterest.com/pin/472033604674154327/"
            }
        }
    },
    {
        "id": "S0nOGmlMDHnhZM",
        "url": "https://c.tenor.com/PY5nRhnK5AEAAAAC/the-wolf-among-us-kotektoad.gif",
        "width": 294,
        "height": 498,
        "color": "rgb(208,128,176)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Wf3gWooA-SuPS3CCOyS3BIOtD7HacrywhA&usqp=CAU",
            "width": 172,
            "height": 292
        },
        "origin": {
            "title": "The Wolf Among Us Kotektoad GIF - The ...",
            "website": {
                "name": "tenor.com",
                "domain": "Tenor",
                "url": "https://tenor.com/view/the-wolf-among-us-kotektoad-twau-gif-23033885"
            }
        }
    },
    {
        "id": "HJ_6FkYUqSgItM",
        "url": "https://seugame.com/wp-content/uploads/2018/02/Fables-de-The-Wolf-Among-Us.jpg?ezimgfmt=rs:372x209/rscb1/ng:webp/ngcb1",
        "width": 209,
        "height": 372,
        "color": "rgb(8,8,2)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMjBS1MLCg4e8apisF86jyMdyMdn-GmDRDNg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "Análise de The Wolf Among Us e palpites ...",
            "website": {
                "name": "seugame.com",
                "domain": "Seu Game",
                "url": "https://seugame.com/analise-the-wolf-among-us/"
            }
        }
    },
    {
        "id": "srOont-Jj1BL9M",
        "url": "https://www.arenaxbox.com.br/wp-content/uploads/2022/02/The-Wolf-Among-Us-2-Scarecrow-Wizard-of-Oz-1024x512.jpg",
        "width": 512,
        "height": 1024,
        "color": "rgb(81,84,81)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaHqMfk0vj5m4OMXCBTUbrSmZg8m8nx3pYBA&usqp=CAU",
            "width": 159,
            "height": 318
        },
        "origin": {
            "title": "The Wolf Among Us 2 é anunciado ...",
            "website": {
                "name": "arenaxbox.com.br",
                "domain": "Arena Xbox",
                "url": "https://www.arenaxbox.com.br/the-wolf-among-us-2-e-anunciado"
            }
        }
    },
    {
        "id": "2eOw4exio8EnoM",
        "url": "http://siggrapharts.hosting.acm.org/gas/wp-content/uploads/photo-gallery/TWA_screenshot_toadsapttoadandjr-new.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(240,237,202)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnVlCTHRLLubqjOznDJcUjZs5g8inLBzOfOA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us | The Aesthetics of ...",
            "website": {
                "name": "gameartshow.siggraph.org",
                "domain": "The Aesthetics of Gameplay",
                "url": "http://gameartshow.siggraph.org/gas/wolf-among-us/"
            }
        }
    },
    {
        "id": "gu-k6epVUWqcOM",
        "url": "https://static.gamespot.com/uploads/original/416/4161502/2499504-wolf among us - wolf among us - 2014-04-04 01-40-52 (p)07.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(120,82,43)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv-ANFZOKjJc55JZRI81r7lD7lc6TT4Wds1A&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us: Episode 3 - A ...",
            "website": {
                "name": "gamespot.com",
                "domain": "GameSpot",
                "url": "https://www.gamespot.com/reviews/the-wolf-among-us-episode-3-a-crooked-mile-review/1900-6415724/"
            }
        }
    },
    {
        "id": "ZPS80vIKfLxXkM",
        "url": "https://r7k2t3x9.rocketcdn.me/wp-content/uploads/2021/01/img-51271.jpg",
        "width": 400,
        "height": 650,
        "color": "rgb(8,8,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR55tFMSDeN5JAMQSmfFMFGYhIYImxNr-xpvg&usqp=CAU",
            "width": 176,
            "height": 286
        },
        "origin": {
            "title": "The Wolf Among Us: Episodes 1 \\u0026 2 ...",
            "website": {
                "name": "popmatters.com",
                "domain": "PopMatters",
                "url": "https://www.popmatters.com/179342-the-wolf-among-us-episodes-1-2-2495685491.html"
            }
        }
    },
    {
        "id": "hC0eYVjDAh3BkM",
        "url": "https://img.game-news24.com/2022/02/Telltale-reveals-the-Wolf-Among-Us-2-for-2023.jpeg",
        "width": 647,
        "height": 1200,
        "color": "rgb(10,6,16)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFvbOrmhugiwA0vtzPsz0T-hZhghfujo0sCw&usqp=CAU",
            "width": 165,
            "height": 306
        },
        "origin": {
            "title": "Telltale reveals the Wolf Among Us 2 ...",
            "website": {
                "name": "game-news24.com",
                "domain": "Game News 24",
                "url": "https://game-news24.com/2022/02/09/telltale-reveals-the-wolf-among-us-2-for-2023/"
            }
        }
    },
    {
        "id": "HTaruIS64SrSHM",
        "url": "https://i.pinimg.com/originals/e2/da/88/e2da88e3563ed555718d0da5337a3e19.png",
        "width": 1330,
        "height": 861,
        "color": "rgb(102,125,224)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOxlMa9KIKeb5C8pvdOF6zHEas31dVmuSfug&usqp=CAU",
            "width": 279,
            "height": 181
        },
        "origin": {
            "title": "The wolf among us, Wolf, Fables comic",
            "website": {
                "name": "pinterest.com",
                "domain": "Pinterest",
                "url": "https://www.pinterest.com/pin/514888169883397024/"
            }
        }
    },
    {
        "id": "ZlBvMUjnzfeNcM",
        "url": "https://static.gamevicio.com/imagens_itens/big/11/the-wolf-among-us-episode-1-faith-cover-010047.webp",
        "width": 352,
        "height": 264,
        "color": "rgb(40,14,14)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoRvtxQIabwbDBQwdrjj4oblGx33ppQBoZhA&usqp=CAU",
            "width": 259,
            "height": 194
        },
        "origin": {
            "title": "Jogos da franquia The Wolf Among Us",
            "website": {
                "name": "gamevicio.com",
                "domain": "GameVicio",
                "url": "https://www.gamevicio.com/jogos-da-serie-the-wolf-among-us/"
            }
        }
    },
    {
        "id": "IJAov6dWtM0atM",
        "url": "https://m.media-amazon.com/images/M/MV5BNzhlYjc0M2EtY2EwZi00NDRjLWEzNmQtNWUxYTYwNjE4MzY0XkEyXkFqcGdeQXVyNzgxMzM5MDY@._V1_.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(106,134,176)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNLkUeOQHr7PA3JZ1VbqQNBzV_Astok1e5w&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us (Video Game 2013) - IMDb",
            "website": {
                "name": "imdb.com",
                "domain": "IMDb",
                "url": "https://www.imdb.com/title/tt3186880/"
            }
        }
    },
    {
        "id": "NzWichyk3SBVwM",
        "url": "https://http2.mlstatic.com/D_NQ_NP_921646-MLB30949079507_062019-O.jpg",
        "width": 280,
        "height": 500,
        "color": "rgb(67,80,48)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEIh1eGr_qf1I1LmMhCArOnt-Xfdz5LyYEw&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "Jogo Novo Lacrado The Wolf Among Us ...",
            "website": {
                "name": "produto.mercadolivre.com.br",
                "domain": "Mercado Livre",
                "url": "https://produto.mercadolivre.com.br/MLB-1243194809-jogo-novo-lacrado-the-wolf-among-us-para-xbox-one-_JM"
            }
        }
    },
    {
        "id": "KsCrcMh0_uG2JM",
        "url": "https://twinfinite.net/wp-content/uploads/2022/02/Wolf-Among-Us-Toad.jpg",
        "width": 720,
        "height": 1280,
        "color": "rgb(128,118,77)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17rcjpg69djCYHCaoQuzeZFuY1WF9p9DUTw&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us ...",
            "website": {
                "name": "twinfinite.net",
                "domain": "Twinfinite",
                "url": "https://twinfinite.net/2022/02/things-we-cant-wait-to-see-in-the-wolf-among-us-2/"
            }
        }
    },
    {
        "id": "_AxHT-Q0PWtjHM",
        "url": "https://images-americanas.b2w.io/produtos/4681191999/imagens/the-wolf-among-us-xbox-360/4681191999_1_xlarge.jpg",
        "width": 1000,
        "height": 1000,
        "color": "rgb(32,16,19)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPs88xCMXDHqvL3mp8ekAAxqc3sM6NgYSk6Q&usqp=CAU",
            "width": 225,
            "height": 225
        },
        "origin": {
            "title": "The Wolf Among Us Xbox 360 em Promoção ...",
            "website": {
                "name": "americanas.com.br",
                "domain": "Americanas",
                "url": "https://www.americanas.com.br/produto/4681191999/the-wolf-among-us-xbox-360"
            }
        }
    },
    {
        "id": "ql5iFrkUR3M3LM",
        "url": "https://gamespot.com/a/uploads/screen_small/1352/13527689/2309129-the_wolf_among_us_launch_100813.jpg",
        "width": 180,
        "height": 320,
        "color": "rgb(72,46,34)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPo6Zh_tPDdUZf74LSifMVFtTd8-ytFq9vgg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us for PC Reviews ...",
            "website": {
                "name": "metacritic.com",
                "domain": "Metacritic",
                "url": "https://www.metacritic.com/game/pc/the-wolf-among-us"
            }
        }
    },
    {
        "id": "0zPYCTE5X-pk6M",
        "url": "https://cdna.artstation.com/p/assets/covers/images/013/022/980/large/gray-rogers-wolf-projectthumbnail.jpg?1537708652",
        "width": 1035,
        "height": 1035,
        "color": "rgb(144,58,93)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG-3NO2VoTt8Su5LEJJD2bSlaexCdWIYvzSg&usqp=CAU",
            "width": 225,
            "height": 225
        },
        "origin": {
            "title": "The Wolf Among Us - Concept Art",
            "website": {
                "name": "artstation.com",
                "domain": "ArtStation",
                "url": "https://www.artstation.com/artwork/N9v45"
            }
        }
    },
    {
        "id": "t3mivlvGr7jguM",
        "url": "https://images4.alphacoders.com/123/1234722.jpg",
        "width": 1452,
        "height": 2364,
        "color": "rgb(26,13,32)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5QEcgsTv5FKHt0ged3NkBWhOCDtCKGJiCcA&usqp=CAU",
            "width": 176,
            "height": 287
        },
        "origin": {
            "title": "10+ The Wolf Among Us HD Wallpapers and ...",
            "website": {
                "name": "wall.alphacoders.com",
                "domain": "Wallpaper Abyss - Alpha Coders",
                "url": "https://wall.alphacoders.com/by_sub_category.php?id\\u003d206677\\u0026name\\u003dThe+Wolf+Among+Us+Wallpapers"
            }
        }
    },
    {
        "id": "LTHrIhSn89QgYM",
        "url": "https://www.thexboxhub.com/wp-content/uploads/2014/04/ep_3_final_art.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(80,45,29)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Caj0v-eT60MAOX7svQalQsR5tHkICGiKGA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us Episode 3 gets a ...",
            "website": {
                "name": "thexboxhub.com",
                "domain": "TheXboxHub",
                "url": "https://www.thexboxhub.com/the-wolf-among-us-episode-3-gets-a-release-date/"
            }
        }
    },
    {
        "id": "xwusJbPD6o4zYM",
        "url": "https://www.previewsworld.com/SiteImage/MainImage/STK683119.jpg",
        "width": 1816,
        "height": 1200,
        "color": "rgb(17,20,17)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCJIN7y7XdWaN7M-ZIy_6NUdyH5Sdyg3nuPQ&usqp=CAU",
            "width": 276,
            "height": 182
        },
        "origin": {
            "title": "JUL150340 - FABLES THE WOLF AMONG US TP ...",
            "website": {
                "name": "previewsworld.com",
                "domain": "Previews World",
                "url": "https://www.previewsworld.com/Catalog/JUL150340"
            }
        }
    },
    {
        "id": "bwQUECMNJR18BM",
        "url": "https://img.utdstc.com/screen/9df/7f2/9df7f2854009476c47c843f9d4588f3ec8776f23cefa6b052b5e2b4bfe302336:200",
        "width": 200,
        "height": 321,
        "color": "rgb(8,5,2)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVFkJVDBBLgVpBtPqb5Qh2Kn3xMgSTx9iUA&usqp=CAU",
            "width": 177,
            "height": 285
        },
        "origin": {
            "title": "The Wolf Among Us para Android - Baixe ...",
            "website": {
                "name": "the-wolf-among-us.br.uptodown.com",
                "domain": "The Wolf Among Us",
                "url": "https://the-wolf-among-us.br.uptodown.com/android"
            }
        }
    },
    {
        "id": "jO57Pzst8Zs8ZM",
        "url": "https://static.gamevicio.com/imagens_up/big/65/the-wolf-among-us-2-recebeu-novos-detalhes-sequencia-se-passa-seis-meses-apos-o-primeiro-jogo-064698.webp",
        "width": 400,
        "height": 1350,
        "color": "rgb(2,12,2)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUm-LVmoo5PC6xJvOT1G0_XEdxPRT_fxQKjg&usqp=CAU",
            "width": 122,
            "height": 413
        },
        "origin": {
            "title": "The Wolf Among Us 2 recebeu novos ...",
            "website": {
                "name": "gamevicio.com",
                "domain": "GameVicio",
                "url": "https://www.gamevicio.com/noticias/2021/12/the-wolf-among-us-2-recebeu-novos-detalhes-sequencia-se-passa-seis-meses-apos-o-primeiro-jogo/"
            }
        }
    },
    {
        "id": "fyPbTU3BYWiJxM",
        "url": "https://imag.malavida.com/mvimgbig/download-fs/the-wolf-among-us-26771-3.jpg",
        "width": 1080,
        "height": 2340,
        "color": "rgb(3,16,16)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaVSV2F45ZEh0t5LwJWWjEtKyXs39Zc9zDQ&usqp=CAU",
            "width": 152,
            "height": 331
        },
        "origin": {
            "title": "The Wolf Among Us 1.23 - Baixar para ...",
            "website": {
                "name": "malavida.com",
                "domain": "Malavida",
                "url": "https://www.malavida.com/br/soft/the-wolf-among-us/android/"
            }
        }
    },
    {
        "id": "hMjgDACwRx0iaM",
        "url": "https://www.aroged.com/wp-content/uploads/2021/12/Concept-and-details-for-The-Wolf-Among-Us-2-full.jpg",
        "width": 787,
        "height": 1400,
        "color": "rgb(40,14,27)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH2eupbX22QbcR-5PFUuhCOlq4qAPScPE2mQ&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us ...",
            "website": {
                "name": "aroged.com",
                "domain": "Aroged",
                "url": "https://www.aroged.com/2021/12/23/concept-and-details-for-the-wolf-among-us-2-full-development-is-already-underway/"
            }
        }
    },
    {
        "id": "XH1vUKJmwpJS2M",
        "url": "https://twinfinite.net/wp-content/uploads/2022/02/Wolf-Among-Us-Nerissa.jpg",
        "width": 720,
        "height": 1280,
        "color": "rgb(240,240,182)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-_ZT1qJEOibUCUMOGlstrTdAQygVkZb7nUw&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us ...",
            "website": {
                "name": "twinfinite.net",
                "domain": "Twinfinite",
                "url": "https://twinfinite.net/2022/02/things-we-cant-wait-to-see-in-the-wolf-among-us-2/"
            }
        }
    },
    {
        "id": "8ErKzcLh-2kCDM",
        "url": "http://core0.staticworld.net/images/article/2014/07/wolf-among-us-9-100355781-orig.png",
        "width": 1080,
        "height": 1920,
        "color": "rgb(24,14,5)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0inV1XpZ_JxuoCnWaQrpgwEsrLm_8L8Y1Fg&usqp=CAU",
            "width": 1080,
            "height": 1920
        },
        "origin": {
            "title": "make 3d Character like _ The Wolf among ...",
            "website": {
                "name": "forum.unity.com",
                "domain": "Unity Forum",
                "url": "https://forum.unity.com/threads/make-3d-character-like-_-the-wolf-among-us.433046/"
            }
        }
    },
    {
        "id": "MbJLWLTqLGTjZM",
        "url": "https://seugame.com/wp-content/uploads/2018/02/Vivan-de-The-Wolf-Among-Us.jpg?ezimgfmt=rs:372x209/rscb1/ng:webp/ngcb1",
        "width": 209,
        "height": 372,
        "color": "rgb(8,2,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ySsA8lQbhan2jn-CMIOW3ooT5LF8BMrhwg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "Análise de The Wolf Among Us e palpites ...",
            "website": {
                "name": "seugame.com",
                "domain": "Seu Game",
                "url": "https://seugame.com/analise-the-wolf-among-us/"
            }
        }
    },
    {
        "id": "6XAEb_tfD34YPM",
        "url": "https://cdn.mos.cms.futurecdn.net/9oeUXMvvrzJF3Vbc3gAyC8.png",
        "width": 1440,
        "height": 2560,
        "color": "rgb(104,40,21)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJzKMeLJIqj_zxsrG9M-IzTZ-AOa7XvZlEg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us 2 debuts first ...",
            "website": {
                "name": "gamesradar.com",
                "domain": "GamesRadar",
                "url": "https://www.gamesradar.com/the-wolf-among-us-2-debuts-first-trailer-and-2023-release-window/"
            }
        }
    },
    {
        "id": "rxu3oh7PEKsX3M",
        "url": "https://image.api.playstation.com/cdn/UP2026/CUSA01018_00/FREE_CONTENTeFY1LTyt80QDCtBmYSp6/PREVIEW_SCREENSHOT1_65584.jpg",
        "width": 720,
        "height": 1280,
        "color": "rgb(184,110,56)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWKCSG2pKTlxSXjgf5gkkLPTbraH_KvIioUg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us on PS4 — price ...",
            "website": {
                "name": "psprices.com",
                "domain": "PSPrices",
                "url": "https://psprices.com/region-br/game/53287/the-wolf-among-us"
            }
        }
    },
    {
        "id": "6OJz64XkzL3TUM",
        "url": "http://www.arkade.com.br/wp-content/uploads/2013/11/The-Wolf-Among-Us-Launch-Trailer_61-645x362.jpg",
        "width": 362,
        "height": 645,
        "color": "rgb(2,5,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl7a0zH1Gy_9cpEkdA5UGMdJcbDfKv9zZ-mg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "Análise Arkade - The Wolf Among Us Ep ...",
            "website": {
                "name": "arkade.com.br",
                "domain": "Arkade",
                "url": "https://www.arkade.com.br/analise-arkade-the-wolf-among-us-ep-1-faith/"
            }
        }
    },
    {
        "id": "LHGDxV7VTa29zM",
        "url": "https://gamespot.com/a/uploads/screen_small/536/5360430/2683890-trailer_wau_retail_20141008.jpg",
        "width": 180,
        "height": 320,
        "color": "rgb(192,186,160)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZgR-vRSbaUlnJAyriIrjuWCri7Wz6HQ_Cg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us for PC Reviews ...",
            "website": {
                "name": "metacritic.com",
                "domain": "Metacritic",
                "url": "https://www.metacritic.com/game/pc/the-wolf-among-us"
            }
        }
    },
    {
        "id": "X6-ZNGrmN86asM",
        "url": "https://i.exophase.com/psn/games/l/eej66.png?1604738371",
        "width": 158,
        "height": 288,
        "color": "rgb(32,10,6)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaTyXA3HyFP2RijNXLx3N1MqhOOVxDpyi77Q&usqp=CAU",
            "width": 158,
            "height": 288
        },
        "origin": {
            "title": "The Wolf Among Us Trophies - PS4 ...",
            "website": {
                "name": "exophase.com",
                "domain": "Exophase.com",
                "url": "https://www.exophase.com/game/the-wolf-among-us-ps4/trophies/"
            }
        }
    },
    {
        "id": "xL7ChUXN6H2qiM",
        "url": "https://steamuserimages-a.akamaihd.net/ugc/951838282202612827/0D40C7DDB13A0602943F1A16D4490F54115613D8/",
        "width": 1050,
        "height": 761,
        "color": "rgb(88,40,37)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiudmOrB_u1ua4CV6Iwy_XWTBtb9cWBKlQ3A&usqp=CAU",
            "width": 264,
            "height": 191
        },
        "origin": {
            "title": "Steam Community :: The Wolf Among Us",
            "website": {
                "name": "steamcommunity.com",
                "domain": "Steam Community",
                "url": "https://steamcommunity.com/app/250320"
            }
        }
    },
    {
        "id": "jCyjVJOr_JRBRM",
        "url": "https://assets.reedpopcdn.com/the-wolf-among-us-cry-wolf-review-1405072163604.jpg/BROK/thumbnail/1200x900/quality/100/the-wolf-among-us-cry-wolf-review-1405072163604.jpg",
        "width": 900,
        "height": 1200,
        "color": "rgb(8,5,2)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ14mSE7FOC7pmyPV_zIdDfXIDbR7Eg9LBTXQ&usqp=CAU",
            "width": 194,
            "height": 259
        },
        "origin": {
            "title": "The Wolf Among Us: Cry Wolf review ...",
            "website": {
                "name": "eurogamer.net",
                "domain": "Eurogamer",
                "url": "https://www.eurogamer.net/the-wolf-among-us-cry-wolf-review"
            }
        }
    },
    {
        "id": "QHnuLrEjCVsXLM",
        "url": "https://static.wikia.nocookie.net/fables/images/f/fd/ACM_Found_Your_Throat.png/revision/latest?cb=20140416222714",
        "width": 900,
        "height": 1600,
        "color": "rgb(88,30,56)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZ_nQGhS_cg_fDrYWx9vp9cD9s2RqvpuB1w&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us) | Fables Wiki ...",
            "website": {
                "name": "fables.fandom.com",
                "domain": "Fables Wiki - Fandom",
                "url": "https://fables.fandom.com/wiki/List_of_Deaths_(The_Wolf_Among_Us)"
            }
        }
    },
    {
        "id": "MN9l1-KlgUo35M",
        "url": "https://volsiz.ru/wp-content/uploads/2022/02/the-wolf-among-us-2-new-character.jpg",
        "width": 675,
        "height": 1200,
        "color": "rgb(0,0,0)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWXLac-dEgJpWFmtMMxUtRztdbjZiV3Cj7IA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "regressar para The Wolf Among Us ...",
            "website": {
                "name": "volsiz.ru",
                "domain": "Volsiz.Ru",
                "url": "https://volsiz.ru/pt/noticias-pt/2022/02/10/que-personagens-irao-regressar-para-the-wolf-among-us-2/"
            }
        }
    },
    {
        "id": "jcgrafENZTUzmM",
        "url": "https://media.sketchfab.com/models/11d29cf9caee433fb05f939ba7616055/thumbnails/f69eb68cf96a43ad976664f195f1135d/780aa6f75e5b4c38abf94e4ad7edd159.jpeg",
        "width": 405,
        "height": 720,
        "color": "rgb(128,122,102)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI_u1rDmyBiS0mfAwDLckDz7LV_NmS7v8bQ&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The-wolf-among-us 3D models - Sketchfab",
            "website": {
                "name": "sketchfab.com",
                "domain": "Sketchfab",
                "url": "https://sketchfab.com/tags/the-wolf-among-us"
            }
        }
    },
    {
        "id": "OI_PurKN40qn8M",
        "url": "https://img.game-news24.com/2022/02/Wolf-Among-Us-2-is-being-planned-for-2023-A-trailer-comes-out-of-this-sort-of-place-in-the-trailer.jpeg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(8,8,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYBJI8woqRs3uMK_nUm7u8v_xw7An4LzuCg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "Wolf Among Us 2 is being planned for ...",
            "website": {
                "name": "game-news24.com",
                "domain": "Game News 24",
                "url": "https://game-news24.com/2022/02/09/wolf-among-us-2-is-being-planned-for-2023-a-trailer-comes-out-of-this-sort-of-place-in-the-trailer/"
            }
        }
    },
    {
        "id": "kWiYCs31p4RiEM",
        "url": "https://i.pinimg.com/474x/b1/f1/df/b1f1df93ce606a02880bbb0617b3be63--wolf.jpg",
        "width": 720,
        "height": 470,
        "color": "rgb(240,240,240)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SE_ytHertkVSyllEJzTOXftWHjJprjjFog&usqp=CAU",
            "width": 278,
            "height": 181
        },
        "origin": {
            "title": "73 ideias de The Wolf Among Us ...",
            "website": {
                "name": "br.pinterest.com",
                "domain": "Pinterest",
                "url": "https://br.pinterest.com/kuromajoh/the-wolf-among-us/"
            }
        }
    },
    {
        "id": "ttRvcX2yWIr9nM",
        "url": "http://cdn.pastemagazine.com/www/articles/wolf among us episode 5 screen.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(152,114,94)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPFMglJY5D8krrSBObRpEILfg9-MRr95UtjA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us Episode 5 Review ...",
            "website": {
                "name": "pastemagazine.com",
                "domain": "Paste Magazine",
                "url": "https://www.pastemagazine.com/games/the-wolf-among-us-episode-5-review-multi-platform/"
            }
        }
    },
    {
        "id": "jwA171Ls_g4XDM",
        "url": "https://www.gameinformer.com/sites/default/files/styles/full/public/2022/02/09/8f9f3f22/the_wolf_among_us_2_trailer_wolf.jpg",
        "width": 821,
        "height": 1460,
        "color": "rgb(0,0,0)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD1MIcc01L6fCoayeXS-DECWSsTIhiJXPbsw&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us 2 Gets First Trailer ...",
            "website": {
                "name": "gameinformer.com",
                "domain": "Game Informer",
                "url": "https://www.gameinformer.com/2022/02/09/the-wolf-among-us-2-gets-first-trailer-and-2023-launch-window"
            }
        }
    },
    {
        "id": "6UBl_0VkVkuekM",
        "url": "https://static3.srcdn.com/wordpress/wp-content/uploads/2022/02/TWAU2-Therapist.jpg?q=50&fit=crop&w=963&h=481&dpr=1.5",
        "width": 481,
        "height": 963,
        "color": "rgb(24,21,18)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo1MjyaeK7h6uPArDgPzcxXfbeK3O-3ig1AQ&usqp=CAU",
            "width": 159,
            "height": 318
        },
        "origin": {
            "title": "Wolf Among Us 2: Every New \\u0026 Returning ...",
            "website": {
                "name": "screenrant.com",
                "domain": "Screen Rant",
                "url": "https://screenrant.com/wolf-among-us-2-new-returning-characters-bigby/"
            }
        }
    },
    {
        "id": "M2YGXAfiucWKHM",
        "url": "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/02/The-Wolf-Among-Us-Best-Characters.jpg?q=50&fit=contain&w=750&h=375&dpr=1.5",
        "width": 375,
        "height": 750,
        "color": "rgb(16,10,10)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjS8HRoi0YFHs118jjQyFvPbFEkXt5xsOepA&usqp=CAU",
            "width": 159,
            "height": 318
        },
        "origin": {
            "title": "Best Characters From The Wolf Among Us ...",
            "website": {
                "name": "thegamer.com",
                "domain": "TheGamer",
                "url": "https://www.thegamer.com/the-wolf-among-us-best-characters-ranked/"
            }
        }
    },
    {
        "id": "uByWakN-S3QnfM",
        "url": "https://i.scdn.co/image/ab67616d0000b273feac9e94051ad37ec46abbf9",
        "width": 640,
        "height": 640,
        "color": "rgb(96,26,38)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROESC9ZbtT019Lz9fiuqlywVv-m09CY8Sgiw&usqp=CAU",
            "width": 225,
            "height": 225
        },
        "origin": {
            "title": "The Wolf Among Us - Album by RichShad ...",
            "website": {
                "name": "open.spotify.com",
                "domain": "Spotify - Web Player",
                "url": "https://open.spotify.com/album/10iTv9bOJlnF0rfzQMNBxQ"
            }
        }
    },
    {
        "id": "y1N-cCOKN0Sg7M",
        "url": "https://images.saymedia-content.com/.image/t_share/MTc0NDU3OTE0NjY3ODM3MDYy/wolf-among-us-ending-explained.png",
        "width": 831,
        "height": 1200,
        "color": "rgb(8,5,2)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3ipv2yfhyJzDWSvrCxKytPTCDxhEw0WKAg&usqp=CAU",
            "width": 187,
            "height": 270
        },
        "origin": {
            "title": "The Wolf Among Us': Who Were Faith and ...",
            "website": {
                "name": "levelskip.com",
                "domain": "LevelSkip",
                "url": "https://levelskip.com/rpgs/wolf-among-us-ending-explained"
            }
        }
    },
    {
        "id": "EzXHyetsq1mVyM",
        "url": "https://media.sketchfab.com/models/0558b1992c4c499f9d6626466e116386/thumbnails/5af53797dd6f4a6ca4ce12a32a51cf61/468ae8ac6be04fdb8b0d5bed8d7f7b81.jpeg",
        "width": 405,
        "height": 720,
        "color": "rgb(17,20,17)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlb7JHBGRcaf2DcOeKNErLd6YMkugD2g65A&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The-wolf-among-us 3D models - Sketchfab",
            "website": {
                "name": "sketchfab.com",
                "domain": "Sketchfab",
                "url": "https://sketchfab.com/tags/the-wolf-among-us"
            }
        }
    },
    {
        "id": "CsdlEQksPARb_M",
        "url": "https://clutchpoints.com/wp-content/uploads/2022/02/The-Wolf-Among-Us-2-Release-Date-When-is-the-TWAU-2-Release-Date-1000x600.jpg",
        "width": 600,
        "height": 1000,
        "color": "rgb(232,149,59)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQudVzCBAD2ShiSpzkam7ldN9Jz02wflUJkw&usqp=CAU",
            "width": 174,
            "height": 290
        },
        "origin": {
            "title": "The Wolf Among Us 2 Release Date: When ...",
            "website": {
                "name": "clutchpoints.com",
                "domain": "ClutchPoints",
                "url": "https://clutchpoints.com/the-wolf-among-us-2-release-date/"
            }
        }
    },
    {
        "id": "GgWYPZEL9GbmVM",
        "url": "https://3.bp.blogspot.com/-JQdl6ygrr4Q/VHDGcxZeeSI/AAAAAAAAM8s/FbUWbnRf064/s1600/Wolf+Escolhas+Touch.jpg",
        "width": 544,
        "height": 960,
        "color": "rgb(69,88,56)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7H9VcMK8RM2p-rDi1oZOxAsaXvXVkuzKLGQ&usqp=CAU",
            "width": 169,
            "height": 298
        },
        "origin": {
            "title": "Análise: The Wolf Among Us é uma HQ ...",
            "website": {
                "name": "playstationblast.com.br",
                "domain": "PlayStation Blast",
                "url": "https://www.playstationblast.com.br/2014/11/analise-wolf-among-us-fabulas-vita.html"
            }
        }
    },
    {
        "id": "eN_KysZSwci0jM",
        "url": "https://www.gamespot.com/a/uploads/original/416/4161502/2499484-wolf among us - wolf among us - 2014-04-04 01-40-52 (p)45.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(176,35,131)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSunTw8GCfkSk05B5iVdVMDvM0JM-7FwRe5Jg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us: Episode 3 - A ...",
            "website": {
                "name": "gamespot.com",
                "domain": "GameSpot",
                "url": "https://www.gamespot.com/reviews/the-wolf-among-us-episode-3-a-crooked-mile-review/1900-6415724/"
            }
        }
    },
    {
        "id": "U8qOo8C_7RvxzM",
        "url": "https://www.planocritico.com/wp-content/uploads/2014/02/The-Wolf-Among-Us-Episode-2-Smoke-Mirrors-5.jpg",
        "width": 338,
        "height": 600,
        "color": "rgb(2,2,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEg-m8qNDvt7VGEdUhSqn0AICF0JXxqGi-w&usqp=CAU",
            "width": 168,
            "height": 299
        },
        "origin": {
            "title": "Crítica | The Wolf Among Us - Episódio ...",
            "website": {
                "name": "planocritico.com",
                "domain": "Plano Crítico",
                "url": "https://www.planocritico.com/critica-the-wolf-among-us-episodio-2-smoke-and-mirrors/"
            }
        }
    },
    {
        "id": "91oDK_G3IUElhM",
        "url": "https://gamefabrique.com/screenshots2/pc/the-wolf-among-us-2-03.big.jpg",
        "width": 551,
        "height": 980,
        "color": "rgb(9,12,9)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Ftwxr58CUOa4Lf4f_jN2NYnVV9IIu4kCHg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us 2 Download | GameFabrique",
            "website": {
                "name": "gamefabrique.com",
                "domain": "GameFabrique",
                "url": "https://gamefabrique.com/games/the-wolf-among-us-2/"
            }
        }
    },
    {
        "id": "t6JN9gQZmGJnLM",
        "url": "https://static.wikia.nocookie.net/villains/images/b/bb/The-wolf-among-us-3.jpg/revision/latest?cb=20141009042334",
        "width": 281,
        "height": 500,
        "color": "rgb(192,115,64)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwylMWfFNz16sbwxbf2CU_0RfuBNS6cRyHw&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us) | Villains Wiki ...",
            "website": {
                "name": "villains.fandom.com",
                "domain": "Villains Wiki - Fandom",
                "url": "https://villains.fandom.com/wiki/Crooked_Man_(The_Wolf_Among_Us)"
            }
        }
    },
    {
        "id": "bWOLTTzqzmMVpM",
        "url": "https://www.dccomics.com/sites/default/files/TWAU 36 D Cover_55c54859d1b4c5.50249747.jpg",
        "width": 2288,
        "height": 2975,
        "color": "rgb(40,21,27)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6kjem6pFbrd8ilRysruDMFCgsM8b0h6nrA&usqp=CAU",
            "width": 197,
            "height": 256
        },
        "origin": {
            "title": "the wolf among us | DC",
            "website": {
                "name": "dccomics.com",
                "domain": "DC Comics",
                "url": "https://www.dccomics.com/tags/the-wolf-among-us"
            }
        }
    },
    {
        "id": "KqDLXWZb8sV0YM",
        "url": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-wolf-amoung-us-2-trailer-1644685231.jpg?crop=0.986xw:1.00xh;0.00801xw,0&resize=1200:*",
        "width": 599,
        "height": 1200,
        "color": "rgb(8,8,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0qLfB8zmEUc0sdk1BBtDxw3UyrRMwlpizw&usqp=CAU",
            "width": 158,
            "height": 318
        },
        "origin": {
            "title": "The Wolf Among Us 2 finally gets full ...",
            "website": {
                "name": "digitalspy.com",
                "domain": "Digital Spy",
                "url": "https://www.digitalspy.com/tech/a39054803/wolf-among-us-2-full-trailer-release-window/"
            }
        }
    },
    {
        "id": "-gQKz_6unR6SeM",
        "url": "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a7/bd/b6/a7bdb60d-5c3b-e63a-f05a-6b4cfc0a0f80/AppIcon-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png",
        "width": 630,
        "height": 1200,
        "color": "rgb(48,22,10)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmW3sBctQSrg4t6b8h-lRx57IQYx6_pmCJig&usqp=CAU",
            "width": 163,
            "height": 310
        },
        "origin": {
            "title": "The Wolf Among Us on the App Store",
            "website": {
                "name": "apps.apple.com",
                "domain": "App Store - Apple",
                "url": "https://apps.apple.com/az/app/the-wolf-among-us/id716238885"
            }
        }
    },
    {
        "id": "jgpjrYdu3vW1PM",
        "url": "https://asset.vg247.com/20130508_the_wolf_among_us_fables.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/20130508_the_wolf_among_us_fables.jpg",
        "width": 900,
        "height": 1600,
        "color": "rgb(40,14,21)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74pw72Wwr2Qgzx2JphcJ6yzPh10GUrDM8bg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us is a prequel to ...",
            "website": {
                "name": "vg247.com",
                "domain": "VG247",
                "url": "https://www.vg247.com/the-wolf-among-us-is-a-prequel-to-fables-stars-bigsby"
            }
        }
    },
    {
        "id": "aa_yQ_vVuNzZ5M",
        "url": "https://media.alvanista.com/uploads/timeline_image/2021/01/03/medium_754170_2545907250.png",
        "width": 287,
        "height": 510,
        "color": "rgb(16,6,3)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRviPeWpQ3EDmpbFrYUSuW6Sz70zTJrHlxjig&usqp=CAU",
            "width": 168,
            "height": 299
        },
        "origin": {
            "title": "The Wolf Among Us - Playstation 4 ...",
            "website": {
                "name": "alvanista.com",
                "domain": "Alvanista",
                "url": "https://alvanista.com/games/ps4/the-wolf-among-us"
            }
        }
    },
    {
        "id": "N25SdMqFmSY3uM",
        "url": "https://assets.mycast.io/posters/the-wolf-among-us-fan-casting-poster-37069-large.jpg?1588716597",
        "width": 825,
        "height": 588,
        "color": "rgb(16,16,16)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvgSgu8s1sBkrTCAd7LMuqsXJWG3iwTKDaiw&usqp=CAU",
            "width": 266,
            "height": 189
        },
        "origin": {
            "title": "The Wolf Among Us Fan Casting on myCast",
            "website": {
                "name": "mycast.io",
                "domain": "myCast",
                "url": "https://www.mycast.io/stories/the-wolf-among-us-6"
            }
        }
    },
    {
        "id": "IQ4fIxqrDRcokM",
        "url": "https://static.gamespot.com/uploads/original/416/4161502/2309311-wolf among us 360 - wolf among us - 2013-10-07 07-44-1636.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(8,5,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvz72-D5MxuDlDpEvX26NdzX2hLxdX88kIQ&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us: Episode 1 - Faith ...",
            "website": {
                "name": "gamespot.com",
                "domain": "GameSpot",
                "url": "https://www.gamespot.com/reviews/the-wolf-among-us-episode-1-faith-review/1900-6415466/"
            }
        }
    },
    {
        "id": "hbhjD_sJLS4xkM",
        "url": "https://img.game-news24.com/2021/12/The-Wolf-Among-Us-2-was-the-first-to-make-a-story-and-set-all-the-facts.jpeg",
        "width": 1000,
        "height": 2000,
        "color": "rgb(69,56,88)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6YmFKP-wAt-Ca3-mZA5Wvx4T7kvxCqsmcA&usqp=CAU",
            "width": 159,
            "height": 318
        },
        "origin": {
            "title": "The Wolf Among Us 2 was the first to ...",
            "website": {
                "name": "game-news24.com",
                "domain": "Game News 24",
                "url": "https://game-news24.com/2021/12/23/the-wolf-among-us-2-was-the-first-to-make-a-story-and-set-all-the-facts/"
            }
        }
    },
    {
        "id": "0ZDb_8ZF1YYYrM",
        "url": "https://images.gnwcdn.com/2013/usgamer/Wolf-Among-Us-Header-02.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-wolf-among-us-faith-review.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(130,82,168)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-STir8dywIefvpLUhxDkf0oP7dJKG0_RyCA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us: Faith Review | USgamer",
            "website": {
                "name": "usgamer.net",
                "domain": "USgamer",
                "url": "https://www.usgamer.net/articles/the-wolf-among-us-faith-review"
            }
        }
    },
    {
        "id": "nQi3RGXvgsbMZM",
        "url": "https://www.giantfreakinrobot.com/wp-content/uploads/2022/02/wolf-among-us-900x506.jpeg",
        "width": 506,
        "height": 900,
        "color": "rgb(16,16,16)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjdjhgcFrpt8Q3Y-z8DssohDKQ6dDViZWheA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us 2 Trailer Reveals Its ...",
            "website": {
                "name": "giantfreakinrobot.com",
                "domain": "GIANT FREAKIN ROBOT",
                "url": "https://www.giantfreakinrobot.com/games/the-wolf-among-us-2-trailer.html"
            }
        }
    },
    {
        "id": "vT0da1OKTgC83M",
        "url": "https://media.alvanista.com/uploads/timeline_image/2020/02/29/medium_690406_2545907250.png",
        "width": 709,
        "height": 500,
        "color": "rgb(249,252,249)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEFxjPNO3O3fFDVjr0Fdnfc_QHcCIUFJs2MA&usqp=CAU",
            "width": 267,
            "height": 188
        },
        "origin": {
            "title": "The Wolf Among Us - PC - Alvanista",
            "website": {
                "name": "alvanista.com",
                "domain": "Alvanista",
                "url": "https://alvanista.com/games/pc/the-wolf-among-us"
            }
        }
    },
    {
        "id": "SZ2huOqpLGkv5M",
        "url": "https://images8.alphacoders.com/603/603817.jpg",
        "width": 3375,
        "height": 6000,
        "color": "rgb(64,51,32)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt5ssD1hTsibdpAoEl5_jUJgDar1uvXFV9-Q&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us Wallpaper | 1920x1080",
            "website": {
                "name": "wall.alphacoders.com",
                "domain": "Wallpaper Abyss - Alpha Coders",
                "url": "https://wall.alphacoders.com/big.php?i\\u003d517355"
            }
        }
    },
    {
        "id": "hQbzEvR4EM2ToM",
        "url": "https://media.sketchfab.com/models/94768884d4c940709d87a2862489cb17/thumbnails/e965d0a977dd42dabd44e5f49cccfce6/883c8cf4b92e46ec94caeebeb7763b9b.jpeg",
        "width": 405,
        "height": 720,
        "color": "rgb(43,56,37)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEl9gl3ovg21zMPbcyUCEhNJNUtBNOSeM5Yw&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The-wolf-among-us 3D models - Sketchfab",
            "website": {
                "name": "sketchfab.com",
                "domain": "Sketchfab",
                "url": "https://sketchfab.com/tags/the-wolf-among-us"
            }
        }
    },
    {
        "id": "TL-AoFY_4xR4NM",
        "url": "https://c.tenor.com/EnCZB63yCKgAAAAd/the-wolf-among-us.gif",
        "width": 640,
        "height": 640,
        "color": "rgb(48,19,10)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7v4vYfnjhv-l4qGv7uqiwK3pxVmSt8ymnfA&usqp=CAU",
            "width": 225,
            "height": 225
        },
        "origin": {
            "title": "The Wolf Among Us GIF - The Wolf Among ...",
            "website": {
                "name": "tenor.com",
                "domain": "Tenor",
                "url": "https://tenor.com/view/the-wolf-among-us-gif-24201678"
            }
        }
    },
    {
        "id": "k2l7qw-BkAB2QM",
        "url": "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/7f5cbb01dc98ed4531431788989da821.jpg",
        "width": 430,
        "height": 920,
        "color": "rgb(160,58,32)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyqgeDA3kystCEqAdzs2hLe9SvasclXJZDA&usqp=CAU",
            "width": 153,
            "height": 329
        },
        "origin": {
            "title": "The Wolf Among Us - SteamGridDB",
            "website": {
                "name": "steamgriddb.com",
                "domain": "SteamGridDB",
                "url": "https://www.steamgriddb.com/game/3011"
            }
        }
    },
    {
        "id": "HK6U75kTrLO84M",
        "url": "https://static.wikia.nocookie.net/villains/images/0/00/ACM_Mary_Menacing.png/revision/latest?cb=20140409060024",
        "width": 831,
        "height": 642,
        "color": "rgb(10,6,16)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2yRDAlDE2gGkOvYw8vNEUQJ6xaxrRJqDo9g&usqp=CAU",
            "width": 255,
            "height": 197
        },
        "origin": {
            "title": "Bloody Mary (The Wolf Among Us ...",
            "website": {
                "name": "villains.fandom.com",
                "domain": "Villains Wiki - Fandom",
                "url": "https://villains.fandom.com/wiki/Bloody_Mary_(The_Wolf_Among_Us)"
            }
        }
    },
    {
        "id": "eq7L5F21p11KoM",
        "url": "https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/12/wolf-among-us-header.jpg",
        "width": 700,
        "height": 1400,
        "color": "rgb(64,42,32)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx2vqvPmX4MM6b-TGrE4TOnaTnAzgoFedW5A&usqp=CAU",
            "width": 159,
            "height": 318
        },
        "origin": {
            "title": "Wolf Among Us 2 is Written With New ...",
            "website": {
                "name": "cbr.com",
                "domain": "CBR",
                "url": "https://www.cbr.com/wolf-among-us-2-new-players/"
            }
        }
    },
    {
        "id": "Q-GAR_0DffJCVM",
        "url": "https://cdn.wccftech.com/wp-content/uploads/2019/08/WCCFwolfamongus.jpg",
        "width": 429,
        "height": 740,
        "color": "rgb(152,40,75)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ihavV-H-TGZcHzYv8koVH5BsKkVmNL0zyw&usqp=CAU",
            "width": 171,
            "height": 295
        },
        "origin": {
            "title": "The Wolf Among Us 2 Resumes Development ...",
            "website": {
                "name": "wccftech.com",
                "domain": "Wccftech",
                "url": "https://wccftech.com/the-wolf-among-us-2-resumes-development-teaser-trailer/"
            }
        }
    },
    {
        "id": "q1ScOT-KIXwomM",
        "url": "https://www.mobygames.com/images/shots/l/746201-the-wolf-among-us-playstation-4-screenshot-episode-2-nude.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(32,13,13)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVqxpcTuJMbAxhWo_SLwJTV8wGT1VoyLZBgA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us Screenshots for ...",
            "website": {
                "name": "mobygames.com",
                "domain": "The Wolf Among Us Screenshots for PlayStation 4 - MobyGames",
                "url": "https://www.mobygames.com/game/playstation-4/wolf-among-us/screenshots/gameShotId,746201/"
            }
        }
    },
    {
        "id": "JHhjO67QEPX4ZM",
        "url": "https://img.uhdpaper.com/wallpaper/the-wolf-among-us-2-515@1@f-phone-4k.jpg",
        "width": 3840,
        "height": 2160,
        "color": "rgb(0,0,0)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYu7McF8bfcqjOxsdhpzvDJGudhm5cJdTSCg&usqp=CAU",
            "width": 300,
            "height": 168
        },
        "origin": {
            "title": "The Wolf Among Us 2 4K Wallpaper Phone ...",
            "website": {
                "name": "uhdpaper.com",
                "domain": "UHD Wallpaper",
                "url": "https://www.uhdpaper.com/2021/11/the-wolf-among-us-2-4k-5151f.html?m\\u003d1"
            }
        }
    },
    {
        "id": "M0afExG0chTO9M",
        "url": "https://149362454.v2.pressablecdn.com/previously/wp-content/uploads/sites/5/2013/10/WolfAmongUsThumb.jpg",
        "width": 720,
        "height": 719,
        "color": "rgb(120,120,101)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAn4SCFfEdi2eHNnrT1ZDINHoyieMdSFsHbg&usqp=CAU",
            "width": 225,
            "height": 224
        },
        "origin": {
            "title": "With The Wolf Among Us, Telltale takes ...",
            "website": {
                "name": "killscreen.com",
                "domain": "Killscreen",
                "url": "https://killscreen.com/previously/articles/wolf-among-us-telltale-takes-turn-nihilistic/"
            }
        }
    },
    {
        "id": "6NXG2QWaraaHMM",
        "url": "https://www.gamersdecide.com/sites/default/files/bigbbb_1.jpg",
        "width": 1058,
        "height": 1872,
        "color": "rgb(8,8,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQelOqmKeoHySf0-DDGkdOz7wCcXpioxCtJ2g&usqp=CAU",
            "width": 169,
            "height": 299
        },
        "origin": {
            "title": "The Wolf Among Us Endings [Guide ...",
            "website": {
                "name": "gamersdecide.com",
                "domain": "GAMERS DECIDE",
                "url": "https://www.gamersdecide.com/articles/the-wolf-among-us-endings"
            }
        }
    },
    {
        "id": "cn9_VEKgPl1w1M",
        "url": "https://static.gamespot.com/uploads/original/416/4161502/2309313-wolf among us 360 - wolf among us - 2013-10-07 08-32-1309.jpg",
        "width": 1080,
        "height": 1920,
        "color": "rgb(19,32,13)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQuS0Jm-w_QvTPXIrZqmUccBdogAEixxgXSA&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us: Episode 1 - Faith ...",
            "website": {
                "name": "gamespot.com",
                "domain": "GameSpot",
                "url": "https://www.gamespot.com/reviews/the-wolf-among-us-episode-1-faith-review/1900-6415466/"
            }
        }
    },
    {
        "id": "n9u5cXMBYZ01NM",
        "url": "https://r7k2t3x9.rocketcdn.me/wp-content/uploads/2021/01/img-47152.jpg",
        "width": 400,
        "height": 650,
        "color": "rgb(240,157,80)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiJngtlWaAmlgPf9HC9JTEfagdIrlJi2c2XA&usqp=CAU",
            "width": 176,
            "height": 286
        },
        "origin": {
            "title": "Victimhood and 'The Wolf Among Us ...",
            "website": {
                "name": "popmatters.com",
                "domain": "PopMatters",
                "url": "https://www.popmatters.com/183767-victimhood-and-the-wolf-among-us-2495638740.html"
            }
        }
    },
    {
        "id": "6cyyjLCbuQxT1M",
        "url": "https://www.commonsensemedia.org/sites/default/files/styles/social_share_image/public/screenshots/csm-game/the-wolf-among-us-4.jpg",
        "width": 315,
        "height": 600,
        "color": "rgb(8,5,8)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43xr7HU2rAX9Cv4iOKUmeWVMG5HgaoC-Lvw&usqp=CAU",
            "width": 163,
            "height": 310
        },
        "origin": {
            "title": "The Wolf Among Us: Season One Game ...",
            "website": {
                "name": "commonsensemedia.org",
                "domain": "Common Sense Media",
                "url": "https://www.commonsensemedia.org/game-reviews/the-wolf-among-us-season-one"
            }
        }
    },
    {
        "id": "Jetcb-FyvuwnGM",
        "url": "https://pt.videogamer.com/wp-content/uploads/1379cad3-9702-43f1-8146-08a0206c62ab_The_Wolf_Among_Us_2-1024x546.jpg",
        "width": 546,
        "height": 1024,
        "color": "rgb(50,50,120)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxDPfFAOfcZYiItlwJzDtH4Ksmua7p0vmcHQ&usqp=CAU",
            "width": 164,
            "height": 308
        },
        "origin": {
            "title": "teremos novidades de The Wolf Among Us ...",
            "website": {
                "name": "pt.videogamer.com",
                "domain": "VideoGamer Portugal",
                "url": "https://pt.videogamer.com/noticias/amanha-teremos-novidades-de-the-wolf-among-us-2/"
            }
        }
    },
    {
        "id": "okxHjgHRIhXHBM",
        "url": "https://d1lss44hh2trtw.cloudfront.net/assets/article/2022/02/09/the-wolf-among-us-2_feature.jpg",
        "width": 900,
        "height": 1600,
        "color": "rgb(128,77,115)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCRmzj33SZcKsCc75ezGgVPc4Ek82SeN_wJw&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "Watch the Wolf Among Us 2 reveal ...",
            "website": {
                "name": "shacknews.com",
                "domain": "Shacknews",
                "url": "https://www.shacknews.com/article/128748/watch-the-wolf-among-us-2-reveal-livestream-here"
            }
        }
    },
    {
        "id": "tNbrd8hH48x1KM",
        "url": "https://www.androidauthority.com/wp-content/uploads/2014/10/Screenshot_2014-10-29-15-58-30.png",
        "width": 1080,
        "height": 1920,
        "color": "rgb(120,117,88)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL4xyDi_vTGtflQsl2oJ9G2at36tQJe6GUhg&usqp=CAU",
            "width": 168,
            "height": 300
        },
        "origin": {
            "title": "The Wolf Among Us finally makes its way ...",
            "website": {
                "name": "androidauthority.com",
                "domain": "Android Authority",
                "url": "https://www.androidauthority.com/wolf-among-us-play-store-544836/"
            }
        }
    },
    {
        "id": "GPr3gFGkcAjP1M",
        "url": "https://cf.shopee.com.br/file/2afb93835dcee9b17a9f6fb4e0b75793",
        "width": 1021,
        "height": 1021,
        "color": "rgb(144,115,118)",
        "preview": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA1Istm8FkvANUTafxX6m_SkTjKj1J_Kh4AA&usqp=CAU",
            "width": 225,
            "height": 225
        },
        "origin": {
            "title": "Lendas no Exílio The Wolf Among Us ...",
            "website": {
                "name": "shopee.com.br",
                "domain": "Shopee",
                "url": "https://shopee.com.br/HQ-F%C3%A1bulas-Lendas-no-Ex%C3%ADlio-The-Wolf-Among-Us-i.346462571.5775221514"
            }
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

<!--
- [PlaystoreScraper](https://github.com/luanrt/playstore-scraper): A simple module to get search results and app info from Google Play Store.
-->

## Related Projects
- [GoogleThis by Tokipudi](https://github.com/Tokipudi/GoogleThis): A Discord bot meant to integrate features from this library.

<!-- CONTRIBUTING -->
## Contributing
Contributions, issues and feature requests are welcome.
Feel free to check [issues page](https://github.com/LuanRT/google-this/issues) if you want to contribute.

<!-- CONTRIBUTORS -->
## Contributors
<a href="https://github.com/LuanRT/google-this/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LuanRT/google-this" />
</a>

<!-- CONTACT -->
## Contact

LuanRT  - [@lrt_nooneknows][twitter] - luan.lrt4@gmail.com

Project Link: [https://github.com/LuanRT/google-this][project]

<!-- LICENSE -->
## License

[MIT](https://choosealicense.com/licenses/mit/)

<p align="right">
  (<a href="#top">back to top</a>)
</p>