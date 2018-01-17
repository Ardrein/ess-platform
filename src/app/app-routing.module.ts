import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SpreadsheetComponent} from './spreadsheet/spreadsheet.component';

export const routes: Routes = [
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'home', component: SpreadsheetComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
