var http = require('./server/app.js');

// Start server
http.listen(3000, function(){
	console.log('listening on http://localhost:3000');
});