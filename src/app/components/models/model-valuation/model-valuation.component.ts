import { Component, OnInit, ViewChild } from '@angular/core';
import { VariableFormComponent } from '../../variables/index';
import { IndicatorViewComponent } from '../../indicators/index';
import { ValuationService, AlertService } from '../../../_services/index';
import { ValuatedVariable, ModelValuation } from '../../../_models/index';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

/**
* Component used for displaying the valuation model's structure.
*/
@Component({
	selector: 'app-model-valuation',
	templateUrl: './model-valuation.component.html',
	styleUrls: ['./model-valuation.component.css']
})
export class ModelValuationComponent implements OnInit {

	/**
	* ViewChild for the variable form component and the variable valuation list's form.
	*/
	@ViewChild('varForm') variableFormComponent: VariableFormComponent;

	/**
	* Formly's model holder.
	*/
	private model:any = {};

	/**
	* Variable holding the model concept to valuate.
	*/
	private conceptModel:any = {};

	/**
	* Variable holding the model valuation.
	*/
	private modelValuation: ModelValuation;

	/**
	* Variables from the model to generate the visual model.
	*/
	private variables:any;

	/**
	* Variable used to determine if the model has or doesn't have errors.
	*/
	private isModelCorrect = false;

	/**
	* Variable used to determine if the model has been valuated.
	*/
	private isPreviewReady = false;
	/**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Fields contained in the fieldArray.
	*/
	private fieldGroup: FormlyFieldConfig[] =[];

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[]=[
	{
		key: 'name',
		type: 'input',
		templateOptions:{
			label: 'Name',
			placeholder: 'Model\'s name...',
			required: true
		}
	}
	];

	/**
	* @ignore
	*/
	constructor(private valuationService: ValuationService,
		private alertService: AlertService,
		private router: Router) { }

	/**
	* @ignore
	*/
	ngOnInit() {
		this.valuationService.getModel().subscribe(
			data => {
				this.conceptModel = data;
				this.variables = this.conceptModel.variables;
				
			});
	}

	/**
	* Function used to submit the model and save it in the database.
	*/
	submitModel(){
		this.valuationService.submitModel(this.model).subscribe(
			data =>{
				this.router.navigate(['user']);
				this.alertService.success('Model saved successfuly', true);
			},
			err =>{
				this.alertService.error(err);
			});	
	}

	/**
	* Function for generating the preview for the variables and indicators valuations.
	*/
	verifyModel(){
		//FormValid
		if(this.variableFormComponent.isFormValid()){
			
			this.generateModelValuation();

			//search for error in the indicators
			this.searchForErrorsInIndicators(this.conceptModel.indicators);

			this.isPreviewReady = true;

			
		}else{
			this.isModelCorrect = false;
			this.alertService.error("There are variables without values");

		}
	}

	/**
	* Function used to generate the model valuation.
	*/
	private generateModelValuation(){
		let valuations = this.variableFormComponent.getModel();
		let valuatedVariables: ValuatedVariable[] = [];

			//generation of valuated Variables
			for(let i=0; i< valuations.length;i++){
				let variable = new ValuatedVariable();
				variable.variable = valuations[i]._id;
				variable.value = valuations[i].value;

				valuatedVariables.push(variable);
			}

			// generation of valuated indicators
			let valuatedIndicators = this.valuationService.organizeIndicators(this.conceptModel.indicators,
				valuations);

			//model valuation creation
			let modelValuation = new ModelValuation();
			modelValuation.valuatedVariables = valuatedVariables;
			modelValuation.valuatedIndicators = valuatedIndicators;
			modelValuation.version = this.conceptModel._id;

			this.modelValuation = this.conceptModel.indicators;

			this.model = modelValuation;
		}

	/**
	* Function for searching for errors in the indicators after they have been evaluated.
	* @param {} indicators The indicators to search
	*/
	private searchForErrorsInIndicators(indicators){
		
		let indicErrorsList:string[] = [];
		for(let i=0;i < indicators.length ;i++){
			if(indicators[i].value == -1){
				indicErrorsList.push(indicators[i].name);
			}
		}

		if(indicErrorsList.length >0){
			this.isModelCorrect = false;

			this.alertService.error("There are indicators with errors in their valuations",
				false, true, indicErrorsList);
		}else{
			this.isModelCorrect = true;
			this.alertService.success("The indicators' values were succesfuly generated");
		}
	}


}
