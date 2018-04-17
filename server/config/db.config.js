var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/ess_platform', function(err){
	if(err) throw err;

	console.log('Conexion a la DB exitosa!');
});

module.exports = connection;