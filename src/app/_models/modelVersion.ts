import { Indicator, Variable } from './index';

/**
* ModelVersion class for defining the properties of a model version.
*/
export class ModelVersion{
	_id: string;
	number: string;
	dateOfCreation: string;
	lastEdited: string;
	indicators: Indicator[];
	variables: Variable[];
}