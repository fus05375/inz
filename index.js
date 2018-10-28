const express = require('express');
const olx = require('./olxScripper');

const app = express();

app.get('/',(req,res)=>{
  res.json({
    message:'Scrapping is fun!'
  });
});
app.get('/search/:searchTerm',(req,res)=>{
  olx
  .searchOfferts(req.params.searchTerm)
  .then(offerts=>{
    res.json({success: 1,'myData': offerts});
  });
});

app.get('/search/:searchTerm/:page',(req,res)=>{
  olx
  .searchOfferts(req.params.searchTerm, req.params.page)
  .then(offerts=>{
    res.json({success: 1,'myData': offerts});
  });
});


const port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log(`Listening on ${port}`);
});
