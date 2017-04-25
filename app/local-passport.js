var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var credential = require('credential');

var db = require('./db');
var config = require('./config');
var log = config.log();

const MAX_UNAME = 38;
const MIN_UNAME = 1;
const MAX_PWD = 38;
const MIN_PWD = 1;

passport.serializeUser(function(username, done) {
    done(null, username);
});

passport.deserializeUser(function(username, done) {
    done(null, username);
});

function valid(username, password){
    return (username.length >= MIN_UNAME && username.length <= MAX_UNAME && password.length >= MIN_PWD && password.length <= MAX_PWD); 
}

function verify(username, password, done){
    if(!valid(username, password)){
	log.debug('invalid password or username length');
	return done(null, false, {message : 'invalid password or username length'});
    }
    sql = db.sql.getAccount(username);
    db.pool.query(sql, function(error, rows, fields){
	log.debug("query ... ");
	if(error){
	    log.debug('error: when execute ' + sql);
	    return(error);
	}
	if(rows.length == 0){
	    //log.debug(rows);
	    return done(null, false, { message: 'Incorrect username.'  });
	}else{
	    ecypt = credential();
	    storedHash = rows[0].password;
	    log.debug(storedHash);
	    ecypt.verify(storedHash, password, function (error, isValid){
		if(error){
		    throw error;
		}
		if(isValid){
		    log.debug("authorized");
		    return done(null, username);
		}
	    });
	}
	return done(null, false, { message: 'Incorrect username.'  });
    });
}

function signup(username, password, done){
    if(!valid(username, password)){
	return done(null, false, {message : 'invalid password or username length'});
    }
    var sql = db.sql.getAccount(username);
    db.pool.query(sql, function(error, rows, fields){
	if(error){
	    log.debug('error: when execute ' + sql);
	    return done(error);
	}
	if(rows.length != 0){
	    log.debug('username exists');
	    //redirect to /login when username exists
	    return done(null, false, {message: 'user exists'});
	}else{
	    //TODO: create new record in Users table
	    //hash + salt
	    var ecypt = credential();
	    ecypt.hash(password, function(error, hashedPassword){
		if(error){
		    return done(error);
		}
		var sql = db.sql.putAccount(username, hashedPassword);
		log.debug(hashedPassword);
		log.debug(sql);
		db.pool.query(sql, function(error, rows, fields){
		    if(error){
			return done(error);
		    }
		    done(null,username);
		});

	    });
	}
    }); 
}

passport.use('local-login', new LocalStrategy(verify));
passport.use('local-signup', new LocalStrategy(signup));
//log.debug("local-passport initlized");
module.exports = passport;
