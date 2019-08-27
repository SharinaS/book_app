'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();

app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
require('dotenv').config();
const PORT = process.env.PORT;

app.get('/', landingPage);
app.post('/book-search', searchForBook);


// Constructor Function
// image, title, author, description, isbn number


function Book(obj){
  let url = ('imageLinks' in obj.volumeInfo ? obj.volumeInfo.imageLinks.thumbnail : 'https://www.placecage.com/640/360');
  url = (url[4] === 's' ? url : url = url.replace('http', 'https'));
  this.title = obj.volumeInfo.title;
  this.author = ('authors' in obj.volumeInfo ? obj.volumeInfo.authors[0] : 'No authors available');
  this.description = ('description' in obj.volumeInfo ? obj.volumeInfo.description : 'No description available');
  this.image = ('imageLinks' in obj.volumeInfo ? url : 'https://www.placecage.com/640/360');
  this.isbn = ('industryIdentifiers' in obj.volumeInfo ? obj.volumeInfo.industryIdentifiers[0].identifier : 'No ISBN available');
} 


// Route Handlers

function landingPage (request, response) {
  response.render('pages/index');
}

function searchForBook(request, response) {
  // request.body comes from the form from ejs
  // .search is the name of the input
  // [0] is the first thing which was the radio buttons
  // console.log(request.body.search[0]);

  const searchType = request.body.search[0];

  const searchingFor = request.body.search[1];

  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  if (searchType === 'title'){
    const query = `+intitle:${searchingFor}`;
    url = url + query;
  } else {
    const query = `+inauthor:${searchingFor}`;
    url = url + query;
  }

  superagent.get(url).then(result => {
    //console.log(result.body);
    result.body.items.forEach( objecty => {
      console.log('**********************************');
      console.log(objecty);
      console.log(new Book(objecty));
    });

    response.send(result.body);

    response.render('pages/booklist')
  }).catch(error => {
    response.status(500).send(error.message);
    console.log(error);
  });
}






app.listen(PORT, () => console.log(`up on PORT ${PORT}`));
