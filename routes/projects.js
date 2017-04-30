var express = require('express');
var router = express.Router();
var config = require('../app/config');
var log = config.log();
var project = require('../app/project');
var passport = require('../app/local-passport');
var util = require('../app/util');

/* GET /Project
 *project list:  [num] [after] [category] [keyword]
 *num: 10 by default, from 1 -> INF. 
 *keyword: contains keyword in project description
 *after: the earlist time
 *category: project category
 * */  
router.get('/', function(req, res, next){
    var num = 10;
    if(req.query.num){
	var tmp = parseInt(req.query.num);
	num = (isNaN(tmp) || tmp <= 0)? num : tmp;
    }
    log.debug(req.query.num);
    log.debug(num);
    var after = req.query.after || null;
    var category = req.query.category || null;
    var keyword = req.query.keyword || null;
    
    project.get(num, after, category, keyword, function(error, projects){
	if(error){
	    next(error, null);
	}else{
	    res.json(projects);
	}
    });    
});

//project updates: pname num [after]
router.get('/detail', function(req, res, next){
    var username = passport.authorizedUser(req.session);
    if(!req.query.pname){
	return res.status(400).send('request with uname or pname');
    }else{
	project.detail(req.query.pname, username, function(error, result){
	    log.debug('router project=' + result);
	    if(error){
		next(error, null);
	    }else{
		res.json(result);
	    }
	});	
    }

});

router.get('/comments',function(req, res, next){
    if(!req.query.pname){
	return res.status(400).send('request with uname or pname');
    }else{
	project.comments(req.query.pname, function(error, result){
	    log.debug('router project=' + result);
	    if(error){
		next(error, null);
	    }else{
		res.json(result);
	    }
	});	
    }

});

router.post('/comments',function(req, res, next){
    log.debug('hello'); 
    log.debug(util.now());
    var username = passport.authorizedUser(req.session);
    if(!req.query.pname){
	return res.status(400).send('request with uname or pname');
    }else if(!username){
	return res.status(401).send('login before comment on project');
    }else{
	var text = req.query.text || '';
	project.putComment(req.query.pname, username, util.now(),text, function(error, result){
	    log.debug('router project=' + result);
	    if(error){
		next(error, null);
	    }else{
		res.json(result);
	    }
	});	
    }

});

module.exports = router;
