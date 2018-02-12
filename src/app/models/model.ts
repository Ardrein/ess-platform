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
}