import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

/**
* Directive used to display a confirm dialog.
*/
@Component({
	selector: 'confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
})
export class ConfirmationDialog {
	/**
	* Message to display in the dialog.
	*/
	private confirmMessage:string;

	/**
	* @ignore
	*/
	constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {}


	/**
	* Message setter for the confirmMessage variable.
	* @param {string} message Message to set.
	*/
	setConfirmMessage(message:string){
		this.confirmMessage = message;
	}


}