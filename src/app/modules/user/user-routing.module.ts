import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModelsComponent } from '../../components/user/index';
import { ModelEquivalencyComponent } from '../../components/models/index';

/**
* Constant with the routes for the user module and their respective components.
*/
const userRoutes: Routes = [
	{ path: '', component: UserModelsComponent },
];

/**
* Module for managing the routes of the user module.
*/
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }