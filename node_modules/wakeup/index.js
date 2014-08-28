var url = require('url'),
    exec = require('child_process').exec,
    data = require('./data.json');

module.exports = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if (url.parse(req.url, true).query.secret == data.secret) {
        console.log('Access Granted');
        res.write('Access Granted');

        exec('wakeonlan ' + data.addr, function(error, stdout, stderr) {
            out = error ? stderr : stdout;
            res.write('\n'+out);
            res.end();
        });
    } else {
        console.log('Access Denied');
        res.write('Access Denied');
        res.end();
    }
};
