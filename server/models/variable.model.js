var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var variableSchema = new mongoose.Schema({
	name: String,
	label: String,
	type: {	type: Schema.Types.ObjectId,ref: 'Type'}
});

module.exports = variableSchema;