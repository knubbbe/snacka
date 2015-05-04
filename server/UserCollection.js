var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var snackaConfig = require('../config.js');

var UserCollection = {};

// Create a schema for our data
UserCollection.schema = new Schema({
	username: String,
	password: String,
	email: String,
	avatar: String,
	date: Date
});
// Use the schema to register a model with MongoDb
mongoose.model('User', UserCollection.schema); 
UserCollection.model = mongoose.model('User');

// This function is responsible for returning all entries for the Message model
UserCollection.listAll = function(req, res, next) {
	// .find() without any arguments, will return all results
	// the `-1` in .sort() means descending order
	UserCollection.model.find().sort('date', -1).exec(function (arr,data) {
		res.send(data);
	});
}

UserCollection.getByUsername = function(req, res) {
	res.send(UserCollection._getByUsername(req.params.username));
}

UserCollection._getByUsername = function(username) {
	return UserCollection.model.find({ username: username}).exec(function (arr,data) {
		return data;
	});
}

UserCollection.createUser = function(req, res, next) {
	// Create a new message model, fill it up and save it to Mongodb
	// if (UserCollection._getByUsername(req.body.username)) {
	// 	res.send('User Exists');
	// } else {
	// 	console.log('didnt exist');
		var user = new UserCollection.model();
		user.username = req.body.username;
		user.password = req.body.password;
		// user.email = req.params.email;
		user.avatar = null;
		user.date = new Date();
		user.save(function (data) {
			console.log('save: ', data);
			res.send('User created');
		});
	// }
}

module.exports = UserCollection;