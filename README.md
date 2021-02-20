# GoogleThis

GoogleThis is a module that allows you to get the results from a Google search programmatically!

## Installation

```bash
npm install @luanrt/google-this
```

## Usage

```nodejs
const googleThis = require('@luanrt/google-this');

googleThis('Minecraft')
   .then((results) => {
       console.log(results);
   }).catch ((err) => {
       console.log('Hm, something went wrong!\n'+err);
   });
                       
```

## Output
```json
[
   {
      "title":"Minecraft Official Site | Minecraft",
      "url":"https://www.minecraft.net/en-us/",
      "description":"Explore new gaming adventures, accessories, & merchandise on the Minecraft Official Site. Buy & download the game here, or check the site for the latest news."
   },
   {
      "title":"Minecraft - Apps on Google Play",
      "url":"https://play.google.com/store/apps/details?id=com.mojang.minecraftpe&hl=en_US&gl=US",
      "description":"Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep<wbr>&nbsp;..."
   },
   {
      "title":"Minecraft - Wikipedia",
      "url":"https://en.wikipedia.org/wiki/Minecraft",
      "description":"Minecraft is a sandbox video game developed by Mojang. The game was created by Markus \"Notch\" Persson in the Java programming language. Following&nbsp;..."
   },
   {
      "title":"Official Minecraft Wiki – The Ultimate Resource for Minecraft",
      "url":"https://minecraft.gamepedia.com/Minecraft_Wiki",
      "description":"Gameplay involves players interacting with the game world by placing and breaking various types of blocks in a three-dimensional environment. In this&nbsp;..."
   },
   {
      "title":"Minecraft | Code.org",
      "url":"https://code.org/minecraft",
      "description":"The new Minecraft Hour of Code tutorial is now available in Minecraft: Education Edition for Windows, Mac, Chromebook, and iPad. Learn the basics of coding&nbsp;..."
   }
]
```

## License
[MIT](/LICENSE)
