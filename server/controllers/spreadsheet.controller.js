const spreadsheet = require('google-spreadsheet');
const async = require('async');
const mongoose = require('mongoose');

/**
* Controller used to load a public spreadsheet from the web.
*/
var exports = module.exports = {};

/**
	* Function used to load a spreadsheet based on its id, read its data, organize it
	* and send it back contained in an object.
	* @param spreadsheetId The spreadsheet's id.
	* @param sendData Asynchronous function used to send back the data.
	* @param errorCallback Asynchronous function used in case an error was 
	* 	found with the spreadsheet object.
	*/
	exports.openAndReadSpreadsheet = function(spreadsheetId, sendData, 
		errorCallback){

		let doc = createSpreadsheet(spreadsheetId);//create the spreadsheet

		getInfoSpreadsheet(doc, function successCallback(docInfo){
			readSpreadsheets(docInfo, function(data){
				sendData(data)
			}, function(err, message){
				errorCallback(err, message)
			});
		}, function(err, message){
			errorCallback(err, message)
		});

	}


/**
	* Function used to create a spreadsheet object based on the id from a published one.
	* @param spreadsheetId The published spreadsheet's id.
	* @returns The new spreadsheet object created.
	*/
	function createSpreadsheet(spreadsheetId){
		return new spreadsheet(spreadsheetId);
	}


	/**
	* Function used to get the data contained in a spreadsheet.
	* @param doc Spreadsheet object which represents the spreadsheet.
	* @param successCallback Asynchronous function used to send back the data,
	*	in case the Spreadsheet object was created correctly.
	* @param errorCallback Asynchronous function used in case an error was 
	* 	found with the spreadsheet object.
	*/
	function getInfoSpreadsheet(doc, successCallback, errorCallback){

		//info contains the data from the spreadsheet.
		doc.getInfo(function(err, info){
			if(err){
				errorCallback(err, 'Error opening the document, id may be wrong.');
			}else{
				successCallback(info);
			}
		});
	}


	/**
	* Function used to read the data obtained from a spreadsheet and send it back organized in objects.
	* @param info Object which contains the data from the spreadsheet.
	* @param sendData Asynchronous function used to send back the organized data.
	* @param errorCallback Callback to send back the error and handle it.
	*/
	function readSpreadsheets(info, sendData, errorCallback){


		let totalWorksheets = info.worksheets.length;	//amount of worksheets in the spreadshet.
		let model = {};									//model to store variables and indicators.

		if(totalWorksheets>0){

			let currentWorksheet = info.worksheets[0]; 	//variables sheet should be the first one

			//async is used in order to wait for each function to end before calling the next one
			//each function is used to read a part of the spreadsheet, in this case, 
			//the variables and indicators worksheets
			//step is the callback from async to tell when to run the next function
			

			async.series([
				function(step){
					setVariables(step, currentWorksheet, model);
				},
				function(step){
					currentWorksheet = info.worksheets[1];  //indicators worksheet
					setIndicators(step, currentWorksheet, model);
				}
				],
				function(err){//final callback which has the data and/or errors, if any.
					if(err){
						errorCallback(err, 'Error when organizing the data, please verify the spreadsheet.');
					}else{
						sendData(model);
					}					
				});

		}

	}


	/**
	* Function used to read, organize and set the variables from the spreadsheet using async.
	* @param callback Async callback used to tell async to run the next function.
	* @param sheet Current worksheet being read.
	* @param model Object that will contain the variables and indicators.
	*/
	function setVariables(callback, sheet, model){
		
		model.variables = []; //declaring that the model object will have an array with the variables

		//getCells function will get over each cells from left to right and top-bottom in the worksheet
		//taking into account the cells which have data
		sheet.getCells(function(err, cells){ //cells is the array containig each cell
			let cell, variable;

			for(let i = 0 ; i < cells.length ; i++){
				cell = cells[i]; //current cell

				if(cell.row != 1){//first row cells contain the headers so they will be ignored here
					
					switch(cell.col){
						case 1: {
							variable = {};
							variable._id =  mongoose.Types.ObjectId();	
							model.variables.push(variable);
							variable.name = cell.value;
							break;
						}

						case 2:{
							variable.label = cell.value;
							break;
						}

						case 3:{
							variable.type = cell.value;
							break;
						}

						case 4:{
							variable.value = cell.value;
							break;
						}
						

					}

				}

			}

			callback(err); //callback call to proceed to the next function.

		});
	}

	/**
	* Function used to read, organize and set the indicators from the spreadsheet using async.
	* @param callback Async callback used to tell async to run the next function.
	* @param sheet Current worksheet being read.
	* @param model Object that will contain the variables and indicators.
	*/
	function setIndicators(callback, sheet, model){

		model.indicators = []; //declaring that the model object will have an array with the indicators

		//getCells function will get over each cells from left to right and top-bottom in the worksheet
		//taking into account the cells which have data
		sheet.getCells(function(err, cells){ //cells is the array containig each cell
			let cell, indicator;

			for(let i = 0 ; i < cells.length ; i++){
				cell = cells[i]; //current cell

				if(cell.row != 1){//first row cells contain the headers so they will be ignored here
					
					switch(cell.col){
						case 1: {							 
							indicator = {};
							indicator._id =  mongoose.Types.ObjectId();
							model.indicators.push(indicator);
							indicator.name = cell.value;
							break;
						}

						case 2:{
							indicator.label = cell.value;
							break;
						}

						case 3:{
							indicator.type = cell.value;
							break;
						}

						case 4:{
							indicator.formula = cell.value;
							break;
						}
						

					}

				}

			}

			callback(err); //callback call to proceed to the next function.

		});

	}

