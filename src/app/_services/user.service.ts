import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AlertService } from './alert.service';
import { appConfig } from '../app.config';


/**
* Service used to handle the utilities of a user account, such as the models the user has access to.
*/
@Injectable()
export class UserService {

	/**
	* Services are instantiated in the constructor.
	* @param {HttpClient} http Instance of HttpClient from Angular.
	* @param {AlertService} alertService Instance of AlertService.
	*/
	constructor(private http: HttpClient,
		private alertService: AlertService) { }

	/**
	* Function to load the concept models from an user.
	* @return An observable for fetching the models.
	*/
	loadModels(){
		return this.http.get(appConfig.apiUrl+ '/user/models');
	}

	/**
	* Function to load the model valuations from an user.
	* @return An observable for fetching the models.
	*/
	loadValuations(){
		return this.http.get(appConfig.apiUrl+'/user/models/valuation');
		
	}

	loadEquivalencies(){
		return this.http.get(appConfig.apiUrl+ '/user/models/equivalency');
	}

	/**
	* Function to change the state of a model version.
	* @param {} model The model that holds the version to update.
	* @param {number} newState The new state in which the version will be.
	* @return An observable for updating the model version.
	*/
	changeModelState(model, newState:number){
		let versionId = model.versions[0]._id;

		return this.http.put(appConfig.apiUrl+ '/user/models/'+versionId, {state: newState});
	}

	/**
	* Function used to delete a model version.
	* @param {string} versionId The model version's id.
	* @return An observable for deleting the model version.
	*/
	deleteModelVersion(versionId: string){
		return this.http.delete(appConfig.apiUrl+'/user/models/version/'+versionId);
	}

	/**
	* Function used to delete a model valuation.
	* @param {string} valuationId The model valuation's id.
	* @return An observable for deleting the model valuation.
	*/
	deleteModelValuation(valuationId: string){
		return this.http.delete(appConfig.apiUrl+'/user/models/valuation/'+valuationId);
	}

	/**
	* Function used to delete a model equivalency.
	* @param {string} equivalencyId The model equivalency's id.
	* @return An observable for deleting the model equivalency.
	*/
	deleteModelEquivalency(equivalencyId: string){
		return this.http.delete(appConfig.apiUrl+'/user/models/equivalency/'+equivalencyId);
	}

}
