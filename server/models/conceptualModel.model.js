var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conceptualModelSchema = new Schema({
	name: { type: String, unique: true, required: true},
	versions : [{ type: Schema.Types.ObjectId, ref: 'ModelVersion', default: [] }]
});

var ConceptualModel = mongoose.model('ConceptualModel', conceptualModelSchema);
module.exports = ConceptualModel;