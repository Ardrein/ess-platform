import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../../_services/alert.service';

/**
* Directive component used to flash messages.
*/
@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnDestroy {
	/**
	* Subscription that watches for changes in the subject from the alert service in order to get
	* its message.
	*/
	private subscription: Subscription;

	/**
	* Message do be displayed.
	*/
	message: any;

	/**
	* When the component is created, it will constantly get the message from the injected alert service 
	* in order to display it.
	* @param {AlertService} alertService Alert service injection.
	*/
	constructor(private alertService: AlertService) {
		this.subscription = alertService.getMessage().subscribe(message => { 
			this.message = message; 
		});
	}

	/**
	* @ignore
	*/
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}