const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.gumtree.pl';
https://www.gumtree.pl/s-buty/v1q0p1
function searchOfferts(searchTerm){
   return fetch(`https://www.olx.pl/moda/q-asas/`)
  .then(response => response.text());
}

searchOfferts('buty')
  .then(body => {
    const $ = cheerio.load(body);
    $('.wrap').each(function(i,element){
      const $element = $(element);
      const $image = $element.find('a img');
      const $title = $element.find('tr:nth-child(1) > td.title-cell > div > h3 > a > strong');
      const $price = $element.find('tr:nth-child(1) > td.wwnormal.tright.td-price > div > p > strong');
      const $src = $element.find('tr:nth-child(1) > td.title-cell > div > h3 > a');

      const offert = {
        title:$title.text(),
        image:$image.attr('src'),
        price:$price.text(),
        link:$src.attr('href'),
        source:'olx'
      };
      console.log(offert);
  });
});
