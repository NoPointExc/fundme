var db = require('./db');
var config = require('./config');
log = config.log();

function get(username, done){
    if(username){
	db.sql.select(['*'], 'Users', [['uname = ?', username]], function(error, rows, fields){
	    if(error || !rows || rows.length != 1){
		return done(error, null);
	    }else{
		return done(null, rows[0]);
	    }
	});
    }else{
	return done(error, null);
    } 
}

function save(username, address, credict_card, picture, done){
    if(username){
	db.sql.select(['address', 'credict_card', 'picture'], 'Users', [['uname = ?', username]], function(error, rows, fields){
	    if(error){
		log.debug(error);
		return done(false);
	    }else{
		if(rows.length == 0){
		    address = address || null;
		    credict_card = credict_card||null;
		    picture = picture||'https://www.drupal.org/files/profile_default.png';
		    return db.sql.insert('Users', [username, address, credict_card, picture], done);
		}else{
		    log.debug(rows);
		    address = address || rows[0].address;
		    credict_card = credict_card || rows[0].credict_card;
		    picture = picture || rows[0].picture;
		    return update(username, address, credict_card, picture, done); 
		}
	    }
	});
    }else{
	return done(false);
    }
}

function update(username, address, credict_card, picture, done){
    log.debug('username=' + username + ' address=' + address + ' credict=' + credict_card + ' pic=' + picture);
    if(username && (address || credict_card || picture)){
	db.user.updateProfile(username, address, credict_card, picture, done);	
    }else{
	log.debug('lack paramete');
	return done(false);
    }
}

function fellow(fellower, fellowed, done){
    if(fellower && fellowed){
	db.sql.insert('Fellow_user', [fellower, fellowed], done);	
    }else{
	return done(false);
    }
}

function getFellowing(username, done){
    if(username){
	db.sql.select(['fellowed_uname'], 'Fellow_user',[['fellower_uname = ?', username]], function(error, rows, fields){
	    return done(true, rows);
	});		
    }else{
	return done(false, null);
    }
}

module.exports.save = save;
module.exports.fellow = fellow;
module.exports.getFellowing = getFellowing;
module.exports.get = get;
