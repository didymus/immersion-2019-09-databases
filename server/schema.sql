CREATE DATABASE chat;

USE chat;


CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(40) NOT NULL,
  roomname VARCHAR(40),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(120) NOT NULL,
  roomname VARCHAR(40) NOT NULL,
  username VARCHAR(40),
  userId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables. */
