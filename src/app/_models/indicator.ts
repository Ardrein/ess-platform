/**
* Indicator model that defines the properties of an indicator.
*/
export class Indicator{
	_id: string;
	name: string;
	label: string;
	formula: string;
	type: string;
	variables: string[];
}