const spreadsheet = require('../controllers/spreadsheet.controller.js');

var service = {};
service.openAndRead = openAndRead;

module.exports = service;


/**
* Function used to open, read and retrieve the data from a spreadsheet.
* @param req The http request.
* @param res The http response.
*/
function openAndRead(req, res){
	if(!req.params.id || req.params.id == ""){
		return res.status(400).send({
			message: "Spreadsheet ID cannot be empty!"
		});
	}

	spreadsheet.openAndReadSpreadsheet(req.params.id, function sendData(data){
		return res.status(200).send(data);

	}, function errorCallback(err, message){
		return res.status(400).send({
			message: message
		});
	});

}
