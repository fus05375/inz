const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.olx.pl/oferty/q-';

function searchOfferts(searchTerm,page){
   if(page === null){
    page=1;
   }
   return fetch(`${url}${searchTerm}/?page=${page}`)
  .then(response => response.text())
  .then(body =>{
    const offerts = [];
    const $ = cheerio.load(body);
    $('.wrap').each(function(i,element){
      const $element = $(element);
      const $image = $element.find('a img');
      const $title = $element.find('h3 strong');
      const $price = $element.find('td.wwnormal.tright.td-price > div > p > strong');
      const $src = $element.find('tr:nth-child(1) > td.title-cell > div > h3 > a');

      const offert = {
        title:$title.html(),
        image:$image.attr('src'),
        price:$price.html(),
        link:$src.attr('href'),
        source:'olx'
      };
      offerts.push(offert);
    });
    return offerts;
  });
}
module.exports = {searchOfferts};
