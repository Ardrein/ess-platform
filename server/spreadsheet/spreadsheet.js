const spreadsheet = require('google-spreadsheet'); //modulo de node para leer hojas de calculo
const async = require('async');					  //modulo de node para ejecutar funciones asincronicas
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
	var totalWorksheets = info.worksheets.length;
	var model = {};   //variable para almacenar los indicadores y las variables
	model.variables = [];

	if(totalWorksheets>0){
		//variables: name, label, type, value,
		//indicadores: name, label, type, formula

		var sheet = info.worksheets[0]; //hoja de variables

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
									variable = {name:'', label:'', type:'', value:''}; //creacion del objeto a agregar
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
			for(let i=1;i< totalWorksheets;i++){

				let indicatorNumber = "Indicators"+i;//llave para agregar al objeto model
				model[indicatorNumber] = [];

				sheet = info.worksheets[i];	//hoja de calculo siendo leida actualmente

				sheet.getCells(function(err,cells){
					let cell;
					let indicator; 				

					for(let i=0;i<cells.length;i++){

						cell = cells[i];				//celda actual

						if(cell.row != 1){				//la primera fila son cabeceras de documento
														//las columnas deben estar organizadas en el orden:
														//name, label, type, formula
							switch(cell.col){
								case 1: 
									indicator = {name:'', label:'', type:'', formula:''}; 
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

					step();//fin funcion
				});
			}
		}], function(err){
			sendData(model);
		});

	}
	

};






/*<?php


	function cargarDocumento($nombreArchivo){

		try {
			$inputFileType = PHPExcel_IOFactory::identify($nombreArchivo);
			$objReader = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel = $objReader->load($nombreArchivo);

		} catch (Exception $e) {
			die('Error loading file "' . pathinfo($nombreArchivo, PATHINFO_BASENAME) . '": ' . 
				$e->getMessage());
		}

		$worksheets = $objPHPExcel->getWorksheetIterator();

		//hojas de calculo
		foreach ($worksheets as $worksheet) {
  			//filas y columnas de la hoja
			$highestRow = $worksheet->getHighestRow();
			$highestColumn = $worksheet->getHighestColumn();

			//cabeceras
			if($worksheet->getTitle() == "variables"){
				$this->variablesHeader =  $worksheet->rangeToArray('A1:' . $highestColumn . '1', 
					null, true, false)[0];
			}else{
				$this->indicadoresHeader =  $worksheet->rangeToArray('A1:' . $highestColumn . '1', 
					null, true, false)[0];
				$this->indicadoresHeader[] = "variables";
			}

			//recorrido por las filas de la hoja
			for ($row = 2; $row <= $highestRow; $row++) { 
				$rowData = $worksheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, 
					null, true, false)[0];


				if($worksheet->getTitle() == "variables"){
					$variable = array();
					for ($i=0; $i <count($this->variablesHeader) ; $i++) { 
						$variable[$this->variablesHeader[$i]] = $rowData[$i];
					}
					if(count($variable)<4){
						$variable['Value'] = '';
					}

					$this->variables[] = $variable;
				}else{
					$indicador = array();
					$rowData[] = array();
					for ($i=0; $i <count($this->indicadoresHeader) ; $i++) { 
						$indicador[$this->indicadoresHeader[$i]] = $rowData[$i];
					}
					$indicador['Formula2'] = $indicador['Formula'] ;

					$this->indicadores[] = $indicador;
				}

			}
		}

	}

	function asignarVariables(){
		for($i = 0; $i<count($this->indicadores); $i++){
			foreach($this->variables as $variable){
				//if(preg_match('/^'.$variable['Name'].'$|^'.$variable['Name'].'(\W)|(\W)'.
					//$variable['Name'].'(\W)|(\W)'.$variable['Name'].'$/',$this->indicadores[$i]['Formula'])){
				if(preg_match('/\b'.$variable['Name'].'\b/u',$this->indicadores[$i]['Formula'])){
					$this->indicadores[$i]['variables'][] = $variable;
					$this->indicadores[$i]['labels'][] = $variable['Name'];
					$this->indicadores[$i]['values'][] = $variable['Value'];
				}
			}
		}

		return $this->indicadores;
	}


	function calcularFormula($formula){
		$objPHPExcel = new PHPExcel(); 
		$resultado = '';
		try{
			$resultado = PHPExcel_Calculation::getInstance($objPHPExcel)->calculateFormula($formula, 'A1', $objPHPExcel->getActiveSheet()->getCell('A1'));
		}catch(Exception $e){
			echo $e->getMessage();
		}
		

		return $resultado;
	}

}

?>*/
