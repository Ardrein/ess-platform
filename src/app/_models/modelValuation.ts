import { ValuatedIndicator } from './valuatedIndicator';
import { ValuatedVariable } from './valuatedVariable';
/**
* ModelValuation class for defining the properties of a model valuation.
*/
export class ModelValuation{
	_id: string;
	version: string;
	name:string;
	dateOfCreation: string;
	lastEdited: string;
	valuatedIndicators: ValuatedIndicator[];
	valuatedVariables: ValuatedVariable[];
}