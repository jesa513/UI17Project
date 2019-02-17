
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'jesa',
    password: 'jesa123',
    database: 'gooffice',
    port: 3306
})

module.exports = conn;