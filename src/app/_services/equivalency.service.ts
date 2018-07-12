import { Injectable } from '@angular/core';
import { appConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

/*
* Service for the equivalencies utilities.
*/
@Injectable()
export class EquivalencyService {

	/**
	*  @ignore
	*/
	constructor(private http: HttpClient) { }

	/**
	* Function to load the concept models from an user.
	* @return An observable for fetching the models.
	*/
	loadModels(){
		return this.http.get(appConfig.apiUrl+ '/user/models');
	}


	/**
	* Function used to submit the model equivalency to the database.
	* @param {} model The model equivalency to submit.
	*/
	submitModel(modelEquivalency){
		return this.http.post(appConfig.apiUrl +'/user/models/equivalency/create', modelEquivalency);
	}

}
