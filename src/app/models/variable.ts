//clase @Variable que contiene los datos de una variable

export class Variable{
	constructor(
		private name: string,		//nombre de la variable
		private label: string,		//etiqueta de la variable
		private valueType: string,	//tipo de dato de la variable
		private value: any){		//valor asignado a la variable
	}

	getName(){
		return this.name;
	}

	getLabel(){
		return this.label;
	}

	getType(){
		return this.valueType;
	}

	getValue(){
		return this.value;
	}
}