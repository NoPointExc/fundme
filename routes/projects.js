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
 * @api {post} /projects new project
 * @apiDescription create a new project
 * @apiGroup Project
 *
 * @apiParam {string} pname project name, required parament.
 * @apiParam {string} desp description of the project, default as 'no description given for this project' is not given.
 * @apiParam {string} category category of project, default as 'joke' is not given
 * @apiParam {double} min_fund min-value of fund, default as $100 is not given
 * @apiParam {double} max_fund max-value of fund, default as $9000 is not given
 * @apiParam {date}  start_time start date of the funding, default as now if now given
 * @apiParam {date}  end_time end date of the funding, default is 7 days after start time. 
 * @apiParam {url} picture cover background, default as xingxing's puppy is not given.
 *
 */
router.post('/',function(req, res, next){
    var username = passport.authorizedUser(req.session);
    if(!req.query.pname){
	return res.status(400).send('request with incomplete parameter');
    }else if(!username){
	return res.status(401).send('login before post a new project');
    }else{
	var desp = req.query.desp || 'no description given for this project';
	var category = req.query.category || 'joke';
	var min_fund= parseFloat(req.query.min_fund) || 100.0;
	var max_fund= parseFloat(req.query.max_fund) || 9000.0;
	var start_time = req.query.start_time || util.now();
	var end_time = req.query.end_time || util.after(7);
	var picture = req.query.picture || 'http://cdn2-www.dogtime.com/assets/uploads/2016/08/corgi-puppy-6.jpg';
	project.put(req.query.pname, username, desp, category, min_fund, max_fund, start_time, end_time, 'funding', picture, function(success){
	    if(success){
	        return res.status(200).send('success');
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }
});



/**
 * @api {get} /projects/detail project detail
 * @apiDescription project table, likes/follow and tags in json 
 * @apiGroup Project
 * @apiParam {String} pname project name
 * @apiSuccessExample {json} Success-Response:
 * {
  "detail": {
    "pname": "New suite",
    "uname": "Iron Man",
    "description": "I broke, but I want a new suit",
    "category": "joke",
    "min_fund": 2000,
    "max_fund": 9999.99,
    "current_fund": 100,
    "start_time": "2016-01-03T17:04:23.000Z",
    "end_time": "2018-01-04T17:04:23.000Z",
    "status": "funding",
    "picture": "https://www.wired.com/wp-content/uploads/2015/09/google-logo-1200x630.jpg"
  },
  "followNum": 0,
  "follow": false,
  "likeNum": 1,
  "like": false,
  "tag": [
    {
      "tag": "impossible"
    },
    {
      "tag": "jazz"
    }
  ]
}
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
 * @apiName Comments
 * @apiDescription get user's name, picture and comments for given project
 * @apiGroup Project
 *
 * @apiParam {String} pname project name, required param. 
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
 * @api {get} /projects/categories get all categories
 * @apiGroup Project
 *@apiSuccessExample {json} http://localhost:3000/projects/categories/ 
 * [
 * {
 *   "category": "joke"
 * }
 *]
 */
router.get('/categories',function(req, res, next){
	project.categories(function(success, result){
	    if(!success){
		res.status(400).send('failed');
	    }else{
		res.json(result);
	    }
	});	
});

/**
 * @api {post} /projects/comments user comments
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
 * @api {post} /projects/relation like or follow
 * @apiDescription set = true to like(follow) a project, or false to cancel. Must login to post
 * @apiName Like&Follow
 * @apiParam {boolean} set
 * @apiParam {string} pname project name
 * @apiParam {string} releation(like|follow) between user and project
 * @apiGroup Project
 */
router.post('/relation', function(req,res,next){
    var username = passport.authorizedUser(req.session);
    if(!req.query.pname ||!req.query.relation || (req.query.relation!='like' && req.query.relation != 'follow')|| (req.query.set != 'true' && req.query.set != 'false') ){
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
 * @api {post} /projects/pledge pledge
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
 * @api {get} /projects/updates project updates
 * @apiGroup Project
 * @apiDescription from newest to oldest in json format, any paramenters is alternative.
 * 
 * @apiParam {string} pname name of project.
 * @apiParam {int} num 10 by default, from 1 -> INF. 
 * @apiParam {String} keyword search keyword in text updates
 * @apiParam {time} after the earlist time
 * @apiParam {string} type project updates type, can be `text`, `video` and `picture` 
 */
router.get('/updates', function(req, res, next){
    var num = 10;
    if(req.query.num){
	var tmp = parseInt(req.query.num);
	num = (isNaN(tmp) || tmp <= 0)? num : tmp;
    }
    log.debug(req.query.num);
    log.debug(num);
    var pname =req.query.pname || null;
    var after = req.query.after || null;
    var type = req.query.type || null;
    var keyword = req.query.keyword || null;

    project.getUpdates(pname, num, after, type, keyword, function(error, projects){
	if(error){
	    return next(error, null);
	}else{
	    return res.json(projects);
	}
    });    
});

/**
 * @api {post} /projects/updates project updates
 * @apiGroup Project
 * @apiDescription login required.
 * 
 * @apiParam {string} pname name of project, required paramenter.
 * @apiParam {string} type project updates type, can be `text`, `video` and `picture` 
 * @apiParam {content} url of picture or video, actual conent of text type
 */
router.post('/updates',function(req, res, next){
    var username = passport.authorizedUser(req.session);
    if(!req.query.pname || !req.query.content || !req.query.type){
	return res.status(400).send('request with incomplete paramenaters');
    }else if(!username){
	return res.status(401).send('login before comment on project');
    }else{
	project.putUpdates(username, req.query.pname, util.now(), req.query.type, req.query.content, function(success){
	    if(success){
	        return res.status(200).send('success');
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }
});

/**
 * @api {post} /projects/tag tag
 * @apiGroup Project
 * @apiDescription login not required.
 * 
 * @apiParam {string} pname name of project, required paramenter.
 * @apiParam {string} tag tag to add
 */

router.post('/tag', function(req, res, next){
    project.tag(req.query.pname, req.query.tag, function(success){
	if(success){
	    return res.status(200).send('success');
	}else{
	    return res.status(400).send('failed');
	}
    });
});

/**
 * @api {post} /projects/rate rate
 * @apiGroup Project
 * @apiDescription login required, rate incompleted project will fail.
 * 
 * @apiParam {string} pname name of project, required paramenter.
 * @apiParam {string} rate rate for project.
 */
router.post('/rate', function(req, res, next){
    var username = passport.authorizedUser(req.session);
    var rate = parseInt(req.query.rate) || null;
    if(!req.query.pname || !rate){
	return res.status(400).send('request with incomplete paramenaters');
    }else if(!username){
	return res.status(401).send('login required');
    }else{
	project.rate(username, req.query.pname, util.now(), Math.max(rate,5) , function(success){
	    if(success){
	        return res.status(200).send('success');
	    }else{
		return res.status(400).send('failed');
	    }
	});	
    }

});

module.exports = router;
