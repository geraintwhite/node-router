var url = require('url');

var starttime = Date.now();

function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return { days: d, hours: h, minutes: m, seconds: s };
}

module.exports = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
        
    if (url.parse(req.url, true).query.reset == 'true') {
        starttime = Date.now();
        console.log('Time reset');
        res.write('Time reset');
    } else {
        time = convertMS(Date.now() - starttime);
        var out = '';
        for (var key in time) {
            out += time[key] + ' ' + key + ', ';
        }
        out = out.slice(0, -2);
        res.write(out);
    }
    res.end();
};
