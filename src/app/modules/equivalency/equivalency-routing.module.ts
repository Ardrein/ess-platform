import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelEquivalencyComponent } from '../../components/models/index';

/**
* Constant with the routes for the equivalency module and their respective components.
*/
const equivalencyRoutes: Routes = [
	{ path: '', component: ModelEquivalencyComponent}
];

/**
* Module for managing the routes of the equivalency module.
*/
@NgModule({
  imports: [RouterModule.forChild(equivalencyRoutes)],
  exports: [RouterModule]
})
export class EquivalencyRoutingModule { }