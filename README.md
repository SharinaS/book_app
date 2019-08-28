# book_app
The most amazingess bookapp ever that, drumroll please, fullstack.

## Database
The schema for the database is as follows;
CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  ISBN VARCHAR(255),
  image VARCHAR,
  description VARCHAR(260),
  bookshelf VARCHAR(255)
);

## Times
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

Finish time: 

Actual time needed to complete: 45 minutes

## If you copy the code down to your machine from my repo on GitHub, after cloning, simply:
1. Do a touch .env to create a file
2. Within that .env file add PORT:
* PORT=port_number
3. type npm install (to install all packages needed).
