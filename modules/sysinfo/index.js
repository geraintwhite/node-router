var exec = require('child_process').exec;

module.exports = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    exec(__dirname + '/sysinfo.sh', function(error, stdout, stderr) {
        out = error ? stderr : stdout;
        res.write(out);
        res.end();
    });
};
