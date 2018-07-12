var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var ConceptualModel = require('./conceptualModel.model');
var ValuatedModel = require('./valuatedModel.model');

var userSchema = new Schema({
	local: {
		email: String,
		password: String
	},
	google:{
		id: String,
		name: String,
		email: String,	
		token: String
	},
	createdModels: [ConceptualModel.schema],
	valuatedModels: [ValuatedModel.schema]
});

/*
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};*/
var User = mongoose.model('User', userSchema);
module.exports = User;