var dateFormat = require('dateformat');

function now(){
    var now = new Date();
    var date = dateFormat(now, 'yyyy-mm-dd HH-MM-ss');
    return date;	
}

function after(day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    return dateFormat(date, 'yyyy-mm-dd HH-MM-ss');
}
module.exports.now = now;
module.exports.after = after;
