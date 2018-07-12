import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ValuatedIndicator } from '../_models/index';


/**
* Service used for handling the utilities of the model valuations.
*/
@Injectable()
export class ValuationService {

	/**
	* Subject to pass the model to valuate.
	*/
	private model = new BehaviorSubject<any>('');

	/**
	* @ignore
	*/
	constructor(private http: HttpClient) { }

	/**
	* Function used to submit the model(valuation) to the database.
	* @param {} model Model to submit.
	* @return An observable for executing the operation.
	*/
	submitModel(model){
		return this.http.post(appConfig.apiUrl+'/user/models/valuation', model);
	}


	/**
	* Function used for loading all Conceptual Models that are public and returning them in
	* an observable.
	* @return An observable holding the models.
	*/
	loadPublicModels(){
		return this.http.get(appConfig.apiUrl+ '/modelConcepts/public');
	}

	/**
	* Function used to load all the model equivalencies that are related to a model version.
	* @param {string} versionId The model version's id.
	*/
	loadEquivalencies(versionId:string){
		return this.http.get(appConfig.apiUrl+ '/modelEquivalencies/version/'+versionId);
	}

	/**
	* Function used to load all the model valuations that are related to a model version.
	* @param {string} versionId The model version's id.
	*/
	loadValuations(versionId:string){
		return this.http.get(appConfig.apiUrl+'/user/models/valuation/'+versionId);
	}


	/**
	* Getter for the observable that holds model.
	* @returns The observable that contains the model.
	*/
	getModel(){
		return this.model.asObservable();
	}

	/**
	* Function to emit the model through the subject.
	* @param {} data Model to emit.
	*/
	sendModel(data){
		this.model.next(data);	
	}

	/**
	* Function used to generate the indicator valuations and replace the valuations inside the indicators'
	* formulas.
	* @param {} indicators The indicators to replace.
	* @param {} variables The valuated variables.
	* @return  An array of ValuatedIndicator containing the valuations.
	*/
	organizeIndicators(indicators, variables){

		for(let i=0;i<indicators.length;i++){
			let currentInd = indicators[i];
			this.replaceIndicators(currentInd, indicators);
			this.replaceVariables(currentInd, variables);
		}

		let valuatedIndicators: ValuatedIndicator[] = this.createIndicatorValuations(indicators);

		return valuatedIndicators;
	}


	/**
	* Function used to find and replace the variables in a given indicator's formula for their value .
	* @param {} indicator Current indicator.
	* @param {} variables List of existing variables for the given model.
	*/
	private replaceVariables(indicator, variables){
		for(let i=0; i<variables.length; i++){

			let currentVar = variables[i];
			let currentVarName = currentVar.name;
			let oldFormula = indicator.hasOwnProperty('newFormula') ? indicator.newFormula : indicator.formula;

			let regexPart = /\b/;
			let regex = RegExp(regexPart.source+currentVarName+regexPart.source, 'g');


			if(regex.test(oldFormula)){
				indicator.newFormula = oldFormula.replace(regex, currentVar.value);

				if(indicator.hasOwnProperty('variables')){

					for(let j=0;j<indicator.variables.length;j++){
						if(indicator.variables[j] == currentVar._id){
							indicator.variables[j] = currentVar;
							break;
						}
					}
				}
			}
		}
	}


	/**
	* Function used to find and replace the indicators in a given indicator's formula for their value.
	* @param {} indicator Current indicator.
	* @param {} indicators List of existing indicators for the given model.
	*/
	private replaceIndicators(indicator, indicators){
		for(let i=0; i<indicators.length; i++){
			let currentIndr = indicators[i];
			let currentIndName = currentIndr.name;
			let oldFormula = indicator.hasOwnProperty('newFormula') ? indicator.newFormula : indicator.formula;

			let regexPart = /\b/;
			let regex = RegExp(regexPart.source+currentIndName+regexPart.source, 'g');


			if(regex.test(oldFormula)){
				let formula = currentIndr.hasOwnProperty('newFormula') ? currentIndr.newFormula : currentIndr.formula;
				indicator.newFormula = oldFormula.replace(regex, formula);
			}
		}
	}


	/**
	* Function used to generate the valuatedIndicators given a set of indicators.
	* @param {} indicators The given indicators with their formulas replaced by values.
	* @return An array of ValuatedIndicator containing the valuations.
	*/
	private createIndicatorValuations(indicators): ValuatedIndicator[]{
		let valuatedIndicators: ValuatedIndicator[] = [];

		for(let i=0; i<indicators.length ;i++){
			let valIndic = new ValuatedIndicator();
			valIndic.indicator = indicators[i]._id;
			let formula = indicators[i].hasOwnProperty('newFormula') ? indicators[i].newFormula : indicators[i].formula;
			valIndic.value = this.valuateFormula(formula);

			valuatedIndicators.push(valIndic);
			
			indicators[i].value = valIndic.value;
		}

		return valuatedIndicators;
	}

	/**
	* Function for valuating a formula.
	* @param {string} formula The formula to valuate. 
	* @return The formula's valuation or -1 if it can't be valuated.
	*/
	private valuateFormula(formula: string): number{
		return eval(formula) || -1;
	}
}
