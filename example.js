const googleThis = require('./googlethis');

googleThis('Minecraft')
   .then((results) => {
       console.log(results);
   }).catch ((err) => {
       console.log('Hm, something went wrong!\n'+err);
   });
