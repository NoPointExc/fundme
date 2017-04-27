var mysql = require('mysql');
const config = require('./config');

var pool = mysql.createPool(config.mysql);

//mysql example: https://www.npmjs.com/package/mysql
//function done(error, account)
function getAccount(username, done) {
    var sql =  'SELECT * FROM Account WHERE uname=?;';
    sql = mysql.format(sql, username);
    log.debug(sql);
    pool.query(sql, function(error, rows, fields){
	//log.debug("query account for " + username);
	if(error){
	    log.error('query error');
	    return done(error, null);
	}else if(rows[0]){
	    log.debug(rows);
	    //log.debug('uname= ' + rows[0].uname);
	    log.debug('password = ' + rows[0].password);
	    return done(null, rows[0]);
	}
	return done(null, null);
    });
}

//function don(error, success)
function putAccount(username, password, done){
    var sql = mysql.format('INSERT INTO Account VALUES (?,?);', [username, password]);
    pool.query(sql, function(error, rows, fields){
	if(error){
	    return done(error, false);
	}else{
	    return done(null, true);
	}
    });
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
    'getUser': getUser,
    'putUser': putUser,
    'updateUser': updateUser
};

module.exports.user = {
    'getAccount': getAccount,
    'putAccount': putAccount,
}

module.exports.pool = pool;
