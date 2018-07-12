import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


/**
* Component for rendering the possible model valuations of an equivalence.
*/
@Component({
	selector: 'app-values',
	templateUrl: './values.component.html',
	styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

	/**
	* The valuation list to display.
	*/
	private _valuations:any;

	/**
	* Seeter for the valuations.
	*/
	@Input('valuations')
	set versiondId(valuations){
		this._valuations = valuations;
	}	

	/**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Model to be represented by the form.
	*/
	private model:any = {};

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[];


	/**
	* @ignore
	*/
	constructor() { }


	/**
	* @ignore
	*/
	ngOnInit() {
		let options:any[] = [];

		for(let i=0;i<this._valuations.length;i++){
			let option:any ={};
			option.label = this._valuations[i].name;
			option.value = i;
			options.push(option);
		}

		this.fields = [
		{
			type: 'select',
			key: 'valuation',
			templateOptions:{
				label: 'Select a model valuation',
				labelProp: 'label',
				placeholder: 'Blank if you don\'t want a valuation',
				options: options,
			},
		}
		];
	}

	/**
	* Getter for the model Valuation, in case one is selected.
	* @return The model valuation in case one is selected, false otherwise.
	*/
	getValuation(){
		if(this.model.valuation){
			return this._valuations[this.model.valuation];
		}else{
			return false;
		}
	}

}
