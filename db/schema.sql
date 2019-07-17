-- Drops the database if it exists currently --
DROP DATABASE IF EXISTS contest_db;
-- Creates the "blogger" database --
CREATE DATABASE contest_db;

USE contest_db;

SELECT * FROM contest_db.Likes;
SELECT * FROM contest_db.Meme;
SELECT * FROM contest_db.Users;