const express = require('express');
const router = express.Router();
var spreadsheetLogic = require('../spreadsheet/spreadsheet');   //archivo con la logica para acceder al documento

//Declaracion RUTAS------------------------------------------------------------------------


//id de prueba:
//1A9nVMHrNBGkR4DN4p3Tg6TU2lOUumCxUiEZIESbQQqU
//ruta para la lectura de hoja de calculo
router.post('/spreadsheet', (req,res) =>{
	var spreadsheetId = req.body.id;
	var doc = spreadsheetLogic.openSpreadsheet(spreadsheetId);

	//llama a la funcion para obtener los datos de cabecera del documento y verificar si este 
	//fue creado correctamente o si hay errores en el id del mismo.
	spreadsheetLogic.getInfoSpreadsheet(doc, function successCallback(docInfo){
		
		spreadsheetLogic.readSpreadsheets(docInfo, function sendData(data){
				res.status(200).send({
				message: 'Datos correctos',
				status: '200',
				datos: data
			});
		});

	}, function errorCallback(){
		res.status(200).send({
			message:'Datos erroneos',
			status: '404'
		});
	});
});



module.exports = router;