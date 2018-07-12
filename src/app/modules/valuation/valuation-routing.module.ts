import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelValuationComponent } from '../../components/models/index';
import { ValuationComponent } from '../../components/valuation/valuation.component';


/**
* Constant with the routes for the valuation module and their respective components.
*/
const valuationRoutes: Routes = [
	{ path: '', component: ValuationComponent},
	{ path: 'valuate', component: ModelValuationComponent}
];

/**
* Module for managing the routes of the valuation module.
*/
@NgModule({
  imports: [RouterModule.forChild(valuationRoutes)],
  exports: [RouterModule]
})
export class ValuationRoutingModule { }