import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CustomFormlyModule } from '../_custom-formly/custom-formly.module';
import { UserModelsComponent, ConceptsComponent, ValuationsComponent, EquivalenciesComponent } from '../../components/user/index';
import { UserService } from '../../_services/index';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

/**
* Module for user utilities.
*/
@NgModule({
	imports: [
	CommonModule,
	UserRoutingModule,
	CustomFormlyModule,
	],
	declarations: [
	UserModelsComponent, 
	ConceptsComponent,
	ValuationsComponent,
	EquivalenciesComponent,
	],
	providers: [UserService]
})

export class UserModule {
}