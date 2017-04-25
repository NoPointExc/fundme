var express = require('express');
var router = express.Router();
var passport = require('../app/local-passport');
var profile = require('../app/user-profile');

/* GET user profile page*/
router.get('/', function(req, res, next) {
    //TODO: get profile here
    res.send('respond with users infomation page');
});

/*POST user profile*/
router.post('/', function(req, res, next){
    var username = req.query.username || null;
    if(username == null && req.session){
	username = req.session.passport.user; 
    }
    if(username){
	profile.save(username, req.query.address, req.query.credict_card, function(errors, done){
	    if(errors){
		log.error('error when save profile');
		return next(errors);
	    }
	    if(done){
		res.send('success');
	    }else{
		res.send('failed');
	    }
	});	
    }else{
	log.debug('underfined username in userproile query');
	res.status(401).send('username must be specified when update profile.');
    }
});

/* GET users login page. */
router.get('/login', function(req, res, next) {
    if(req.session.passport){
	res.redirect('/');
    }else{
	//TODO: render login page.
	//res.send('render login page');
    }
});

/* POST users login request*/
router.post('/login', passport.authenticate('local-login', 
	    {successRedirect:'/' ,failureRedirect: '/login?message=wrong username or passowrd'}));

/* GET users signup page. */
router.get('/signup', function(req, res, next) {
    //TODO:  render sign up page
    res.send('render signup page');
});

/* POST users signup request*/
router.post('/signup', passport.authenticate('local-signup', 
	    {successRedirect:'/' , failureRedirect: '/login?message=username exsits, try to login'}));

module.exports = router;
