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

    db.user.getAccount(username, onSqlDone);
    function onSqlDone(error, account){
	log.debug('in=' + password);
	if(error){
	    return done(error, false);
	}else if(account){
	    log.debug('uname = ' + account.uname);
	    log.debug('input=' + account.password);
	    ecypt = credential();
	    ecypt.verify(account.password, password, function (error, isValid){
		if(error){
		    return done(error, false);
		}else if(isValid){
		    log.debug('password is valid');
		    return done(null, username);
		}else{
		    log.debug('password is valid');
		    return done(null, false);
		}
	    });
	}else{
	    return done(null, false);
	}
    }
}

function signup(username, password, done){
    if(!valid(username, password)){
	return done(null, false, {message : 'invalid password or username length'});
    }else{
	db.user.getAccount(username, onGetAccountDone);
    }

    function onGetAccountDone(error, account){
	if(error){
	    return done(error, false);
	}else if(account){
	    log.debug('username exists');
	    return done(null, false, {message: 'user name exists'});
	}else{
	    //hash and salt password
	    ecypt = credential();
	    ecypt.hash(password, function(error, hash){
		if(error){
		    done(error, false);
		}else{
		    db.user.putAccount(username, hash, onPutAccountDone);    
		}
	    }); 
	}
    }

    function onPutAccountDone(error, success){
	if(error){
	    return done(error, false);
	}else{
	    return done(null, success)
	}
    }
}

function authorizedUser(session){
    var username = null;
    log.debug(session);
    if(session){
	if(session.passport){
	    username = session.passport.user;
	}
    }
    return username;
}

function logout(session){
    var username = authorizedUser(session);
    if(username){
	session.passport = null;
	return true;
    }
    return false;
}

passport.use('local-login', new LocalStrategy(verify));
passport.use('local-signup', new LocalStrategy(signup));

const github = {
    clientID: '8777061ab9710807ffc1',
    clientSecret: '50da71821a60d9ce71d464405bf9bad976d32b0f',
    callbackURL: 'http://localhost:3000/login/github/return'
};

passport.use('github-login',new Strategy(github,
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's github profile is supplied as the user
    // record.  In a production-quality application, the github profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

passport.authorizedUser = authorizedUser;
passport.logout = logout;
//log.debug("local-passport initlized");
module.exports = passport;
