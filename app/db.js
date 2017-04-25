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

function getUser(username){
    return "SELECT * FROM `Users` WHERE `uname`=" + pool.escape(username) + ";";
}

function putUser(username, address, credict_card){
    address = address || null;
    credict_card = credict_card || null;
    return mysql.format('INSERT INTO Users VALUES (?,?,?);', [username, address, credict_card]); 
}

function updateUser(username, address, credict_card){
    address = address || null;
    credict_card = credict_card || null;
    return mysql.format('UPDATE Users SET address = ?, credict_card = ?) WHERE uname = ?;', [address, credict_card, username]); 
}

//START TRANSACTION;
//INSERT INTO table1 VALUES ('1','2','3');
//INSERT INTO table2 VALUES ('bob','smith');
//COMMIT;

module.exports.sql ={
    'getAccount': getAccount,
    'putAccount': putAccount,
    'getUser': getUser,
    'putUser': putUser,
    'updateUser': updateUser
};

module.exports.pool = pool;


