-- Drops the database if it exists currently --
DROP DATABASE IF EXISTS contest_db;
-- Creates the "blogger" database --
CREATE DATABASE contest_db;
USE contest_db;

CREATE TABLE user 
(
    user_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(250),
    password VARCHAR(250),
    username VARCHAR(250),
    PRIMARY KEY (id)
)

CREATE TABLE meme
(
    meme_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(250),
    author VARCHAR(250),
    PRIMARY KEY (id)
)

CREATE TABLE like
(
    id INT NOT NULL AUTO_INCREMENT,
    name_id  INT NOT NULL AUTO_INCREMENT,
    meme_id  INT NOT NULL AUTO_INCREMENT,
    path VARCHAR(250),
    PRIMARY KEY (id)
)