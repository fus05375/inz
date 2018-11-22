const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.gumtree.pl/s-';
function searchOfferts(searchTerm){
   return fetch(`${url}${searchTerm}/v1q0p1`)
  .then(response => response.text())
  .then(body => {
    const offerts = [];
    const $ = cheerio.load(body);
    $('.view >ul> li').each(function(i,element){
      const $element = $(element);
      const $image = $element.find('div > #img-cnt > img');
      const $title = $element.find('div > div.container > div.title >a');
      const $price = $element.find('div > div.container > div.info > div.price > span.value>span');
      const $src = $element.find('div > div.container > div.title >a');

      const offert = {
        title:$title.text(),
        image:$image.attr('src'),
        price:$price.text(),
        link: 'https://www.gumtree.pl'+ $src.attr('href'),
        source:'gumtree'
      };
      offerts.push(offert);
    });
    return offerts;
  });
}
module.exports = {searchOfferts};
