const mysql = require('mysql2');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

//create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chat'
});

module.exports.connection = connection;