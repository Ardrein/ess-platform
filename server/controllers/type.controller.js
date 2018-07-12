const Type = require('../models/type.model');
const mongoose = require('mongoose');

var exports = module.exports = {};

/**
* Function used to get all the Types from the database.
* @param {} req The http request.
* @param {} res The http response.
*/
exports.getAll = function(req, res){
	Type.find()
	.then(types =>{
		res.send(types);
	})
	.catch(err =>{
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving Types."
		});
	});
};