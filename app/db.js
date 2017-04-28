var mysql = require('mysql');
const config = require('./config');
var log = config.log();

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


/*project-updates*/
function getReleatedProject(username){
    var sql = "SELECT pname FROM User_project WHERE uname = ?"; 
    sql += "UNION SELECT pname FROM Project WHERE uname = ?";
    sql += "UNION SELECT pname FROM Pledge WHERE uname = ?";
    return mysql.format(sql, [username, username, username]);
}

function getReleatedUpdate(username){
    var sql_pname = getReleatedProject(username);
    sql = "SELECT * FROM Project_update WHERE pname IN (" + sql_pname + ");";
    return sql;
}

function getUpdate(projectname){
    return mysql.format("SELECT * FROM Project_update WHERE pname = ?", [projectname]);
}


/*Users'comment, pledge, like and fellow*/
const fellowedUser = 'SELECT fellowed_uname FROM Fellow_user WHERE fellower_uname = ?';

//TODO: rename methods from get to query
function getUserPledge(username, done){
    var sql = 'SELECT pname, time, amount FROM Pledge WHERE uname IN ('+ fellowedUser +');';
    sql = mysql.format(sql, username);
    return pool.query(sql, done);
}

function getUserComment(username, done){
    sql = 'SELECT pname, time, comment FROM Comment_project WHERE uname IN ('+ fellowedUser +');';	
    sql = mysql.format(sql, [username]);	
    log.debug(sql);
    return pool.query(sql, done);
}

function getFellowedProject(username, done){
    var sql = mysql.format('SELECT pname, time, relation FROM User_project WHERE uname IN ('+ fellowedUser +');', [username]);
    return pool.query(sql, done);
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

module.exports.sql ={
    'getUser': getUser,
    'putUser': putUser,
    'updateUser': updateUser,
    'getReleatedUpdate': getReleatedUpdate,
};

module.exports.user = {
    'getAccount': getAccount,
    'putAccount': putAccount,
    'getPledge': getUserPledge,
    'getComment': getUserComment,
    'getFellowedProject':getFellowedProject
}

module.exports.pool = pool;
