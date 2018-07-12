import { Component } from '@angular/core';
import { TypeService } from '../../../_services/index';
import { FormlyFieldConfig } from '@ngx-formly/core';

/**
*	Component used for displaying a variable.
*/
@Component({
	selector: 'app-variable',
	templateUrl: './variable.component.html'
})
export class VariableComponent {

	/**
	* @ignore
	*/
	constructor(private typeService: TypeService) {}

	/**
	* FieldGroup contains the fields that are to be used by a variable.
	*/
	private fieldGroup: FormlyFieldConfig[] = [
	{
		key: 'name',
		type: 'input',
		templateOptions:{
			label: 'Name',
			placeholder: 'Variable\'s name...',
			required: true
		}
	},
	{
		key: 'label',
		type: 'textarea',
		templateOptions:{
			label: 'Label',
			placeholder: 'Variable\'s description...',
			required: true,
			rows: 2
		}
	}
	];

	/**
	* TypeSelect is an optional field to be used only during the Model Concept creation.
	*/
	private typeSelect: FormlyFieldConfig = {
		key: 'type',
		type: 'select',
		templateOptions:{
			label: 'Type',
			valueProp: '_id',
			labelProp: 'name',
			placeholder: 'Variable\'s type...',
			required: true,
			options: [],

		},
		lifecycle: {
			onInit: (form, field) => {
				field.templateOptions.options = this.typeService.getTypes();
			},
		},

	};

	/**
	* Function used to group the fields used during the creation of a conceptual model.
	* @return FormlyFieldConfig array containing the fields.
	*/
	getConceptFields(): FormlyFieldConfig[]{
		this.fieldGroup.push(this.typeSelect);

		return this.fieldGroup;
	}

}