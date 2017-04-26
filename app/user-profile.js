var db = require('./db');
var config = require('./config');
log = config.log();

function save(username, address, credict_card, done){
    var sql_getuser = db.sql.getUser(username);
    db.pool.query(sql_getuser, function(error, rows,fields){
	if(error){
	    log.error('sql error when execute ' + sql_getuser);
	    return done(error);
	}else if(rows.length == 0){
	    //user profile not exist, create new one
	    var sql_putuser = db.sql.putUser(username, address, credict_card);
	    db.pool.query(sql_putuser, function(error, rows, fields){
		if(error){
		    log.error('sql error when execute ' + sql_putuser);
		    return done(error);
		}
	    });
	}else{
	    //user profile already exists, update it. 
	    var sql_updateuser = db.sql.updateUser(username, address, credict_card);
	    db.pool.query(sql_updateuser, function(error, rows, fields){
		if(error){
		    log.error('sql error when execute ' + sql_updateuser);
		    return done(error);
		}

	    });
	}
	return done(null);
    });
}

module.exports.save = save;
