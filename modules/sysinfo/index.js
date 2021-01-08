var exec = require('child_process').exec,
    url = require('url'),
    async = require('async');

var cpu = [],
    mem = [],
    temp = [],
    upload = [],
    download = [];

var delay = 10 * 60 * 1000;
var datacap = 7 * 24 * 6;
var bytes = 8 / 1000 / 1000;

function convertBytes(value) {
    return Math.round(value * bytes * 10) / 10;
}

var graphs = function() {
    async.parallel({
        cpu: function(cb) { exec("top -bn1|awk 'NR>7{s+=$9}END{print s}'", cb); },
        mem: function(cb) { exec("free -h|grep '\\-/+ buffers/cache'|awk '{print$3}'|sed 's/.$//'", cb); },
        temp: function(cb) { exec("vcgencmd measure_temp|sed \"s/[a-z]*=\\(.*\\)'.*/\\1/g\"", cb); },
        speed: function(cb) { exec("speedtest -f json", cb); }
    },
    function(error, stdout, stderr) {
        time = Date.now();
        if (error) {
            console.log(new Date(time), stderr);
        } else {
            console.log(stdout, stderr);

            cpu.push([time, parseInt(stdout.cpu[0].slice(0, -1))]);
            mem.push([time, parseInt(stdout.mem[0].slice(0, -1))]);
            temp.push([time, parseInt(stdout.temp[0].slice(0, -1))]);
            upload.push([time, convertBytes(JSON.parse(stdout.speed[0]).upload.bandwidth)]);
            download.push([time, convertBytes(JSON.parse(stdout.speed[0]).download.bandwidth)]);

            if (cpu.length > datacap) cpu.shift();
            if (mem.length > datacap) mem.shift();
            if (temp.length > datacap) temp.shift();
            if (upload.length > datacap) upload.shift();
            if (download.length > datacap) download.shift();
        }
        setTimeout(graphs, delay);
    });
};
graphs();

module.exports = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (url.parse(req.url, true).query.graph !== undefined) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({ cpu, mem, temp, upload, download }));
        res.end();
    } else if (url.parse(req.url, true).query.pebble != undefined) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        exec(__dirname + '/sysinfo.sh', function(error, stdout, stderr) {
            out = error ? stderr : stdout;
            res.write(JSON.stringify({content: out}));
            res.end();
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        exec(__dirname + '/sysinfo.sh', function(error, stdout, stderr) {
            out = error ? stderr : stdout;
            res.write(out);
            res.end();
        });
    }
};
