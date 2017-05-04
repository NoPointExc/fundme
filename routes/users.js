var express = require('express');
var router = express.Router();
var passport = require('../app/local-passport');
var user = require('../app/user');

/**
 * @api {post} users/ post user profile
 * @apiDescription update or save user profiles, login required.   
 * @apiGroup user
 * @apiParam {string} address user address, default as empty if not provided
 * @apiParam {string} credict_card users' credict card, default as empty is not procided.
 * @apiParam {url} picture url of profile picture, default as 'https://www.drupal.org/files/profile_default.png' is not provided.
 */
router.post('/', function(req, res, next){
    var username = passport.authorizedUser(req.session);
    if(username){
	user.save(username, req.query.address, req.query.credict_card, req.query.picture, onSaved);
    }else{
	res.status(401).send('login in required.');
    }
    
    function onSaved(success){
	if(!success){
	    res.status(400).send('failed');
	}else{
	    res.status(200).send('success');
	}
    }
});

/**
 * @api {get} users/ get user profile
 * @apiDescription get user profile, login required.   
 * @apiGroup user
 */
router.get('/', function(req, res, next){
    var username = passport.authorizedUser(req.session);
    if(username){
	user.get(username, function(error, profile){
	    if(error){
		res.status(400).send('error');
	    }else{
		res.json(profile);
	    }
	});
    }else{
	res.status(401).send('login in required.');
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
 * @api {post} users/login login request
 * @apiDescription post login request
 * @apiGroup user
 * @apiParam {String} uname user name
 * @apiParam {String} password password 
 */
router.post('/login', passport.authenticate('local-login'), function(req, res){
    res.status(200).send('success');
});

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
 * @api {post} users/signup signup request
 * @apiDescription post signup request
 * @apiGroup user
 * @apiParam {String} uname user name
 * @apiParam {String} password password 
 */
router.post('/signup', passport.authenticate('local-signup'), function(req, res){
    res.status(200).send('success');
});

module.exports = router;
