#!/bin/bash

# chmod +x create-db.sh

echo "|=============== CREATE-DB STARTED ===============|"
ROOT_PASSWD="pass"
DB="hot_takes" # rename to actual_site_db

# Create database
mysql -u root -p$ROOT_PASSWD -e "CREATE DATABASE $DB;"


# Switch to the newly created database AND Create a tables with the specified columns
mysql -u root -p$ROOT_PASSWD -e "
	USE $DB; 
	CREATE TABLE contributors (
		id INT PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR(64) NOT NULL,
		profile_img_url VARCHAR(256) NOT NULL,
		biography VARCHAR(2560) NOT NULL,
		gpt_prompt VARCHAR(2560) NOT NULL
	);"

mysql -u root -p$ROOT_PASSWD -e "
	USE $DB; 
	CREATE TABLE ai_posts (
		id INT PRIMARY KEY AUTO_INCREMENT,
		contributor_id INT,
		FOREIGN KEY (contributor_id) REFERENCES contributors(id),
		headline VARCHAR(128) NOT NULL,
		content_snippet VARCHAR(256) NOT NULL,
		link VARCHAR(128) NOT NULL,
		post VARCHAR(560) NOT NULL,
		create_date DATETIME DEFAULT CURRENT_TIMESTAMP
	);"

mysql -u root -p$ROOT_PASSWD -e "
	USE $DB; 
	CREATE TABLE comments (
		id INT PRIMARY KEY AUTO_INCREMENT,
		post_id INT,
		FOREIGN KEY (post_id) REFERENCES ai_posts(id),
		username VARCHAR(64) NOT NULL,
		comment VARCHAR(256) NOT NULL,
		create_date DATETIME DEFAULT CURRENT_TIMESTAMP
	);"

echo "|=============== Database Created ===============|"