var mysql = require('mysql');
const config = require('./config');

var pool = mysql.createPool(config.mysql);

//mysql example: https://www.npmjs.com/package/mysql
function getAccount(username) {
    return "SELECT `password` FROM `Account` WHERE `uname`=" + pool.escape(username) + ";";
}

function putAccount(username, password){
    return mysql.format('INSERT INTO Account VALUES (?,?);', [username, password]); 
}

module.exports.sql ={
    'getAccount': getAccount,
    'putAccount': putAccount
};

module.exports.pool = pool;



