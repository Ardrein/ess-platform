import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TypeService } from '../../../_services/index';
import { VariableComponent } from '../variable/variable.component';

/**
*	Component used for displaying a variables's conceptual structure.
*/
@Component({
	selector: 'app-variable-concept',
	templateUrl: './variable-concept.component.html',
	styleUrls: ['./variable-concept.component.css']
})
export class VariableConceptComponent implements OnInit {

	/**
	* Data input from the parent component.
	*/
	@Input() variablesInput;

	/**
	* ViewChild to have access to the variable's data.
	*/
	@ViewChild('variable') variableComponent: VariableComponent;

	/**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Model to be represented by the form.
	*/
	private model:any = {
		variables: [{}]
	};

	/**
	* Fields contained in the fieldArray.
	*/
	private fieldGroup: FormlyFieldConfig[] = [];

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[];

	/**
	* @ignore
	*/
	constructor(private typeService: TypeService) {}

	/**
	* @ignore
	*/
	ngOnInit() {
		this.model.variables = this.variablesInput;
		this.fieldGroup = this.variableComponent.getConceptFields();
		this.fields = [
		{
			key: 'variables',
			type: 'repeat',
			fieldArray: {
				fieldGroupClassName: 'variableConcept',
				fieldGroup: this.fieldGroup
			}
		}];
	}

	/**
	* Getter for the model.
	*/
	getModel(){
		return this.model.variables;
	}


	/**
	* Method that returns a boolean indicating if the formGroup is or not valid.
	* @returns true if the form is valid, false if it isn't
	*/
	isFormValid(): boolean{
		return this.form.valid;
	}


}
