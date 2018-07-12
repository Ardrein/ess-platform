var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Variable = require('./variable.model');
var Indicator = require('./indicator.model');

//model state: 0: In progress, 1: ready(public), 2: Obsolet
var modelVersionSchema = new Schema({
	number: { type: String, unique: false, required: true},
	dateOfCreation: {type: Date, default: Date.now},
	lastEdited: {type: Date, default: Date.now},
	state: { type: Number, default: 0 },
	indicators: [Indicator],
	variables: [Variable]
});

var ModelVersion = mongoose.model('ModelVersion', modelVersionSchema);
module.exports = ModelVersion;