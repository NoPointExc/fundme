var passport = require('passport');
var Strategy = require('passport-github').Strategy;
var user = require('./user');

var config = require('./config');
var log = config.log();

const github = {
    clientID: '8777061ab9710807ffc1',
    clientSecret: '50da71821a60d9ce71d464405bf9bad976d32b0f',
    callbackURL: 'http://localhost:3000/users/login/github/return'
};

passport.use('github-login',new Strategy(github,
  function(accessToken, refreshToken, profile, cb) {
    log.debug('login');
    log.debug(profile);
    var username = profile.username;
    var picture = profile.avatar_url;
    var address = profile.location;
    var credict_card = profile.id;
    log.debug(username);
    log.debug(profile.location);
    user.get(username, function(error, result){
	if(error){
	    return cb(null, null);
	}else if(!result){
	    user.save(username, address, credict_card, picture, function(success){
		return cb(null, profile.username);
	    });	    
	}else{
	    return cb(null, null);
	}
    });  
  }));

module.exports = passport;

