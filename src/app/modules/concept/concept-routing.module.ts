import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelConceptComponent } from '../../components/models/index';


/**
* Constant with the routes for the concept module and their respective components.
*/
const conceptRoutes: Routes = [
	{path: '', component: ModelConceptComponent},
];

/**
* Module for managing the routes of the concept module.
*/
@NgModule({
  imports: [RouterModule.forChild(conceptRoutes)],
  exports: [RouterModule]
})
export class ConceptRoutingModule { }