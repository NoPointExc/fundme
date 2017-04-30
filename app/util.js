var dateFormat = require('dateformat');

function now(){
    var now = new Date();
    var date = dateFormat(now, 'yyyy-mm-dd HH-MM-ss');
    return date;	
}

module.exports.now = now;
