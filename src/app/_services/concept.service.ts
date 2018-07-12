import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { MathService } from './math.service';
import { ModelConcept, ModelVersion, Indicator, Variable } from '../_models/index';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';

/**
* Service used to handle data from the conceptual model.
*/
@Injectable()
export class ConceptService {

	/**
	* Constructor for injecting services.
	*/
	constructor(private alertService: AlertService,
		private mathService: MathService,
		private http: HttpClient) { }


	/**
	* Function used to submit the model to the database.
	* @param {} model The model object that contains the indicators and variables.
	* @param {string} name The model's name.
	* @param {string} version The model's version.
	* @return An observable for subscribing in order to submit the model.
	*/
	submitModel(model, name: string, version: string){
		let modelConcept = this.createModelConcept(model, name, version);
		
		return this.http.post(appConfig.apiUrl +'/modelConcepts/create', modelConcept);
	}

	/**
	* Function used to create a ModelConcept that is ready to insert in the database.
	* @param {} model The model object that contains the indicators and variables.
	* @param {string} name The model's name.
	* @param {string} version The model's version.
	* @return The ModelConcept.
	*/
	private createModelConcept(model, name: string, version: string): ModelConcept{
		let modelConcept = new ModelConcept();
		modelConcept.name = name;

		let modelVersion = new ModelVersion();
		modelVersion.number = version;
		modelVersion.variables = this.createVariables(model.variables);
		modelVersion.indicators = this.createIndicators(model.indicators);

		modelConcept.versions = [];
		modelConcept.versions.push(modelVersion);

		return modelConcept;
	}

	/**
	* Function used to transform the array of indicators into an array using the model for Indicator.
	* @param {} indicators Indicators to transform.
	* @return Array of Indicator.
	*/
	private createIndicators(indicators): Indicator[]{

		let modelIndicators:Indicator[] = [];

		for(let i=0; i<indicators.length ; i++){
			let newIndicator = new Indicator();
			newIndicator._id = indicators[i]._id;
			newIndicator.name = indicators[i].name;
			newIndicator.label = indicators[i].label;
			newIndicator.formula = indicators[i].formula;
			newIndicator.type = indicators[i].type;
			newIndicator.variables = [];

			for(let j=0; j < indicators[i].variables.length ; j++){
				newIndicator.variables.push(indicators[i].variables[j]._id);//push variable ids
			}
			modelIndicators.push(newIndicator);
		}

		return modelIndicators;
	}


	/**
	* Function used to transform the array of variables into an array using the model for Variable.
	* @param {} variables Variables to transform.
	* @return Array of Variable.
	*/
	private createVariables(variables): Variable[]{
		let modelVariables:Variable[] = [];

		for(let i=0; i<variables.length ; i++){
			let newVariable = new Variable();
			newVariable._id = variables[i]._id;
			newVariable.name = variables[i].name;
			newVariable.label = variables[i].label;
			newVariable.type = variables[i].type;

			modelVariables.push(newVariable);
		}

		return modelVariables;
	}


	/**
	* Function used to organize the indicators and variables. The indicators will have the variables
	* assignated. The indicators with errors on their formula names will be shown as well as the
	* variables that aren't being used.
	* @param {} indicators List of existing variables for the given model.
	* @param {} variables List of existing variables for the given model.
	* @return True if the model(indicators, variables) has no errors, false otherwise.
	*/
	organizeModel(indicators, variables): boolean{
		let unusedVariables = JSON.parse(JSON.stringify(variables)); //variables not assigned to any indicator.
		let indicatorsWithErrors = []; //indicators whose formula has variables/indicators not found or sintaxis errors.

		let regexPart = /(?=\D)\w(?=\D)*/;//regex for searching names
		let regex = RegExp(regexPart, 'g');
		let indicator;

		//variables are assigned to the indicators and indicators are scanned for errors(in formula names)
		for(let i=0 ; i<indicators.length ; i++){
			indicator = indicators[i];
			this.findVariables(indicator, variables, unusedVariables);
			this.findIndicators(indicator,indicators);
			let formula = indicator.hasOwnProperty('newFormula') ? indicator.newFormula : indicator.formula;

			if(regex.test(formula)){
				indicatorsWithErrors.push(indicator);
				indicator.alert = 2;//indicator alert-error
			}else if(!this.mathService.isFormulaValid(indicator.formula)){
				indicatorsWithErrors.push(indicator);
				indicator.alert = 2;//indicator alert-error
			}else{
				indicator.alert = 0;//indicator alert-success
			}

			if(indicator.hasOwnProperty('newFormula')){
				delete indicator.newFormula;
			} 
		}

		unusedVariables = this.deleteEmptyElements(unusedVariables);

		if(indicatorsWithErrors.length > 0){
			this.alertService.error("There is an error with the indicators, variables names or a "
				+"sintaxis error in the formulas:", 
				false, true, this.arrayToStringArray(indicatorsWithErrors));
			return false;

		}else if(unusedVariables.length > 0){
			this.alertService.warning("There are unused variables: ", 
				false, true, this.arrayToStringArray(unusedVariables));
			return true;
		}else{
			this.alertService.success("The model has no errors.");
			return true;
		}
		
	}

	/**
	* Function used to find the variables in a given indicator and add them to its variables list.
	* @param {} indicator Current indicator.
	* @param {} variables List of existing variables for the given model.
	* @param {} unusedVariables List of variables which weren't used in any indicator.
	*/
	private findVariables(indicator, variables, unusedVariables){
		for(let i=0; i<variables.length; i++){

			let currentVar = variables[i];
			let currentVarName = currentVar.name;
			let oldFormula = indicator.hasOwnProperty('newFormula') ? indicator.newFormula : indicator.formula;

			let regexPart = /\b/;
			let regex = RegExp(regexPart.source+currentVarName+regexPart.source, 'g');


			if(regex.test(oldFormula)){
				let newFormula = oldFormula.replace(regex, '');
				indicator.newFormula = newFormula;
				indicator.variables = indicator.hasOwnProperty('variables') ? indicator.variables : [];
				indicator.variables.push(currentVar);
				this.deleteVariable(unusedVariables, variables.indexOf(currentVar));
				currentVar.alert = 0;//variable alert-success

			}

			if(!currentVar.hasOwnProperty('alert')){
				currentVar.alert = 1;//variable alert-warning
			}
		}
	}

	/**
	* Function used to find the indicators in a given indicators, in case there are any
	* in order to verify if there are errors in the formulas.
	* @param {} indicator Current indicator.
	* @param {} indicators List of existing indicators for the given model.
	*/
	private findIndicators(indicator, indicators){
		for(let i=0; i<indicators.length; i++){
			let currentIndr = indicators[i];
			let currentIndName = currentIndr.name;
			let oldFormula = indicator.hasOwnProperty('newFormula') ? indicator.newFormula : indicator.formula;

			let regexPart = /\b/;
			let regex = RegExp(regexPart.source+currentIndName+regexPart.source, 'g');


			if(regex.test(oldFormula)){
				let newFormula = oldFormula.replace(regex, '');
				indicator.newFormula = newFormula;
			}
		}
	}

	/**
	* Function used to replace a variable from the unusedVariables array for empty,
	* leaving only those who are unused.
	* @param {} unusedVariables Array of variables which contains the unused ones.
	* @param {} index Index of the unused variable.
	*/
	private deleteVariable(unusedVariables, index) {
		if (index !== -1) {
			unusedVariables.splice(index, 1,"");
		}        
	}

	/**
	* Function used to clean an array from empty elements.
	* @param {} myArray Array to clean.
	* @return The cleaned array.
	*/
	private deleteEmptyElements(myArray){
		for(let i=0; i< myArray.length; i++){
			if(myArray[i] == ""){
				myArray.splice(i,1);
				i--;
			}
		}
		return myArray;
	}


	/**
	* Function used to transform an array of indicators/variables into an array that contains
	* their names.
	* @param {} myArray Array to transform.
	* @returns The array containing the variables/indicators names.
	*/
	private arrayToStringArray(myArray): string[]{
		let message = [];
		
		for(let i=0; i< myArray.length; i++){
			message.push(myArray[i].name);
		}

		return message;
	}


}
