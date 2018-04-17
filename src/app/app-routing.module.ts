import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SpreadsheetComponent} from './spreadsheet/spreadsheet.component';
import { ModeloComponent } from './modelo/modelo.component';
import { PreviewComponent } from './preview/preview.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'login', component: LoginComponent },
	{path: 'home', component: SpreadsheetComponent},
	{path: 'model', component: ModeloComponent},
	{path: 'preview', component: PreviewComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }