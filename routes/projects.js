var express = require('express');
var router = express.Router();
var config = require('../app/config');
var log = config.log();
var project = require('../app/project');
var passport = require('../app/local-passport');
var util = require('../app/util');

/**
 * @api {get} /projects/ get projects
 * @apiGroup Project
 * @apiDescription from newest to oldest in json format, any paramenters is alternative.
 * @apiParam {int} num 10 by default, from 1 -> INF. 
 * @apiParam {String} keyword contains keyword in project description
 * @apiParam {time} after the earlist time
 * @apiParam {string} category project category
 */
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

/**
 * @api {get} /projects/detail get project detail
 * @apiDescription project detail and likes and fellow data in json 
 * @apiGroup Project
 *
 * @apiParam {String} pname project name
 */
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

/**
 * @api {get} /projects/comments get user comments
 * @apiName getComments
 * @apiGroup Project
 *
 * @apiParam {String} pname project name to comment. 
 */
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

/**
 * @api {post} /projects/comments post user comments
 * @apiName PostUserComment
 * @apiGroup Project
 *
 * @apiParam {string} pname project name to comment. 
 * @apiParam {string} text comment texts
 */
router.post('/comments',function(req, res, next){
    log.debug(util.now());
    var username = passport.authorizedUser(req.session);
    if(!req.query.pname || !req.query.text){
	return res.status(400).send('request with uname or pname');
    }else if(!username){
	return res.status(401).send('login before comment on project');
    }else{
	var text = req.query.text || '';
	project.putComment(req.query.pname, username, util.now(),text, function(success){
	    if(success){
	        return res.status(200).send('success');
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }

});

/**
 * @api {post} /projects/relation like or fellow a project
 * @apiDescription set = true to like(fellow) a project, or false to cancel. Must login to post
 * @apiName Like&Fellow
 * @apiParam {boolean} set
 * @apiParam {string} pname project name
 * @apiParam {string} releation(like|fellow) between user and project
 * @apiGroup Project
 */
router.post('/relation', function(req,res,next){
    var username = passport.authorizedUser(req.session);
    if(!req.query.pname ||!req.query.relation || (req.query.relation!='like' && req.query.relation != 'fellow')|| (req.query.set != 'true' && req.query.set != 'false') ){
	return res.status(400).send('request with pname and like');
    }else if(!username){
	return res.status(401).send('login before this post');
    }else{
	log.debug(req.query.set);
	project.setRelation(req.query.pname, username, util.now(), req.query.relation,req.query.set=='true', function(success){
	    if(success){
		return res.status(200).send('success');
	    }else{
		return res.status(400).send('failed');
	    }
	});
    }
});

/**
 * @api {post} /projects/pledge post pledge
 * @apiName PostPledge
 * @apiGroup Project
 *
 * @apiParam {string} pname project name to comment.
 * @apiParam {double} amount of funding
 */
router.post('/pledge',function(req, res, next){
    log.debug(util.now());
    var username = passport.authorizedUser(req.session);
    if(!req.query.pname || !req.query.amount){
	return res.status(400).send('request with incomplete paramenaters');
    }else if(!username){
	return res.status(401).send('login before comment on project');
    }else{
	var amount = req.query.amount || 0;
	project.pledge(req.query.pname, username, util.now(),amount, function(success){
	    if(success){
	        return res.status(200).send('success');
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }

});

/**
 * @api {get} /projects/updates get project updates
 * @apiGroup Project
 * @apiDescription from newest to oldest in json format, any paramenters is alternative.
 * 
 * @apiParam {string} pname name of project, required paramenter.
 * @apiParam {int} num 10 by default, from 1 -> INF. 
 * @apiParam {String} keyword search keyword in text updates
 * @apiParam {time} after the earlist time
 * @apiParam {string} type project updates type, can be `text`, `video` and `picture` 
 */
router.get('/updates', function(req, res, next){
    var num = 10;
    if(!req.query.pname){
	return res.status(400).send('incomplete paraments');
    }
    if(req.query.num){
	var tmp = parseInt(req.query.num);
	num = (isNaN(tmp) || tmp <= 0)? num : tmp;
    }
    log.debug(req.query.num);
    log.debug(num);
    var after = req.query.after || null;
    var type = req.query.type || null;
    var keyword = req.query.keyword || null;

    project.getUpdates(num, after, type, keyword, function(error, projects){
	if(error){
	    return next(error, null);
	}else{
	    return res.json(projects);
	}
    });    
});

module.exports = router;
