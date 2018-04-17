var spreadsheet = require('google-spreadsheet'); //modulo de node para leer hojas de calculo
var async = require('async');					  //modulo de node para ejecutar funciones asincronicas
//Modelos de la base de datos
var mongoose = require('mongoose');
var VariableModel = require('../models/variable.model');
var IndicatorModel = require('../models/indicator.model');

var exports = module.exports = {};

//funcion para crear una nueva hoja de calculo
// @spreadsheetId es el id de la hoja de calculo
exports.openSpreadsheet = function (spreadsheetId){
	var doc = new spreadsheet(spreadsheetId);
	return doc;
};

//funcion para verificar si el objeto de tipo spreadsheet fue creado correctamente
//@doc es el objeto de tipo spreadsheet a verificar
//@successCallback es una funcion utilizada de forma asincrona en caso de que @doc haya sido creado correctamente
//@errorCallback es una funcion utilizada de forma asincrona en caso de que @doc haya sido creado de forma incorrecta
exports.getInfoSpreadsheet = function (doc, successCallback, errorCallback){ 

	//el parametro @info contiene la informacion de la hoja de calculo
	//el parametro @err solo existira si hubo un error en la creacion del documento
	doc.getInfo(function(err,info){
		if(err){
			console.log('Error 404: Documento no encontrado.');
			errorCallback();
		}else{
			successCallback(info);
		}

	});

};


//Funcion para leer una a una las hojas de calculo y extraer la informacion
//dentro de @info la variable worksheets contiene las hojas del documento
//dentro de las worksheets, la variable title contiene el nombre de dicha hoja
exports.readSpreadsheets = function(info, sendData){
	let totalWorksheets = info.worksheets.length;
	let model = {};   //variable para almacenar los indicadores y las variables
	model.variables = [];

	if(totalWorksheets>0){
		//variables: name, label, type, value,
		//indicadores: name, label, type, formula

		let sheet = info.worksheets[0]; //hoja de variables

		//ejecucion de las funciones para leer las diferentes hojas del documento
		//como son funciones asincronas, se debe esperar a que terminen para poder devolver la informacion
		async.series([function setVariables(step){

			//la funcion getCells recorre todas las celdas de la hoja
			//de izquierda-derecha y arriba-abajo, solamente teniendo en cuenta
			//las celdas que tengan datos
			sheet.getCells(function(err,cells){
				let cell;
				let variable; 				

				for(let i=0;i<cells.length;i++){

					cell = cells[i];				//celda actual

					if(cell.row != 1){				//la primera fila son cabeceras de documento
													//las columnas deben estar organizadas en el orden:
													//name, label, type, value
							switch(cell.col){
								case 1: 
									variable =  new VariableModel();//{name:'', label:'', type:'', value:''}; //creacion del objeto a agregar
									model.variables.push(variable);					   //agrega el objeto al arreglo
									variable.name = cell.value;						   // y se prosigue con la modificacion
									break;
								case 2: 
									variable.label  = cell.value;
									break;
								case 3: 
									variable.type = cell.value;
									break;
								case 4:
									variable.value = cell.value;
									break;
							}
						}
				}
				step();//callback para indicar que finalizo la ejecucion de la funcion asincrona

				});
			
		}, function setIndicators(step){
			let totalTimesIterate = totalWorksheets-1;
			let j = 1;


			//iteracion por cada hoja
			async.times(totalTimesIterate, function(n,next){
				let indicatorNumber = "indicator"+j;//llave para agregar al objeto model
				model[indicatorNumber] = [];

				sheet = info.worksheets[j];	//hoja de calculo siendo leida actualmente

				sheet.getCells(function(err,cells){
					let indicator;
					let cell;		

					
					for(let i=0;i<cells.length;i++){
						
						
						cell = cells[i];				//celda actual

						if(cell.row != 1){				//la primera fila son cabeceras de documento
														//las columnas deben estar organizadas en el orden:
														//name, label, type, formula
							switch(cell.col){
								case 1: 
									indicator = new IndicatorModel(); //{name:'', label:'', type:'', formula:''}; 
									model[indicatorNumber].push(indicator);	
									indicator.name = cell.value;						   
									break;
								case 2:	 
									indicator.label  = cell.value;
									break;
								case 3: 
									indicator.type = cell.value;
									break;
								case 4:
									indicator.formula = cell.value;									
									break;
								}
							}
					}

					next();//solo se itera la siguiente hoja cuando se termine con la hoja actual
							//y se procede haciendo el llamado al callback			
				});

				j++;
			}, function(err){

				step();//fin funcion
			});
			

				
				
			
			
		}], function(err){
			sendData(model);
		});

	}
	

};

