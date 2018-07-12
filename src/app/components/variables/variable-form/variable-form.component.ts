import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

/**
*	Component used for displaying a variables's valuation structure.
*/
@Component({
	selector: 'app-variable-form',
	templateUrl: './variable-form.component.html',
	styleUrls: ['./variable-form.component.css']
})
export class VariableFormComponent implements OnInit {

	/**
	* Data input from the parent component.
	*/
	@Input() variableInput;

	/**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Model to be represented by the form.
	*/
	private model:any = {};

	/**
	* Fields contained in the fieldArray.
	*/
	private fieldGroup: FormlyFieldConfig[];

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[];


	/**
	* @ignore
	*/
	constructor() { }


	/**
	* @ignore
	*/
	ngOnInit() {
		this.fieldGroup = this.buildFormGroup(this.variableInput);
		this.model = this.variableInput;
		this.fields = [
		{
			
			fieldGroup: this.fieldGroup,

		}
		];
	}

	/**
	* Function used to select the field to display based on the variable's type.
	* @param {string} dataType The variale's type.
	* @param {string} label The variable's description(label)
	* @return The field to display for the valuation.
	*/
	private getValuationFields(dataType:string, label:string): FormlyFieldConfig{
		let field:FormlyFieldConfig = {};

		switch(dataType.toUpperCase()){
			case "PERCENTAGE":{
				field = {
					key: 'value',
					type: 'input',
					className: 'card-body',
					templateOptions:{
						type: 'number',
						placeholder: 'Variable\'s value...',
						min: 0,
						required: true,
						description: label
					},
					validation: {
						show: true,
					},
					expressionProperties: {
						'templateOptions.required': 'model.checked',
					},
				};
				break;
			}
			case "BOOLEAN":{
				field = {
					key: 'value',
					type: 'select',
					className: 'card-body',
					templateOptions:{
						options: [
						{
							label: 'True',
							value: 1
						},
						{
							label: 'False',
							value: 0
						}
						],
						required: true,
						description: label,
						placeholder: 'Variable\'s value...',
					},
					validation: {
						show: true,
					},
					expressionProperties: {
						'templateOptions.required': 'model.checked',
					},
				};
				break;
			}
			case "NUMBER":{
				field = {
					key: 'value',
					type: 'input',
					className: 'card-body',
					templateOptions:{
						type: 'number',
						placeholder: 'Variable\'s value...',
						min: 0,
						required: true,
						description: label
					},
					validation: {
						show: true,
					},
					expressionProperties: {
						'templateOptions.required': 'model.checked',
					},
				};
				break;
			}
		}


		return field;
	}

	/**
	* Function used to build the variable valuation form.
	* @param {} variables the model variables.
	* @return A fieldgroup holdin the variables' formulary.
	*/
	private buildFormGroup(variables): FormlyFieldConfig[]{
		let fieldGroup: FormlyFieldConfig[] = [];

		for(let i=0; i<variables.length ;i++){
			let fGroup: FormlyFieldConfig = {
				key: ''+i,
				fieldGroupClassName: 'card col-6 ',
				fieldGroup: [
				{
					className: 'card-header',
					template: '<h5>'+variables[i].name+'</h5>'
				}
				]
			};

			fGroup.fieldGroupClassName += (i%2==0 ? 'float-left' : 'float-right');

			fGroup.fieldGroup.push(this.getValuationFields(variables[i].type.name, 
				variables[i].label));
			fieldGroup.push(fGroup);
		}

		return fieldGroup;
	}

	/**
	* Method that returns a boolean indicating if the formGroup is or not valid.
	* @returns true if the form is valid, false if it isn't
	*/
	isFormValid(): boolean{
		return this.form.valid;
	}

	/**
	* Function to get all the variable valuations made.
	* @return The model with the values.
	*/
	getModel(){
		return this.model;
	}

}
