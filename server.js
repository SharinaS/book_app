'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');

const app = express();

app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
require('dotenv').config();
const PORT = process.env.PORT;

//Setting up postgres clinet
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
// setup error logging
client.on('error', (error) => console.error(error));

//API Routes
app.get('/', landingPage);
app.post('/searches', searchForBook);
app.get('/search', newSearch);
app.get('/books/:id', detailView);
app.get('*', (req, res) => res.render('pages/error', {error: 'Sorry, there was an error'}));


//======== Constructor Function ========
function Book(obj){
  let url = ('imageLinks' in obj.volumeInfo ? obj.volumeInfo.imageLinks.thumbnail : 'https://www.placecage.com/640/360');
  url = (url[4] === 's' ? url : url = url.replace('http', 'https'));
  this.title = obj.volumeInfo.title;
  this.author = ('authors' in obj.volumeInfo ? obj.volumeInfo.authors[0] : 'No authors available');
  this.description = ('description' in obj.volumeInfo ? obj.volumeInfo.description : 'No description available');
  //Limiting the description to 250 chars
  if(this.description.length > 254) this.description = this.description.slice(0,250)+'...';
  this.image = ('imageLinks' in obj.volumeInfo ? url : 'https://www.placecage.com/640/360');
  this.isbn = ('industryIdentifiers' in obj.volumeInfo ? obj.volumeInfo.industryIdentifiers[0].identifier : 'No ISBN available');
} 


// Route Handlers

function landingPage (request, response) {
  const sqlQuery = `SELECT * FROM books;`
  client.query(sqlQuery).then(sqlResult => {
    response.render('pages/index', {stuffFromDB: sqlResult.rows});
  }).catch(handleError);
}

function newSearch (request, response) {
  response.render('pages/searches/new');
}

function detailView (request, response) {
  //Dumpster Fire
  console.log(request.params.id)
  client.query('SELECT * FROM books WHERE id = $1', [request.params.id]).then(sqlDetailResult => {
    console.log(sqlDetailResult.rows[0]);
    response.render('pages/books/detail', sqlDetailResult.rows[0])
  })
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
    // response.status(500);
    response.render('pages/error', {error: 'Sorry, there was an error'});
    console.log(error);
  });
}

function handleError(error, response){
  response.render('pages/error', {error: 'Sorry, there was an error'});
  console.log(error);
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
