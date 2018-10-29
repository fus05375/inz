const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.gumtree.pl';

function searchOfferts(searchTerm,page){
   if(page === null){
    page=1;
   }
   return fetch(`${url}/s-${searchTerm}/v1q0p${page}`)
  .then(response => response.text())
  .then(body =>{
    const offerts = [];
    const $ = cheerio.load(body);
    $('.wrap').each(function(i,element){
      const $element = $(element);
      const $image = $element.find('#img-cnt > img');
      const $title = $element.find('ul > li:nth-child(1) > div > div.container > div.title > a');
      const $price = $element.find('ul > li:nth-child(1) > div > div.container > div.info > div.price > span > span');
      const $link = $element.find('tr:nth-child(1) > td.title-cell > div > h3 > a');

      const offert = {
        title:$title.html(),
        image:$image.attr('src'),
        price:$price.html(),
        link: url+$link.attr('href'),
        source:'gumtree'
      };
      offerts.push(offert);
    });
    return offerts;
  });
}
module.exports = {searchOfferts};
