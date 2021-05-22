var { search, image, getTopNews } = require("../lib/google_this");

async function start() {
  const search_results = await search("PewDiePie", {
    page: 0,
  });
  console.log(search_results);

  const image_search_results = await image("The Wolf Among Us");
  console.log(image_search_results);

  const top_news = await getTopNews();
  console.log(top_news);
}
start();
