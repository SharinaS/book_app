# book_app 
## Overview
This is a full-stack application that allows a user to search for books through the Google books API, save favorite books, add categories (aka bookshelves) to books, delete books from her/his collection, and select on detailed views about the book they wish to read about. The app is built with PostGreSQL, node.js, JavaScript, EJS, CSS, HTML. It has a repo on GitHub, for version control. 

## Contributors
* James Dansie
* Sharina Stubbs

## Website is deployed here:


## Getting Started
### If you copy the code down to your machine from my repo on GitHub, after cloning, simply:
1. Do a touch .env on your terminal to create a file
2. Within that .env file add:
* PORT=your_port_number
* DATABASE_URL=postgres://localhost:5432/books_app (where book_app is the name of the app database)
3. type npm install (to install all packages needed).

### If you build from scratch, you will have to install the following packages: 
1. npm init -y (choose -y if you do not have preferences on building your packages)
2. npm install -S express dotenv
3. npm install -S superagent (for working with APIs)
4. npm install -S pg 
5. npm install -S method-override 
6. npm install -S ejs

## Database
### The schema for the database is as follows;
```
CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  ISBN VARCHAR(255),
  image VARCHAR,
  description VARCHAR(260),
  bookshelf VARCHAR(255)
);
```

### To refresh the database from the terminal:
Execute from the command line: psql -d books_app -f books.sql

## To start server:
Type into terminal: <nodemon>, then, to restart at any time, enter `rs`

## Build Time Data
### Number and name of feature: feature 1, early deployment

Estimate of time needed to complete: 1 hour

Start time: 9am

Finish time: 9:55

Actual time needed to complete: 55 min

### Number and name of feature: feature 2, Accessing API

Estimate of time needed to complete: 45 minutes

Start time: 10:10am

Finish time: 10:24am

Actual time needed to complete: 14 minutes

### Number and name of feature: feature 3, Making Book Constructor and returning 10 books

Estimate of time needed to complete: 1 hour

Start time: 10:30am

Finish time: 1:00pm

Actual time needed to complete: 3 hours

### Number and name of feature: feature 4, Making Error Page

Estimate of time needed to complete: 30 minutes

Start time: 9:00am

Finish time: 9:15am

Actual time needed to complete: 15 minutes

### Number and name of feature: feature 5, CSS Styling

Estimate of time needed to complete: 1 hour

Start time: 9:15am

Finish time: 10:00am

Actual time needed to complete: 45 minutes

### Number and name of feature: feature 1 day 2, Setting up database, and rendering on front page

Estimate of time needed to complete: 1.5 hour

Start time: 10:00am

Finish time: 11:40am

Actual time needed to complete: 1hour 40minutes

### Number and name of feature: several features, day 2, Details of a single book.

Estimate of time needed to complete: 1.5 hours

Start time: 11:40am

Finish time: 9am of the next day

Actual time needed to complete: 6 hours 

### Number and name of feature: feature 1, day 3, Updating details of a book in the database or deleting book

Estimate of time needed to complete: 2 hours 

Start time: 9:30am

Finish time: 12pm

Actual time needed to complete: 3.5 hours
