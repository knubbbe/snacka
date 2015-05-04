var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var snackaConfig = require('../config.js');

if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./snacka');
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Database stuff
mongoose.connect(snackaConfig.mongoDBserver);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function callback() {
	console.log('Successfully connected to database');
	
	// Collections
	var Messages = require('./MessageCollection.js');
	var Users = require('./UserCollection.js');

	// Routes
	// route middleware that will happen on every request
	app.use(function(req, res, next) {
		// log each request to the console
		console.log(req.method, req.url, req.body);
		// continue doing what we were doing and go to the route
		next(); 
	});

	app.use('/static', express.static(path.join(__dirname, '../static')));
	app.get('/*', function(req, res){
		res.sendFile(path.join(__dirname, '../index.html'));
	});
	app.get('/api/user/list', Users.listAll);
	app.post('/api/user/create', Users.createUser);
	app.get('/api/message/list', Messages.getList);
	// app.post('/api/message/add', addMessage);

	// Socket stuff
	var usercount = 0;
	io.on('connection', function(socket){
		usercount++;
		console.log('a user connected, online now: ' + usercount);

		var randomNumber = Math.floor(Math.random() * (999 - 100)) + 100;
		var _user = localStorage.getItem('user') || false;
		io.emit('user:username', _user);

		socket.on('snack:add', function (data) {
			var msg = new Messages.model();
			msg.username = data.username;
			msg.message = data.message;
			msg.date = new Date();
			msg.save(function () {
				io.emit('snack:added', msg)
			});
			console.log('snack:added:', msg);
		});

		socket.on('snack:remove', function (data) {
			console.log(data);
			Messages.delete(data.id);
			console.log('snack:remove:', data);
		});

		socket.on('user:disconnect', function(){
			console.log('user disconnected');
			--usercount;
		});
	});
});

module.exports = http;