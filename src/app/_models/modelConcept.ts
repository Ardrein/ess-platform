import { ModelVersion } from './index';

/**
* ModelConcept class for defining the properties of a model concept.
*/
export class ModelConcept{
	_id: string;
	name: string;
	versions: ModelVersion[];
}