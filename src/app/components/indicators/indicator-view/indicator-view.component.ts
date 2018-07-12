import { Component, OnInit, Input } from '@angular/core';

/**
* Component used to show the user the valuated indicators and their.
*/
@Component({
	selector: 'app-indicator-view',
	templateUrl: './indicator-view.component.html',
	styleUrls: ['./indicator-view.component.css']
})
export class IndicatorViewComponent implements OnInit {

	/**
	* Input for the model that hold's the valuated variables and indicators.
	*/
	@Input() modelInput;

	/**
	* @ignore
	*/
	constructor() { }

	/**
	* @ignore
	*/
	ngOnInit() {
	}

}
