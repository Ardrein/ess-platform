var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VariableSchema = new mongoose.Schema({
	name: String,
	label: String,
	value: Number,
	type: String
});

var Variable = mongoose.model('Variable', VariableSchema);

module.exports = Variable;