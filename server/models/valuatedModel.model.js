var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var valuatedModelSchema = new Schema({
	name: String,
	dateOfCreation: {type: Date, default: Date.now},
	lastEdited: {type: Date, default: Date.now},
	version: {	type: Schema.Types.ObjectId, ref: 'ModelVersion'},
	valuatedIndicators: [{
		indicator: { type: Schema.Types.ObjectId, ref: 'ModelVersion.indicators' },
		value: Number
	}],
	valuatedVariables: [{
		variable: { type: Schema.Types.ObjectId, ref: 'ModelVersion.variables' },
		value: Number
	}]
});


var ValuatedModel = mongoose.model('ValuatedModel', valuatedModelSchema);
module.exports = ValuatedModel;