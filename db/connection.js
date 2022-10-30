const mysql = require('mysql2')
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'naswa4ef',
        database: 'company'
    },
    console.log('Connected to company database.')
);

module.exports = db;