const mysql = require('mysql2'); 

const mysqlConnection = mysql.createPool({
    user: 'admin',
    password: 'password',
    host: '20.38.12.77',
    database:'tienditaMiLuzDB'
});

module.exports = mysqlConnection;