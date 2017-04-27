var express = require('express');
var router = express.Router();
var updates = require('../app/updates');
var config = require('../app/config')
var log = config.log();

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

router.get('/activities', function(req, res, next){
    var username = req.query.uname || null;
    
    if(username){
	updates.getUserNews(username, function(error, news){
	    res.json(news);
	}); 			
    }else{
	res.status(400).send('request with uname');
    }
});

module.exports = router;
