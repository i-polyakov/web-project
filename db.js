const  pg  = require("pg");

require("dotenv").config();

const pool = new pg.Pool({
	user: "postgres",
	password: "root",
	host: "localhost",
	port: 5432,
	database: "filmsfinder_db"

});



module.exports = pool ;



