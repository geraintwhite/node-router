var url = require('url'),
    t = require('twitter-js-client');

var twitter = new t.Twitter(require('./data.json'));

module.exports = function(req, res) {
    var api_url = url.parse(req.url, true).query.api_url;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'application/json'});

    function callback(data) {
        res.write(typeof data === 'object' ? JSON.stringify(data) : data);
        res.end();
    }

    twitter.doRequest(decodeURIComponent(api_url), callback, callback);
};
