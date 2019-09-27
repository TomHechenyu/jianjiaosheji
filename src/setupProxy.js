const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(proxy('/v2', {
        target:"https://m.wowdsgn.com",
        changeOrigin:true
    }));
    app.use(proxy('/pages', {
        target:"https://m.wowdsgn.com",
        changeOrigin:true
    }));
	app.use(proxy('/users', {
        target:"http://47.104.226.76:80",
        changeOrigin:true
    }));
}