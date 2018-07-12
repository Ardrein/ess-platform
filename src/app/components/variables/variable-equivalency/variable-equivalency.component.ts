import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from '../../../_services/index';


/**
* Component for displaying the variables of model equivalencies during the creation process.
*/
@Component({
	selector: 'app-variable-equivalency',
	templateUrl: './variable-equivalency.component.html',
	styleUrls: ['./variable-equivalency.component.css']
})
export class VariableEquivalencyComponent implements OnInit {

	/**
	* Variable to hold the model concepts' variables.
	*/
	@Input() modelVariables:any[];


	/**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Model to be represented by the form.
	*/
	private model:any = {
		equivalencies: []
	};

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[];

	/**
	* @ignore
	*/
	constructor(private alertService: AlertService) { }

	/**
	* @ignore
	*/
	ngOnInit() {
		this.buildFields();
	}

	/**
	* Function to build the options of both selects.
	*/
	private buildFields(){
		let option1:any[] = [];
		let option2:any[] = [];

		for(let i=0; i<this.modelVariables[0].length ;i++){
			let option:any = {};
			option.label = this.modelVariables[0][i].name;
			option.value =  i;

			option1.push(option);
		}

		for(let i=0; i<this.modelVariables[1].length ;i++){
			let option:any = {};
			option.label = this.modelVariables[1][i].name;
			option.value =  i;

			option2.push(option);
		}


		this.fields = [
		{
			key: 'variableA',
			type: 'select',
			templateOptions:{
				label: 'Variables From Model1',
				labelProp: 'label',
				placeholder: 'Select a variable',
				options: option1,
				required: true,
			},
		},
		{
			key: 'variableB',
			type: 'select',
			templateOptions:{
				label: 'Variables From Model2',
				labelProp: 'label',
				placeholder: 'Select a variable',
				options: option2,
				required: true,
			},
		}
		];
	}


	/**
	* Function to add an equivalency to the model array.
	*/
	addEquivalency(){
		let equivalency:any = {};

		equivalency['0'] = this.modelVariables[0][this.model.variableA];
		equivalency['1'] = this.modelVariables[1][this.model.variableB];
		this.model.equivalencies.push(equivalency);
	}

	/**
	* Function used to remove an equivalency from the model array.
	* @param {number} i The position of the equivalency in the array.
	*/
	removeEquivalency(i:number){
		this.model.equivalencies.splice(i,1);
	}

	/**
	* Function to retrieve the equivalencies from the model.
	* @return An array holding the equivalencies.
	*/
	getEquivalencies(){
		return this.model.equivalencies;
	}

}
