import { Component, OnInit } from '@angular/core';
import { SpreadsheetService, AlertService, ModelService } from '../../_services/index';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Indicator, Variable, ModelConcept, ModelVersion } from '../../_models/index';
import { Router } from '@angular/router';

/**
* Component used to load 
*/
@Component({
	selector: 'app-spreadsheet-loader',
	templateUrl: './spreadsheet-loader.component.html',
	styleUrls: ['./spreadsheet-loader.component.css']
})
export class SpreadsheetLoaderComponent implements OnInit {

	/**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Model to be represented by the form.
	*/
	private model:{ 'id': string } = { id: ''};

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[] =[
	{
		key: 'id',
		type: 'input',
		templateOptions:{
			label: 'Spreadsheet Id',
			placeholder: 'Type the spreadsheet id here',
			required: true
		}
	}
	];

	/**
	* Services are instantiated in the constructor.
	* @param {SpreadsheetService} spreadsheetService Instance of SpreadsheetService.
	* @param {AlertService} alertService Instance of AlertService.
	* @param {ModelService} modelService Instance of ModelService.
	* @param {Router} router Angular's router used to change from component.
	*/
	constructor(
		private spreadsheetService: SpreadsheetService,
		private alertService: AlertService,
		private modelService: ModelService,
		private router: Router) {
	}

	/**
	* @ignore
	*/
	ngOnInit() {
	}

	/**
	* Function used to load  a spreadsheet based on the inputted ID and send the data
	* to the next component.
	*/
	private loadSpreadsheet(): void{
		if(this.form.valid){
			this.spreadsheetService.loadSpreadsheet(this.model.id)
			.subscribe(
				data =>{
					this.alertService.success("Model loaded correctly.", true);
					this.sendData(data);
				},
				error =>{
					this.alertService.error(error.message);
				});
		}
	}

	/**
	* Function used to send the data fetched from the spreadsheet.
	* @param {} data Object that contains the indicators and variables fetched.
	*/
	private sendData(data){
		this.modelService.sendModel(data);
		this.router.navigate(['/concept']);
	}

}