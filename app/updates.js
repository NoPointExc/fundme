var db = require('../app/db');
var config = require('./config');
log = config.log();
var news = require('../module/news');

//function done(error, updates)
function getUpdates(sql, done){
    log.debug('execute sql: '+sql);
    db.pool.query(sql, function(error, rows, fields){
	if(error){
	    log.debug('sql error when execute ' + sql);
	    return done(error, null);
	}else{
	    //TODO: parse mysql rows into JSON
	    //log.debug(rows);
	    return done(null, rows);
	}
    });
}

function getUpdatesByUser(username, done){
    var sql = db.sql.getReleatedUpdate(username);
    return getUpdates(sql, done);
}

//function done(error, updates)
function getUpdateByProject(projectname, done){
    var sql = db.sql.getUpdate(projectname);
    return getUpdates(sql, done);
}

//get user related events.
//1) Comments.
//2) Pledges.
//3) user_project: fellow or like projects
//function done(error, news)
function getUserNews(username, done){
    var count = 0;
    var rst = [];
    function onSqlDone(error, rows, fields){
	count++;
	if(!error){
	    rst = rst.concat(news.newsList(fields[0].table, rows));
	}
	if(count == 3){
	    return done(null, rst);
	}
    }
    //tmpDone(null, [1]);
    db.user.getComment(username, onSqlDone);
    db.user.getPledge(username, onSqlDone);
    db.user.getFellowedProject(username, onSqlDone);
}

module.exports.getUpdatesByUser = getUpdatesByUser;
module.exports.getUpdateByProject = getUpdateByProject;
module.exports.getUserNews = getUserNews;
