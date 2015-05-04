var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var snackaConfig = require('../config.js');

var MessageCollection = {};

// Messages Model
MessageCollection.schema = new Schema({
	username: String,
	message: String,
	date: Date
});
// Use the schema to register a model with MongoDb
mongoose.model('Message', MessageCollection.schema); 
MessageCollection.model = mongoose.model('Message');

// This function is responsible for returning all entries for the Message model
MessageCollection.getList = function(req, res, next) {
	MessageCollection.model.find().sort( { 'date': 1 } ).exec(function (arr,data) {
		console.log('server: ', data);
		res.send(data);
	});
}

MessageCollection.addNew = function(req, res, next) {
	// Create a new message model, fill it up and save it to Mongodb
	var msg = new MessageCollection.model();
	msg.username = req.params.username;
	msg.message = req.params.message;
	msg.date = new Date();
	msg.save(function () {
		io.emit('snack:added', msg);
		res.send(req.body);
	});
}

MessageCollection.delete = function(req, res, next) {
	// Create a new message model, fill it up and save it to Mongodb
	console.log(req);
	MessageCollection.model.remove({ _id: req }, function (err) {
		if (err) return handleError(err);
		console.log('succesfully removed');
		// removed!
	});
}

module.exports = MessageCollection;