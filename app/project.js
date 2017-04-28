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

module.exports.get = get;
