const mysql = require('mysql2')

const db = mysql.createPool({
    host    : 'localhost',
    user    : 'root', // your_username
    password: 'your_password', // your_password
    database: 'nimap_products'
});


db.query('SELECT 1', (err) => {
    if (err) {
        console.log('DB connection failed:', err.message);
    } else {
        console.log('MySQL connected successfully');
    }
});

module.exports = db;