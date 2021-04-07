const mysql = require('mysql');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bismillah',
    database: 'daftar_belanja'
})

module.exports = connect;