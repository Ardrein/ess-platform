/**
* Configuration for the database.
*/

const mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/essIManager', function(err){
	if(err) throw err;

	console.log("DB connection successful!");
});

module.exports = connection;