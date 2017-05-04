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
 * @api {get} users/follow get followed or following users
 * 
 * @apiParam {string} uname username
 * @apiParam {string} relation [followedBy|following], if not given, default as followedBy.
 * @apiDescription login required. return followd or following users name and picture. 
 * @apiGroup user
 * @apiSuccessExample {json} success response: http://localhost:3000/users/follow/?uname=Jiayang
 * [
 * {
 *   "follower_uname": "BobInBrooklyn",
 *   "picture": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
 * }
 *]
 */
router.get('/follow', function(req, res, next){
    var username = req.query.uname;
    if(!username){
	return res.status(400).send('incomplete paramters');
    }else{
	log.debug(username);
	var relation = req.query.relation;
	log.debug(relation != 'following');
	if(relation != 'followedBy' && relation != 'following'){
	    relation = 'followedBy';
	}
	log.debug(relation);
	user.getFollows(username, relation, function(success, result){
	    if(success){
	        return res.json(result);
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }
    
});


/**
 * @api {post} users/follow follow other user
 * @apiGroup user
 * @apiParam uname username of user to follow.
 */
router.post('/follow', function(req, res,next){
    var username = passport.authorizedUser(req.session);
    if(!req.query.uname){
	return res.status(400).send('request with incomplete paramenaters');
    }else if(!username){
	return res.status(401).send('login required');
    }else{
	log.debug(username);
	user.follow(username, req.query.uname, function(success){
	    if(success){
	        return res.status(200).send('success');
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }
});


/**
 * @api {get} users/pledge get pledge records
 * 
 * @apiParam {string} pname not required. default return all pledges if not given
 * @apiDescription login in required. return pledges records 
 * @apiGroup user
 * @apiSuccessExample {json} success-response: http://localhost:3000/users/pledge/?pname=A wall
 * [
 * {
 *   "uname": "Jiayang",
 *   "pname": "A Wall",
 *   "time": "1970-01-01T05:00:02.000Z",
 *   "amount": 200
 * }
 * ]
 */
router.get('/pledge', function(req, res, next){
 var username = passport.authorizedUser(req.session);
    if(username){
	user.pledges(username, req.query.pname, function(success, rst){
	    if(!success){
		res.status(400).send('error');
	    }else{
		res.json(rst);
	    }
	});
    }else{
	res.status(401).send('login in required.');
    }
});

/**
 * @api {get} users/rate get rate records
 * 
 * @apiParam {string} pname not required. default return all rates if not given
 * @apiDescription login in required. return rates records 
 * @apiGroup user
 * @apiSuccessExample {json} success-response: http://localhost:3000/users/rate/
 * [
 *  {
 *    "uname": "Jiayang",
 *    "pname": "Buy me a game",
 *    "time": "1970-01-01T05:00:02.000Z",
 *    "rate": 5
 *  },
 *  {
 *    "uname": "Jiayang",
 *    "pname": "Database Project",
 *    "time": "1970-01-01T05:00:02.000Z",
 *    "rate": 5
 *  },
 *  {
 *    "uname": "Jiayang",
 *    "pname": "New Shield",
 *    "time": "2016-01-03T17:04:24.000Z",
 *    "rate": 1
 *  }
 *]
*/
router.get('/rates', function(req, res, next){
 var username = passport.authorizedUser(req.session);
    if(username){
	user.rates(username, req.query.pname, function(success, rst){
	    if(!success){
		res.status(400).send('error');
	    }else{
		res.json(rst);
	    }
	});
    }else{
	res.status(401).send('login in required.');
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
 * @api {post} users/login login request
 * @apiDescription post login request
 * @apiGroup user
 * @apiParam {String} uname user name
 * @apiParam {String} password password 
 */
router.post('/login', passport.authenticate('local-login'), function(req, res){
    log.debug(res);
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
