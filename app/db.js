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
    //var sql = 'SELECT pname, uname, picture, time, amount FROM Pledge NATURAL JOIN Users WHERE uname IN ('+ fellowedUser +');';
    const TABLE = 'Pledge NATURAL JOIN Users';
    const SELECT = ['pname', 'uname', 'picture','time', 'amount'];
    return getSelected(SELECT, TABLE, [['uname IN (' + fellowedUser + ')', username]], done);
}

function getUserComment(username, done){
    const TABLE = 'Comment_project NATURAL JOIN Users';
    const SELECT = ['pname', 'uname', 'picture', 'time', 'comment'];
    return getSelected(SELECT, TABLE, [['uname IN (' + fellowedUser + ')', username]], done);
}

function getFellowedProject(username, done){
    const TABLE = 'User_project NATURAL JOIN Users';
    const SELECT = ['pname', 'uname', 'picture', 'time', 'relation'];
    return getSelected(SELECT, TABLE, [['uname IN (' + fellowedUser + ')', username]], done);
}


function getUser(username){
    return "SELECT * FROM `Users` WHERE `uname`=" + pool.escape(username) + ";";
}

function putUser(username, address, credict_card){
    address = address || null;
    credict_card = credict_card || null;
    return mysql.format('INSERT INTO Users VALUES (?,?,?);', [username, address, credict_card]); 
}

function updateUser(username, address, credict_card, picture, done){
    address = address || null;
    credict_card = credict_card || null;
    const tmp ='UPDATE Users SET address = ?, credict_card = ?, picture = ? WHERE uname = ?;'; 
    var sql = mysql.format(tmp, [address, credict_card, picture, username]); 
    log.debug(sql);
    pool.query(sql, function(error, rows, fields){
	if(error){
	    log.debug(error);
	    return done(false);
	}else{
	    return done(true);
	}
    }); 
}

function where(fields){
    if(!fields || fields.length == 0){
	return '';
    }
    var sql = 'WHERE ' + mysql.format(fields[0][0], fields[0][1]);
    for(i = 1; i < fields.length; i++){
	sql =sql + ' AND ' + mysql.format(fields[i][0], fields[i][1]);
    }
    return sql;
}

function select(fields){
    if(!fields || fields == '*' || fields.length == 0|| fields[0] == '*'){
	return 'SELECT * ';
    }
    var sql = 'SELECT ' + fields[0];
    for(i = 1; i < fields.length; i++){
	sql =sql + ' , ' + fields[i];
    }
    return sql;
}

/*Projects Releated. */
function getProjects(num, fields, done){
    var sql = mysql.format('SELECT * FROM Project '+ where(fields) +' ORDER BY start_time DESC LIMIT ? ;', num);
    log.debug(sql);
    pool.query(sql, done);
} 

/*Projects updates. 
 *fields include pname, type(`text`| `video`| `picture`), keyword serach in content
 * */
function getUpdates(num, fields, done){
    var sql = mysql.format('SELECT * FROM Project_update '+ where(fields) +' ORDER BY time DESC LIMIT ? ;', num);
    log.debug(sql);
    pool.query(sql, done);
} 



function getSelected(fields, table, conditions, done){
    var sql = select(fields) + ' FROM ' + table + ' ' + where(conditions) + ';';
    log.debug(sql);
    pool.query(sql, done);
}

function insert(table, values, done){
    if(values && values.length != 0){
	var tmp = ' ? ';
	for(i=0; i < values.length - 1; i++){
	    tmp = tmp + ', ? ';
	}
	var sql = 'INSERT INTO ' + table + ' VALUES (' + tmp + ' );'
	log.debug(sql);
	sql = mysql.format(sql, values);
	log.debug(sql);
	pool.query(sql, function(error, rows, fields){
	    if(error){
		return done(false);
	    }else{
		return done(true);
	    }
	});
    }else{
	throw new error('undefined values for insert qury.');
    } 
}

function remove(table, conditions, done){
    log.debug(conditions);
    if(conditions && conditions.length != 0){
	var tmp = ' ? ';
	for(i=0; i < conditions.length - 1; i++){
	    tmp = tmp + ', ? ';
	}
	var sql = 'DELETE FROM ' + table +' '+ where(conditions) + ';';
	sql = mysql.format(sql, conditions);
	log.debug(sql);
	pool.query(sql, function(error, rows, fields){
	    if(error){
		return done(false);
	    }else{
		return done(true);
	    }
	});
    }else{
	return done(false);
    } 
}

module.exports.sql ={
    'getUser': getUser,
    'putUser': putUser,
    'getReleatedUpdate': getReleatedUpdate,
    'select': getSelected,
    'insert': insert,
    'remove': remove
};

module.exports.user = {
    'getAccount': getAccount,
    'putAccount': putAccount,
    'updateProfile': updateUser,
    'getPledge': getUserPledge,
    'getComment': getUserComment,
    'getFellowedProject':getFellowedProject
};

module.exports.project = {
    'getProjects':getProjects,
    'getUpdates':getUpdates
};

module.exports.pool = pool;
