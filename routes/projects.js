var express = require('express');
var router = express.Router();
var config = require('../app/config');
var log = config.log();
var project = require('../app/project');

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
router.get('/updates', function(req, res, next){

});

module.exports = router;
