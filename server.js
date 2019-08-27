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
app.post('/searches', searchForBook);


//======== Constructor Function ========
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

  // Make array of books
  let arr = [];
  superagent.get(url).then(result => {
    //console.log(result.body);
    result.body.items.forEach( objecty => {
      console.log('**********************************');
      //console.log(objecty);
      arr.push(new Book(objecty));
    });
    console.log(arr);

    // Send the raw data:
    //response.send(arr);  

    // send (the file) and render make HTML render on the page:
    response.render('pages/searches/show', {data: arr});
    
  }).catch(error => {
    response.status(500).send(error.message);
    response.render('pages/error')
    console.log(error);
  });
}


app.listen(PORT, () => console.log(`up on PORT ${PORT}`));


/* NOTES:
get - asking for a file? which file. Used just for getting things.
post - used for sending things to the server, with the intention of storage
render - takes an ejs file and renders it on the page
response - is an object that is collecting all the data. Can use the operations send or render to work on that object. 
response.render always takes in an object as the second argument. 
Form talks to book-search. Post book-search occurs, which calls the callback function searchForBook. We then make a query for google, and make a superagent request. Front end is still waiting for something to happen. Then, response.render occurs, and we show our global key to the front end.
short circuit operators like && and || - they stop evaluating further ands and stops at the first falsey thing it finds. Same with 0. It returns the last value, and not true, because the value is truthy or falsey. 

line 71 can accept multiple key value pairs. 

*/
