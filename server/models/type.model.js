var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeSchema = new Schema({
	name: String
});

var Type = mongoose.model('Type', typeSchema);
module.exports = Type;