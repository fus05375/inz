const fetch = require('node-fetch');
const cheerio = require('cheerio');
// /v1q0p <-wyszukiwanie bez kategorii
// moda/v1c9541p <- moda
// nieruchomosci/v1c2p
// dom-i-ogrod/v1c4p
// muzyka-i-rozrywka/v1c9490p
// motoryzacja/v1c5p
// oferty-pracy/v1c8p
// dla-dziecka/v1c9459p
// elektronika/v1c9237p
// uslugi/v1c9p
// zwierzaki/v1c9124p
// sportowe/v1c9706p
const url = 'https://www.gumtree.pl/s-';
function searchOfferts(searchTerm,tag,page){
  if (tag === 'all'){
    tag='/v1q0p';
  }else if(tag === 'moda'){
    tag='moda/v1c9541p';
  }else if (tag === 'nieruchomosci'){
    tag='nieruchomosci/v1c2p';
  }else if (tag === 'dom-i-ogrod'){
    tag='dom-i-ogrod/v1c4p';
  }else if (tag === 'muzyka-i-rozrywka'){
    tag='muzyka-i-rozrywka/v1c9490p';
  }else if (tag === 'motoryzacja'){
    tag='motoryzacja/v1c5p';
  }else if (tag === 'oferty-pracy'){
    tag='oferty-pracy/v1c8p';
  }else if (tag === 'dla-dziecka'){
    tag='dla-dziecka/v1c9459p';
  }else if (tag === 'elektronika'){
    tag='elektronika/v1c9237p';
  }else if (tag === 'uslugi'){
    tag='uslugi/v1c9p';
  }else if (tag === 'zwierzaki'){
    tag='zwierzaki/v1c9124p';
  }else if (tag === 'sportowe'){
    tag='sportowe/v1c9706p';
  }
  return fetch(`${url}${searchTerm}${tag}${page}`)
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
