const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.olx.pl';

function searchOfferts(searchTerm,tag,page){
  if (tag === 'all'){
    tag='/oferty/q-';
  }else if(tag ==='moda'){
    tag='/moda/q-';
  }else if (tag === 'nieruchomosci'){
    tag='/nieruchomosci/q-';
  }else if (tag === 'dom-i-ogrod'){
    tag='/dom-ogrod/q-';
  }else if (tag === 'muzyka-i-rozrywka'){
    tag='/muzyka-edukacja/q-';
  }else if (tag === 'motoryzacja'){
    tag='/motoryzacja/q-';
  }else if (tag === 'oferty-pracy'){
    tag='/praca/q-';
  }else if (tag === 'dla-dziecka'){
    tag='/dla-dzieci/q-';
  }else if (tag === 'elektronika'){
    tag='/elektronika/q-';
  }else if (tag === 'uslugi'){
    tag='/uslugi-firmy/q-';
  }else if (tag === 'zwierzaki'){
    tag='/zwierzeta/q-';
  }else if (tag === 'sportowe'){
    tag='/sport-hobby/q-';
  }
      return fetch(`${url}${tag}${searchTerm}/?view=list&page=${page}`)
  .then(response => response.text())
  .then(body =>{
    const offerts = [];
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
      offerts.push(offert);
    });
    return offerts;
  });
}
module.exports = {searchOfferts};
