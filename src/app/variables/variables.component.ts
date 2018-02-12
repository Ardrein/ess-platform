import { Component, OnInit, Input } from '@angular/core';



@Component({
	selector: 'app-variables',
	templateUrl: './variables.component.html',
	styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

	@Input() variables;

	constructor() {
		
	}

	ngOnInit() {  	
	
	}	

}


