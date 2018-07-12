var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var indicatorSchema = new Schema({
	name: String,
	label: String,
	formula: String,
	type: {	type: Schema.Types.ObjectId,ref: 'Type'},
	variables: [{
		type: Schema.Types.ObjectId,
		ref: 'Variable',
		default: []
	}]
});

module.exports = indicatorSchema;