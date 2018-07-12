import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../../../../_services/index';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ConfirmationDialog } from '../../../../_directives/index';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConceptsComponent } from'../concepts/concepts.component';
import { ValuationsComponent } from'../valuations/valuations.component';
import { EquivalenciesComponent } from '../equivalencies/equivalencies.component';

/**
* Component used for displaying an user's conceptual models and valuations.
*/
@Component({
	selector: 'app-user-models',
	templateUrl: './user-models.component.html',
	styleUrls: ['./user-models.component.css']
})
export class UserModelsComponent implements OnInit {

  /**
  * Reference to the confirmation dialog.
  */
  private dialogRef: MatDialogRef<ConfirmationDialog>;

  /**
  * Ngx-formly's FormGroup to track model value and validation status.
  */
  private form = new FormGroup({});

  /**
  * Variable to hold the models(concept) belonging to the user.
  */
  private myModels:any;

  /**
  * Variable to hold the models(valuations) belonging to the user.
  */
  private myValuations:any;

  /**
  * Variable to hold the models(equivalencies) belonging to the user.
  */
  private myEquivalencies:any;

  /**
  * Variable to hold the selected model from the table.
  */
  private selectedModel: any;

  /**
  * Selected row from the table.
  */
  private selectedRow: number;

  /**
  * Model to be represented by the form.
  */
  private model:any = {};

  /**
  * Field configurations for building the form.
  */
  private fields: FormlyFieldConfig[] = [
  ];

  /**
  * @ignore
  */
  constructor(private userService: UserService,
    private alertService: AlertService,
    private dialog: MatDialog) { }


  /**
  * @ignore
  */
  ngOnInit() {
    this.loadModels();
    this.loadValuations();
    this.loadEquivalencies();
  }

  /**
  * Function used to load the user's models(concept) from the database.
  */
  private loadModels(){
    this.userService.loadModels().subscribe(
      data => {
        this.myModels = data;
      },
      err =>{
        this.alertService.error(err.message);
      });
  }

  /**
  * Function used to load the user's models(valuation) from the database.
  */
  private loadValuations(){
    this.userService.loadValuations().subscribe(
      data => {
        this.myValuations = data;
      },
      err =>{
        this.alertService.error(err.message);
      });
  }  

  /**
  * Function used to load the user's models(equivalencies) from the database.
  */
  private loadEquivalencies(){
    this.userService.loadEquivalencies().subscribe(
      data => {
        this.myEquivalencies = data;
      },
      err =>{
        this.alertService.error(err.message);
      });
  }

}
