const express = require('express');
const olx = require('./olxScripper');
const gumtree = require('./gumtreeScripper');
var proxy = require('http-proxy-middleware')




const app = express();

app.use('/api', proxy({ target: 'http://www.example.org', changeOrigin: true }))

app.get('/',(req,res)=>{
  res.json({
    message:'Welcome to olx/gumtree Web Scraper!',
    author: 'fus'
  });
});
  /*
  'all'
  'moda'
  'nieruchomosci'
  'dom-i-ogrod'
  'muzyka-i-rozrywka'
  'motoryzacja'
  'oferty-pracy'
  'dla-dziecka'
  'elektronika'
  'uslugi'
  'zwierzaki'
  'sportowe'
  */
app.get('/search/:searchTerm/:tag/:page',(req,res)=>{

  req.headers['Proxy-Authorization'] = `Basic ${new Buffer('token').toString('base64')}`;


  Promise.all([
    olx
    .searchOfferts(req.params.searchTerm,req.params.tag,req.params.page),
    gumtree
    .searchOfferts(req.params.searchTerm,req.params.tag,req.params.page)
  ])
  .then(offerts=>{
    res.json({success: 1,'myData': offerts[0].concat(offerts[1])});
  })
  .catch(
    error=>{
      res.json({success: 0,'myData': 'error occured: ' + error })
    }
  );
});





const port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log(`Listening on ${port}`);
});
