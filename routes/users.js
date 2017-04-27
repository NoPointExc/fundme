var express = require('express');
var router = express.Router();
var passport = require('../app/local-passport');
var profile = require('../app/user-profile');

/* GET user profile page*/
router.get('/', function(req, res, next) {
    res.send('respond with users infomation page');
});

/* POST user profile*/
router.post('/', function(req, res, next){
    var username = passport.authorizedUser(req.session);
    if(username){
	profile.save(username, req.query.address, req.query.credict_card, onSaved);
    }else{
	log.debug('must login before update profile');
	res.status(401).send('username must be specified when update profile.');
    }
    
    function onSaved(error){
	if(error){
	    log.error('error when save profile');
	    return next(errors);
	}else{
	    res.status(200).send('success');
	}
    }
});

/* GET users login page. */
router.get('/login', function(req, res, next) {
    if(passport.authorizeduser(req.session)){
	res.redirect('/');
    }else{
	//TODO: render login page.
	//res.send('render login page');
    }
});

/* POST users login request*/
router.post('/login', passport.authenticate('local-login', 
	    {successRedirect:'/'}));

/* GET users signup page. */
router.get('/signup', function(req, res, next) {
    //TODO:  render sign up page
    res.send('render signup page');
});

/* POST users signup request*/
router.post('/signup', passport.authenticate('local-signup', 
	    {successRedirect:'/' }));

module.exports = router;
