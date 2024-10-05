const mysql = require('mysql2');
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "meeting_schedule",
    password: "Welcome@123"
})

module.exports = pool.promise();