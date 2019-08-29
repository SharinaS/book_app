DROP TABLE IF EXISTS books;
CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  ISBN VARCHAR(255),
  image VARCHAR,
  description VARCHAR(260),
  bookshelf VARCHAR(255)
);

INSERT INTO books (author, title, ISBN, image, description, bookshelf) VALUES ('Terry Pratchet', 'Good Omens', '123456789', 'https://www.placecage.com/640/360', 'The best book ever! :D', 'novel');

INSERT INTO books (author, title, ISBN, image, description, bookshelf) VALUES ('Susan Fromberg', 'The Dragons of North Chittendon', '123456789', 'https://www.placecage.com/640/360', 'Dragon book! :D', 'novel');