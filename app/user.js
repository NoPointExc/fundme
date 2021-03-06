var db = require('./db');
var config = require('./config');
log = config.log();
const randomPuppy = require('random-puppy');

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

function save(username, address, credit_card, picture, done){
    if(username){
	db.sql.select(['address', 'credit_card', 'picture'], 'Users', [['uname = ?', username]], function(error, rows, fields){
	    if(error){
		log.debug(error);
		return done(false);
	    }else{
		if(rows.length == 0){
		    address = address || null;
		    credit_card = credit_card||null;
		    //picture = picture||'https://www.drupal.org/files/profile_default.png';
		    if(!picture){
			randomPuppy().then(function(url){
			    return db.sql.insert('Users', [username, address, credit_card, url], done);
			});
		    }else{
			return db.sql.insert('Users', [username, address, credit_card, picture], done);
		    }
		}else{
		    log.debug(rows);
		    address = address || rows[0].address;
		    credit_card = credit_card || rows[0].credit_card;
		    picture = picture || rows[0].picture;
		    return update(username, address, credit_card, picture, done); 
		}
	    }
	});
    }else{
	return done(false);
    }
}

function update(username, address, credit_card, picture, done){
    log.debug('username=' + username + ' address=' + address + ' credit=' + credit_card + ' pic=' + picture);
    if(username && (address || credit_card || picture)){
	db.user.updateProfile(username, address, credit_card, picture, done);	
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
	var table = 'Follow_user JOIN Users ON Follow_user.'+out+'=Users.uname';
	db.sql.select([out, 'picture'], table,[[condition, username]], function(error, rows, fields){
	    return done(true, rows);
	});		
    }else{
	return done(false, null);
    }
}

function getPledges(username, projectname, done){
    if(username){
	var conditions = [['Pledge.uname = ?', username]];
	if(projectname){
	    conditions.push(['Pledge.pname = ? ' , projectname]);
	}
	var out = ['Pledge.uname', 'Pledge.pname', 'time', 'amount', 'picture', 'status'];
	const table = 'Pledge JOIN Project ON Pledge.pname=Project.pname';
	db.sql.select(out, table, conditions, function(error, rows, fields){
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

function getRates(username, projectname, done){
    if(username){
	var conditions = [['uname = ?', username]];
	if(projectname){
	    conditions.push(['pname = ? ' , projectname]);
	}
	db.sql.select(['*'], 'Rate', conditions, function(error, rows, fields){
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

function getLikes(uname, done){
    if(!uname){
	return done(false, null);
    }
    var table = 'User_project JOIN Project ON User_project.pname=Project.pname';
    var out = ['Project.pname', 'Project.uname AS owner','description', 'category', 'status ', 'picture '];
    sql.sql.select(out, table, [['User_project.uname=?', uname], ['relation=?','like']],function (error, rows, fields){
	if(error){
	    return done(false, null);
	}else{
	    return done(true, rows);
	}
    }); 
}


module.exports.save = save;
module.exports.follow = follow;
module.exports.getFollows = getFollows;
module.exports.get = get;
module.exports.pledges = getPledges;
module.exports.rates = getRates;
module.exports.likes = getLikes;
