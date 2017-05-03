var express = require('express');
var router = express.Router();
var updates = require('../app/updates');
var config = require('../app/config')
var log = config.log();

/**
 * @api {get} newsfeed/projects/ get project newsfeed
 * @apiGroup newsfeed
 * @apiDescription when uname is given, return user fewllow or liked projects' news; when pname is given, return project releated news.
 * @apiParam {String} uname username name
 * @apiParam {String} pname project name
 */
router.get('/project', function(req, res, next){
    var username = req.query.uname || null;
    var projectname = req.query.pname || null;
    log.debug(username); 
    function handleUpdates(error, updates){
	if(error){
	    return next(error);
	}else{
	    log.debug(updates);
	    res.json(updates);
	} 
    }
    if(projectname){
	updates.getUpdateByProject(projectname, handleUpdates);
    }else if(username){
	updates.getUpdatesByUser(username, handleUpdates);
    }else{
	res.status(400).send('request with uname or pname');
    }
});

/**
 * @api {get} newsfeed/activities/ get user newsfeed
 * @apiDescription get fellowed users' pledges, comments, fellow and likes
 * @apiGroup newsfeed
 *
 * @apiParam {String} uname username name
 * @apiParam {String} pname project name
 */
router.get('/activities', function(req, res, next){
    var username = req.query.uname || null;
    if(username){
	updates.getUserNews(username, function(error, rst){
	    if(error){
		return res.status(400).send('failed');
	    }else{
		return res.json(rst);
	    }
	});	
    }else{
	return res.status(400).send('request with uname');
    }
});

module.exports = router;
