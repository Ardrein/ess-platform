import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationDialog } from '../../../../_directives/index';
import { UserService, AlertService } from '../../../../_services/index';
import { MatDialog, MatDialogRef } from '@angular/material';

/**
* Component to represent the concept models from an user.
*/
@Component({
	selector: 'app-concepts',
	templateUrl: './concepts.component.html',
	styleUrls: ['./concepts.component.css']
})
export class ConceptsComponent implements OnInit {

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
	* Variable to hold the models(concept) belonging to the user.
	*/
	@Input() myModels:any;

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
	* Function used to select one model from the table and display its details below it.
	* @param {} model Selected model.
	* @param {} version Selected model version.
	* @param {number} row Selected row number.
	*/
	selectModel(model, version, row: number){
		this.selectedModel = {};
		this.selectedModel._id = model._id;
		this.selectedModel.name = model.name;
		this.selectedModel.versions = [];
		this.selectedModel.versions.push(version);
		this.selectedRow = row;
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
	* Function used to change the model state to public(1).
	*/
	publishModel(){
		this.openConfirmDialog("Are you sure you wish to publish this model?").subscribe( result =>{
			if(result){
				this.userService.changeModelState(this.selectedModel, 1).subscribe(
					data =>{
						this.alertService.success("Model state changed successfuly");
						this.loadModels();
					},
					error =>{
						this.alertService.error(error);
					});

			}
			this.dialogRef = null;
		});
	}

	/**
	* Function used to change the model state to obsolete(2).
	*/
	discontinueModel(){
		this.openConfirmDialog("Are you sure you wish to discontinue this model?").subscribe( result =>{
			if(result){
				this.userService.changeModelState(this.selectedModel, 2).subscribe(
					data =>{
						this.alertService.success("Model state changed successfuly");
						this.loadModels();
					},
					error =>{
						this.alertService.error(error);
					});

			}
			this.dialogRef = null;
		});
	}

	/**
	* Function used to change the model state to In Progress(0).
	*/
	sendModelToWorkbench(){
		this.openConfirmDialog("Are you sure you wish to send this model to the workbench?").subscribe( result =>{
			if(result){
				this.userService.changeModelState(this.selectedModel, 0).subscribe(
					data =>{
						this.alertService.success("Model state changed successfuly");
						this.loadModels();
					},
					error =>{
						this.alertService.error(error);
					});

			}
			this.dialogRef = null;
		});
	}

	/**
	* Function used to delete a model's version.
	*/
	deleteModelVersion(){
		this.openConfirmDialog("Are you sure you wish to discontinue this model?").subscribe( result =>{
			if(result){
				this.userService.deleteModelVersion(this.selectedModel.versions[0]._id)
				.subscribe(
					res =>{
						this.alertService.success("Model deleted successfuly");
						this.loadModels();
					}, 
					error =>{
						this.alertService.error(error);
					});
			}
		});

	}

}
