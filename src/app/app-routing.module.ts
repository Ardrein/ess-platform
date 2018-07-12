import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpreadsheetLoaderComponent } from './components/spreadsheet-loader/spreadsheet-loader.component';

/**
* Constant with the application routes and their respective components.
*/
const appRoutes: Routes = [
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'home', component: SpreadsheetLoaderComponent},
	{path: 'concept', loadChildren: './modules/concept/concept.module#ConceptModule'},
	{path: 'user', loadChildren: './modules/user/user.module#UserModule'},
	{path: 'valuation', loadChildren: './modules/valuation/valuation.module#ValuationModule'},
	{path: 'equivalency', loadChildren: './modules/equivalency/equivalency.module#EquivalencyModule'},
	{ path: '**', redirectTo: '/home'}
];

/**
* Module for managing the routes of the application.
*/
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
