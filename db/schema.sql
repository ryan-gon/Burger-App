CREATE DATABASE IF NOT EXISTS burgers_db;

USE burgers_db;

CREATE TABLE burgers (
	id INT NOT NULL AUTO_INCREMENT,
    burger_name varchar(100) NOT NULL,
    devoured BOOLEAN DEFAULT false,
    PRIMARY KEY(id)
);