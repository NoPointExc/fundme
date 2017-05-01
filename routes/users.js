var express = require('express');
var router = express.Router();
var passport = require('../app/local-passport');
var user = require('../app/user');

/**
 * @api {get} users/ get user profile page
 * @apiGroup user
 *
 */
router.get('/', function(req, res, next) {
    res.send('respond with users infomation page');
});

/**
 * @api {post} users/ post user profile
 * @apiDescription post user information. Must login before post 
 * @apiGroup user
 * @apiParam {String} uname user name
 * @apiParam {String} address user address
 * @apiParam {String} credict_card users' credict card
 */
router.post('/', function(req, res, next){
    var username = passport.authorizedUser(req.session);
    if(username){
	user.save(username, req.query.address, req.query.credict_card, onSaved);
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

/**
 * @api {get} users/fellow get fellowed users
 * 
 * @apiParam {string} uname username of fellower
 * @apiDescription login required. 
 * @apiGroup user
 */
router.get('/fellow', function(req, res, next){
    var username = req.query.uname;
    if(!username){
	return res.status(400).send('incomplete paramters');
    }else{
	log.debug(username);
	user.getFellowing(username, function(success, result){
	    if(success){
	        return res.json(result);
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }
    
});


/**
 * @api {post} users/fellow fellow other user
 * @apiGroup user
 * @apiParam uname username of user to fellow.
 */
router.post('/fellow', function(req, res,next){
    var username = passport.authorizedUser(req.session);
    if(!req.query.uname){
	return res.status(400).send('request with incomplete paramenaters');
    }else if(!username){
	return res.status(401).send('login required');
    }else{
	log.debug(username);
	user.fellow(username, req.query.uname, function(success){
	    if(success){
	        return res.status(200).send('success');
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }
});

/**
 * @api {get} users/login get login page
 * @apiGroup user
 *
 */
router.get('/login', function(req, res, next) {
    if(passport.authorizeduser(req.session)){
	res.redirect('/');
    }else{
	//TODO: render login page.
	//res.send('render login page');
    }
});

/**
 * @api {post} users/login login request
 * @apiDescription post login request
 * @apiGroup user
 * @apiParam {String} uname user name
 * @apiParam {String} password password 
 */
router.post('/login', passport.authenticate('local-login', 
	    {successRedirect:'/'}));

/**
 * @api {post} users/logout logout request
 * @apiDescription post logout request, login user required
 * @apiGroup user
 */
router.post('/logout', function(req, res, next){
    if(passport.logout(req.session)){
	res.status(200).send('success');
    }else{
	res.status(401).send('failed');
    } 
});

/**
 * @api {get} users/signup get signup page
 * @apiGroup user
 *
 */
router.get('/signup', function(req, res, next) {
    //TODO:  render sign up page
    res.send('render signup page');
});

/**
 * @api {post} users/signup signup request
 * @apiDescription post signup request
 * @apiGroup user
 * @apiParam {String} uname user name
 * @apiParam {String} password password 
 */
router.post('/signup', passport.authenticate('local-signup', 
	    {successRedirect:'/' }));

module.exports = router;
