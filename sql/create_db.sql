DROP DATABASE IF EXISTS	"filmsfinder_db";
CREATE DATABASE "filmsfinder_db" ;

DROP TABLE IF EXISTS "roles" ;
CREATE TABLE "roles" (
	"id" 			INTEGER 	NOT NULL,
	"name" 		VARCHAR(100) 	NOT NULL UNIQUE,

	PRIMARY KEY ("id")
	
);

DROP TABLE IF EXISTS "users" ;
CREATE TABLE "users" (
	"id" 					SERIAL 			NOT NULL,
	"login" 			VARCHAR(100) 	NOT NULL UNIQUE,
	"password" 		VARCHAR(100) 	NOT NULL,
	"role_id" 	INTEGER 	DEFAULT 0,

	PRIMARY KEY ("id"),
	FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE

);

DROP TABLE IF EXISTS "films";
CREATE TABLE "films" (
	"id" 		SERIAL 	NOT NULL,
	"name" 		VARCHAR(100) NOT NULL,
	"year" 		VARCHAR(100) NOT NULL,
	"genre" 	VARCHAR(100) NOT NULL,
	"director"	VARCHAR(100) NOT NULL,
	"country" 	VARCHAR(100) NOT NULL,
	"poster" 	TEXT NOT NULL, 
	"description" TEXT ,

	PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "users_films";
CREATE TABLE "users_films" (
	"id" 			SERIAL 	NOT NULL,
	"user_id" INTEGER NOT NULL,
	"film_id" INTEGER NOT NULL,
	"status" BOOLEAN NOT NULL,
	"rating" INTEGER DEFAULT 0 ,

	PRIMARY KEY ("id"),
	UNIQUE  ("user_id", "film_id"),
	FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE "users_films" ADD CONSTRAINT rating_check 
CHECK (
	rating >= 0
	AND rating <= 10
	
);	

