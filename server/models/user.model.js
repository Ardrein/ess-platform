var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = require('./model.model');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	models:[Model.schema]
});

var User = mongoose.model('User',userSchema);

module.exports = User;