module.exports.mysql = {
    host     : 'localhost',
    user     : 'Limeade',
    password : '#348,61_st,Brooklyn,11220',
    database : 'fund_me'
};

module.exports.session = {
    secret: 'while(true) {forg.lifetime++}',
    resave: false,
    saveUninitialized: true
};

module.exports.log = function(){
    var Log = require('log');
    log = new Log('debug');
    return log;
}
