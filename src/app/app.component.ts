import { Component } from '@angular/core';
import { TypeService } from './_services/index';

/**
*	Main Component of the application.
*/
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	/**
	*
	*/
	constructor(private typeService: TypeService){
		this.typeService.init();
	}
}
