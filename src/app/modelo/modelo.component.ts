import { Component, OnInit } from '@angular/core';
import { VariablesComponent } from '../variables/variables.component';
import { IndicatorsComponent } from '../indicators/indicators.component';
import {SpreadsheetsService} from '../spreadsheets.service';
import {PreviewModelService} from '../preview-model.service';
import {Router} from '@angular/router';

import {Model} from '../models/model';
import {Variable} from '../models/variable';
import {Indicator} from '../models/indicator';

@Component({
	selector: 'app-modelo',
	templateUrl: './modelo.component.html',
	styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {

	//datos sin organizar
	private indicatorsLists; //arreglo que contiene los arreglos de indicadores
	private variables;		//arreglo que contiene las variales


	//datos del modelo organizado
	private indicatorsModel:Model;
	private vars:Array<Variable>;
	private indicators:Array<Indicator>;

	constructor(private spreadsheetService: SpreadsheetsService,private _previewModelService: PreviewModelService,
		private router: Router) { 
		this.variables = this.spreadsheetService.getVariables();
		this.indicatorsLists = this.spreadsheetService.getIndicatorsList();
		this.indicatorsModel = this._previewModelService.getModel();
	}

	ngOnInit() {
	}




private sendModel():void{
	this._previewModelService.setModel(this.indicatorsModel);
	this.router.navigate(['/preview']);	 
}



//Funcion para asignar las variables a los indicadores y los subindicadores a su sitio correspondiente
private assignData(){
	this.vars = [];
	this.indicators = [];
	console.log(this.variables);
	console.log(this.indicatorsLists);

	for(let i=0;i<this.variables.length ;i++){
		let currentVar = this.variables[i];
  		//_id,name,label,type,value
  		let varToAdd = new Variable(currentVar._id,currentVar.name,currentVar.label,currentVar.type,currentVar.value); 

  		this.vars.push(varToAdd);
  	}

  	for(let i=0;i<this.indicatorsLists.length;i++){
  		let currentList = this.indicatorsLists[i];
  		for(let j=0;j<currentList.length;j++){
  			let currentIndicator = currentList[j];
  			//_id,name,label,type,formula
  			let indicatorToAdd = new Indicator(currentIndicator._id,currentIndicator.name,currentIndicator.label,
  				currentIndicator.type,currentIndicator.formula);
  			this.replaceVariables(indicatorToAdd, this.vars);

  			if(i >0){
  				//reemplazo de subindicadores
  				this.replaceSubIndicators(indicatorToAdd, this.indicators);
  			}

  			this.indicators.push(indicatorToAdd);

  		}



  	}


  	this.indicatorsModel =  new Model(this.vars, this.indicators);

  	this.sendModel();

  }

  //Funcion para reemplazar los valores de las variables en la formula de un indicador
  private replaceVariables(indicator:Indicator, variables:Variable[]){
  	for(let i=0;i<variables.length;i++){

  		let currentVar = variables[i];
  		let currentVarName = currentVar.getName();
  		let oldFormula = indicator.getFormulaValues();

  		//expresiones regulares para capturar el nombre de la variable y reemplazarlo en la formula del indicador
  		let regexPart = /\b/;
  		let regex = RegExp(regexPart.source+currentVarName+regexPart.source, 'g');

  		if(regex.test(oldFormula)){
  			let newFormula = oldFormula.replace(regex, currentVar.getValue());
  			indicator.setFormulaValues(newFormula);
  			indicator.getVariables().push(currentVar);
  		}
  		
  	}
  }

  //Funcion para reemplazar los valores de los indicadores precedentes en la formula de un indicador
  private replaceSubIndicators(indicator:Indicator, indicList:Indicator[]){
  	for(let j=0;j<indicList.length;j++){
  		let currentInd = indicList[j];
  		let currentIndName = currentInd.getName();
  		let oldFormula = indicator.getFormulaValues();

  		let regexPart = /\b/;
  		let regex = RegExp(regexPart.source+currentIndName+regexPart.source, 'g');

  		if(regex.test(oldFormula)){
  			let newFormula = oldFormula.replace(regex, currentInd.getCalculatedValue());
  			indicator.setFormulaValues(newFormula);
  			indicator.getSubindicators().push(currentInd);
  		}
  	}
  	
  }

}
