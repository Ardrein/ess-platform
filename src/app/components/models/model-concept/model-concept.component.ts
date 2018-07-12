import { Component, OnInit, ViewChild } from '@angular/core';
import { VariableConceptComponent } from '../../variables/index';
import { IndicatorConceptComponent } from '../../indicators/index';
import { ConceptService, ModelService, AlertService, ValuationService } from '../../../_services/index';
import { ConfirmationDialog } from '../../../_directives/index';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatStepper, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';



/**
*	Component used for displaying the conceptual model's structure.
*/
@Component({
	selector: 'app-model-concept',
	templateUrl: './model-concept.component.html',
	styleUrls: ['./model-concept.component.css']
})
export class ModelConceptComponent implements OnInit {

  /**
  * Reference to the confirmation dialog.
  */
  private dialogRef: MatDialogRef<ConfirmationDialog>;

  /**
  * ViewChild to have access to the indicators data.
  */
  @ViewChild('indicators') indicatorsConcept: IndicatorConceptComponent;

  /**
  * ViewChild to have access to the variables data.
  */
  @ViewChild('variables') variablesConcept: VariableConceptComponent;

  /**
  * Viewchild to have access to the material Stepper.
  */
  @ViewChild('stepper') stepper: MatStepper;

	/**
	* Variable used to send the variables to the variable-concept component.
	*/
	private variablesInput;

	/**
	* Variable used to send the indicators to the indicator-concept component.
	*/
	private indicatorsInput;

  /**
  * Variable used to determine if the model has or doesn't have errors.
  */
  private isModelCorrect = false;

  /**
  * Ngx-formly's FormGroup to track model value and validation status.
  */
  private form = new FormGroup({});

  /**
  * Conceptual model that contains the indicators and variables after submitting them.
  */
  private conceptualModel:any = {};

  /**
  * Model to be represented by the form.
  */
  private model:any = {};

  /**
  * Field configurations for building the form.
  */
  private fields: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions:{
      label: 'Name',
      placeholder: 'Model\'s name...',
      required: true
    }
  },

  {
    key: 'version',
    type: 'input',
    templateOptions:{
      label: 'Version(pattern = /^(\d+\.)?(\d+\.)?(\d+)$/)',
      placeholder: 'Model\'s version',
      pattern: /^(\d+\.)?(\d+\.)?(\d+)$/,
      required: true
    },
    validation: {
      messages: {
        pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid Version`,
      },
    }
  }
  ];


  /**
  * Injection of services.
  */
  constructor(private alertService: AlertService,
    private modelService: ModelService,
    private conceptService: ConceptService,
    private router: Router,
    public dialog: MatDialog,
    private valuationService: ValuationService) { }

  /**
  * Usage of OnInit to initialize the model obtained from the service.
  */
  ngOnInit() {
  	this.modelService.getModel().subscribe(
  		data => {
  			this.variablesInput = data.variables;
  			this.indicatorsInput = data.indicators;
  		});
  }

  /**
  * Function used to open a confirmation dialog.
  * @param {string} message The message to display in the dialog.
  * @return An observable notified when the dialog is closing.
  */
  private openConfirmDialog(message:string){
    this.dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });

    this.dialogRef.componentInstance.setConfirmMessage(message);

    return this.dialogRef.afterClosed();
  }

  /**
  * Function used to send the model for validation. If it is corret the flag isModelCorrect
  * will be set to true, allowing to see the preview of the model and to give it a name and a version.
  */
  verifyModel(){
    let indicatorList = this.indicatorsConcept.getModel();
    let variableList = this.variablesConcept.getModel();
    
    if(indicatorList.length > 0){
      this.isModelCorrect = this.conceptService.organizeModel(indicatorList,variableList);
      this.conceptualModel.indicators = indicatorList;
      this.conceptualModel.variables = variableList;
    }
  }

  /**
  * Function used to submit the model and save it in the database.
  */
  submitModel(){
    this.conceptService.submitModel(this.conceptualModel, this.model.name, this.model.version)
    .subscribe(
      (data:any) =>{
        this.alertService.success('Model saved successfuly', true);

        this.openConfirmDialog("Do you want to valuate this model?").subscribe( result =>{
          if(result){
            let versionModel = data;
            this.alocateValues(versionModel.variables, this.conceptualModel.variables);
            this.valuationService.sendModel(versionModel);

            this.router.navigate(['valuation/valuate']);

          }else{
            this.router.navigate(['/user']);
          }
          this.dialogRef = null;
        });


        
      },
      error =>{
        this.alertService.error(error);
      });
  }


  /**
  * Function used to alocate the values of the variables that have them in case the user decides
  * to valuate the conceptual model that has been succesfuly saved.
  * @param {} conceptVariables The model concept variables without value.
  * @param {} valuatedVariables The variables loaded from the srpeadsheet that have a value.
  */
  private alocateValues(conceptVariables, valuatedVariables){
    for(let i=0; i<valuatedVariables.length ;i++){
      conceptVariables[i].value = valuatedVariables[i].value;
    }
  }

}
