import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationDialog } from '../../../../_directives/index';
import { UserService, AlertService } from '../../../../_services/index';
import { MatDialog, MatDialogRef } from '@angular/material';

/**
* Component to represent the valuation models from an user.
*/
@Component({
	selector: 'app-valuations',
	templateUrl: './valuations.component.html',
	styleUrls: ['./valuations.component.css']
})
export class ValuationsComponent implements OnInit {

	/**
	* Variable to hold the models(valuation) belonging to the user.
	*/
	@Input() myModels:any;

	/**
	* Reference to the confirmation dialog.
	*/
	private dialogRef: MatDialogRef<ConfirmationDialog>;

	/**
	* Variable to hold the selected model from the table.
	*/
	private selectedModel: any;

	/**
	* Selected row from the table.
	*/
	private selectedRow: number;

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
	}

	/**
	* Function used to load the user's models(valuation) from the database.
	*/
	private loadValuations(){
		this.userService.loadValuations().subscribe(
			data => {
				this.myModels = data;
			},
			err =>{
				this.alertService.error(err.message);
			});
	}

	/**
	* Function used to select one model from the table and display its details below it.
	* @param {} model Selected model.
	* @param {} version Selected model version.
	* @param {number} row Selected row number.
	*/
	selectModel(model, row: number){
		this.selectedModel = model;
		this.selectedRow = row;
	}

	/**
	* Function used to delete a model's version.
	*/
	deleteModelValuation(){
		this.openConfirmDialog("Are you sure you wish to delete this model?").subscribe( result =>{
			if(result){
				this.userService.deleteModelValuation(this.selectedModel._id)
				.subscribe(
					res =>{
						this.alertService.success("Model deleted successfuly");
						this.loadValuations();
					}, 
					error =>{
						this.alertService.error(error);
					});
			}
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

}
