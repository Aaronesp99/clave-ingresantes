const mysql = require('mysql');

module.exports = mysql.createConnection({
    host: '9.9.9.9',
    user: 'OERAAE-05',
    password: '123',
    database: 'oeraae_estandar'
});
