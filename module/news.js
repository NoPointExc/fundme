var config = require('../app/config')
var log = config.log();


//news object:
//{type: 'comment'|'pledge'|'like'|'fellowed',
//data:
//}

function newsFromComment(type, rows){
    var news = [];
    if(rows){
	log.debug('news list ' + rows);
	rows.forEach(function(row){
	    news.push({'type':type, 'data':row});
	});
    }
    return news;
}

module.exports.newsList = newsFromComment;

