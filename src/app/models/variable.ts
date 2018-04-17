//clase @Variable que contiene los datos de una variable

export class Variable{
	constructor(
		private _id: string,       //identificador de la variable
		private name: string,		//nombre de la variable
		private label: string,		//etiqueta de la variable
		private valueType: string,	//tipo de dato de la variable
		private value: any){		//valor asignado a la variable
	}

	getId(){
		return this._id;
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

	buildWithObject(variable){
		this._id = variable._id;
		this.name = variable.name;
		this.label = variable.label;
		this.valueType = variable.type;
		this.value = variable.value;
	}
}