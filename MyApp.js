var http = require('http');
var path = require('path');
var pug = require('pug');
var fs = require('fs');

var exts = {
	".html" : "text/html",
	".css" : "text/css",
	".js" : "application/javascript",
	".png" : "image/png",
	".jpg" : "image/jpeg"
};

http.createServer(function(request, response) {
	var fileName = path.basename(request.url) || 'home.html';
	var ext = path.extname(fileName);
	var dir = getDirectory(ext);

	if (ext == '.html') {
		var data = pug.renderFile(dir + fileName);
		response.writeHead(200,{"Content-type" : exts[ext]});
		response.end(data);
	}
	else {
		//read file
		fs.readFile(dir + fileName,function(err,data){
			//send the contents with the default 200/ok header
			response.writeHead(200,{"Content-type" : exts[ext]});
			response.end(data);
		});
	}

}).listen(8080);

function getDirectory(ext) {
	var dir;
	switch (ext) {
		case '.jpg':
			dir = __dirname + '/images/';
			break;
		case '.png':
			dir = __dirname + '/images/';
			break;
		case '.js':
			dir = __dirname + '/js/';
			break;
		case '.css':
			dir = __dirname + '/css/';
			break;
		default:
			switch (fileName) {
				case 'about.html':
					dir = __dirname + '/about/';
					break;
				case 'bio.html':
					dir = __dirname + '/bio/';
					break;
				default:
					dir = __dirname + '/';
			}
	}
	return dir;
}
