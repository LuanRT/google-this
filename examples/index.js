const google = require('../lib/google_this');

async function start() {
  // A simple search
  const res = await google.search('Stephen Hawking', {
    page: 0,
    safe: false,
    additional_params: {
      hl: 'en'
    }
  });
  console.info('Search Results:', res);
  
  // Image Search
  const images = await google.image('The Wolf Among Us', { safe: false });
  console.info('Image Search:', images); 
 
  // Reverse Image Search
  const reverse = await google.search('https://i.pinimg.com/236x/92/16/d9/9216d9a222ef65eb6eabfff1970180d1.jpg', { ris: true });
  console.info('Reverse Image Search:', reverse.results);
   
  const news = await google.getTopNews();
  console.info('Google Top News:', news);
}

start();
