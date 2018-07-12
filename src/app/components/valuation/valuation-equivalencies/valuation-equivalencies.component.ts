import { Component, OnInit, Input } from '@angular/core';
import { ValuationService, AlertService } from '../../../_services/index';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


/**
* Component for rendering the equivalencies when an user is valuating a model.
*/
@Component({
	selector: 'app-valuation-equivalencies',
	templateUrl: './valuation-equivalencies.component.html',
	styleUrls: ['./valuation-equivalencies.component.css']
})
export class ValuationEquivalenciesComponent implements OnInit {


	/**
	* VersionId for filtering the equivalencies
	*/
	private _versionId:string;

	/**
	* VersionId's setter.
	*/
	@Input('versionId')
	set versiondId(versionId:string){
		this._versionId = versionId;
		this.loadEquivalencies();
	}	

	/**
	* Variable holding the equivalencies from the database.
	*/
	private myEquivalencies:any;

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
	constructor(private valuationService: ValuationService,
				private alertService: AlertService) { }

	/**
	* @ignore
	*/
	ngOnInit() {
	}


	/**
	* Function used for loading the equivalencies corresponding to the versionId.
	*/
	private loadEquivalencies(){
		this.valuationService.loadEquivalencies(this._versionId).subscribe(
			data=>{
				this.myEquivalencies = data;
				let options:any[] = [];

				Object.keys(data).forEach( key => {
					let option:any = {};
					option.label = data[key].name;
					option.value = key;
					options.push(option);
				});

				this.fields = [
				{
					type: 'select',
					key: 'equivalency',
					templateOptions:{
						label: 'Select a model equivalency',
						labelProp: 'label',
						placeholder: 'Blank if you don\'t want an equivalency',
						options: options,
					},
				}
				];
			},
			err=>{
				this.alertService.error(err);
			});
	}

	/**
	* Getter for the model Equivalency, in case one is selected.
	* @return The model equivalency in case one is selected, false otherwise.
	*/
	getEquivalency(){
		if(this.model.equivalency){
			return this.myEquivalencies[this.model.equivalency];
		}else{
			return false;
		}
	}

}
