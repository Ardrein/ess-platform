import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { AlertService } from './alert.service';
import { appConfig } from '../app.config';
import { Type } from '../_models/index';
/**
* Service used to load and hold the Types of indicators/variables from the database.
*/
@Injectable()
export class TypeService{

	/**
	* Array that will hold the types from the database
	*/
	private types = [];

	/**
	* Services are instantiated in the constructor.
	* @param {HttpClient} http Instance of HttpClient from Angular.
	* @param {AlertService} alertService Instance of AlertService.
	*/
	constructor(private http: HttpClient,
		private alertService: AlertService) { 
	}

	/**
	* Function to initialize the data from the service when the app starts running.
	*/
	public init(){
		this.loadTypes();
	}

	/**
	* Function used to load the Types from variables/indicators from the database 
	* into the types observable.
	*/
	private loadTypes(){
		this.http.get(appConfig.apiUrl + '/types')
		.subscribe(
			data =>{
				Object.keys(data).forEach( key => {
					this.types.push(data[key]);
				});
			}, error =>{
				this.alertService.error(error.message);
			});
	}


	/**
	* Getter for the observable that holds types.
	* @returns The observable that contains the types.
	*/
	public getTypesObservable(): Observable<any[]>{
		return Observable.of(this.types);
	}

	/**
	* Getter for the types.
	* @returns The array of types.
	*/
	public getTypes(){

		return this.types;
	}

}
