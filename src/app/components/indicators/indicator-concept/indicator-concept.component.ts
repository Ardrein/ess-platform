import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TypeService } from '../../../_services/index';
import { IndicatorComponent } from '../indicator/indicator.component';

/**
*	Component used for displaying an indicator's conceptual structure.
*/
@Component({
	selector: 'app-indicator-concept',
	templateUrl: './indicator-concept.component.html',
	styleUrls: ['./indicator-concept.component.css']
})
export class IndicatorConceptComponent implements OnInit {

	/**
	* Data input from the parent component.
	*/
	@Input() indicatorsInput;

	/**
	* ViewChild to have access to the indicator's data.
	*/
	@ViewChild('indicator') indicatorComponent: IndicatorComponent;


    /**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Model to be represented by the form.
	*/
	private model:any = {
		indicators: [{}]
	};

	/**
	* Fields contained in the fieldArray.
	*/
	private fieldGroup: FormlyFieldConfig[] = [];

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[];

	/**
	* @ignore
	*/
	constructor(private typeService: TypeService) { }

	/**
	* @ignore
	*/
	ngOnInit() {
		this.model.indicators = this.indicatorsInput;
		this.fieldGroup = this.indicatorComponent.getConceptFields();
		this.fields = [
		{
			key: 'indicators',
			type: 'repeat',
			fieldArray: {
				fieldGroupClassName: 'indicatorConcept',
				fieldGroup: this.fieldGroup
			}
		}
		];
	}



	/**
	* Getter for the model.
	*/
	getModel(){
		return this.model.indicators;
	}

	/**
	* Method that returns a boolean indicating if the formGroup is or not valid.
	* @returns true if the form is valid, false if it isn't
	*/
	isFormValid(): boolean{
		return this.form.valid;
	}

}
