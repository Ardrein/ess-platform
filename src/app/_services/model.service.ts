import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { TypeService } from './type.service';


/**
* Service used to handle model data obtained from the spreadsheet.
*/
@Injectable()
export class ModelService {

	/**
	* Subject as source.
	*/
	private model = new BehaviorSubject<any>('');


	/**
	* Constructor.
	*/
	constructor(private typeService: TypeService) {
	}


	/**
	* Getter for the observable that holds model.
	* @returns The observable that contains the model.
	*/
	public getModel(){
		return this.model.asObservable();
	}

	/**
	* Function to emit the model through the subject.
	* @param {} data Model to emit.
	*/
	public sendModel(data){
		this.organizeTypes(data.variables);
		this.organizeTypes(data.indicators);
		this.model.next(data);	
	}

	/**
	* Function to set the id for the data types of an array(indicators or variables).
	* @param {} dataArray Indicators/Variables array.
	*/
	private organizeTypes(dataArray){
		let types = this.typeService.getTypes();
		for(let i=0;i< dataArray.length;i++){
			this.replaceType(dataArray[i], types);
		}
	}

	/**
	* Function used to replace the Type name that an indicator/variale has for its id or an empty string
	* if it doesn't match any type.
	* @param {} data Variable/Indicator to modify.
	* @param {} types Array of existing types, obtained from TypeService.
	*/
	private replaceType(data, types){
		for(let i=0; i<types.length; i++){
			if(data.type.localeCompare(types[i].name, 'en', {sensitivity: 'accent'}) === 0 ){
				data.type = types[i]._id;
				break;
			}else if(i === types.length-1){
				data.type = '';
			}
		}
	}


}
