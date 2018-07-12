import { Equivalency } from './index';

/**
* ModelConcept class for defining the properties of a model concept.
*/
export class ModelEquivalency{
	_id: string;
	name:string;
	firstModel: {
		version:string;
		concept:string;
	};
	secondModel: {
		version:string;
		concept:string;
	};
	equivalencies: Equivalency[];
}