import { Component } from '@angular/core';
import { TypeService } from '../../../_services/index';
import { FormlyFieldConfig } from '@ngx-formly/core';

/**
*	Component used for displaying an indicator.
*/
@Component({
	selector: 'app-indicator',
	templateUrl: './indicator.component.html'
})
export class IndicatorComponent {

	/**
	* @ignore
	*/
	constructor(private typeService: TypeService) {}

	/**
	* FieldGroup contains the fields that are to be used by an indicator.
	*/
	private fieldGroup: FormlyFieldConfig[] = [
	{

		key: 'name',
		type: 'input',
		templateOptions:{
			label: 'Name',
			placeholder: 'Indicator\'s name...',
			required: true
		}
	},
	{

		key: 'label',
		type: 'textarea',
		templateOptions:{
			label: 'Label',
			placeholder: 'Indicator\'s description...',
			required: true,
			rows: 2
		}
	},
	{

		key: 'formula',
		type: 'textarea',
		templateOptions:{
			label: 'Formula',
			placeholder: 'Indicator\'s formula...',
			required: true,
			rows: 3
		}
	}];

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
			placeholder: 'Indicator\'s type...',
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