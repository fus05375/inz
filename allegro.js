const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://allegro.pl/listing?string=';
const used = '&stan=u%C5%BCywane';


function searchOfferts(searchTerm,page){
  if(page === null){
    page=1;
  }
  return fetch(`${url}${searchTerm}${used}&p=${page}}`)
    .then(response => response.text())
    .then(body =>{
      const offerts = [];
      const $ = cheerio.load(body);
      $('.wrap').each(function(i,element){//
        const $element = $(element);
        const $image = $element.find('a img');
        const $title = $element.find('h3 strong');
        const $price = $element.find('td.wwnormal.tright.td-price > div > p > strong');
        const $src = $element.find('tr:nth-child(1) > td.title-cell > div > h3 > a');

        const offert = {
          title:$title.html(),
          image:$image.attr('src'),
          price:$price.html(),
          link:$src.attr('href')//
        };
        offerts.push(offert);
      });
      return offerts;
    });
}
console.log(searchOfferts('pc',1));
