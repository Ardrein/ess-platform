var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equivalencySchema  = new Schema({
	variableA: { type: Schema.Types.ObjectId, ref: 'ModelVersion.variables' },
	variableB: { type: Schema.Types.ObjectId, ref: 'ModelVersion.variables' }
});

var modelEquivalencySchema = new Schema({
	name: { type: String, unique: true, required: true},
	firstModel : {
		version : { type: Schema.Types.ObjectId, ref: 'ModelVersion'},
		concept: { type: Schema.Types.ObjectId, ref: 'ConceptualModel'}
	},
	secondModel: {
		version : { type: Schema.Types.ObjectId, ref: 'ModelVersion'},
		concept: { type: Schema.Types.ObjectId, ref: 'ConceptualModel'}
	},
	equivalencies: [equivalencySchema]
});

var ModelEquivalency = mongoose.model('ModelEquivalency', modelEquivalencySchema);
module.exports = ModelEquivalency;