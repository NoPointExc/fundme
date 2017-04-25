var mysql = require('mysql');
const config = require('./config');
var log = config.log();

var pool = mysql.createPool(config.mysql);
//mysql example: https://www.npmjs.com/package/mysql
function getAccount(username) {
    return "SELECT `password` FROM `Account` WHERE `uname`=" + pool.escape(username) + ";";
}

function putAccount(username, password){
    return mysql.format('INSERT INTO Account VALUES (?,?);', [username, password]); 
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


module.exports.sql ={
    'getAccount': getAccount,
    'putAccount': putAccount,
    'getReleatedUpdate': getReleatedUpdate,
    'getUpdate':getUpdate
};

module.exports.user = {
    'getPledge': getUserPledge,
    'getComment': getUserComment,
    'getFellowedProject':getFellowedProject
}; 

module.exports.pool = pool;


