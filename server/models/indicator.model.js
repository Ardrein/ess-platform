var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndicatorSchema = new Schema({
	name: String,
	label: String,
	formula: String,
	formulaValue: Number,
	type: String,
	subIndicators: [{
		type: Schema.Types.ObjectId,
		ref: 'Indicator',
		default: []
	}],
	variables: [{
		type: Schema.Types.ObjectId,
		ref: 'Variable',
		default: []
	}]
});

var Indicator = mongoose.model('Indicator', IndicatorSchema);

module.exports = Indicator;