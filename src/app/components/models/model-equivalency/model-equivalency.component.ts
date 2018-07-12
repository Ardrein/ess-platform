import { Component, OnInit, ViewChild } from '@angular/core';
import { EquivalencyService, AlertService } from '../../../_services/index';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatStepper } from '@angular/material';
import { VariableEquivalencyComponent } from '../../variables/index';
import { ModelEquivalency, Equivalency } from '../../../_models/index';


/**
* Component for displaying the model equivalencies.
*/
@Component({
	selector: 'app-model-equivalency',
	templateUrl: './model-equivalency.component.html',
	styleUrls: ['./model-equivalency.component.css']
})
export class ModelEquivalencyComponent implements OnInit {

	/**
	* Component for creating the variable equivalencies.
	*/
	@ViewChild('equivalencies') equivalenciesComponent: VariableEquivalencyComponent;

	/**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Model to be represented by the form.
	*/
	private model:any = {};

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[];

	/**
	* Field for the select's options
	*/
	private options:any[] = [];

	/**
	* Variable to hold the models(concept) belonging to the user.
	*/
	private myModels:any;

	/**
	* Variable to hold the model concepts' variables.
	*/
	private modelVariables:any[];

	/**
	* Variable used to determine if the model has or doesn't have errors.
	*/
	private isModelCorrect = false;

	/**
	* Variable for holding the identifiers of the verified concept models.
	*/
	private modelsToSubmit:any[];

	/**
	* Name of the equivalency to submit.
	*/
	private equivalencyName:string;

	/**
	* @ignore
	*/
	constructor(private equivalencyService: EquivalencyService,
		private alertService: AlertService) { }


	/**
	* @ignore
	*/
	ngOnInit() {
		this.loadModels();
	}


	/**
	* Function used to load the user's models(concept) from the database.
	*/
	private loadModels(){
		this.equivalencyService.loadModels().subscribe(
			data => {
				this.myModels = data;
				Object.keys(data).forEach( key => {
					for(let i=0; i< data[key].versions.length;i++){
						let option:any = {};
						let concept = data[key].versions[i];

						option.name = data[key].name
						option.label = concept.number;
						option.value = {model:key, version:i};

						this.options.push(option);
					}
				});

				this.fields = [
				{
					key: 'models',
					type: 'select',
					templateOptions:{
						label: 'Select 2 Model Concepts',
						multiple: true,
						labelProp: 'label',
						groupProp: 'name',
						placeholder: 'Select 2 models to make equivalency',
						options: this.options,
						required: true,
					},
				},
				{
					key: 'name',
					type: 'input',
					templateOptions:{
						label: 'Name of the Equivalency',
						placeholder: 'Equivalency\'s name...',
						required: true
					}
				}
				];
			},
			err =>{
				this.alertService.error(err.message);
			});
	}

	/**
	* Function used to submit the model
	*/
	submit(){
		let equivalencies:any[] = this.equivalenciesComponent.getEquivalencies();
		if(equivalencies.length>0){
			let modelEquivalency = new ModelEquivalency();

			modelEquivalency.name = this.equivalencyName;
			modelEquivalency.firstModel = this.modelsToSubmit[0];
			modelEquivalency.secondModel = this.modelsToSubmit[1];
			modelEquivalency.equivalencies = [];

			for(let i=0;i<equivalencies.length;i++){
				let equivalency = new Equivalency();
				equivalency.variableA = equivalencies[i][0]._id;
				equivalency.variableB = equivalencies[i][1]._id;
				modelEquivalency.equivalencies.push(equivalency);
			}

			this.equivalencyService.submitModel(modelEquivalency).subscribe(
				data =>{
					
					this.alertService.success("Equivalency saved successfuly");
				},
				err =>{
					this.alertService.error(err);
				});

			
		}else{
			this.alertService.error("You must have at least 1 equivalency before proceeding.");
		}
	}

	/**
	* Function used to verify if only 2 model equivalencies are selected.
	*/
	verifyModel(){
		if(this.model.name && this.model.models && this.model.models.length === 2){
			this.selectModelsVariables();
			this.isModelCorrect = true;
			this.alertService.success("You may now select the variables to make the equivalency(ies)");
		}else{
			this.isModelCorrect = false;
			this.alertService.error("You must select only 2 models to create equivalencies");
		}
	}

	/**
	* Function used to get the variables from the selected models and store them in a variable
	* that will be passed to another component for rendering.
	*/
	private selectModelsVariables(){
		this.modelVariables = [];
		this.modelsToSubmit = [];
		for(let i=0; i<this.model.models.length;i++){
			let modelIndex = this.model.models[i].model;
			let versionIndex = this.model.models[i].version;
			this.modelVariables.push(this.myModels[modelIndex].versions[versionIndex].variables);
			this.modelsToSubmit.push({
				version: this.myModels[modelIndex].versions[versionIndex]._id ,
				concept: this.myModels[modelIndex]._id
			});
		}
		this.equivalencyName = this.model.name;
	}
}
