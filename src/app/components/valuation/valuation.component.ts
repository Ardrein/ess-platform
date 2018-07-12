import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ValuationService, AlertService } from '../../_services/index';
import { ValuationEquivalenciesComponent } from './valuation-equivalencies/valuation-equivalencies.component';
import { ValuesComponent } from './values/values.component';
import { Router } from '@angular/router';

/**
* Component used for displaying the public model concepts in order to valuate one.
*/
@Component({
	selector: 'app-valuation',
	templateUrl: './valuation.component.html',
	styleUrls: ['./valuation.component.css']
})
export class ValuationComponent implements OnInit {

	/**
	* Viewchild for getting the selected equivalence of the component.
	*/
	@ViewChild('valEquivComponent') valEquivComponent: ValuationEquivalenciesComponent;


	/**
	* Viewchild for getting the selected valuation of the component.
	*/
	@ViewChild('valuesComp') valuesComp: ValuesComponent;


	/**
	* Ngx-formly's FormGroup to track model value and validation status.
	*/
	private form = new FormGroup({});

	/**
	* Model to be represented by the form.
	*/
	private model:any = {};

	/**
	* Field for the select's options
	*/
	private options:any[] = [];

	/**
	* Variable holding the model concept's versions.
	*/
	private concepts:any[] = [];

	/**
	* Field configurations for building the form.
	*/
	private fields: FormlyFieldConfig[];

	/**
	* Flag in case the user wishes to see if there are equivalencies available.
	*/
	private isEquivalencyChosen:boolean = false;

	/**
	* Model valuations from equivalence.
	*/
	private valuations:any;

	/**
	* Flga in case the user wishes to see if there are valuations available.
	*/
	private isValuationChosen:boolean = false;

	/**
    * @ignore
    */
    constructor(private valuationService: ValuationService,
    	private alertService: AlertService,
    	private router: Router) { }


    /**
    * Load data for the select on Init.
    */
    ngOnInit() {
    	this.valuationService.loadPublicModels().subscribe(
    		data =>{
    			Object.keys(data).forEach( key => {
    				for(let i=0; i< data[key].versions.length;i++){
    					let option:any = {name: data[key].name};
    					let concept = data[key].versions[i];
    					option.label = concept.number;
    					option.value = concept._id;
    					
    					this.concepts.push(concept);
    					this.options.push(option);
    				}
    			});

    			this.fields = [{
    				key: 'version',
    				type: 'select',
    				templateOptions:{
    					label: 'Model Concepts',
    					labelProp: 'label',
    					groupProp: 'name',
    					placeholder: 'Model Version',
    					options: this.options,
    					required: true,
    				},
    			}];

    		},
    		err =>{
    			this.alertService.error(err);
    		});
    }


	/**
	* Function used to valuate a selected model.
	*/
	valuateModel(){
		let modelToSend:any;
		for(let i=0;i < this.concepts.length;i++){
			if(this.concepts[i]._id === this.model.version){
				modelToSend = this.concepts[i];
				break;
			}
		}
		if(modelToSend){
			this.getValuation(modelToSend);
			this.valuationService.sendModel(modelToSend);
			
			this.router.navigate(['valuation/valuate']);
			
		}
		
	}

	/**
	* Function used to look for equivalencies for the selected concept.
	*/
	private showEquivalencies(){
		if(this.model.version){
			this.isEquivalencyChosen = true;
		}else{
			this.isEquivalencyChosen = false;
		}
	}

	/**
	* Function for loading the valuations of a selected equivalency.
	*/
	private showValuations(){
		if(this.valEquivComponent){
			let equivalency = this.valEquivComponent.getEquivalency();
			if(equivalency){
				if(equivalency.firstModel.version._id == this.model.version){
					this.valuationService.loadValuations(equivalency.secondModel.version._id).subscribe(
						valuations=>{
							this.prepareEquivalencies(equivalency,true,valuations);
							this.valuations = valuations;
							this.isValuationChosen = true;
						},
						err=>{
							this.alertService.error(err);
						});
				}else{
					this.valuationService.loadValuations(equivalency.firstModel.version._id).subscribe(
						valuations=>{
							this.prepareEquivalencies(equivalency,false,valuations);
							this.valuations = valuations;
							this.isValuationChosen = true;
						},
						err=>{
							this.alertService.error(err);
						});
				}
				
				
			}else{
				this.isValuationChosen = false;
			}			
		}
	}

	/**
	* Function for leaving only the equivalencies in the loaded valuations.
	* @param {} equivalency Model equivalency that holds the variable equivalencies.
	* @param {boolean} first Flag indicating if the model version is in the first or second model of the equivalency.
	* @param {} valuations Model Valuations that hold the variables.
	*/
	private prepareEquivalencies(equivalency, first:boolean, valuations){
		if(first){
			for(let i=0;i<valuations.length;i++){
				for(let j=valuations[i].valuatedVariables.length-1;j>=0;j--){
					let valVar = valuations[i].valuatedVariables[j];
					for(let k=0;k<equivalency.equivalencies.length;k++){
						if(equivalency.equivalencies[k].variableB._id == valVar.variable){
							valVar.name = equivalency.equivalencies[k].variableB.name;
							valVar.equivalency = equivalency.equivalencies[k].variableA._id;
							break;
						}else if(k == equivalency.equivalencies.length-1){
							valuations[i].valuatedVariables.splice(j,1);
							break;
						}
					}
				}
			}
		}else{
			for(let i=0;i<valuations.length;i++){
				for(let j=valuations[i].valuatedVariables.length-1;j>=0;j--){
					let valVar = valuations[i].valuatedVariables[j];
					for(let k=0;k<equivalency.equivalencies.length;k++){
						if(equivalency.equivalencies[k].variableA._id == valVar.variable){
							valVar.name = equivalency.equivalencies[k].variableA.name;
							valVar.equivalency = equivalency.equivalencies[k].variableB._id;
							break;
						}else if(k == equivalency.equivalencies.length-1){
							valuations[i].valuatedVariables.splice(j,1);
							break;
						}
					}
				}
			}
		}
	}

	/**
	* Function for setting the valuation value to a variable in the model to valuate via equivalency.
	* @param {} modelToSend Model to valuate.
	*/
	private getValuation(modelToSend){
		if(this.valuesComp){
			let valuation = this.valuesComp.getValuation();
			if(valuation){
				for(let i=0;i<modelToSend.variables.length;i++){
					let variable = modelToSend.variables[i];
					for(let j=0;j<valuation.valuatedVariables.length;j++){
						if(valuation.valuatedVariables[j].equivalency == variable._id){
							modelToSend.variables[i].value = valuation.valuatedVariables[j].value;
							break;
						}
					}
				}
			}
		}
	}



}
