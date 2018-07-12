import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
/**
* Service used to display messages, be it error or success.
* It is used together with the component directive alert.
*/
@Injectable()
export class AlertService {
	/**
	* Angular Subject used to send the messages and their type.
	*/
	private subject = new Subject<any>();
	
	/**
	* Flag for determining if the message should be persistent after a route change.
	*/
	private keepAfterNavigationChange = false;

	/**
	* When the service is invoked, it will check if it should keep the message alive, otherwise
	* it clears it.
	* @param {Router} router Router instance injection.
	*/
	constructor(private router: Router) {
		//on route change clears the alert message
		this.router.events.subscribe(event => {
			if(event instanceof NavigationStart){
				//for a single location change
				this.keepAfterNavigationChange = false;
			}else{
				//clear alert
				this.subject.next();
			}
		});
	}

	/**
	* Function for changing the subject to a success state.
	* @param {string} message The success message to display.
	* @param {boolean} keepAfterNavigationChange Flag for keeping or not the message after navigation change.
	* @param {boolean} isList Flag for indicating if there is a list to display.
	* @param {} list List to display.
	*/
	success(message: string, keepAfterNavigationChange = false, isList = false, list = []){
		this.keepAfterNavigationChange = keepAfterNavigationChange;
		this.subject.next({type: 'success', text: message, isList: isList, list: list});
		window.scrollTo(0,0);
	}

	/**
	* Function for changing the subject to an error state.
	* @param {string} message The error message to display.
	* @param {boolean} keepAfterNavigationChange Flag for keeping or not the message after navigation change.
	* @param {boolean} isList Flag for indicating if there is a list to display.
	* @param {} list List to display.
	*/
	error(message: string, keepAfterNavigationChange = false, isList = false, list = []){
		this.keepAfterNavigationChange = keepAfterNavigationChange;
		this.subject.next({type: 'error', text: message, isList: isList, list: list});	
		window.scrollTo(0,0);
	}

	/**
	* Function for changing the subject to a warning state.
	* @param {string} message The warning message to display.
	* @param {boolean} keepAfterNavigationChange Flag for keeping or not the message after navigation change.
	* @param {boolean} isList Flag for indicating if there is a list to display.
	* @param {} list List to display.
	*/
	warning(message: string, keepAfterNavigationChange = false, isList = false, list = []){
		this.keepAfterNavigationChange = keepAfterNavigationChange;
		this.subject.next({type: 'warning', text: message, isList: isList, list: list});
		window.scrollTo(0,0);	
	}



	/**
	* Function for returning the current subject and its state(message and type).
	* @returns The current subject as an Observable.
	*/
	getMessage(): Observable<any>{
		return this.subject.asObservable();
	}

}
