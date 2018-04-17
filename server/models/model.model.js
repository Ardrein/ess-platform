var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Variable = require('./variable.model');
var Indicator = require('./indicator.model');


//must add last modified into this--------------------------------------------------
var modelSchema = new Schema({
	name: String,
	creationDate: {type: Date, default: Date.now},
	lastModified: {type: Date, default: Date.now},
	indicators: [Indicator.schema],
	variables: [Variable.schema]
});

var Model = mongoose.model('Model',modelSchema);

module.exports = Model;