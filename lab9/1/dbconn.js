// dbconn.js

const { dbhost, dbuser, dbpassword, dbdatabase } = require('../db.cjs');

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: dbhost,
    user: dbuser,
    password: dbpassword, 
    database: dbdatabase
});

// open the MySQL connection
conn.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = conn;
