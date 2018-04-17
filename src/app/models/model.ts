//clase @Model que contiene la lista de variables y de indicadores

import {Variable} from './variable';
import {Indicator} from './indicator';

export class Model{


	constructor(private variables: Variable[],	//lista de variables del model
	 private indicators: Indicator[]){			//lista de indicadores del modelo
	} 

	getVariables(){
		return this.variables;
	}

	getIndicators(){
		return this.indicators;
	}

	buildWithObject(model){
		this.indicators = [];
		this.variables = [];
		for(let variable of model.variables){
			let newVariable = new Variable('','','','','');
			newVariable.buildWithObject(variable);
			this.variables.push(newVariable);
		}

		for(let indicator of model.indicators){
			let newIndicator = new Indicator('','','','','');
			newIndicator.buildWithObject(indicator);
			this.indicators.push(newIndicator);

		}
	}
}