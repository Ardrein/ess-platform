//clase @Indicator que contiene los datos de un indicador

import {Variable} from './variable';

export class Indicator{

	private subIndicators: Indicator[];	//lista de subindicadores de este indicador
	private variables: Variable[];	//lista de variables de este indicador
	private formulaValues: string; //formula con los nombres reemplazados por sus valores numericos respectivos

	constructor(
		private _id: string,     //identificador del indicador
		private name: string,    //nombre del indicador
		private label: string,	 //etiqueta del indicador
		private valueType: string,  //tipo de dato
		private formula: string){   //formula con los nombres sin reemplazar
		
		this.subIndicators = [];
		this.variables = [];
		this.formulaValues = formula;
	}

	//funcion para obtener el valor de este indicador, en caso de que no se pueda evaluar retorna un error
	getCalculatedValue(){
		return eval(this.formulaValues) || 'error';			
	}

	getId(){
		return this._id;
	}

	getName(){
		return this.name;
	}

	getLabel(){
		return this.label;
	}

	getType(){
		return this.valueType;
	}

	getFormula(){
		return this.formula;
	}

	getFormulaValues(){
		return this.formulaValues;
	}

	setFormulaValues(formulaValues:string){
		this.formulaValues = formulaValues;
	}

	getSubindicators(){
		return this.subIndicators;
	}

	setSubindicators(subIndicators: Indicator[]){
		this.subIndicators = subIndicators;
	}

	getVariables(){
		return this.variables;
	}

	setVariables(variables: Variable[]){
		this.variables = variables;
	}

	buildWithObject(indicator){
		this._id = indicator._id;
		this.name = indicator.name;
		this.label = indicator.label;
		this.valueType = indicator.valueType;
		this.formula = indicator.formula;
		this.formulaValues = indicator.formulaValues;
		this.variables = [];
		this.subIndicators = [];

		for(let vars of indicator.variables){
			let newVariable = new Variable('','','','','');
			newVariable.buildWithObject(vars);
			this.variables.push(newVariable);
		}


		for(let indic of indicator.subIndicators){
			let newIndicator = new Indicator('','','','','');
			newIndicator.buildWithObject(indic);
			this.subIndicators.push(newIndicator);
		}
	}
}