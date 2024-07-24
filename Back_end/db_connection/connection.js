const mysql = require('mysql2');

//Connecting with the SQL Server
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'hippotherapy',
}).promise();

// Export the pool object for use in other modules
module.exports = pool;