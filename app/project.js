sql = require('./db');

function get(num, after, category, keyword, done){
    var conditions = []; 
    if(after){
	conditions.push(['start_time < ? ' , after]);
    }
    if(category){
	conditions.push(['category = ? ', category]);
    }
    if(keyword){
	conditions.push(['description LIKE ?', '%'+keyword +'%']);
    }	
    sql.project.get(num, conditions, function (error, rows, fields){
	if(error){
	    return done(error, null);
	}else{
	    return done(null, rows);
	}
    });
}

//TODO: check start time < end time
function put(pname, username, desp, category, min_fund, max_fund, start_time, end_time, status, picture, done){
    sql.sql.insert('Project', [pname, username, desp, category, min_fund, max_fund, 0, start_time, end_time, status, picture], done);
}

function detail(projectname, username, done){
    var result = {};
    var completed = 0;
    log.debug('username= ' + username);
    function onSqlDone(relation,error, rows){
	if(error){
	    log.debug('error');
	    return done(error, null);
	}else if(relation == 'detail'){
	    result['detail'] = rows[0];
	}else if(relation == 'tag'){
	    result['tag'] = rows;
	}else{ 
	    log.debug(rows);
	    result[relation+'Num'] = rows.length;
	    result[relation] = false;
	    if(username){
		for(i in rows){
		    log.debug(rows[i].uname);
		    if(rows[i].uname == username){
			result[relation] = true;
			break;
		    }
		}
	    }
	}
	completed += 1;
	if(completed == 4){
	    //log.debug(result);
	    return done(null, result);
	}
    }

    sql.project.get(1, [['pname = ?', projectname]], function(error, rows, fields){
	return onSqlDone('detail', error, rows);
    });

    likeBy(projectname, function(error, rows){
	return onSqlDone('like', error, rows);
    });

    followBy(projectname, function(error, rows){
	return onSqlDone('follow', error, rows);
    });
    
    //get tags
    sql.sql.select(['tag'], 'Tag', [['pname = ?', projectname]], function(error, rows, fields){
	return onSqlDone('tag', error, rows);	
    });
}

function likeBy(projectname, done){
    if(!projectname){
	return done(null, null);
    }
    sql.sql.select(['uname'], 'User_project', [['pname=?', projectname], ['relation=?','like']],function (error, rows, fields){
	if(error){
	    return done(error, null);
	}else{
	    return done(null, rows);
	}
    }); 
}


function followBy(projectname, done){
    if(!projectname){
	return done(null, null);
    }
    sql.sql.select(['uname'], 'User_project', [['pname=?', projectname],['relation=?','follow']],function (error, rows, fields){
	if(error){
	    return done(error, null);
	}else{
	    return done(null, rows);
	}
    }); 
}

function comments(projectname, done){
    if(projectname){
	sql.sql.select(['pname', 'uname', 'picture', 'time', 'comment'], 'Comment_project NATURAL JOIN Users', [['pname=?', projectname]],function (error, rows, fields){
	    if(error){
		return done(error, null);
	    }else{
		return done(null, rows);
	    }
	});
    }
}

function putComment(projectname, username, time, text, done){
    if(projectname){
	sql.sql.insert('Comment_project', [username, projectname, time, text], done);
    }
}

function setRelation(projectname, username, time, relation, set, done){
    if(set){
	sql.sql.insert('User_project', [username, projectname, time, relation], done);
    }else{
	sql.sql.remove('User_project', [['uname=?', username], ['pname=?', projectname], ['relation=?',relation]], done);
    }
}

function pledge(projectname, username, time, amount, done){
    if(projectname){
	sql.sql.insert('Pledge', [username, projectname, time, amount], done);
    }
}

function getUpdates(pname, num, after, type, keyword, done){
    var conditions = []; 
    if(pname){
	conditions.push(['pname = ?', pname]);
    }
    if(after){
	conditions.push(['start_time < ? ' , after]);
    }
    if(type){
	conditions.push(['type = ? ', type]);
    }
    if(keyword){
	conditions.push(['content LIKE ?', '%'+keyword +'%']);
	conditions.push(['type = ? ', 'text']);
    }	
    sql.project.getUpdates(num, conditions, function (error, rows, fields){
	if(error){
	    return done(error, null);
	}else{
	    return done(null, rows);
	}
    });
}

function putUpdates(username, projectname, time, type, content, done){
    //check current user is the owner.
    sql.project.get(1, [['pname = ?', projectname]], function(error, rows, fields){
	if(rows && rows.length == 1){
	    if(rows[0].uname == username){
		sql.sql.insert('Project_update', [projectname, time, type, content], done);
	    }else{
		return done(false);
	    }
	}else{
	    return done(false);
	}
    });
}

function tag(projectname, tag, done){
    if(projectname && tag){
	sql.sql.insert('Tag', [projectname, tag], done);
    }else{
	return done(false);
    }
}

function rate(username, projectname, time, rate, done){
    if(projectname && username && rate && time){
	//check project complete
	sql.sql.select(['*'], 'Project', [['pname = ?', projectname], ['status = ?', 'completed']], function(error, rows, fields){
	    if(error || !rows || rows.length == 0){
		return done(false);
	    }else{
		//insert rates
		sql.sql.insert('Rate', [username, projectname, time, rate], done);
	    }
	});
    }else{
	return done(false);
    }
}

module.exports.get = get;
module.exports.put = put;
module.exports.detail = detail;
module.exports.comments = comments;
module.exports.putComment = putComment;
module.exports.setRelation = setRelation;
module.exports.pledge = pledge;
module.exports.getUpdates = getUpdates;
module.exports.putUpdates = putUpdates;
module.exports.tag = tag;
module.exports.rate = rate;
