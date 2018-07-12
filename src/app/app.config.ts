import { ConfigOption } from '@ngx-formly/core';
import { RepeatTypeComponent } from './components/_helperForms/index';
/**
* Configuration file that contains various configuration variables used in the application.
*/

/**
* Route for the server side.
*/
export const appConfig = {
	apiUrl : '/api'
};

/**
* Formly custom components.
*/
export const FIELD_TYPE_COMPONENTS = [
	RepeatTypeComponent
];

/**
* Formly custom configuration.
*/
export const CUSTOM_FORMLY_CONFIG: ConfigOption = {
	validationMessages: [
		{ name: 'required', message: 'This field is required' }
	],
	types: [
		{ name: 'repeat', component: RepeatTypeComponent }
	]
};