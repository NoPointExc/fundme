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

function follow(follower, followed, done){
    if(follower && followed){
	db.sql.insert('Follow_user', [follower, followed], done);	
    }else{
	return done(false);
    }
}

function getFollows(username, relation, done){
    log.debug(relation);
    if(username){
	var out = 'follower_uname';   
	var condition = 'followed_uname = ?';
	if(relation == 'following'){
	    out = 'followed_uname';
	    condition = 'follower_uname = ?';   
	}
	db.sql.select([out], 'Follow_user',[[condition, username]], function(error, rows, fields){
	    return done(true, rows);
	});		
    }else{
	return done(false, null);
    }
}

function getPledges(username, projectname, done){
    if(username){
	var conditions = [['uname = ?', username]];
	if(projectname){
	    conditions.push(['pname = ? ' , projectname]);
	}
	db.sql.select(['*'], 'Pledge', conditions, function(error, rows, fields){
	    if(error){
		return done(false, null);
	    }else{
		return done(true, rows);
	    }
	});
    }else{
	return done(false, null);
    }
}

module.exports.save = save;
module.exports.follow = follow;
module.exports.getFollows = getFollows;
module.exports.get = get;
module.exports.pledges = getPledges;
