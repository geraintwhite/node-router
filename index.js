var http = require('http'),
    url = require('url');

var twitter = require('./modules/twitter'),
    sysinfo = require('./modules/sysinfo'),
    wakeup = require('./modules/wakeup'),
    tracker = require('./modules/tracker');

var router = function(req, res) {
    path = url.parse(req.url).pathname;
    console.log('Request for', path);
    switch (path) {
        case '/twitter':
            twitter(req, res);
            break;
        case '/sysinfo':
            sysinfo(req, res);
            break;
        case '/wakeup':
            wakeup(req, res);
            break;
        case '/tracker':
            tracker(req, res);
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            console.log('404');
            res.write('404 - Not Found');
            res.end();
    }
};

var port = 6001;
var app = http.createServer(router);

app.listen(port);
console.log('Server running on port', port);
