var express = require('express');
var router = express.Router();
var passport = require('../app/local-passport');

/* GET login and signup main page*/
router.get('/', function(req, res, next) {
    res.send('respond with users infomation page');
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
